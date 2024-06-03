import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { AsyncLocalStorage } from 'node:async_hooks';
interface Env extends CloudflareEnv {
  DB: D1Database;
}

const localStorage: any = new AsyncLocalStorage();

const getStorageKey = (key: string) => {
  const store = localStorage.getStore() as any;

  if (!store) {
    return null;
  }

  return store[key];
};

const generateClient = () => {
  if (!localStorage) {
    const env = getRequestContext().env as Env;
    const DB = env.DB;
    const adapter = new PrismaD1(DB);
    let prismaObj = new PrismaClient({
      adapter,
    });

    localStorage.run({ prisma: prismaObj }, () => {});

    return prismaObj;
  }

  if (getStorageKey('prisma')) {
    return getStorageKey('prisma');
  }

  if (!getStorageKey('prisma')) {
    const env = getRequestContext().env as Env;
    const DB = env.DB;
    const adapter = new PrismaD1(DB);
    let prismaObj = new PrismaClient({
      adapter,
    });

    localStorage.run({ prisma: prismaObj }, () => {});

    return prismaObj;
  }
};

export { generateClient };
