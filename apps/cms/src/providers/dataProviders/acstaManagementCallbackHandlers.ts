import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';
import { extractFilename, generateFileName } from '@repo/utils/fileUtils';

const determineStatus = (dateStart: Date | string, dateEnd: Date | string) => {
  const currentDate = dayjs();
  return currentDate.isBefore(dateStart) || currentDate.isAfter(dateEnd)
    ? '非アクティブ'
    : 'アクティブ';
};

const AcstaManagementCallbackHandler = {
  resource: 'acstas',

  afterGetList: async (response: GetListResult): Promise<GetListResult> => {
    response.data.forEach((item) => {
      item.status = determineStatus(item.dateStart, item.dateEnd);
    });

    return response;
  },

  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const { dateStart, dateEnd, thumbnailUrl, scanImageUrl } = response.data;

    response.data.status = determineStatus(dateStart, dateEnd);

    const [thumbnailUrlObj, scanImageUrlObj] = await Promise.all([
      dataProvider.getObject({ key: thumbnailUrl }, 'image'),
      dataProvider.getObject({ key: scanImageUrl }, 'image'),
    ]);

    response.data.scanImageUrl = {
      src: scanImageUrlObj.data.body,
      title: extractFilename(scanImageUrl),
    };
    response.data.thumbnailUrl = {
      src: thumbnailUrlObj.data.body,
      title: extractFilename(thumbnailUrl),
    };

    return response;
  },
};

export default AcstaManagementCallbackHandler;
