import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';
const PerformanceTypeMasterCallbackHandler = {
  resource: 'performance-type-masters',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = [
      {
        id: '1',
        performanceTypeName: 'duong',
        date: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
        performanceTypeID: '1',
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
      performanceTypeName: 'duong',
      date: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      performanceTypeID: '1',
    };

    return {
      data: fake,
    };
  },
};

export default PerformanceTypeMasterCallbackHandler;
