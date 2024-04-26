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

const PerformanceManagementEdit = ({
  actions,
  resource,
}: BaseComponentProps) => {
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
        <Title title="演出管理　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserCreation}
          showSaveButton={true}
          showReferenceButton={true}
          showCancelButton={true}
        >
          <TextInput source="productId" label="演出ID" isRequired fullWidth />
          <TextInput
            source="performanceName"
            label="演出名"
            fullWidth
            isRequired
          />

          <SelectInput
            source="performanceTypeId"
            choices={userRoles}
            defaultValue={'USER'}
            fullWidth
            isRequired
            label="演出種別ID"
          />

          <FileInput
            source="assetDataIOS"
            label="アセットバンドルデータ (iOS)"
            placeholder="アップロード"
          >
            <FileField source="src" title="src" />
          </FileInput>

          <FileInput
            source="assetDataAndroid"
            label="アセットバンドルデータ (Android)"
            placeholder="アップロード"
          >
            <FileField source="src" title="src" />
          </FileInput>

          <SelectInput
            source="axtaId"
            choices={userRoles}
            defaultValue={'USER'}
            fullWidth
            isRequired
            label="アクスタ ID"
          />
        </CustomForm>
      </EditBase>
    </Box>
  );
};

export default PerformanceManagementEdit;
