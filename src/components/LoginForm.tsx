"use client";

import React, { useRef, useState } from "react";
import { signIn } from "@/actions";

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    setError(null);
    
    const fd = new FormData(formRef.current);
    const email = (fd.get("email") as string) || "";
    const password = (fd.get("password") as string) || "";
    
    const result = await signIn({ email, password });
    
    if (result) {
      setError(result);
      setLoading(false);
    }
    // redirect acontece na action se sucesso
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
      {error && (
        <div className="text-red-600 font-semibold p-3 bg-red-50 rounded">{error}</div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          className="w-full rounded border-2 border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded border-2 border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 font-medium"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
