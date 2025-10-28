"use client";

import { z } from "zod";
import { useState } from "react";
import { signIn } from "@/actions";
import { signInSchema } from "@/schema/auth";
import Link from "next/link";

type FormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  function validateEmail(email: string): string | undefined {
    if (!email) return "Email é obrigatório";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email inválido. Exemplo: usuario@dominio.com";
    
    return undefined;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validação em tempo real para email
    if (name === "email" && emailTouched) {
      const emailError = validateEmail(value);
      setErrors({ ...errors, email: emailError });
    } else {
      setErrors({ ...errors, [name]: undefined });
    }
    
    setSubmitError(undefined);
  }

  function handleEmailBlur() {
    setEmailTouched(true);
    const emailError = validateEmail(formData.email);
    setErrors({ ...errors, email: emailError });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validar email antes de enviar
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    }

    const result = signInSchema.safeParse(formData);
    if (!result.success) {
      const map: typeof errors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        map[field] = err.message;
      });
      setErrors(map);
      return;
    }

    setLoading(true);
    const error = await signIn(result.data);
    setLoading(false);

    if (error) setSubmitError(error);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {submitError && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {submitError}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="block font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          className={`p-3 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white ${errors.email ? "border-red-500" : ""}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block font-medium text-gray-700 dark:text-gray-200">
          Senha
        </label>
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`p-3 mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white ${errors.password ? "border-red-500" : ""}`}
          placeholder="Digite sua senha..."
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-3">
        <div>
          Ainda não tem uma conta?{" "}
          <Link href="/signup" className="underline">
            Cadastre-se
          </Link>
        </div>
        <button 
          type="submit" 
          className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
          disabled={loading || !!errors.email || !!errors.password}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}