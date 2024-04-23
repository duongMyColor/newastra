import { countryList, userRoles } from '@repo/consts/user';
import {
  TextInput,
  PasswordInput,
  Create,
  SelectInput,
  AutocompleteInput,
  BooleanInput,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';

const UserCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list" title="管理ユーザー管理　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput
          source="cmsId"
          label="管理ユーザーID "
          isRequired
          fullWidth
        />

        <SelectInput
          source="role"
          choices={userRoles}
          isRequired
          defaultValue={'USER'}
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
          label="バスワード辟涊"
          fullWidth
          isRequired
        />
      </CustomForm>
    </Create>
  );
};

export default UserCreate;
