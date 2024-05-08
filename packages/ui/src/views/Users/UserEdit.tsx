import { countryList, userRoles } from '@repo/consts/user';
import {
  Edit,
  TextInput,
  SelectInput,
  AutocompleteInput,
  BooleanInput,
  PasswordInput,
  EditBase,
  Title,
  usePermissions,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserCreation, validateUserEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { boxStyles } from '@repo/styles';

const UserEdit = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const { permissions } = usePermissions();

  console.log({ permissions });
  console.log({ actions });

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
        >
          <TextInput
            source="username"
            label="管理ユーザーID "
            isRequired
            fullWidth
          />

          <SelectInput
            source="role"
            choices={userRoles}
            isRequired
            defaultValue={'GENERAL'}
            label="椎限"
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
            label="バスワード辟涊"
            fullWidth
            isRequired
          />
        </CustomForm>
      </EditBase>
    </Box>
  );
};

export default UserEdit;
