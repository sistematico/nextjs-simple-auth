"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signInSchema, signUpSchema } from "@/schema/auth";
import { comparePasswords, generateSalt, hashPassword } from "@/lib/password";
import { createSession, deleteSession, getSession } from "@/lib/session";
import type { PublicUser } from "@/types";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return "Não foi possível fazer login";

  const user = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });

  if (!user) return "E-mail e/ou senha inválidos";

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "E-mail e/ou senha inválidos";

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);
  if (!success) return "Não foi possível criar a conta";

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });
  if (existingUser) return "Já existe uma conta com este e-mail";

  const salt = generateSalt();
  const hashedPassword = await hashPassword(data.password, salt);

  const [user] = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      salt,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
    });

  if (!user) return "Não foi possível criar a conta";

  await createSession(user);
  redirect("/");
}

export async function logOut() {
  await deleteSession();
  redirect("/");
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const session = await getSession();
  return session?.user ?? null;
}

export async function listUsers() {
  try {
    // Seleciona apenas campos não sensíveis
    const rows = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(users.id);

    return rows;
  } catch (error) {
    console.error("Error listing users:", error);
    return [];
  }
}
