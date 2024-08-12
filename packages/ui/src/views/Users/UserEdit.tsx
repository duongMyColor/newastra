import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  SelectInput,
  PasswordInput,
  EditBase,
  Title,
  usePermissions,
  useNotify,
  useRecordContext,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserEdition } from './formValidator';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { boxStyles } from '@repo/styles';
import { useNavigate } from 'react-router-dom';
import { UPDATED_SUCCESS } from '@repo/consts/general';

const UserEditForm = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const record = useRecordContext();

  const handleUpdate = async (values: RecordValue) => {
    try {
      await dataProvider.update(resource, {
        id: record.id,
        data: values,
        previousData: record,
      });

      await notify(UPDATED_SUCCESS, {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: 更新に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  return (
    <Box sx={boxStyles}>
      <EditBase>
        <Title title="管理ユーザー管理　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserEdition}
          showDeleteButton={validRole('delete', actions)}
          deleteButtonLabel="アカウント削除"
          showSaveButton={true}
          showReferenceButton={true}
          showCancelButton={true}
          handleSave={handleUpdate}
        >
          <TextInput source="username" label="CMS-ID " isRequired fullWidth />

          <SelectInput
            source="role"
            choices={userRoles}
            isRequired
            defaultValue={'GENERAL'}
            label="権限"
          />
          <TextInput
            source="email"
            label="メールアドレス"
            fullWidth
            isRequired
          />
          <PasswordInput
            source="newPassword"
            label="パスワード"
            fullWidth
            isRequired
          />
          <PasswordInput
            source="confirmNewPassword"
            label="パスワード確認"
            fullWidth
            isRequired
          />
        </CustomForm>
      </EditBase>
    </Box>
  );
};

const UserEdit = (props: BaseComponentProps) => {
  return (
    <Box sx={boxStyles}>
      <EditBase>
        <UserEditForm {...props} />
      </EditBase>
    </Box>
  );
};

export default UserEdit;
