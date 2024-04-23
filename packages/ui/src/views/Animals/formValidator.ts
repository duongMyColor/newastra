import validateForm, { ValidationRule } from '@repo/utils/formValidator';

const editRules: ValidationRule[] = [
  {
    field: 'classificationId',
    required: true,
  },
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 100,
  },

  {
    field: 'continent',
    required: true,
  },
];

const createRules: ValidationRule[] = [
  {
    field: 'classificationId',
    required: true,
  },
  {
    field: 'name',
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  {
    field: 'pictures',
    required: true,
  },
  {
    field: 'continent',
    required: true,
  },
];

const validateAnimalCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, createRules);
};

const validateAnimalEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editRules);
};

export { validateAnimalCreation, validateAnimalEdition };
