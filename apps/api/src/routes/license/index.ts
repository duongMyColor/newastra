import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import licenseController from '@/controllers/license.controller';
import { ParamsSchema, ResponseSchema } from '@/openapi/license';

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/latest',
    description: 'Get the latest License',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchema,
          },
        },
        description: 'Ok Response',
      },
    },
  }),
  async (c): Promise<any> => {
    return c.json(await licenseController.getCurrentLicense());
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    description: 'Get License by id',
    request: {
      params: ParamsSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ResponseSchema,
          },
        },
        description: 'Ok Response',
      },
    },
  }),
  async (c): Promise<any> => {
    const id = c.req.param('id');
    const numId = parseInt(id, 10);
    return c.json(await licenseController.getOneById(numId));
  }
);

export default app;
