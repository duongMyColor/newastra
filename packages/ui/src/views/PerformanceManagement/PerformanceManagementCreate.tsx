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

const PerformanceManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list" title="演出管理　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput source="productId" label="演出ID" isRequired fullWidth />
        <TextInput
          source="managementName"
          label="管理名"
          fullWidth
          isRequired
        />

        <TextInput
          source="performanceName"
          label="演出名"
          fullWidth
          isRequired
        />
        <SelectInput
          source="performanceTypeId"
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
          source="axtaId"
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
