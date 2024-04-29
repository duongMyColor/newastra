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
const AxtaManagementCallbackHandler = {
  resource: 'axta-managements',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = [
      {
        id: '1',
        managementName: 'duong',
        acstaName: 'axta',
        acstaId: '1',
        status: 'active',
        dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
        dateEnd: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
        dataRegistration: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
        assetBundleIOS: 'acsta_anime_ios',
        assetBundleAndroid: 'acsta_anime_ios',
        outlineUrl: 'acstar-waku.png',
        assetDataIOS: { src: 'acsta_anime_ios' },
        assetDataAndroid: { src: 'acsta_anime_ios' },
        assetOutlineUrl: { src: 'acstar-waku.png' },
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
      acstaName: 'axta',
      acstaId: '1',
      status: 'active',
      acstaThumbnail: 'acstar-waku.png',
      scanData: '/sumo.png',
      dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      dateEnd: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      dataRegistration: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      assetScanData: { src: 'acsta_anime_ios' },
      assetAcstaThumbnail: { src: 'acsta_anime_ios' },
    };

    return {
      data: fake,
    };
  },
};

export default AxtaManagementCallbackHandler;
