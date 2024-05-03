import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FileBody, MultipartUploadBody } from '@repo/types/upload';
import errorHandlerMiddleware from '@/middlewares/errorHandler'; // Import the errorHandlerMiddleware
import {
  createMultipartUpload,
  deleteObject,
  resumeMultipartUpload,
} from '@/lib/cloudflare-r2';
import { convertFormDataToObject } from '@repo/utils/objectUtils';

export const POST = errorHandlerMiddleware(
  async (
    request: NextRequest,
    { params: { action } }: { params: { action: string } }
  ) => {
    const { key, uploadId, parts }: MultipartUploadBody = await request.json();
    // Route the request based on the HTTP method and action type
    switch (action) {
      case 'mpu-create': {
        return new NextResponse(
          JSON.stringify(await createMultipartUpload(key))
        );
      }
      case 'mpu-complete': {
        if (uploadId === null) {
          return new NextResponse('Missing uploadId', { status: 400 });
        }

        const multipartUpload = await resumeMultipartUpload({ key, uploadId });

        if (parts === null) {
          return new NextResponse('Missing or incomplete parts', {
            status: 400,
          });
        }

        // Error handling in case the multipart upload does not exist anymore
        try {
          const object = await multipartUpload.complete(
            parts as R2UploadedPart[]
          );
          return new NextResponse(null, {
            headers: {
              etag: object.httpEtag,
            },
          });
        } catch (error: any) {
          return new NextResponse(error.message, { status: 400 });
        }
      }
      default:
        return new NextResponse(`Unknown action ${action} for POST`, {
          status: 400,
        });
    }
  }
);

export const PUT = errorHandlerMiddleware(
  async (
    request: NextRequest,
    { params: { action } }: { params: { action: string } }
  ) => {
    const payload: FormData = await request.formData();

    const { key, uploadId, partNumberString, part }: { [key: string]: any } =
      convertFormDataToObject(payload);

    switch (action) {
      case 'mpu-uploadpart': {
        if (partNumberString === null || uploadId === null) {
          return new NextResponse('Missing partNumber or uploadId', {
            status: 400,
          });
        }
        if (part === null) {
          return new NextResponse('Missing request body', { status: 400 });
        }

        const partNumber = parseInt(partNumberString as string, 10);
        const multipartUpload = await resumeMultipartUpload({ key, uploadId });

        try {
          const uploadedPart: R2UploadedPart = await multipartUpload.uploadPart(
            partNumber,
            part as FileBody
          );
          return new NextResponse(JSON.stringify(uploadedPart));
        } catch (error: any) {
          return new NextResponse(error.message, { status: 400 });
        }
      }
      default:
        return new NextResponse(`Unknown action ${action} for PUT`, {
          status: 400,
        });
    }
  }
);

export const DELETE = errorHandlerMiddleware(
  async (
    request: NextRequest,
    { params: { action } }: { params: { action: string } }
  ) => {
    const { key, uploadId }: MultipartUploadBody = await request.json();

    switch (action) {
      case 'mpu-abort': {
        if (uploadId === null) {
          return new NextResponse('Missing uploadId', { status: 400 });
        }
        const multipartUpload = await resumeMultipartUpload({ key, uploadId });

        try {
          multipartUpload.abort();
        } catch (error: any) {
          return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse(null, { status: 204 });
      }
      case 'delete': {
        await deleteObject(key);
        return new NextResponse(null, { status: 204 });
      }
      default:
        return new NextResponse(`Unknown action ${action} for DELETE`, {
          status: 400,
        });
    }
  }
);

export const runtime = 'edge';
