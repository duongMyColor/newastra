import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    console.log('db', env.DB);

    const adapter = new PrismaD1(env.DB);
    const prisma = new PrismaClient({ adapter });

    const users = await prisma.userRole.findMany();
    const result = JSON.stringify(users);
    // console.log({ result });
    return new Response(result);
  },
} satisfies ExportedHandler<Env>;
