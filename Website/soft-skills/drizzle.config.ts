import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { URL } from "url";

const dbUrl = new URL(process.env.DATABASE_URL!);

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 5432,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    ssl: "require",
  },
});