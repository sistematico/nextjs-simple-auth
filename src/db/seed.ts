import { db } from "@/db";
import { users } from "./schema";

async function main() {
  const user: typeof users.$inferInsert = {
    name: "John",
    email: "john@example.com",
    password: "password",
    salt: "salt",
    role: "user",
  };

  await db.insert(users).values(user).onConflictDoNothing();
}

main();
