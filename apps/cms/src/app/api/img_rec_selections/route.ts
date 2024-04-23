import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import imgRecSelectionController from '../_controllers/imgRecSelection.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await imgRecSelectionController.getAllWithQuery(request)
  );
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await imgRecSelectionController.create(request));
});
