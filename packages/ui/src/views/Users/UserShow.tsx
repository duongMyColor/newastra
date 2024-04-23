import {
  TextInput,
  BooleanInput,
  PasswordInput,
  SelectInput,
  AutocompleteInput,
  Edit,
} from 'react-admin';
import { countryList, userRoles } from '@repo/consts/user';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';

const UserList = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Edit>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        showSaveButton={false}
      >
        <div style={{ display: 'flex', alignItems: 'center', columnGap: 20 }}>
          <TextInput source="username" disabled />
          <BooleanInput source="enabled" label="Enable" disabled />
        </div>

        <PasswordInput source="newPassword" fullWidth disabled />
        <PasswordInput source="confirmNewPassword" fullWidth disabled />

        <SelectInput source="role" choices={userRoles} disabled />

        <TextInput source="name" fullWidth disabled />
        <TextInput source="email" fullWidth disabled />
        <AutocompleteInput
          source="country"
          choices={countryList}
          optionValue="code"
          fullWidth
          disabled
        />
        <TextInput source="address" fullWidth multiline disabled />
      </CustomForm>
    </Edit>
  );
};

export default UserList;
