import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'appName',
    required: true,
  },
  {
    field: 'termsOfUseId',
    required: true,
  },
  {
    field: 'licenseId',
    required: true,
  },
  {
    field: 'packageName',
    required: true,
  },
  {
    field: 'assetDataIOS',
    required: true,
  },
  {
    field: 'assetDataAndroid',
    required: true,
  },
  {
    field: 'assetDataOutlineUrl',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'appName',
    required: true,
  },
  {
    field: 'termsOfUseId',
    required: true,
  },
  {
    field: 'licenseId',
    required: true,
  },
  {
    field: 'packageName',
    required: true,
  },
  {
    field: 'assetBundleIOS',
    required: true,
  },
  {
    field: 'assetBundleAndroid',
    required: true,
  },
  {
    field: 'outlineUrl',
    required: true,
  },
];

const validateCreation = async (values: RecordValue) => {
  console.log({ values });
  const baseValidation = validateForm(values, creationRules);
  const validationMessages = { ...baseValidation };
  return validationMessages;
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateCreation, validateUserEdition };
