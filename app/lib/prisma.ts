import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Local dev uses a plain file-based SQLite db (via prisma migrate). Deployed
// environments (e.g. Vercel) have no persistent filesystem, so they use a
// hosted libSQL (Turso) database instead — set TURSO_DATABASE_URL/TURSO_AUTH_TOKEN
// to switch over.
const adapter = process.env.TURSO_DATABASE_URL
  ? new PrismaLibSql({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN })
  : new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
