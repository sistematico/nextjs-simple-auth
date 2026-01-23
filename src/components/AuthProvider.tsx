"use client";

import React, { createContext, useContext } from "react";
import type { PublicUser } from "@/types";

type AuthContextType = {
  user: PublicUser | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: PublicUser | null;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
