"use server";
import { neon } from "@neondatabase/serverless";
export async function getDbConnection() {
  if (!process.env.DATABASE_key) {
    throw new Error("Neon Database URL is not defined");
  }
  const sql = neon(process.env.DATABASE_key);
  return sql;
}
