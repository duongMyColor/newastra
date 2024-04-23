import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import animalController from '../_controllers/termsAndConditions.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await animalController.getAll());
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await animalController.create(request));
});
