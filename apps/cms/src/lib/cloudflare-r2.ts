import { getRequestContext } from '@cloudflare/next-on-pages';

interface Env extends CloudflareEnv {
  BUCKET: R2Bucket;
}

const env = getRequestContext().env as Env;

export const putObject = async (key: string, body: any) => {
  await env.BUCKET.put(key, body);
  return key;
};

export const getObject = async (key: string) => {
  const object = await env.BUCKET.get(key);

  return object;
};
