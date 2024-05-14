import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'appName',
    required: true,
  },
  {
    field: 'termsOfUseID',
    required: true,
  },
  {
    field: 'licenseID',
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
    field: 'termsOfUseID',
    required: true,
  },
  {
    field: 'licenseID',
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

const validateUserCreation = (values: RecordValue): RecordValue => {
  return validateForm(values, creationRules);
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateUserCreation, validateUserEdition };
