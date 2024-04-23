import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import memoController from '../_controllers/memo.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async () => {
  return NextResponse.json(await memoController.getAll());
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await memoController.create(request));
});
