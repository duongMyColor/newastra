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
const applicationMasterCallbackHandler = {
  resource: 'application-masters',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = {
      id: '1',
      appName: 'duong',
      createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      appId: 'USER',
      packageName: 'com.example.myapp',
    };

    return {
      data: [fake],
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
      appName: 'duong',
      createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      packageName: 'com.example.myapp',
      termsOfUseID: 'USER',
      licenseID: 'USER',
      assetBundleIOS: 'acsta_anime_ios',
      assetBundleAndroid: 'acsta_anime_ios',
      outlineUrl: 'acsta-waku.png',
      assetDataIOS: { src: 'acsta_anime_ios' },
      assetDataAndroid: { src: 'acsta_anime_ios' },
      assetOutlineUrl: { src: 'acsta-waku.png' },
    };

    return {
      data: fake,
    };
  },
};

export default applicationMasterCallbackHandler;
