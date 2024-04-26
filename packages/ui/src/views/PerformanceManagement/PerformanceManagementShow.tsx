import {
  TextInput,
  ShowBase,
  Title,
  TextField,
  SimpleShowLayout,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';


const PerformanceManagementShow = ({
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
          <Title title="演出管理　参照" />

          <CustomForm
            pathTo={resourcePath}
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput source="productId" label="演出ID" disabled />

            <TextInput source="performanceName" label="演出名" disabled />
            <TextInput source="performanceTypeId" label="演出種別ID" disabled />

            <SimpleShowLayout spacing={3}>
              <TextField
                source="assetBundleIOS"
                label="アセットバンドルデータ (iOS)"
                disabled
              />
              <TextField
                source="assetBundleAndroid"
                label="アセットバンドルデータ (Android)"
                disabled
              />
            </SimpleShowLayout>

            <TextInput source="axtaId" label="アクスタ ID" disabled />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default PerformanceManagementShow;
