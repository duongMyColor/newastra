import { userRoles } from '@repo/consts/user';
import { TextInput, PasswordInput, Create, SelectInput } from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';

const UserCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create title="管理ユーザー管理　新規作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
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
        <TextInput source="email" label="メールアドレス" fullWidth isRequired />
        <PasswordInput
          source="password"
          label="パスワード"
          fullWidth
          isRequired
        />
        <PasswordInput
          source="confirmPassword"
          label="パスワード確認"
          fullWidth
          isRequired
        />
      </CustomForm>
    </Create>
  );
};

export default UserCreate;
