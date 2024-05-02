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
    field: 'username',
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
    required: false,
    minLength: userContentLength.newPassword.min,
    maxLength: userContentLength.newPassword.max,
  },
  {
    field: 'confirmNewPassword',
    required: false,
    minLength: userContentLength.newPassword.min,
    maxLength: userContentLength.newPassword.max,
    match: 'newPassword',
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
          'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      };
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  console.log('edit validate', values);
  const baseValidation = validateForm(values, editionRules);

  console.log({ baseValidation });

  const validPassword =
    values.newPassword && values.confirmNewPassword
      ? validatePassword(values.newPassword)
      : true;

  return validPassword
    ? baseValidation
    : {
        ...baseValidation,
        newPassword:
          'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      };
};

export { validateUserCreation, validateUserEdition };
