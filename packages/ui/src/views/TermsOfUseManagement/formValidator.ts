import { userContentLength } from '@repo/consts/user';
import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'version',
    required: true,
  },
  {
    field: 'publishedDate',
    required: true,
  },
  {
    field: 'content',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'version',
    required: true,
  },
  {
    field: 'publishedDate',
    required: true,
  },
  {
    field: 'content',
    required: true,
  },
];

const validateUserCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, creationRules);
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateUserCreation, validateUserEdition };
