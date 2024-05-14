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
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { extractFilename } from '@repo/utils/fileUtils';

const MasterShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="アプリケーションマスタ　参照" />
          <CustomForm
            pathTo={resourcePath}
            showDeleteButton={validRole('delete', actions)}
            deleteButtonLabel="データ削除"
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="id"
              label="アプリケーションID"
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <TextInput
              source="appName"
              label="アプリケーション名"
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="packageName"
              label="バンドルID/パッケージ名"
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <TextInput
              source="termsOfUseId"
              label="利用規約ID"
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="licenseID"
              label="ライセンスID"
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <TextInput
              source="date"
              label="登録日時"
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <SimpleShowLayout spacing={3}>
              <FunctionField
                label="iOS用共通アセットバンドル"
                render={({ assetBundleIOS }: { assetBundleIOS: string }) => {
                  return extractFilename(assetBundleIOS);
                }}
                sx={disabledInputBackgroundStyle}
              />
              <FunctionField
                label="Android用共通アセットバンドル"
                render={({
                  assetBundleAndroid,
                }: {
                  assetBundleAndroid: string;
                }) => {
                  return extractFilename(assetBundleAndroid);
                }}
                sx={disabledInputBackgroundStyle}
              />
              <FunctionField
                label="アクスタ枠データパス"
                render={({ outlineUrl }: { outlineUrl: string }) => {
                  return extractFilename(outlineUrl);
                }}
                sx={disabledInputBackgroundStyle}
              />
            </SimpleShowLayout>
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default MasterShow;
