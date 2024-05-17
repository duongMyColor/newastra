// books.ts
import { Hono } from 'hono';
import termsOfUseController from '@/controllers/termOfUse.controller';
const app = new Hono();

app.get('/', async (c) => {
  return c.json(await termsOfUseController.getAll());
});

app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const numId = parseInt(id, 10);
  return c.json(await termsOfUseController.getOneById(numId));
});

app.get('/latest', async (c) => {
  return c.json(await termsOfUseController.getCurrentTermOfUse());
});

export default app;
