// books.ts
import { Hono } from 'hono';
import licenseController from '@/controllers/license.controller';
const app = new Hono();

app.get('/', async (c) => {
  return c.json(await licenseController.getAll());
});

app.get('/:id', async (c) => {
  const id = c.req.param('id');
  const numId = parseInt(id, 10);
  return c.json(await licenseController.getOneById(numId));
});

app.get('/latest', async (c) => {
  return c.json(await licenseController.getCurrentLicense());
});

export default app;
