import { getRequestContext } from '@cloudflare/next-on-pages';
import { MultipartUploadBody } from '@repo/types/upload';

interface Env extends CloudflareEnv {
  BUCKET: R2Bucket;
}

const env = getRequestContext().env as Env;
const BUCKET = env.BUCKET;

export const putObject = async (key: string, body: any) => {
  await BUCKET.put(key, body);
  return key;
};

export const getObject = async (key: string) => {
  const object = await BUCKET.get(key);

  return object;
};

export const createMultipartUpload = async (key: string) => {
  const multipartUpload = await BUCKET.createMultipartUpload(key);

  return {
    key: multipartUpload.key,
    uploadId: multipartUpload.uploadId,
  };
};

export const resumeMultipartUpload = async ({
  key,
  uploadId,
}: MultipartUploadBody) => {
  return BUCKET.resumeMultipartUpload(key, uploadId);
};

export const deleteObject = async (key: string) => {
  return BUCKET.delete(key);
};
