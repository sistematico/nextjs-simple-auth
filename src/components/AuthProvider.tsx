"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Session = {
  user?: { email?: string | null; name?: string } | null;
  expires?: string | number | Date;
} | null;

type AuthContextType = {
  session: Session;
  setSession: (s: Session) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session>(() => {
    try {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem("session");
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  });

  function setSession(s: Session) {
    setSessionState(s);
    try {
      if (s) localStorage.setItem("session", JSON.stringify(s));
      else localStorage.removeItem("session");
    } catch (e) {
      console.error("AuthProvider: failed to persist session", e);
    }
  }

  function logout() {
    setSession(null);
  }

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "session") {
        try {
          setSessionState(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setSessionState(null);
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
