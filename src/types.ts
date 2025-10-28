import { getUserFromSession } from "@/lib/session";
import { getUserFromDb } from "@/lib/user";

export type User = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

export type SessionUser = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;