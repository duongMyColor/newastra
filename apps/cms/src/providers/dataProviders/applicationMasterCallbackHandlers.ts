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
import { extractFilename } from '@repo/utils/fileUtils';
const applicationMasterCallbackHandler = {
  resource: 'application-masters',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    return response;
  },
  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const data = response.data;
    data['assetDataAndroid'] = {
      src: extractFilename(data.assetBundleAndroid),
      title: extractFilename(data.assetBundleAndroid),
    };
    data['assetDataIOS'] = {
      src: extractFilename(data.assetBundleIOS),
      title: extractFilename(data.assetBundleIOS),
    };

    data['assetDataOutlineUrl'] = {
      src: extractFilename(data.outlineUrl),
      title: extractFilename(data.outlineUrl),
    };

    return response;
  },
};

export default applicationMasterCallbackHandler;
