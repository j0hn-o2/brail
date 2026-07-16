import "dotenv/config";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

type SessionUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type AuthToken = JWT & {
  id?: string;
  picture?: string | null;
};

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user?.password_hash) {
          return null;
        }

        const isValidPassword = await verifyPassword(password, user.password_hash);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.full_name,
          email: user.email,
          image: user.profile_image ?? undefined,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!user.email) return false;

      const email = user.email.trim().toLowerCase();
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });

      if (!existingUser) {
        await prisma.users.create({
          data: {
            email,
            full_name: user.name ?? "Unknown",
            profile_image: user.image,
            google_id: user.id,
          },
        });
      } else {
        await prisma.users.update({
          where: { email },
          data: {
            google_id: existingUser.google_id ?? user.id,
            full_name: user.name ?? existingUser.full_name,
            profile_image: user.image ?? existingUser.profile_image,
          },
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      const authToken = token as AuthToken;

      if (user) {
        const email = user.email?.trim().toLowerCase();
        const databaseUser = email
          ? await prisma.users.findUnique({ where: { email } })
          : null;

        authToken.id = databaseUser?.id ?? user.id;
        authToken.name = databaseUser?.full_name ?? user.name;
        authToken.email = databaseUser?.email ?? user.email;
        authToken.picture = databaseUser?.profile_image ?? user.image;
      }

      return authToken;
    },

    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as SessionUser;
        const authToken = token as AuthToken;

        sessionUser.id = authToken.id ?? token.sub;
        sessionUser.name = token.name;
        sessionUser.email = token.email;
        sessionUser.image = authToken.picture ?? null;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
