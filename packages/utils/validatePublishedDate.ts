import { ForcedUpdateManagementResponseIF } from '@repo/types/forceUpdateManagement';
import { RecordValue } from '@repo/types/general';
import dayjs from 'dayjs';

export const validatePublishedDate = (values: RecordValue): boolean => {
  const listUpdateAllStorage = JSON.parse(
    localStorage.getItem('listUpdateAll') || 'null'
  );

  let publicDateEnd = listUpdateAllStorage
    .filter(
      (value: ForcedUpdateManagementResponseIF) =>
        value?.operateSystem === values?.operateSystem
    )
    .sort(
      (
        a: ForcedUpdateManagementResponseIF,
        b: ForcedUpdateManagementResponseIF
      ) => dayjs(b.publishedDate).valueOf() - dayjs(a.publishedDate).valueOf()
    )[0]?.publishedDate;

  if (!publicDateEnd) return true;
  if (
    dayjs(publicDateEnd).valueOf() >= new Date(values?.publishedDate).getTime()
  )
    return false;

  return true;
};
