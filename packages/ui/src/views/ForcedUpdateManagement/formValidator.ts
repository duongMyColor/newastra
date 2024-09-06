import { userContentLength } from '@repo/consts/user';
import validateForm, { ValidationRule } from '@repo/utils/formValidator';
import { validatePassword } from '@repo/utils/password';
import { RecordValue } from '@repo/types/general';
import { validateVersion } from '@repo/utils/validateVersion';
import { validatePublishedDate } from '@repo/utils/validatePublishedDate';

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
    field: 'managementName',
    required: true,
  },
  {
    field: 'operateSystem',
    required: true,
  },
];

const creationRules: ValidationRule[] = [
  {
    field: 'appMasterId',
    required: true,
  },
  {
    field: 'version',
    required: true,
  },
  {
    field: 'publishedDate',
    required: true,
  },
  {
    field: 'managementName',
    required: true,
  },
  {
    field: 'operateSystem',
    required: true,
  },
];

const validateUserCreation = (values: RecordValue): RecordValue => {
  const baseValidation = validateForm(values, creationRules);
  const validateVersions = validateVersion(values);
  const validatePublishedDates = validatePublishedDate(values);

  console.log({ validateVersions, validatePublishedDates });

  const validationMessages = { ...baseValidation };

  if (!validateVersions) {
    validationMessages.version = validationMessages.version
      ? '必須'
      : '1.2.34のようにセマンティックバージョニング形式で設定してください';
  }

  if (!validatePublishedDates) {
    validationMessages.publishedDate =
      '公開開始日は現在以降にする必要があります';
  }

  return validationMessages;
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateUserCreation, validateUserEdition };
