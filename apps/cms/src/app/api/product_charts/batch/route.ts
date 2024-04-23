import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import productController from '../../_controllers/product.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await productController.deleteMany(request)
  );
});
