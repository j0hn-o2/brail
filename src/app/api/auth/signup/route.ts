import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupBody = {
  name?: string;
  email?: string;
  password?: string;
};

function badRequest(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  let body: SignupBody;

  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return badRequest("Invalid signup request.");
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!name || name.length < 2) {
    return badRequest("Enter your full name.");
  }

  if (!email || !emailPattern.test(email)) {
    return badRequest("Enter a valid email address.");
  }

  if (password.length < 8) {
    return badRequest("Password must be at least 8 characters.");
  }

  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return badRequest("An account with this email already exists. Log in instead.", 409);
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.users.create({
    data: {
      email,
      full_name: name,
      password_hash: passwordHash,
    },
    select: {
      id: true,
      email: true,
      full_name: true,
    },
  });

  return NextResponse.json({ user }, { status: 201 });
}
