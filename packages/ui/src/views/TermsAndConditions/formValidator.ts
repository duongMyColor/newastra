import { RecordValue } from '@repo/types/general';
import validateForm, { ValidationRule } from '@repo/utils/formValidator';

const editRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'version',
    required: true,
  },
  {
    field: 'memo',
    required: true,
  },
];

const createRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'files',
    required: true,
  },
  {
    field: 'version',
    required: true,
  },
  {
    field: 'memo',
    required: true,
  },
];

const validateTermsAnsConditionsCreation = (
  values: RecordValue
): RecordValue => {
  return validateForm(values, createRules);
};

const validateTermsAnsConditionsEdition = (
  values: RecordValue
): RecordValue => {
  return validateForm(values, editRules);
};

export {
  validateTermsAnsConditionsCreation,
  validateTermsAnsConditionsEdition,
};
