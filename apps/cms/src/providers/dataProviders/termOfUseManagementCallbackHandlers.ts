// import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

// import dayjs from 'dayjs';
// const termOfUseManagementCallbackHandlers = {
//   resource: 'term-of-uses',

//   afterGetOne: async (
//     response: GetOneResult,
//     dataProvider: DataProvider
//   ): Promise<GetOneResult> => {
//     const { content } = response.data;

//     const object = await dataProvider.getObject({ key: content });
//     response.data.content = object.data.body;

//     return response;
//   },
// };

// export default termOfUseManagementCallbackHandlers;

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
        termOfUseId: '3',
        memo: 'duong abc',
        version: '1',
        performanceTypeId: '2',
        dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
        dateRegistration: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
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
      termOfUseId: '3',
      memo: 'duong abc',
      version: '1',
      performanceTypeId: '2',
      dateStart: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
      dateRegistration: dayjs(new Date()).format('YYYY.MM.DD HH:mm'),
      fileConditionTerms: 'tearn-of-use.html',
    };

    return {
      data: fake,
    };
  },
};

export default termOfUseManagementCallbackHandlers;
