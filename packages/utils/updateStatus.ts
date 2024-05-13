import { ForcedUpdateManagementResponseIF } from '@repo/types/forceUpdateManagement';
import {
  OPERATE_IOS,
  OPERATE_ANDROID,
  STATUS_DEACTIVE,
  STATUS_ACTIVE,
} from '@repo/consts/forceUpdate';
import dayjs from 'dayjs';

function secondsToMilliseconds(date: string) {
  return dayjs(date).valueOf();
}

const updateStatus = (data: any[]) => {
  let currentTime = new Date().toISOString();
  for (let i = 0; i < data.length; i++) {
    if (
      secondsToMilliseconds(currentTime) >=
      secondsToMilliseconds(data[i].publishedDate)
    ) {
      data[i]['status'] = STATUS_ACTIVE;
      break;
    }
  }
};

function sortAndFilterData(
  data: ForcedUpdateManagementResponseIF[],
  operateSystem: string
) {
  return data
    .filter((value) => value.operateSystem === operateSystem)
    .sort(
      (a, b) =>
        secondsToMilliseconds(b.publishedDate) -
        secondsToMilliseconds(a.publishedDate)
    );
}
export const updateStatusAll = (data: ForcedUpdateManagementResponseIF[]) => {
  /**
   * b1: sorted according to the public time of each ios and android
   * b2: find the location in the range time<=current_time< time, update the status of each OS
   * b3: join again and sort by no
   */

  data.forEach((value) => (value.status = STATUS_DEACTIVE));
  const IOS = sortAndFilterData(data, OPERATE_IOS);
  const android = sortAndFilterData(data, OPERATE_ANDROID);
  updateStatus(IOS);
  updateStatus(android);

  data = [...IOS, ...android].sort(
    (
      a: ForcedUpdateManagementResponseIF,
      b: ForcedUpdateManagementResponseIF
    ) => a.no - b.no
  );

  return data;
};
