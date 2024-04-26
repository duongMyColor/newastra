import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import the Prisma client
// import userController from '../_controllers/user.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware

export const GET = errorHandlerMiddleware(async (request: NextRequest) => {
  const users = await prisma.userRole.findMany();

  return NextResponse.json(users);
});

// export const POST = errorHandlerMiddleware(async (request: NextRequest) => {
//   console.log('request', request);

//   return NextResponse.json(await userController.create(request));
// });

export const runtime = 'edge';
