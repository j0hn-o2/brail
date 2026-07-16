import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL;
const directUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Please define it in your environment.");
}

process.env.DIRECT_URL = directUrl;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});