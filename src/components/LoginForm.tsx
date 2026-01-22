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
    <form ref={formRef} onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
