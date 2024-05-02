import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import productDetailController from '../../_controllers/performance.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await productDetailController.createMany(request));
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await productDetailController.updateMany(request));
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await productDetailController.deleteMany(request));
});

export const runtime = 'edge';
