import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'managementName',
    required: true,
  },
  {
    field: 'acstaName',
    required: true,
  },
  {
    field: 'thumbnailUrl',
    required: true,
  },
  {
    field: 'scanImageUrl',
    required: true,
  },
  {
    field: 'dateStart',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'managementName',
    required: true,
  },
  {
    field: 'acstaName',
    required: true,
  },
  {
    field: 'thumbnailUrl',
    required: true,
  },
  {
    field: 'scanImageUrl',
    required: true,
  },
  {
    field: 'dateStart',
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
