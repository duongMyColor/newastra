// books.ts
import { Hono } from 'hono';
import performanceController from '@/controllers/performance.controller';
const app = new Hono();

app.get('/', async (c) => {
  return c.json(await performanceController.getAll());
});

app.get('/many', async (c) => {
  const ids = c.req.query('ids');
  const numIds = ids?.split(',').map((id) => parseInt(id, 10));
  return c.json(await performanceController.getManyByIds(numIds as number[]));
});

app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const numId = parseInt(id, 10);
  return c.json(await performanceController.getOneById(numId));
});

export default app;
