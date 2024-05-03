import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  SelectInput,
  FileInput,
  FileField,
  DateTimeInput,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';

const MasterCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create
      redirect={REDIRECT_ROUTE.list}
      title="アプリケーションマスタ　新规作成"
    >
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput
          source="id"
          label="アプリケーション名"
          isRequired
          fullWidth
        />

        <SelectInput
          source="termsOfUseID"
          choices={userRoles}
          isRequired
          defaultValue={'USER'}
          label="利用規約ID"
        />
        <SelectInput
          source="licenseID"
          choices={userRoles}
          isRequired
          defaultValue={'USER'}
          label="ライセンスID"
        />
        <TextInput
          source="packageName"
          label="バンドルID/パッケージ名"
          fullWidth
          isRequired
        />
        <FileInput
          source="assetBundleIOS"
          label="iOS用共通アセットバンドル"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="assetBundleAndroid"
          label="Android用共通アセットバンドル"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="outlineUrl"
          label="アクスタ枠データパス"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>
      </CustomForm>
    </Create>
  );
};

export default MasterCreate;
