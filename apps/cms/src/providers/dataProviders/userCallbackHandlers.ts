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
const userCallbackHandler = {
  resource: 'users',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    // const { classificationId } = response.data;

    let fake = {
      id: '1',
      username: 'duong',
      date: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      role: 'GENERAL',
      email: 'susdoidfjsd@gmail.com',
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

      username: 'duong',
      date: dayjs(new Date()).format('YYYY.MM.DD HH:MM'),
      role: 'GENERAL',
      email: 'susdoidfjsd@gmail.com',
    };

    return {
      data: fake,
    };
  },
};

export default userCallbackHandler;
