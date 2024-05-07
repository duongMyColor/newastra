import { userContentLength } from '@repo/consts/user';
import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'role',
    required: true,
  },
  {
    field: 'name',
    required: true,
    minLength: userContentLength.name.min,
    maxLength: userContentLength.name.max,
  },
  {
    field: 'email',
    required: true,
    minLength: userContentLength.email.min,
    maxLength: userContentLength.email.max,
  },
  {
    field: 'newPassword',
    required: true,
    minLength: userContentLength.password.min,
    maxLength: userContentLength.password.max,
  },
  {
    field: 'confirmNewPassword',
    required: true,
    minLength: userContentLength.password.min,
    maxLength: userContentLength.password.max,
    match: 'password',
    unMatchMessage: 'Password does not match',
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'username',
    required: true,
    minLength: userContentLength.username.min,
    maxLength: userContentLength.username.max,
  },
  {
    field: 'role',
    required: true,
  },
  {
    field: 'name',
    required: true,
    minLength: userContentLength.name.min,
    maxLength: userContentLength.name.max,
  },
  {
    field: 'email',
    required: true,
    minLength: userContentLength.email.min,
    maxLength: userContentLength.email.max,
  },
  {
    field: 'password',
    required: true,
    minLength: userContentLength.password.min,
    maxLength: userContentLength.password.max,
  },
  {
    field: 'confirmPassword',
    required: true,
    minLength: userContentLength.password.min,
    maxLength: userContentLength.password.max,
    match: 'password',
    unMatchMessage: 'Password does not match',
  },
];

const validateUserCreation = (values: RecordValue): RecordValue => {
  const baseValidation = validateForm(values, creationRules);

  const validPassword = validatePassword(values.password);

  return validPassword
    ? baseValidation
    : {
        ...baseValidation,
        password:
          'パスワードには少なくとも 1 つの大文字、1 つの小文字、1 つの数字が含まれている必要があります',
      };
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  const baseValidation = validateForm(values, editionRules);

  const validPassword = validatePassword(values.newPassword);

  return validPassword
    ? baseValidation
    : {
        ...baseValidation,
        newPassword:
          'パスワードには少なくとも 1 つの大文字、1 つの小文字、1 つの数字が含まれている必要があります',
      };
};

export { validateUserCreation, validateUserEdition };
