import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import animalClassificationController from '../_controllers/animalClassification.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async () => {
  return NextResponse.json(await animalClassificationController.getAll());
});

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await animalClassificationController.create(request)
  );
});
