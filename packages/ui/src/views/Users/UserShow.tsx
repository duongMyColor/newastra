import {
  TextInput,
  ShowBase,
  Show,
  Title,
  useShowContext,
  useRecordContext,
} from 'react-admin';
import { countryList, userRoles } from '@repo/consts/user';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { disabledInputBackgroundStyle, boxStyles } from '@repo/styles';
import FormatInputDateShow from '../../components/FormatInputDateShow';

const UserShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const record = useRecordContext();

  console.log({ record });
  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="管理ユーザー管理　参照" />
          <CustomForm
            pathTo={resourcePath}
            showDeleteButton={validRole('delete', actions)}
            deleteButtonLabel="アカウント削除"
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="username"
              label="管理ユーザーID  "
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <TextInput
              source="role"
              label="植限"
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="email"
              label="メールアドレス  "
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <FormatInputDateShow label="最新ログイン" source="lastLogin" />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default UserShow;
