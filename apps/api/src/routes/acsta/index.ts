import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import acstaController from '@/controllers/acsta.controller';
import {
  ResponseSchemaObject,
  ResponseSchemaArray,
  ParamsSchema,
  QueySchema,
} from '@/openapi/acsta';
import { validateId, validateIds } from '@repo/utils/validateRequest';

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    description: 'Get all Acsta masters',
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
    tags: ['Acsta'],
  }),
  async (c): Promise<any> => {
    return c.json(await acstaController.getAll());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/many',
    description: 'Get many Acsta  by ids',
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
    tags: ['Acsta'],
  }),
  async (c): Promise<any> => {
    const ids = c.req.query('ids');
    validateIds(ids as string);

    const numIds = ids?.split(',').map((id) => parseInt(id, 10));
    return c.json(
      await acstaController.getManyByIdsAndChildren(numIds as number[])
    );
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    description: 'Get one Acsta by id',
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
    tags: ['Acsta'],
  }),
  async (c): Promise<any> => {
    const id = c.req.param('id');

    validateId(id);

    const numId = parseInt(id, 10);
    return c.json(await acstaController.getOneById(numId));
  }
);

export default app;
