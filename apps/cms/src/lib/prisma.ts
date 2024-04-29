import { getRequestContext } from '@cloudflare/next-on-pages';
import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

export interface Env extends CloudflareEnv {
  DB: D1Database;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const env = getRequestContext().env as Env;
const DB = env.DB;
const adapter = new PrismaD1(DB);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
