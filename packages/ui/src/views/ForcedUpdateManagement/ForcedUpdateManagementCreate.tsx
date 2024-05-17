import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  useDataProvider,
  useCreate,
  useNotify,
  DateTimeInput,
  SelectInput,
} from 'react-admin';
import { TextField } from '@mui/material';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { OPERATE_SYSTEM, REDIRECT_ROUTE } from '@repo/consts/general';
import { useEffect, useState } from 'react';
import { convertToFormData } from '@repo/utils/formData';
import { useNavigate } from 'react-router-dom';
import { updateStatusAll } from '@repo/utils/updateStatus';
import { AplicationMasterResponseIF } from '@repo/types/applicationMaster';
import { OPERATE_IOS } from '@repo/consts/forceUpdate';
import { fetchUtils, withLifecycleCallbacks } from 'react-admin';

const ForcedUpdateManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const [create] = useCreate();
  const navigate = useNavigate();
  const dataProvider = useDataProvider();
  const [idLicense, setIdLicense] = useState<string>('');
  const [oldDate, setOldDate] = useState<Date>();
  const [idAppMaster, setIdAppMaster] = useState([]);

  const handleSave = async (values: RecordValue) => {
    try {
      console.log('have save ================', values);
      const formData = convertToFormData(values);

      const data = await create(resource, {
        data: formData,
      });

      // let dataGetOne = await dataProvider.getOne(
      //   'forced-update-managements',
      //   {
      //     id: parseInt(idLicense),
      //   }
      // );
      // console.log('dataa sau khi create', dataGetOne);

      // const {
      //   json: { metadata },
      // } = await fetchUtils.fetchJson(
      //   'http://localhost:3000/api/forced-update-managements/7'
      // );

      // console.log('data response', metadata);

      // let listAllStorage = JSON.parse(
      //   localStorage.getItem('listUpdateAll') || 'null'
      // );
      // dataGetOne.data['no'] = listAllStorage.length + 1;
      // dataGetOne.data['textOperate'] =
      //   dataGetOne.data['operateSystem'] === OPERATE_IOS ? 'iOS' : 'Android';

      // let newDataAfterStatus = updateStatusAll([...listAllStorage, data]);

      // console.log({ newDataAfterStatus });

      // localStorage.setItem('listUpdateAll', JSON.stringify(newDataAfterStatus));

      // console.log({ data });

      navigate(resourcePath);
      await notify('成功: ライセンスが正常に作成されました', {
        type: 'success',
      });
    } catch (error) {
      notify('エラー: ライセンスの作成に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  const fetchIdLastest = async () => {
    const listUpdateAllStorage = JSON.parse(
      localStorage.getItem('listUpdateAll') || 'null'
    );
    const response = await dataProvider.getIdLastestRecord(resource);
    let getAllAppMasterId = await dataProvider.getAll('application-masters');
    console.log({ getAllAppMasterId });
    setIdAppMaster(
      getAllAppMasterId.map(({ id, appName }: AplicationMasterResponseIF) => {
        return { id, name: `${id} : ${appName}` };
      })
    );

    const nextId = response.data.idLastest ? response.data.idLastest : 1;
    setIdLicense(`${nextId}`);

    if (response.data[0]) {
      const formatDate = new Date(response.data[0]?.publishedDate);
      setOldDate(formatDate);
    }

    if (!listUpdateAllStorage) {
      let getAllData = await dataProvider.getAll('forced-update-managements');

      getAllData = getAllData.map((value: RecordValue, idx: number) => {
        value['no'] = idx + 1;
        value['textOperate'] = value.operateSystem === '0' ? 'iOS' : 'Android';
        return value;
      });
      const newData = updateStatusAll(getAllData);

      localStorage.setItem('listUpdateAll', JSON.stringify(newData));
    }
  };

  useEffect(() => {
    fetchIdLastest();
  }, []);

  return (
    <Create
      redirect={REDIRECT_ROUTE.list}
      title="強制アップデート管理　新规作成"
    >
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextField
          id="filled-basic"
          label="強制アップデート ID"
          variant="filled"
          value={idLicense}
          disabled
        />
        <SelectInput
          source="appMasterId"
          choices={idAppMaster}
          fullWidth
          isRequired
          label="アプリケーションID"
        />
        <TextInput source="version" label="バージョン" isRequired fullWidth />
        <TextInput
          source="managementName"
          label="管理タイトル"
          isRequired
          fullWidth
        />
        <SelectInput
          source="operateSystem"
          choices={OPERATE_SYSTEM}
          fullWidth
          isRequired
          label="OS"
        />
        <DateTimeInput
          source="publishedDate"
          fullWidth
          label="公開開始日"
          defaultValue={oldDate}
          isRequired
        />
      </CustomForm>
    </Create>
  );
};

export default ForcedUpdateManagementCreate;
