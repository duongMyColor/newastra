import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  DateInput,
  FileInput,
  FileField,
  useNotify,
  useCreate,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';
import { convertToFormData, logFormData } from '@repo/utils/formData';

const TermsOfUseManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const [create] = useCreate();

  const handleSave = async (values: RecordValue) => {
    try {
      const formData = convertToFormData(values, ['content']);

      await create('term-of-uses', {
        data: formData,
      });

      // navigate(resourcePath);
      notify('Success: Create Term of use successffuly', { type: 'success' });
    } catch (error) {
      notify('Error: Create Term of use failed: ' + error, { type: 'warning' });
    }
  };

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="利用規約管理　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextInput source="id" label="利用規約ID" fullWidth disabled />
        <TextInput source="version" label="バージョン" isRequired fullWidth />
        <TextInput source="memo" label="メモ" fullWidth multiline />
        <DateInput source="publishedDate" label="公開開始日" isRequired />

        <FileInput
          source="content"
          label="規約本文"
          placeholder="アップロード"
          isRequired
        >
          <FileField source="src" title="title" />
        </FileInput>
      </CustomForm>
    </Create>
  );
};

export default TermsOfUseManagementCreate;
