import {
  TextInput,
  Create,
  SelectInput,
  FileField,
  useCreate,
  useNotify,
  ImageInput,
  ImageField,
  DateTimeInput,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';
import { AplicationMasterResponseIF } from '@repo/types/applicationMaster';
import { convertToFormData } from '@repo/utils/formData';

const AcstaManagementCreate = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const navigate = useNavigate();
  const notify = useNotify();

  const [idAcsta, setIdAcsta] = useState<string>('');
  const [appIdIDs, setAppIdIDs] = useState([]);

  const handleSave = async (values: RecordValue) => {
    try {
      const formData = convertToFormData(values, [
        'thumbnailUrl',
        'scanImageUrl',
      ]);

      await dataProvider.create(resource, {
        data: formData,
      });

      navigate(resourcePath);
      notify('成功: アクスタ管理が正常に作成されました。', { type: 'success' });
    } catch (error) {
      notify('エラー: アクスタ管理の作成に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    const fetchIdLastest = async () => {
      const response = await dataProvider.getIdLastest(resource);
      const nextId = response.data.length > 0 ? response.data[0].id + 1 : 1;
      setIdAcsta(`${nextId}`);
    };

    const fetchApplicationMaster = async () => {
      const appLicationMasters = await dataProvider.getAll(
        'application-masters'
      );
      setAppIdIDs(
        appLicationMasters.map(
          ({ id, appName }: AplicationMasterResponseIF) => {
            return { id, name: `${id} : ${appName}` };
          }
        )
      );
    };

    Promise.allSettled([fetchIdLastest(), fetchApplicationMaster()]);
  }, []);

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="アクスタ管理　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextField
          id="filled-basic"
          label="利用規約ID"
          variant="filled"
          value={idAcsta}
          disabled
        />
        <TextInput
          source="managementName"
          label="管理名"
          fullWidth
          isRequired
        />
        <TextInput source="acstaName" label="アクスタ名" fullWidth isRequired />
        <SelectInput
          source="applicationID"
          choices={appIdIDs}
          fullWidth
          isRequired
          label="アプリケーション ID"
        />

        <ImageInput
          source="thumbnailUrl"
          label="アクスタサムネイル"
          placeholder="アップロード"
          isRequired
          fullWidth
          accept={'image/*'}
        >
          <Box
            sx={{
              display: 'flex',
              width: '700px',
              margin: '0 10%',
            }}
          >
            <FileField
              source="src"
              title="title"
              sx={{
                width: '30%',
              }}
            />
            <ImageField source="src" title="title" />
          </Box>
        </ImageInput>

        <ImageInput
          source="scanImageUrl"
          label="スキャン用データ"
          placeholder="アップロード"
          isRequired
          fullWidth
          accept={'image/*'}
        >
          <Box
            sx={{
              display: 'flex',
              width: '700px',
              margin: '0 10%',
            }}
          >
            <FileField source="src" title="title" sx={{ width: '30%' }} />
            <ImageField source="src" title="title" />
          </Box>
        </ImageInput>

        <DateTimeInput source="dateStart" label="公開開始日" required />
        <DateTimeInput source="dateEnd" label="公開終了日" />
        {/* <TextInput
          source="acstaBasicInfoID"
          label="力士基本情報ID"
          fullWidth
          disabled
        /> */}
      </CustomForm>
    </Create>
  );
};

export default AcstaManagementCreate;
