import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import memoController from '../../_controllers/memo.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const GET = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await memoController.getOneById(id));
  }
);

export const PUT = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);

    return NextResponse.json(await memoController.update(request, id));
  }
);

export const DELETE = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await memoController.delete(id));
  }
);
