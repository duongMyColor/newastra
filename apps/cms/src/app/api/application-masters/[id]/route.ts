import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import aplicationMasterController from '../../_controllers/application-masters.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const GET = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(
      await aplicationMasterController.getOneAndChildAndParent(id)
    );
  }
);

export const PUT = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(
      await aplicationMasterController.update(request, id)
    );
  }
);

export const DELETE = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await aplicationMasterController.delete(id));
  }
);

export const runtime = 'edge';
