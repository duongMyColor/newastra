import { SignJWT, jwtVerify, JWK } from 'jose';
import type { JWTPayload } from 'jose';
import {
  AuthFailureError,
  InternalServerError,
  NotFoundError,
} from '../_core/error.response';

// service
import keyTokenService from '../_services/keyToken.service';
import { getServerCookieValue } from '@repo/utils/server_actions/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { CreateTokenPayload } from '@repo/types/auth';

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'x-rtoken-id',
};

const createTokenPair = async (
  payload: CreateTokenPayload | JWTPayload,
  publicKey: string,
  privateKey: string
) => {
  console.log({ payload, publicKey, privateKey });

  try {
    //access token
    const accessToken = await new SignJWT(payload as JWTPayload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(privateKey);

    const refreshToken = await new SignJWT(payload as JWTPayload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(privateKey);

    // verify
    await jwtVerify(accessToken, { type: publicKey });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new InternalServerError(error);
  }
};

const getUserIdFromCookies = (cookieStore: ReadonlyRequestCookies): number => {
  const userIdString = cookieStore.get(HEADER.CLIENT_ID)?.value;

  if (!userIdString)
    throw new AuthFailureError('Invalid request: missing client id');
  return Number(userIdString);
};

const getKeyStore = async (userId: number) => {
  const keyStore = await keyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError('Not found keyStore');
  return keyStore;
};

const verifyUser = async (userId: number, token: string, key: string) => {
  try {
    // Convert the key string to a CryptoKey
    const cryptoKey = await JWK.asKey(key, { alg: 'RS256', use: 'sig' });

    const decodeUser = (await jwtVerify(token, cryptoKey))
      .payload as JWTPayload;
    if (userId !== decodeUser.userId)
      throw new AuthFailureError('Invalid user');
    return decodeUser;
  } catch (error) {
    throw error;
  }
};

const authentication = async () => {
  const userIdString = getServerCookieValue(HEADER.CLIENT_ID);
  console.log('userIdString', userIdString);

  if (!userIdString)
    throw new AuthFailureError('Invalid request: missing client id');
  const userId = Number(userIdString);

  const keyStore = await keyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError('Not found keyStore');

  const refreshToken = getServerCookieValue(HEADER.REFRESHTOKEN);

  if (refreshToken) {
    const decodeUser = await verifyUser(
      userId,
      refreshToken,
      keyStore.privateKey as string
    );
    return {
      user: decodeUser,
      refreshToken,
    };
  }

  const accessToken = getServerCookieValue(HEADER.AUTHORIZATION);
  if (!accessToken)
    throw new AuthFailureError('Invalid request: missing authorization');
  const decodeUser = await verifyUser(
    userId,
    accessToken,
    keyStore.publicKey as string
  );

  return {
    user: decodeUser,
    refreshToken,
  };
};

export { createTokenPair, authentication, getUserIdFromCookies, getKeyStore };
