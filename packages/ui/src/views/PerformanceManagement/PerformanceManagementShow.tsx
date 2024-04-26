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
import { bgColorDisiable, boxStyles } from '@repo/styles';

const PerformanceManagementShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Box sx={boxStyles }>
      <ShowBase>
        <>
          <Title title="演出管理　参照" />

          <CustomForm
            pathTo={resourcePath}
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="productId"
              label="演出ID"
              disabled
              sx={bgColorDisiable}
            />

            <TextInput
              source="performanceName"
              label="演出名"
              disabled
              sx={bgColorDisiable}
            />
            <TextInput
              source="performanceTypeId"
              label="演出種別ID"
              disabled
              sx={bgColorDisiable}
            />

            <SimpleShowLayout spacing={3}>
              <TextField
                source="assetBundleIOS"
                label="アセットバンドルデータ (iOS)"
                disabled
                sx={bgColorDisiable}
              />
              <TextField
                source="assetBundleAndroid"
                label="アセットバンドルデータ (Android)"
                disabled
                sx={bgColorDisiable}
              />
            </SimpleShowLayout>

            <TextInput
              source="axtaId"
              label="アクスタ ID"
              disabled
              sx={bgColorDisiable}
            />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default PerformanceManagementShow;
