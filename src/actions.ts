"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signInSchema, signUpSchema } from "@/schema/auth";
import { comparePasswords, generateSalt, hashPassword } from "@/lib/password";
import { login, logout } from "@/lib/session";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return "Não foi possível fazer login";

  try {
    // Use Drizzle to find the user with specific columns
    const user = await db.query.users.findFirst({
      columns: {
        password: true,
        salt: true,
        id: true,
        email: true,
        role: true,
      },
      where: eq(users.email, data.email),
    });

    if (!user) return "E-mail e/ou senha inválidos";

    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      password: data.password,
      salt: user.salt,
    });

    if (!isCorrectPassword) return "E-mail e/ou senha inválidos";

    // Create session for the found user
    await login({ id: user.id, email: user.email, role: user.role });

    // Redirect only after successful login
    redirect("/");
  } catch (error) {
    console.error("Error during sign-in:", error);
    return "Não foi possível fazer login";
  }
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);
  if (!success) return "Não foi possível criar a conta";

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });
  if (existingUser) return "Já existe uma conta com este e-mail";

  try {
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
      .returning({ id: users.id, role: users.role });

    if (user == null) return "Não foi possível criar a conta";

    // Create session for new user
    await login({ id: user.id, email: data.email, role: user.role });

    // Redirect only after successful signup/login
    redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return "Não foi possível criar a conta";
  }
}

export async function logOut() {
  await logout();
  redirect("/");
}

/**
 * Busca todos os usuários (sem campos sensíveis) para a página /dashboard.
 * Retorna um array com os campos: id, name, email, role, createdAt, updatedAt.
 */
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
