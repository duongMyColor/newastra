import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import animalClassificationController from '../../_controllers/animalClassification.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const DELETE = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(
    await animalClassificationController.deleteMany(request)
  );
});
