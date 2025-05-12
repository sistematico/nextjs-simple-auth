import { db } from "@/db";
import { usersTable } from "./schema";

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user).onConflictDoNothing();
}

main();
