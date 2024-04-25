import { TextInput, ShowBase, Title } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';

const PerformanceTypeMasterShow = ({
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
      <ShowBase>
        <>
          <Title title="演出種別マスタ　参照" />
          <CustomForm
            pathTo={resourcePath}
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="performanceTypeID"
              label="演出種別ID"
              disabled
              sx={{
                width: '50%',
              }}
            />

            <TextInput
              source="performanceTypeName"
              label="演出種別名"
              disabled
              sx={{
                width: '50%',
              }}
            />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default PerformanceTypeMasterShow;
