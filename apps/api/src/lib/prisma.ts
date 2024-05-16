import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

var prisma: PrismaClient;

const generateClient = (DB: D1Database) => {
  const adapter = new PrismaD1(DB);
  prisma = new PrismaClient({
    adapter,
  });
};

export { prisma, generateClient };
