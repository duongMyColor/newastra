import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  PasswordInput,
  Create,
  SelectInput,
  useNotify,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { CREATED_SUCCESS, REDIRECT_ROUTE } from '@repo/consts/general';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserCreate = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();

  const handleSave = async (values: RecordValue) => {
    console.log({ values });

    try {
      const findUser = await dataProvider.getOneByEmail(resource, values.email);

      if (findUser.data.email) {
        return notify('エラー: メールアドレスはすでに存在します', {
          type: 'warning',
        });
      }

      await dataProvider.create(resource, {
        data: values,
      });

      notify(CREATED_SUCCESS, { type: 'success' });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: 利用規約の作成に失敗しました:' + error, {
        type: 'warning',
      });
    }
  };

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="管理ユーザー管理　新規作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextInput source="username" label="CMS-ID " isRequired fullWidth />

        <SelectInput
          source="role"
          choices={userRoles}
          isRequired
          defaultValue={'GENERAL'}
          label="権限"
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
