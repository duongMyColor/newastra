import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';
const performanceManagementCallbackHandlers = {
  resource: 'performances',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = [
      {
        id: '1',
        name: 'duong',
        acstaID: '1',
        performanceTypeMasterID: '2',
        createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
        assetBundleIOS: 'acsta_anime_ios',
        assetBundleAndroid: 'acsta_anime_ios',
      },
    ];

    return {
      data: fake,
      total: 1,
    };
  },

  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    // const { classificationId } = response.data;

    let fake = {
      id: '1',
      name: 'duong',
      acstaID: '1',
      performanceTypeMasterID: '2',
      assetBundleIOS: 'acsta_anime_ios',
      assetBundleAndroid: 'acsta_anime_ios',
      createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
      assetDataIOS: { src: 'acsta_anime_ios' },
      assetDataAndroid: { src: 'acsta_anime_ios' },
    };

    return {
      data: fake,
    };
  },
};

export default performanceManagementCallbackHandlers;
