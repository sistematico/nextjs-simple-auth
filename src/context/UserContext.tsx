"use client";

import { createContext, useContext } from "react";
import type { User } from "@/types";

export const UserContext = createContext<User | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  // if (context === null) {
  //   throw new Error("useUser must be used within a UserContext.Provider");
  // }
  return context;
}