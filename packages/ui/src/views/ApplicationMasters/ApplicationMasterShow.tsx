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

const MasterShow = ({ actions, resource }: BaseComponentProps) => {
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
          <Title title="アプリケーションマスタ　参照" />
          <CustomForm
            pathTo={resourcePath}
            showDeleteButton={validRole('delete', actions)}
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput source="appId" label="アプリケーションID" disabled />

            <TextInput source="appName" label="アプリケーション名" disabled />
            <TextInput
              source="packageName"
              label="バンドルID/パッケージ名"
              disabled
            />

            <TextInput source="termsOfUseID" label="利用規約ID" disabled />
            <TextInput source="licenseID" label="ライセンスID" disabled />

            <TextInput source="date" label="登録日時" disabled />

            <SimpleShowLayout
              spacing={3}
              // sx={{
              //   // display:'flex',
              //   // flexDirection: 'column',
              //   gap: 10,
              //   lineHeight: '20px',
              // }}
            >
              <TextField
                source="assetBundleIOS"
                label="iOS用共通アセットバンドル"
                disabled
              />

              <TextField
                source="assetBundleAndroid"
                label="Android用共通アセットバンドル"
                disabled
              />

              <TextField
                source="outlineUrl"
                label="アクスタ枠データパス"
                disabled
              />
            </SimpleShowLayout>
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default MasterShow;
