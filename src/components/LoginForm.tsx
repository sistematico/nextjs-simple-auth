"use client";

import React, { useRef, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      const fd = new FormData(formRef.current);
      const email = (fd.get("email") as string) || null;
      // No API call required: set session locally for demo purposes
      setSession({ user: { email } });
    } catch (e) {
      console.error("Login error", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded border-2 border-black/70"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="rounded border-2 border-black/70"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
