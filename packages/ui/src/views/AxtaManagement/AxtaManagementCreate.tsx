import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  SelectInput,
  FileInput,
  FileField,
  DateInput,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';

const AxtaManagementCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="アクスタ管理　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput source="acstaId" label="アクスタ ID" isRequired fullWidth />
        <TextInput
          source="managementName"
          label="管理名"
          fullWidth
          isRequired
        />

        <TextInput source="acstaName" label="アクスタ名" fullWidth isRequired />
        <SelectInput
          source="appId"
          choices={userRoles}
          fullWidth
          isRequired
          label="アプリケーション ID"
        />

        <FileInput
          source="acstaThumbnail"
          label="アクスタサムネイル"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="acstaImage"
          label="スキャン用データ"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>
        <DateInput source="dateStart" fullWidth label="公開開始日" />
        <DateInput source="dateEnd" fullWidth label="公開終了日" />

        <TextInput
          source="SumoId"
          label="力士基本情報ID"
          fullWidth
          isRequired
        />
      </CustomForm>
    </Create>
  );
};

export default AxtaManagementCreate;
