import { TextInput, ShowBase, Show, Title } from 'react-admin';
import { countryList, userRoles } from '@repo/consts/user';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';

const UserShow = ({ actions, resource }: BaseComponentProps) => {
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
          <Title title="管理ユーザー管理　参照" />
          <CustomForm
            pathTo={resourcePath}
            showDeleteButton={validRole('delete', actions)}
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="cmsId"
              label="管理ユーザーID  "
              fullWidth
              disabled
            />

            <TextInput source="role" label="植限" fullWidth disabled />
            <TextInput
              source="email"
              label="メールアドレス  "
              fullWidth
              disabled
            />


            <TextInput source="date" label="最新ログイン" fullWidth disabled />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default UserShow;
