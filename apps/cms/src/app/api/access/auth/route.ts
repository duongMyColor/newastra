import errorHandlerMiddleware from '@/middlewares/errorHandler';
import { NextRequest, NextResponse } from 'next/server';
import accessController from '../../_controllers/access.controller';

export const POST = errorHandlerMiddleware(async () => {
  return NextResponse.json(await accessController.checkAuth());
});
