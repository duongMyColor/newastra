import type { PrismaClient } from '@prisma/client/extension';
import { asyncLocalStorage } from './asyncLocalStorage';
import type { S3Client } from '@aws-sdk/client-s3';

export type GlobalObject = {
  bundleId: () => string;
  db: PrismaClient;
  s3client: S3Client;
  bucketName: string;
};

export const globalObject = asyncLocalStorage<GlobalObject>();

export const getBundleId = () => globalObject.get('bundleId');
export const getDb = () => globalObject.get('db');
export const getS3Client = () => globalObject.get('s3client');
export const getBucketName = () => globalObject.get('bucketName');
