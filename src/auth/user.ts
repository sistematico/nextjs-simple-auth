import { cookies } from "next/headers";
import { getUserFromSession } from "@/auth/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<FullUser>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound?: false;
}): Promise<FullUser | null>;

function _getCurrentUser(options: {
  withFullUser?: false;
  redirectIfNotFound: true;
}): Promise<User>;

function _getCurrentUser(options?: {
  withFullUser?: false;
  redirectIfNotFound?: false;
}): Promise<User | null>;

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
    // console.log("Fetching full user data for:", user.id);
    const fullUser = await getUserFromDb(user.id);
    // console.log("Full user:", fullUser);
    
    // This should never happen
    if (!fullUser) throw new Error("User not found in database");

    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);

async function getUserFromDb(id: string) {
  // return await db.query.users.findFirst({
  //   columns: { id: true, email: true, role: true, name: true, username: true },
  //   where: eq(users.id, id),
  // });

  // return await db.query.users.findFirst();
  return await db.query.users.findFirst({
    columns: { id: true, email: true, role: true, name: true, username: true },
    where: eq(users.id, id),
    //where: eq(users.id, 'cc74e56f-494e-488f-b351-b4d378e3a1bf')
  });
}
