import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';

const determineStatus = (dateEnd: Date | string) => {
  const currentDate = dayjs();
  return currentDate.isAfter(dateEnd) ? '非アクティブ' : 'アクティブ';
};

const AcstaManagementCallbackHandler = {
  resource: 'acstas',

  afterGetList: async (response: GetListResult): Promise<GetListResult> => {
    response.data.forEach((item) => {
      item.status = determineStatus(item.dateEnd);
    });

    return response;
  },

  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const { dateEnd, thumbnailUrl, scanImageUrl } = response.data;

    response.data.status = determineStatus(dateEnd);

    const [thumbnailUrlObj, scanImageUrlObj] = await Promise.all([
      dataProvider.getObject({ key: thumbnailUrl }, 'image'),
      dataProvider.getObject({ key: scanImageUrl }, 'image'),
    ]);

    response.data.scanImageUrl = scanImageUrlObj.data.body;
    response.data.thumbnailUrl = thumbnailUrlObj.data.body;

    return response;
  },
};

export default AcstaManagementCallbackHandler;
