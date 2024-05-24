import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from 'hono/types';

import routes from './routes';
import { ErrorResponse } from '@repo/types/response';
import { generateS3Client } from './lib/cloudflare-r2';
import { generatePrismaClient } from './lib/prisma';
import { globalObject } from './lib/globalObject';
import { BadRequestError } from './core/error.response';

type Bindings = {
  DB: D1Database;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_ACCESS_KEY_ID: string;
  CLOUDFLARE_SECRET_ACCESS_KEY: string;
  CLOUDFLARE_BUCKET_NAME: string;
  bundleId: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();

// Handle global error
app.onError((err: ErrorResponse, c) => {
  return c.json(
    {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
    err?.status || 500
  );
});

// Init global object
app.use(
  globalObject.store<Env>((c) => ({
    bundleId: () => {
      if (!c.req.query('bundleId')) {
        throw new BadRequestError('bundleId is required');
      }
      return c.req.query('bundleId') as string;
    },
    db: generatePrismaClient(c.env?.DB as D1Database),
    s3client: generateS3Client(
      c.env?.CLOUDFLARE_ACCOUNT_ID as string,
      c.env?.CLOUDFLARE_ACCESS_KEY_ID as string,
      c.env?.CLOUDFLARE_SECRET_ACCESS_KEY as string
    ),
    bucketName: c.env?.CLOUDFLARE_BUCKET_NAME as string,
  }))
);

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
