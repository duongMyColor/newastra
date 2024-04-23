import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import productController from '../_controllers/product.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await productController.getAllWithQuery(request));
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await productController.create(request));
});
