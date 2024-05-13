import { ForcedUpdateManagementResponseIF } from '@repo/types/forceUpdateManagement';
import { RecordValue } from '@repo/types/general';
import dayjs from 'dayjs';

export const validateVersion = (values: RecordValue): boolean => {
  const regex = /^(?:\d{1,2}\.\d{1,2}\.\d{1,2}|\d{1,2}\.\d{1,2}|\d{1,2})$/;

  if (!regex.test(values?.version)) return false;

  const listUpdateAllStorage = JSON.parse(
    localStorage.getItem('listUpdateAll') || 'null'
  );

  let versionEnd = listUpdateAllStorage
    .filter(
      (value: ForcedUpdateManagementResponseIF) =>
        value?.operateSystem === values?.operateSystem
    )
    .sort(
      (
        a: ForcedUpdateManagementResponseIF,
        b: ForcedUpdateManagementResponseIF
      ) => dayjs(b.publishedDate).valueOf() - dayjs(a.publishedDate).valueOf()
    )[0]
    ?.version.split('.');
  let versionNext = values?.version.split('.');

  let maxLength =
    versionNext?.length >= versionEnd?.length
      ? versionNext?.length
      : versionEnd?.length;

  for (let i = 0; i < maxLength; i++) {
    const nextValue = parseInt(versionNext[i]) || 0;
    const endValue = parseInt(versionEnd[i]) || 0;

    if (nextValue > endValue) {
      return true;
    } else if (nextValue < endValue) {
      return false;
    }
  }

  return false;
};
