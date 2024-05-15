import { Hono } from 'hono';
import { prisma } from './lib/prisma';
// This ensures c.env.DB is correctly typed
type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get('/query/users', async (c) => {
  const userId = c.req.param('id');
  console.log(userId);

  try {
    let results = await prisma.user.findMany();
    console.log(results);

    return c.json(results);
  } catch (e) {
    console.log(e);

    return c.json({ err: e.message }, 500);
  }
});

export default app;
