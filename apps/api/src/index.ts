import { Hono } from 'hono';
import { generateClient } from './lib/prisma';
import routes from './routes';
type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Init prism client
app.use(async (c, next) => {
  generateClient(c.env.DB);
  return next();
});

// // Accessing D1 is via the c.env.YOUR_BINDING property
// app.get('/query/users', async (c) => {
//   try {
//     let results = await prisma.user.findMany();
//     console.log(results);

//     return c.json(results);
//   } catch (e) {
//     console.log(e);

//     return c.json({ err: 'e.message' }, 500);
//   }
// });
app.route('/api/v1', routes);

export default app;
