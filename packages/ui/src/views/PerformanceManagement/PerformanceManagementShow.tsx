import {
  TextInput,
  ShowBase,
  Title,
  TextField,
  SimpleShowLayout,
  FunctionField,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { disabledInputBackgroundStyle, boxStyles } from '@repo/styles';

const PerformanceManagementShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="演出管理　参照" />

          <CustomForm
            pathTo={resourcePath}
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="id"
              label="演出ID"
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <TextInput
              source="name"
              label="演出名"
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="performanceTypeMasterID"
              label="演出種別ID"
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <SimpleShowLayout spacing={3}>
              <FunctionField
                label="アセットバンドルデータ (iOS)"
                render={({ assetBundleIOS }: { assetBundleIOS: string }) => {
                  return assetBundleIOS.split('/').pop();
                }}
              />

              <FunctionField
                label="アセットバンドルデータ (Android)"
                render={({
                  assetBundleAndroid,
                }: {
                  assetBundleAndroid: string;
                }) => {
                  return assetBundleAndroid.split('/').pop();
                }}
              />
            </SimpleShowLayout>

            <TextInput
              source="acstaID"
              label="アクスタ ID"
              disabled
              sx={disabledInputBackgroundStyle}
            />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default PerformanceManagementShow;
