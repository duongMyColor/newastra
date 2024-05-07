import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';

const editionRules: ValidationRule[] = [
  {
    field: 'id',
    required: true,
  },
  {
    field: 'name',
    required: true,
  },
  {
    field: 'performanceTypeMasterID',
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
    field: 'acstaID',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'managementName',
    required: true,
  },
  {
    field: 'name',
    required: true,
  },
  {
    field: 'performanceTypeMasterID',
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
    field: 'acstaID',
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
