import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { prisma } from '@/lib/prisma';
import { OK } from '@/core/success.response';
import { OS_MAP } from '@repo/consts/forceUpdate';
import {
  updateCheckSchema,
  updateCheckResponseSchema,
} from '@/openapi/check-update';
const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'post',
    path: '/',
    description: 'Check update',
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: updateCheckSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: updateCheckResponseSchema,
          },
        },
        description: 'Ok Response',
      },
    },
    tags: ['Update Check'],
  }),
  async (c): Promise<any> => {
    try {
      // Parse and validate the request body
      const result = updateCheckSchema.safeParse(await c.req.json());

      if (!result.success) {
        return c.json({ error: 'Invalid request' }, 400);
      }

      const { os, version } = result.data;

      const osMap = OS_MAP[os];

      if (osMap == null || osMap == undefined) {
        return c.json({ error: 'Invalid OS' }, 400);
      }

      if (!version) {
        return c.json({ error: 'Invalid version' }, 400);
      }

      // Find the latest mandatory update for the specified OS that is newer than the provided version
      const updateInfo = await prisma.forcedUpdateManagement.findFirst({
        where: {
          operateSystem: osMap.toString(),
          version: {
            gt: version,
          },
        },
        orderBy: {
          version: 'asc',
        },
      });

      if (updateInfo) {
        return c.json(
          new OK({
            message: 'check update success!',
            metadata: {
              mandatoryUpdate: true,
              version: updateInfo.version,
              publishedDate: updateInfo.publishedDate,
            },
          })
        );
      } else {
        return c.json(
          new OK({
            message: 'check update success!',
            metadata: {
              mandatoryUpdate: false,
            },
          })
        );
      }
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  }
);

export default app;
