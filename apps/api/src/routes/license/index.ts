// books.ts
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) =>
  c.json([
    { id: 1, name: 'MIT' },
    { id: 2, name: 'Apache' },
    { id: 3, name: 'GPL' },
  ])
);
app.post('/', (c) => c.json('create a license', 201));
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`));

export default app;
