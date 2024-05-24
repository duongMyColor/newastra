import { z } from '@hono/zod-openapi';

export const QuerySchemaBundleId = z.object({
  bundleId: z.string().openapi({
    param: {
      name: 'bundleId',
      in: 'query',
    },
    type: 'string',
    example: 'abc.com',
    description: 'bundleId or package name of the application',
  }),
});
