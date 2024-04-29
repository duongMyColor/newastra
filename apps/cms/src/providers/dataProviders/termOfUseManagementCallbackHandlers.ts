import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';
const termOfUseManagementCallbackHandlers = {
  resource: 'term-of-uses',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = [
      {
        id: '1',
        memo: 'duong abc',
        version: '1',
        dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
        createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
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
      memo: 'duong abc',
      version: '1',
      publishedDate: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
      createdAt: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
    };

    return {
      data: fake,
    };
  },
};

export default termOfUseManagementCallbackHandlers;
