import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import imgRecSelectionController from '../../_controllers/imgRecSelection.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const GET = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await imgRecSelectionController.getOne(id));
  }
);

export const PUT = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(
      await imgRecSelectionController.update(request, id)
    );
  }
);

export const DELETE = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(await imgRecSelectionController.delete(id));
  }
);
