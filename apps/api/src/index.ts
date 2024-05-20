import { generateClient } from './lib/prisma';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
// import { basicAuth } from 'hono/basic-auth';
// import { bearerAuth } from 'hono/bearer-auth';

import routes from './routes';
type Bindings = {
  DB: D1Database;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

// Init prism client
app.use(async (c, next) => {
  generateClient(c.env.DB);
  return next();
});

app.route('/api/v1', routes);

// app.use('/ui', bearerAuth({ token: 'bearer-token' })).use(
//   '/doc',
//   basicAuth({
//     username: 'user',
//     password: 'password',
//   })
// );

app.get(
  '/ui',
  swaggerUI({
    url: '/doc',
  })
);
app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
});

export default app;
