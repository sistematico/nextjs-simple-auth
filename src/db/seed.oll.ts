import { db } from "@/db";
import { users } from "./schema";

async function main() {
  const user: typeof users.$inferInsert = {
    name: "Lucas Saliés Brum",
    username: "lsbrum",
    email: "lsbrum@icloud.com",
    password: "password",
    salt: "salt",
    role: "admin",
  };

  await db.insert(users).values(user).onConflictDoNothing();
}

main();
