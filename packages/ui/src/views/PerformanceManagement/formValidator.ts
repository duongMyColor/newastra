import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';
import { validateTypeFile } from '@repo/utils/validateTypeFile';

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
    field: 'performanceTypeMasterId',
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
    field: 'acstaId',
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
    field: 'performanceTypeMasterId',
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
    field: 'acstaId',
    required: true,
  },
];

const validateCreation = async(values: RecordValue) => {
    console.log({ values });
  const baseValidation = validateForm(values, creationRules);

  const validateFileIOS = await validateTypeFile(values.assetBundleIOS?.rawFile?.path)
  const validateFileAndroid = await validateTypeFile(values.assetBundleAndroid?.rawFile?.path)

  
  const validationMessages = { ...baseValidation };

  
  if (validateFileIOS === false) {
    validationMessages.assetBundleIOS =
      'ファイルの種類が正しくありません';
  }

  if (validateFileAndroid === false) {
    validationMessages.assetBundleAndroid = 'ファイルの種類が正しくありません';
  }
  
  return validationMessages;
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateCreation, validateUserEdition };
