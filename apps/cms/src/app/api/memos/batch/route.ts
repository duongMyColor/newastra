import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import memoController from '../../_controllers/memo.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await memoController.deleteMany(request)
  );
});
