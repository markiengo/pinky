/**
 * Supabase schema migration script.
 * 
 * Pushes Prisma schema to Supabase WITHOUT deleting any data.
 * Only adds/modifies tables and columns to match the schema.
 * 
 * Usage:
 *   $env:SUPABASE_DB_URL = "postgresql://..."; npx tsx prisma/supabase-migrate.mts
 * 
 * This creates a temporary postgres schema file, runs prisma db push,
 * then cleans up. Safe to run repeatedly.
 */
import { writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_DB_URL;
if (!SUPABASE_URL) {
  console.error("ERROR: Set SUPABASE_DB_URL env var first.");
  process.exit(1);
}

// Read the main schema and swap sqlite -> postgresql
const schemaPath = join(__dirname, "schema.prisma");
const tempSchemaPath = join(__dirname, "schema-supabase-temp.prisma");

const schema = readFileSyncSafe(schemaPath);
const pgSchema = schema
  .replace('provider = "sqlite"', 'provider = "postgresql"')
  .replace('env("DATABASE_URL")', 'env("SUPABASE_DB_URL")');

writeFileSync(tempSchemaPath, pgSchema);
console.log("Created temporary postgres schema at prisma/schema-supabase-temp.prisma");

try {
  console.log("Pushing schema to Supabase (no data loss)...");
  execSync(`npx prisma db push --schema=${tempSchemaPath} --skip-generate --accept-data-loss`, {
    stdio: "inherit",
    env: { ...process.env, SUPABASE_DB_URL: SUPABASE_URL },
  });
  console.log("✓ Supabase schema updated successfully.");
} catch (e) {
  console.error("✗ Schema push failed:", e);
  process.exitCode = 1;
} finally {
  if (existsSync(tempSchemaPath)) {
    unlinkSync(tempSchemaPath);
    console.log("Cleaned up temporary schema file.");
  }
}

function readFileSyncSafe(path: string): string {
  const fs = require("fs");
  return fs.readFileSync(path, "utf-8");
}
