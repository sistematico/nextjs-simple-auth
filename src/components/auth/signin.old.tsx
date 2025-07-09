"use client";

import { useState } from "react";
import { signIn } from "@/app/actions";
import { z } from "zod";
import { signInSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/password";
import Link from "next/link";

type FormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [submitError, setSubmitError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSubmitError(undefined);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = signInSchema.safeParse(formData);
    if (!result.success) {
      const map: typeof errors = {};
      result.error.errors.forEach((err) => {
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
      {submitError && <p className="text-destructive">{submitError}</p>}

      <div className="space-y-2">
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        {/* <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        /> */}
        <InputPassword />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      <div className="flex gap-4 justify-end">
        <Button asChild className="underline">
          <Link href="/cadastro">
            Cadastro
          </Link>
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </form>
  );
}
