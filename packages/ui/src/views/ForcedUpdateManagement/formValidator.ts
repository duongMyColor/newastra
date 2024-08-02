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
    validationMessages.version =
      '数字と「.」を含む最大 8 文字、数字は「.」で区切られた最大 2 桁で、以前のバージョンよりも大きくなります';
  }

  if (!validatePublishedDates) {
    validationMessages.publishedDate = '発売開始日が前日より早い';
  }

  return validationMessages;
};

const validateUserEdition = (values: RecordValue): RecordValue => {
  return validateForm(values, editionRules);
};

export { validateUserCreation, validateUserEdition };
