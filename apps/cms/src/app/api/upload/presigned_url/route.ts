import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware
import { createPutPresignedUrlWithClient } from '@repo/lib/aws-s3';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  const { fileKey } = await request.json();

  const presignedUrl = await createPutPresignedUrlWithClient(fileKey);

  return NextResponse.json({ presignedUrl });
});
