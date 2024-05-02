import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import animalController from '../../_controllers/termOfUse.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await animalController.createMany(request));
});

export const PUT = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await animalController.updateMany(request));
});

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await animalController.deleteMany(request));
});

export const runtime = 'edge';
