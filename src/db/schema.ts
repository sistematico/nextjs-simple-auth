import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userRoles = ["admin", "user"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_roles", userRoles);

export const users = pgTable("users", {
  //   id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  // username: text().notNull().unique(),
  username: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
