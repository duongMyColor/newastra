import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';
const licenseManagementCallbackHandlers = {
  resource: 'license-managements',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = [
      {
        id: '1',
        licenseId: '4',
        termOfUseId: '2',
        memo: 'duong abc',
        version: '1',
        performanceTypeMasterID: '2',
        dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
        createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
        fileConditionTerms: 'tearn-of-use.html',
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
      licenseId: '3',
      termOfUseId: '4',
      memo: 'duong abc',
      version: '1',
      performanceTypeMasterID: '2',
      dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
      createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
      fileConditionTerms: 'tearn-of-use.html',
    };

    return {
      data: fake,
    };
  },
};

export default licenseManagementCallbackHandlers;
