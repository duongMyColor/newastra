import { sha256 } from 'js-sha256';

export const hashPassword = (password: string) => {
  return sha256(password);
};

export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};
