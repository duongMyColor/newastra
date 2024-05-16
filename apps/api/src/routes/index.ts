// books.ts
import { Hono } from 'hono';
import license from './license';
const app = new Hono();

app.route('/licenses', license);

export default app;
