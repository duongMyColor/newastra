import JWT from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
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
  payload: CreateTokenPayload,
  publicKey: string,
  privateKey: string
) => {
  try {
    //access token
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '1 days',
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '1 days',
    });

    // verify
    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) console.error(`error verify ::`, err);
    });
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

const verifyUser = (userId: number, token: string, key: string) => {
  try {
    const decodeUser = JWT.verify(token, key) as JwtPayload;
    if (userId !== decodeUser.userId)
      throw new AuthFailureError('Invalid user');
    return decodeUser;
  } catch (error) {
    throw error;
  }
};

const authentication = async () => {
  /*
		1 - Check userId missing ???
		2 - get accessToken
		3 - verify token
		4 - check user in dbs?
		5 - check keyStore with this userId?
		6 - OK all -> return res
	*/
  const userIdString = getServerCookieValue(HEADER.CLIENT_ID);
  if (!userIdString)
    throw new AuthFailureError('Invalid request: missing client id');
  const userId = Number(userIdString);

  const keyStore = await keyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError('Not found keyStore');

  const refreshToken = getServerCookieValue(HEADER.REFRESHTOKEN);

  if (refreshToken) {
    const decodeUser = verifyUser(
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
  const decodeUser = verifyUser(
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
