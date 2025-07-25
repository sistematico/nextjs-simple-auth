import { z } from "zod";
// import type { Role } from "@/db/schema";

export const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  password: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
});