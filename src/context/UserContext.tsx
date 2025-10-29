"use client";

import { createContext, useContext, useState } from "react";
import type { SessionUser } from "@/types";

type UserContextType = {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode; }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  return (
    <UserContext value={{ user, setUser }}>{children}</UserContext>
  );
}

export const useUser = () => useContext(UserContext);