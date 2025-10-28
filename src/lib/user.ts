import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import type { User, SessionUser } from "@/types";

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<User>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound?: false;
}): Promise<User | null>;

function _getCurrentUser(options: {
  withFullUser?: false;
  redirectIfNotFound: true;
}): Promise<SessionUser>;

function _getCurrentUser(options?: {
  withFullUser?: false;
  redirectIfNotFound?: false;
}): Promise<SessionUser | null>;

async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) return redirect("/sign-in");
    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id);
    if (!fullUser) throw new Error("User not found in database");
    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);

export async function getUserFromDb(id: number) {
  return await db.query.users.findFirst({
    columns: { id: true, email: true, role: true, name: true, username: true },
    where: eq(users.id, id),
  });
}