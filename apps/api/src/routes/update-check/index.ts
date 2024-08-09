import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { OK } from '@/core/success.response';
import { OS_MAP } from '@repo/consts/forceUpdate';
import {
  updateCheckSchema,
  updateCheckResponseSchema,
} from '@/openapi/check-update';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '@/core/error.response';
import { getDb } from '@/lib/globalObject';
import { getOneByBundleId } from '@/repos/applicationMaster.repo';
import { Authorization, securitySchemes } from '@/openapi';
const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'post',
    path: '/',
    description: 'Check update',
    security: securitySchemes,

    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: updateCheckSchema,
          },
        },
      },
      headers: Authorization,
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
        throw new BadRequestError('Invalid request');
      }

      const { os, version, bundleId } = result.data;

      const osMap = OS_MAP[os];

      if (osMap == null || osMap == undefined) {
        throw new BadRequestError('Invalid OS');
      }

      if (!version) {
        throw new BadRequestError('Invalid version');
      }

      if (!bundleId) {
        throw new BadRequestError('Invalid bundleId');
      }
      const application = await getOneByBundleId(bundleId);
      if (!application) {
        return c.json({
          message: 'Application not found',
          status: 404,
        });
      }

      const prisma = getDb();
      // Find the latest mandatory update for the specified OS that is newer than the provided version
      const updateInfo = await prisma.forcedUpdateManagement.findFirst({
        where: {
          operateSystem: osMap.toString(),
          version: {
            gt: version,
          },
          appMasterId: application.id,
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
      throw new InternalServerError((error as Error).message);
    }
  }
);

export default app;
