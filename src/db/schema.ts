import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export type Role = "guest" | "user" | "admin";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int(),
  username: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  // role: text().$type<Role>().default("guest"),
  role: text().notNull().default("guest"),
  createdAt: text().notNull().default(sql`(current_timestamp)`),
  updatedAt: text().notNull().$onUpdate(() => new Date().toISOString()),
});