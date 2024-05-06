import type { DataProvider, GetListResult, GetOneResult } from 'react-admin';

import dayjs from 'dayjs';
const termOfUseManagementCallbackHandlers = {
  resource: 'term-of-uses',

  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const { content } = response.data;

    const object = await dataProvider.getObject({ key: content });
    response.data.content = object.data.body;

    return response;
  },
};

export default termOfUseManagementCallbackHandlers;


