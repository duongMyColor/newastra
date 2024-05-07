import type {
  CreateResult,
  DataProvider,
  DeleteResult,
  GetListResult,
  GetManyReferenceResult,
  GetOneResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';

import dayjs from 'dayjs';
const AcstaManagementCallbackHandler = {
  resource: 'acstas',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = [
      {
        id: '1',
        managementName: 'duong',
        acstaName: 'acsta',
        status: 'active',
        dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
        dateEnd: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
        createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
        assetBundleIOS: 'acsta_anime_ios',
        assetBundleAndroid: 'acsta_anime_ios',
        outlineUrl: 'acsta-waku.png',
        assetDataIOS: { src: 'acsta_anime_ios' },
        assetDataAndroid: { src: 'acsta_anime_ios' },
        assetOutlineUrl: { src: 'acsta-waku.png' },
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
      appId: 'USER',
      managementName: 'duong',
      SumoId: 'USER',
      acstaName: 'acsta',
      status: 'active',
      acstaThumbnail: 'acsta-waku.png',
      acstaImage: '/sumo.png',
      dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      dateEnd: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      assetScanData: { src: 'acsta_anime_ios' },
      assetAcstaThumbnail: { src: 'acsta_anime_ios' },
    };

    return {
      data: fake,
    };
  },
};

export default AcstaManagementCallbackHandler;
