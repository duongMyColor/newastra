import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  SelectInput,
  EditBase,
  Title,
  usePermissions,
  FileInput,
  FileField,
  DateInput,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserCreation, validateUserEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';

const AxtaManagementEdit = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  



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
        <Title title="アクスタ管理　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserCreation}
          showSaveButton={true}
          showReferenceButton={true}
          showCancelButton={true}
        >
          <TextInput
            source="acstaId"
            label="アクスタ ID"
            isRequired
            fullWidth
          />
          <TextInput
            source="managementName"
            label="管理名"
            fullWidth
            isRequired
          />

          <TextInput
            source="acstaName"
            label="アクスタ名"
            fullWidth
            isRequired
          />
          <SelectInput
            source="appId"
            choices={userRoles}
            defaultValue={'USER'}
            fullWidth
            isRequired
            label="アプリケーション ID"
          />

          <FileInput
            source="assetAcstaThumbnail"
            label="アクスタサムネイル"
            placeholder="アップロード"
          >
            <FileField source="src" title="src" />
          </FileInput>

          <FileInput
            source="assetScanData"
            label="スキャン用データ"
            placeholder="アップロード"
          >
            <FileField source="src" title="src" />
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
      </EditBase>
    </Box>
  );
};

export default AxtaManagementEdit;
