import JWT from 'jsonwebtoken';

export const verifyJWT = (token: string, keySecret: string) => {
  return JWT.verify(token, keySecret);
};
