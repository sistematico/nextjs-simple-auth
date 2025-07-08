import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}
