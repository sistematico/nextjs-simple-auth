"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "@/schemas/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePasswords, generateSalt, hashPassword } from "@/auth/password";
import { cookies } from "next/headers";
import { createUserSession, removeUserFromSession } from "@/auth/session";

const messages = {
  invalidEmailOrPassword: "E-mail e/ou senha inválidos",
  unableToCreateAccount: "Não foi possível criar a conta",
  unableToLogIn: "Não foi possível fazer login",
  accountAlreadyExists: "Já existe uma conta com este e-mail",
}

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return messages.unableToLogIn;

  const user = await db.query.users.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(users.email, data.email),
  });

  if (!user) return messages.invalidEmailOrPassword;

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return messages.invalidEmailOrPassword;

  await createUserSession(user, await cookies());

  redirect("/");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return messages.unableToCreateAccount;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });

  if (existingUser != null) return messages.accountAlreadyExists;

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

    if (user == null) return messages.unableToCreateAccount;
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error("Error creating user:", error);
    return messages.unableToCreateAccount;
  }

  redirect("/");
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}