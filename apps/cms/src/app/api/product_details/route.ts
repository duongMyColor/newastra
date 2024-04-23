import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import productDetailController from '../_controllers/productDetail.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async () => {
  return NextResponse.json(await productDetailController.getAll());
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await productDetailController.create(request));
});
