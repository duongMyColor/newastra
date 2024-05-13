import { ForcedUpdateManagementResponseIF } from '@repo/types/forceUpdateManagement';
import { RecordValue } from '@repo/types/general';
import dayjs from 'dayjs';

const getVersionEnd = (
  listUpdateAllStorage: ForcedUpdateManagementResponseIF[],
  values: RecordValue
): string[] | undefined => {
  console.log({ listUpdateAllStorage });
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

  return versionEnd;
};

export const validateVersion = (values: RecordValue): boolean => {
  const regex = /^(?:\d{1,2}\.\d{1,2}\.\d{1,2}|\d{1,2}\.\d{1,2}|\d{1,2})$/;

  if (!regex.test(values?.version)) return false;

  const listUpdateAllStorage = JSON.parse(
    localStorage.getItem('listUpdateAll') || 'null'
  );

  let versionEnd = getVersionEnd(listUpdateAllStorage, values);
  if (versionEnd === undefined) {
    versionEnd = [];
  }

  let versionNext = values?.version.split('.');

  let maxLength =
    versionNext?.length >= versionEnd?.length
      ? versionNext?.length
      : versionEnd?.length;

  for (let i = 0; i < maxLength; i++) {
    const nextValue = parseInt(versionNext[i]) || 0;
    const endValue = parseInt(versionEnd[i] as string) || 0;

    if (nextValue > endValue) {
      return true;
    } else if (nextValue < endValue) {
      return false;
    }
  }

  return false;
};
