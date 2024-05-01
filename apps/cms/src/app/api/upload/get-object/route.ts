import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware
import { getObject } from '@/lib/cloudflare-r2';

export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
  const req: { key: string } = await request.json();

  const object = await getObject(req?.key);

  if (object === null) {
    return new NextResponse('Object Not Found', { status: 404 });
  }
  console.log(':::object', object);

  const headers = new Headers();
  console.log(':::headers', headers);

  // object.writeHttpMetadata(headers);
  // console.log(':::object.httpEtag', object.httpEtag);

  headers.set('etag', object.httpEtag);

  return new Response(object.body, {
    headers,
  });
});

export const runtime = 'edge';
