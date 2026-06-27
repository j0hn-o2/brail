import "dotenv/config";
import NextAuth from "next-auth";
import type { AuthOptions, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
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
  ],

  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) return false;

      const existingUser = await prisma.users.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prisma.users.create({
          data: {
            email: user.email,
            full_name: user.name ?? "Unknown",
            profile_image: user.image,
            google_id: user.id,
          },
        });
      }

      return true;
    },

    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.name = user.name ?? session.user.name;
        session.user.email = user.email ?? session.user.email;
        session.user.image = user.image ?? session.user.image;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };