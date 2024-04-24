import { countryList, userRoles } from '@repo/consts/user';
import {
  Edit,
  TextInput,
  SelectInput,
  AutocompleteInput,
  BooleanInput,
  PasswordInput,
  EditBase,
  Title,
  usePermissions,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserCreation, validateUserEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';

const UserEdit = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const {permissions} = usePermissions()

console.log({permissions});
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
        <Title title="管理ユーザー管理　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserCreation}
          showDeleteButton={validRole('delete',actions)}
          showSaveButton={true}
          showReferenceButton={true}
          showCancelButton={true}
        >
          <TextInput
            source="cmsId"
            label="管理ユーザーID "
            isRequired
            fullWidth
          />

          <SelectInput
            source="role"
            choices={userRoles}
            isRequired
            defaultValue={'USER'}
            label="椎限"
          />
          <TextInput
            source="email"
            label="メールアドレス"
            fullWidth
            isRequired
          />
          <PasswordInput
            source="password"
            label="パスワード"
            fullWidth
            isRequired
          />
          <PasswordInput
            source="confirmPassword"
            label="バスワード辟涊"
            fullWidth
            isRequired
          />
        </CustomForm>
      </EditBase>
    </Box>
  );
};

export default UserEdit;
