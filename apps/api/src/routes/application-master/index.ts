// books.ts
import { Hono } from 'hono';
import applicationMasterController from '@/controllers/applicationMaster.controller';
const app = new Hono();

app.get('/', async (c) => {
  return c.json(await applicationMasterController.getAll());
});

app.get('/many', async (c) => {
  const ids = c.req.query('ids');
  const numIds = ids?.split(',').map((id) => parseInt(id, 10));
  return c.json(
    await applicationMasterController.getManyByIds(numIds as number[])
  );
});

app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const numId = parseInt(id, 10);
  return c.json(await applicationMasterController.getOneById(numId));
});

export default app;
