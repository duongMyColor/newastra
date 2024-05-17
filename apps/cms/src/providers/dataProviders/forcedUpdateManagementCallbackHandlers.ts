import type {
  CreateResult,
  DataProvider,
  GetListResult,
  GetOneResult,
} from 'react-admin';

import { RecordValue } from '@repo/types/general';
import { updateStatusAll } from '@repo/utils/updateStatus';
import { OPERATE_IOS } from '@repo/consts/forceUpdate';

const forcedUpdateManagementCallbackHandlers = {
  resource: 'forced-update-managements',

  afterGetList: async (
    response: GetListResult,
    dataProvider: DataProvider
  ): Promise<GetListResult> => {
    const listUpdateAllStorage = JSON.parse(
      localStorage.getItem('listUpdateAll') || 'null'
    );

    let listParams = JSON.parse(
      localStorage.getItem('RaStore.forced-update-managements.listParams') ||
        'null'
    );
    let newData;

    if (!listUpdateAllStorage || !listParams) {
      localStorage.setItem(
        'RaStore.forced-update-managements.listParams',
        JSON.stringify({
          filter: {},
          order: 'ASC',
          page: 1,
          perPage: 5,
          sort: 'id',
        })
      );

      let getAllData = await dataProvider.getAll('forced-update-managements');
      getAllData = getAllData.map((value: RecordValue, idx: number) => {
        value['no'] = idx + 1;
        value['textOperate'] = value.operateSystem === '0' ? 'iOS' : 'Android';
        return value;
      });

      newData = updateStatusAll(getAllData);

      localStorage.setItem('listUpdateAll', JSON.stringify(newData));

      response.data = newData.slice(0, 5);
    } else {
      newData = listUpdateAllStorage;

      response.data = await newData.slice(
        (listParams.page - 1) * listParams.perPage,
        (listParams.page - 1) * listParams.perPage + listParams.perPage
      );
    }

    return response;
  },

  afterGetOne: async (
    response: GetOneResult,
    dataProvider: DataProvider
  ): Promise<GetOneResult> => {
    const data = response.data;

    let listAllStorage = JSON.parse(
      localStorage.getItem('listUpdateAll') || 'null'
    );

    if (!listAllStorage) {
      const getAllData = await dataProvider.getAll('forced-update-managements');

      const newData = updateStatusAll(
        getAllData.map((value: RecordValue, idx: number) => ({
          ...value,
          no: idx + 1,
          textOperate: value.operateSystem === OPERATE_IOS ? 'iOS' : 'Android',
        }))
      );

      localStorage.setItem('listUpdateAll', JSON.stringify(newData));
      listAllStorage = newData;
    }

    const matchedItem = listAllStorage.find(
      (item: RecordValue) => item.id === data.id
    );
    if (matchedItem) {
      data.status = matchedItem.status;
      data['textOperate'] =
        matchedItem.operateSystem === OPERATE_IOS ? 'iOS' : 'Android';
      data['appMasterIdAndName'] =
        `${data.aplicationMaster.id} : ${data.aplicationMaster.appName}`;
    }

    return { data };
  },

  afterCreate: async (
    response: CreateResult,
    dataProvider: DataProvider
  ): Promise<CreateResult> => {
    console.log('response data:', response);

    let data = response.data;

    console.log("data creat:",data);

    let listAllStorage = JSON.parse(
      localStorage.getItem('listUpdateAll') || 'null'
    );
    data['no'] = listAllStorage.length + 1;
    data['textOperate'] = data['operateSystem'] === OPERATE_IOS ? 'iOS' : 'Android';

    let newDataAfterStatus = updateStatusAll([...listAllStorage, data]);

    localStorage.setItem('listUpdateAll', JSON.stringify(newDataAfterStatus));

    return response;
  },
};

export default forcedUpdateManagementCallbackHandlers;
