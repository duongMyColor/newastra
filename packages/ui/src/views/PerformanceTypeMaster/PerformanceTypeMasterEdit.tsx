import { userRoles } from '@repo/consts/user';
import { TextInput, EditBase, Title, usePermissions } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserCreation } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles } from '@repo/styles';

const PerformanceTypeMasterEdit = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const { permissions } = usePermissions();

  console.log({ permissions });
  console.log({ actions });

  return (
    <Box sx={{ boxStyles }}>
      <EditBase>
        <Title title="演出種別マスタ　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserCreation}
          showSaveButton={true}
          showReferenceButton={true}
          showCancelButton={true}
        >
          <TextInput
            source="performanceTypeID"
            label="演出種別ID"
            isRequired
            fullWidth
          />
          <TextInput
            source="performanceTypeName"
            label="演出種別名"
            isRequired
            fullWidth
          />
        </CustomForm>
      </EditBase>
    </Box>
  );
};

export default PerformanceTypeMasterEdit;
