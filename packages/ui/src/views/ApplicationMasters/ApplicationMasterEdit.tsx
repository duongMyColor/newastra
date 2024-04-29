import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  SelectInput,
  EditBase,
  Title,
  usePermissions,
  FileInput,
  FileField,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserCreation, validateUserEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles } from '@repo/styles';

const MasterEdit = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const { permissions } = usePermissions();

  console.log({ permissions });
  console.log({ actions });

  return (
    <Box sx={boxStyles}>
      <EditBase>
        <Title title="アプリケーションマスタ　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserCreation}
          showSaveButton={true}
          showReferenceButton={true}
          showCancelButton={true}
        >
          <TextInput
            source="appId"
            label="アプリケーションID"
            isRequired
            fullWidth
          />
          <TextInput
            source="appName"
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
            label="椎ライセンスID限"
          />
          <TextInput
            source="packageName"
            label="バンドルID/パッケージ名"
            fullWidth
            isRequired
          />
          <FileInput
            source="assetDataIOS"
            label="iOS用共通アセットバンドル"
            placeholder="アップロード"
          >
            <FileField source="src" title="src" />
          </FileInput>

          <FileInput
            source="assetDataAndroid"
            label="Android用共通アセットバンドル"
            placeholder="アップロード"
          >
            <FileField source="src" title="src" />
          </FileInput>

          <FileInput
            source="assetOutlineUrl"
            label="アクスタ枠データパス"
            placeholder="アップロード"
          >
            <FileField source="src" title="src" />
          </FileInput>
        </CustomForm>
      </EditBase>
    </Box>
  );
};

export default MasterEdit;
