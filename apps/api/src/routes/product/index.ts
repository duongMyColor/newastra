// books.ts
import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import performanceController from '@/controllers/performance.controller';
import {
  ResponseSchemaObject,
  ResponseSchemaArray,
  ParamsSchema,
  QueySchema,
} from '@/openapi/product';
const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    description: 'Get all Product masters',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchemaArray,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Product'],
  }),
  async (c): Promise<any> => {
    return c.json(await performanceController.getAll());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/many',
    description: 'Get many Product by ids',
    request: {
      query: QueySchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchemaArray,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Product'],
  }),
  async (c): Promise<any> => {
    const ids = c.req.query('ids');

    validateIds(ids);

    const numIds = ids?.split(',').map((id) => parseInt(id, 10));
    return c.json(await performanceController.getManyByIds(numIds as number[]));
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    description: 'Get one product by id',
    request: {
      params: ParamsSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchemaObject,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Product'],
  }),
  async (c): Promise<any> => {
    const id = c.req.param('id');
    const numId = parseInt(id, 10);
    return c.json(await performanceController.getOneById(numId));
  }
);

export default app;
function validateIds(ids: string | undefined) {
  throw new Error('Function not implemented.');
}
