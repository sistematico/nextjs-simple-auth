"use server";

import { z } from "zod";
import { SignupFormSchema, LoginFormSchema, FormState } from "@/schemas/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { createSession } from "@/lib/session";

export async function signup(_prevState: FormState, formData: FormData) {
  // Validate form fields
  const validated = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    const fieldErrors = Object.fromEntries(
      Object.entries(tree.properties ?? {}).map(([k, v]) => [k, v?.errors ?? []])
    );
    return { errors: fieldErrors };
  }

  const { name, email, password } = validated.data; 

  // Check if user already exists
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    return {
      errors: {
        email: ["Este e-mail já está em uso"]
      }
    };
  }

  // Hash password with random salt using scrypt
  const salt = randomBytes(16).toString("hex");
  const hashed = scryptSync(password, salt, 64).toString("hex");

  // Insert user in the database
  const inserted = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashed,
      salt,
      role: "user"
    })
    .returning({ id: users.id });

  const userId = inserted[0].id;

  // Create session (sets cookie)
  await createSession(userId);

  return {
    message: "Conta criada com sucesso"
  };
}

export async function login(_prevState: FormState, formData: FormData) {
  // Validate form fields
  const validated = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    const fieldErrors = Object.fromEntries(
      Object.entries(tree.properties ?? {}).map(([k, v]) => [k, v?.errors ?? []])
    );
    return { errors: fieldErrors };
  }

  const { email, password } = validated.data;

  // Find user
  const found = await db.select().from(users).where(eq(users.email, email));
  if (!found || found.length === 0) {
    return {
      errors: {
        email: ["Nenhuma conta encontrada com este e-mail"]
      }
    };
  }

  const user = found[0];

  // Recreate hash and compare safely
  const hashed = scryptSync(password, user.salt, 64).toString("hex");
  const isValid = timingSafeEqual(Buffer.from(hashed, "hex"), Buffer.from(user.password, "hex"));

  if (!isValid) {
    return {
      errors: {
        password: ["Credenciais inválidas"]
      }
    };
  }

  // Create session and return success
  await createSession(user.id);

  return {
    message: "Logado com sucesso"
  };
}
