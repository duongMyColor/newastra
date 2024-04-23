import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const createPutPresignedUrlWithClient = (key: string) => {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_KEY as string,
    },
  });
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUKCET,
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

const createGetPresignedUrlWithClient = (key: string) => {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_KEY as string,
    },
  });
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUKCET,
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

export { createPutPresignedUrlWithClient, createGetPresignedUrlWithClient };
