import { hashPassword } from '../utils/password';
import { Country, RoleSelectInput, UserIF } from '@repo/types/user';
import countries from '@repo/assets/json/countries.json';

const defaultUsers: UserIF[] = [
  {
    username: 'SuperAdmin',
    email: 'superadmin@mycolor.com',
    role: 'ADMIN',
    password: hashPassword('Superadmin@12345'),
    enabled: true,
  },
];

console.log(hashPassword('Superadmin@12345'));

const defaultRoles = [
  {
    id: 'ADMIN',
  },
  {
    id: 'GENERAL',
  },
  {
    id: 'READ_ONLY',
  },
];

const countryList: Country[] = countries;

const userRoles: RoleSelectInput[] = [
  { id: 'ADMIN', name: 'ADMIN' },
  { id: 'GENERAL', name: 'GENERAL' },
  { id: 'READ_ONLY', name: 'READ_ONLY' },
];

const userContentLength = {
  username: {
    min: 8,
    max: 16,
  },
  name: {
    min: 2,
    max: 50,
  },
  email: {
    min: 10,
    max: 40,
  },
  password: {
    min: 8,
    max: 20,
  },
};

export {
  defaultUsers,
  countryList,
  userRoles,
  userContentLength,
  defaultRoles,
};
