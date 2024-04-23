import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import imgRecSelectionController from '../../_controllers/imgRecSelection.controller';

import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await imgRecSelectionController.createMany(request));
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await imgRecSelectionController.updateMany(request));
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await imgRecSelectionController.deleteMany(request));
});
