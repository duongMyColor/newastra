import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  EditBase,
  Title,
  usePermissions,

} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserCreation } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';

const PerformanceTypeMasterEdit = ({
  actions,
  resource,
}: BaseComponentProps) => {
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
