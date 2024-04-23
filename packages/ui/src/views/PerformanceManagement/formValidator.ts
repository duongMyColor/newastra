import { RecordValue } from '@repo/types/general';
import validateForm, { ValidationRule } from '@repo/utils/formValidator';

// const editRules: ValidationRule[] = [];

const createRules: ValidationRule[] = [
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'iosFiles',
    required: true,
  },
  {
    field: 'androidFiles',
    required: true,
  },
];

const validateCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, createRules);
};

// const validateEdition = (values: RecordValue): RecordValue => {
//   return validateForm(values, editRules);
// };

export {
  validateCreation,
  // validateEdition
};
