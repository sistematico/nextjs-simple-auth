// import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const users = sqliteTable("users", {
//   id: int().primaryKey({ autoIncrement: true }),
//   name: text().notNull(),
//   password: text().notNull(),
//   email: text().notNull().unique(),
// });

import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int(),
  username: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  role: text().notNull().default("user"), // user, admin
  createdAt: text().notNull().default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .$onUpdate(() => new Date().toISOString())
});

export const sessions = sqliteTable("sessions", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  expiresAt: text().notNull(),
  createdAt: text().notNull().default(sql`(current_timestamp)`),
  updatedAt: text()
    .notNull()
    .$onUpdate(() => new Date().toISOString())
});
