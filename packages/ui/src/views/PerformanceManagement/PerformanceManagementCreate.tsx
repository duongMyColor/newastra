import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  SelectInput,
  FileInput,
  FileField,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';

const PerformanceManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="演出管理　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput source="id" label="演出ID" isRequired fullWidth />
        <TextInput
          source="managementName"
          label="管理名"
          fullWidth
          isRequired
        />

        <TextInput source="name" label="演出名" fullWidth isRequired />
        <SelectInput
          source="performanceTypeMasterID"
          choices={userRoles}
          fullWidth
          isRequired
          label="演出種別ID"
        />

        <FileInput
          source="assetBundleIOS"
          label="アセットバンドルデータ (iOS)"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="assetBundleAndroid"
          label="アセットバンドルデータ (Android)"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>
        <SelectInput
          source="acstaID"
          choices={userRoles}
          fullWidth
          isRequired
          label="アクスタ ID"
        />
      </CustomForm>
    </Create>
  );
};

export default PerformanceManagementCreate;
