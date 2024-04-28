import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  DateInput,
  FileInput,
  FileField,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';

const TermsOfUseManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="利用規約管理　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput
          source="termOfUseId"
          label="利用規約ID"
          isRequired
          fullWidth
        />
        <TextInput source="version" label="バージョン" isRequired fullWidth />
        <TextInput source="memo" label="メモ" isRequired fullWidth />
        <DateInput source="dateStart" fullWidth label="公開開始日" />

        <FileInput
          source="fileConditionTerms"
          label="規約本文"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>
      </CustomForm>
    </Create>
  );
};

export default TermsOfUseManagementCreate;
