import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  FileInput,
  FileField,
  useDataProvider,
  useCreate,
  useNotify,
  DateTimeInput,
} from 'react-admin';
import { TextField } from '@mui/material';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';
import { useEffect, useState } from 'react';
import { convertToFormData } from '@repo/utils/formData';
import { useNavigate } from 'react-router-dom';

const LicenseManagementCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const [create] = useCreate();
  const navigate = useNavigate();
  const dataProvider = useDataProvider();
  const [idLicense, setIdLicense] = useState<string>('');
  const [oldDate, setOldDate] = useState<Date>();

  const handleSave = async (values: RecordValue) => {
    try {
      const formData = convertToFormData(values, ['content']);

      await create('licenses', {
        data: formData,
      });

      navigate(resourcePath);
      notify('Success: Create Term of use successffuly', { type: 'success' });
    } catch (error) {
      notify('Error: Create Term of use failed: ' + error, { type: 'warning' });
    }
  };

  const fetchIdLastest = async () => {
    const response = await dataProvider.getIdLastest(resource);
    const nextId = response.data.length > 0 ? response.data[0].id + 1 : 1;
    setIdLicense(`${nextId}`);

    if (response.data[0]) {
      const formatDate = new Date(response.data[0]?.publishedDate);
      setOldDate(formatDate);
    }
  };
  useEffect(() => {
    fetchIdLastest();
  }, []);

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="ライセンス管理　新规作成">
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
          value={idLicense}
          disabled
        />
        <TextInput source="version" label="バージョン" isRequired fullWidth />
        <TextInput source="memo" label="メモ" isRequired fullWidth />
        <DateTimeInput
          source="publishedDate"
          fullWidth
          label="公開開始日"
          defaultValue={oldDate}
          isRequired
        />

        <FileInput
          source="content"
          label="規約本文"
          placeholder="アップロード"
          accept="text/html,.txt,.htm"
        >
          <FileField source="src" title="title" target="_blank" />
        </FileInput>
      </CustomForm>
    </Create>
  );
};

export default LicenseManagementCreate;
