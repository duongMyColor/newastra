// books.ts
import { Hono } from 'hono';
import acstaController from '@/controllers/acsta.controller';
const app = new Hono();

app.get('/', async (c) => {
  return c.json(await acstaController.getAll());
});

app.get('/many', async (c) => {
  const ids = c.req.query('ids');
  const numIds = ids?.split(',').map((id) => parseInt(id, 10));
  return c.json(
    await acstaController.getManyByIdsAndChildren(numIds as number[])
  );
});

app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const numId = parseInt(id, 10);
  return c.json(await acstaController.getOneById(numId));
});

export default app;
