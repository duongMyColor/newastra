import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import acstaController from '../../_controllers/acsta.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  return NextResponse.json(await acstaController.getManyReference(request));
});

export const runtime = 'edge';
