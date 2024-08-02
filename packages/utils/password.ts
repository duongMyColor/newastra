import { sha256 } from 'js-sha256';

export const hashPassword = (password: string) => {
  return sha256(password);
};

export const validatePassword = (password: string): boolean => {
  if (!password) return true;

  if (
    password.replace(' ', '').length < 8 ||
    password.replace(' ', '').length > 20
  )
    return true;

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};
