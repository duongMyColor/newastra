import { hashPassword } from '../utils/password';
import { Country, RoleSelectInput, UserIF } from '@repo/types/user';
import countries from '@repo/assets/json/countries.json';
import { ProductPostIF } from '@repo/types/product';
import { AnimalClassificationPostIF } from '@repo/types/animal';

const defaultUsers: UserIF[] = [
  {
    username: 'superadmin',
    name: 'superadmin',
    email: 'superadmin@mycolor.com',
    role: 'ADMIN',
    password: hashPassword('superadmin@12345'),
    country: 'US',
    address: '123 Main St',
    enabled: true,
  },
  {
    username: 'trungpham',
    name: 'Trung Pham',
    email: 'trungpham@mycolor.com',
    role: 'USER',
    password: hashPassword('trungpham@12345'),
    country: 'VN',
    address: 'Nam Tu Liem, Ha Noi',
    enabled: true,
  },
];

const defaultProducts: ProductPostIF[] = [
  {
    name: 'Product1',
  },
  {
    name: 'Product2',
  },
  {
    name: 'Product3',
  },
  {
    name: 'Product4',
  },
  {
    name: 'Product5',
  },
];

const defaultAnimalClass: AnimalClassificationPostIF[] = [
  {
    name: 'Mammal',
  },
  {
    name: 'Bird',
  },
  {
    name: 'Fish',
  },
  {
    name: 'Reptiles',
  },
  {
    name: 'Amphibians',
  },
  {
    name: 'Insects',
  },
  {
    name: 'Crustaceans',
  },
];

const countryList: Country[] = countries;

const userRoles: RoleSelectInput[] = [
  { id: 'ADMIN', name: 'ADMIN' },
  { id: 'USER', name: 'USER' },
  { id: 'VIEW', name: 'VIEW' },
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
  defaultProducts,
  defaultAnimalClass,
};
