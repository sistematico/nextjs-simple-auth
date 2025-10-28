"use client";

import { UserContext } from "./UserContext";
import type { User } from "@/types";

export function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
}