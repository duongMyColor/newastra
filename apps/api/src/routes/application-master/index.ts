// books.ts
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import applicationMasterController from '@/controllers/applicationMaster.controller';
import {
  ResponseSchemaObject,
  ResponseSchemaArray,
  ParamsSchema,
  QueySchema,
} from '@/openapi/application-master';
import { BadRequestError } from '@/core/error.response';
const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    description: 'Get all application masters',
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
    tags: ['Application Master'],
  }),
  async (c): Promise<any> => {
    return c.json(await applicationMasterController.getAll());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/many',
    description: 'Get many application masters by ids',
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
    tags: ['Application Master'],
  }),
  async (c): Promise<any> => {
    const ids = c.req.query('ids');

    if (!ids) {
      throw new BadRequestError('Invalid ids');
    }

    const numIds = ids?.split(',').map((id) => parseInt(id, 10));
    return c.json(
      await applicationMasterController.getManyByIds(numIds as number[])
    );
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    description: 'Get one application master by id',
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
    tags: ['Application Master'],
  }),
  async (c): Promise<any> => {
    const id = c.req.param('id');

    if (!id) {
      throw new BadRequestError('Invalid id');
    }
    
    const numId = parseInt(id, 10);
    return c.json(await applicationMasterController.getOneById(numId));
  }
);

export default app;
