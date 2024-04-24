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
import { validRole } from '../_core/permissions';

const MasterEdit = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const { permissions } = usePermissions();

  console.log({ permissions });
  console.log({ actions });

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        WebkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderRadius: '4px',
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        marginTop: '1em',
      }}
    >
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
