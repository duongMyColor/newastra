import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import aplicationMasterController from '../../_controllers/applicationMaster.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';
import { BaseRepo } from '../../_repos/base/base.repo';
import { generateClient } from '@/lib/prisma';
import { OK } from '../../_core/success.response';

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  let packetName = searchParams.get('packetName') as any;

  const model = generateClient().aplicationMaster;
  return NextResponse.json(
    new OK({
      message: `get packet name success!`,
      metadata: await new BaseRepo(model).getOneByPacketName(packetName),
    })
  );
});

export const runtime = 'edge';
// new BaseRepo(model).insert(payload);vc
