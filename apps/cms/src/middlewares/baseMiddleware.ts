import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const baseMiddleware = (request: NextRequest) => {
  // Store the response so we can modify its headers
  const response = NextResponse.next();

  // Set custom header
  response.headers.set('Access-Control-Expose-Headers', 'Content-Range');
  response.headers.set('Content-Range', 'users 0-10/10');
  response.headers.set('Access-Control-Allow-Origin', '*');

  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );

  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Return response
  return response;
};

export default baseMiddleware;
