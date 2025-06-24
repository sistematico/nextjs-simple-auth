"use client";

import { useState } from "react";
import { signUp } from "@/app/actions";
import { z } from "zod";
import { signUpSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSubmitError(undefined);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const zErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        zErrors[field] = err.message;
      });
      setErrors(zErrors);
      return;
    }

    setLoading(true);
    const serverError = await signUp(result.data);
    setLoading(false);

    if (serverError) {
      setSubmitError(serverError);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {submitError && <p className="text-destructive">{submitError}</p>}

      <div className="space-y-2">
        <label htmlFor="name" className="block font-medium">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

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
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button asChild>
          <Link href="/entrar" className="underline">
            Entrar
          </Link>
        </Button>
        {/* <Button asChild variant="link">
          <Link href="/entrar">Entrar</Link>
        </Button> */}
        <Button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
