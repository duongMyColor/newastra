import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  SelectInput,
  EditBase,
  Title,
  FileInput,
  FileField,
  DateInput,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles } from '@repo/styles';

const AcstaManagementEdit = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Box sx={boxStyles}>
      <EditBase>
        <Title title="アクスタ管理　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserEdition}
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
        </CustomForm>
      </EditBase>
    </Box>
  );
};

export default AcstaManagementEdit;
