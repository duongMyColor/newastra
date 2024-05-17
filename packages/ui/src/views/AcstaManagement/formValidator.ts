import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { RecordValue } from '@repo/types/general';
import { validatePublicDateAcsta } from '@repo/utils/validatePublicDateAcsta';

const editionRules: ValidationRule[] = [
  {
    field: 'managementName',
    required: true,
  },
  {
    field: 'applicationId',
    required: true,
  },
  {
    field: 'acstaName',
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
    field: 'applicationId',
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

const validateAcstaCreation = (values: RecordValue): RecordValue => {
  console.log({ values });
  const baseValidation = validateForm(values, creationRules);
  const validatePublicDateEnd = validatePublicDateAcsta(values);
  const validationMessages = { ...baseValidation };

  console.log({ validatePublicDateEnd });
  if (!validatePublicDateEnd) {
    validationMessages.dateEnd =
      '終了時間は開始時間より大きくなければなりません';
  }
  return validationMessages;
};

const validateAcstaEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateAcstaCreation, validateAcstaEdition };
