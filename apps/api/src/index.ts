import { generateClient } from './lib/prisma';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
// import { basicAuth } from 'hono/basic-auth';
// import { bearerAuth } from 'hono/bearer-auth';

import routes from './routes';
import { generateS3Client } from './lib/cloudflare-r2';
type Bindings = {
  DB: D1Database;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_ACCESS_KEY_ID: string;
  CLOUDFLARE_SECRET_ACCESS_KEY: string;
  CLOUDFLARE_BUCKET_NAME: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

// Init prism client
app.use(async (c, next) => {
  generateClient(c.env.DB);
  generateS3Client(
    c.env.CLOUDFLARE_ACCOUNT_ID,
    c.env.CLOUDFLARE_ACCESS_KEY_ID,
    c.env.CLOUDFLARE_SECRET_ACCESS_KEY
  );
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
