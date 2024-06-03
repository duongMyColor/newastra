import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { getRequestContext } from '@cloudflare/next-on-pages';

interface Env extends CloudflareEnv {
  DB: D1Database;
}
var prisma: PrismaClient;

const generateClient = () => {
  if (prisma) {
    return prisma;
  }

  const env = getRequestContext().env as Env;
  const DB = env.DB;
  const adapter = new PrismaD1(DB);
  prisma = new PrismaClient({
    adapter,
  });

  return prisma;
};

export { generateClient };
