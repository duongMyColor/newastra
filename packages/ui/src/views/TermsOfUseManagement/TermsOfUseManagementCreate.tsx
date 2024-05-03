import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  FileInput,
  FileField,
  useNotify,
  useCreate,
  useRecordContext,
  useDataProvider,
  DateTimeInput,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';
import { convertToFormData, logFormData } from '@repo/utils/formData';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const TermsOfUseManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const [create] = useCreate();
  const dataProvider = useDataProvider();
  const [oldDate, setOldDate] = useState<Date>();

  const [idTermOfUse, setIdTermOfUse] = useState<string>('');

  const handleSave = async (values: RecordValue) => {
    try {
      const formData = convertToFormData(values, ['content']);

      await create('term-of-uses', {
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
    const formatDate = new Date(response.data[0].publishedDate);

    setIdTermOfUse(`${nextId}`);

    setOldDate(formatDate);
  };
  useEffect(() => {
    fetchIdLastest();
  }, []);

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="利用規約管理　新规作成">
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
          value={idTermOfUse}
          disabled
        />
        <TextInput source="version" label="バージョン" isRequired fullWidth />
        <TextInput source="memo" label="メモ" fullWidth multiline />
        <DateTimeInput
          source="publishedDate"
          label="公開開始日"
          defaultValue={oldDate}
          fullWidth
          isRequired
        />
        <FileInput
          source="content"
          label="規約本文"
          placeholder="アップロード"
          isRequired
          accept="text/html,.txt,.htm"
        >
          <FileField source="src" target="_blank" title="title" />
        </FileInput>
      </CustomForm>
    </Create>
  );
};

export default TermsOfUseManagementCreate;
