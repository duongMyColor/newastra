import { countryList, userRoles } from '@repo/consts/user';
import {
  Edit,
  TextInput,
  SelectInput,
  AutocompleteInput,
  BooleanInput,
  PasswordInput,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';

const UserEdit = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Edit>
      <CustomForm pathTo={resourcePath} validate={validateUserEdition}>
        <div style={{ display: 'flex', alignItems: 'center', columnGap: 20 }}>
          <TextInput source="username" disabled isRequired />
          <BooleanInput source="enabled" label="Enable" />
        </div>

        <PasswordInput source="newPassword" fullWidth />
        <PasswordInput source="confirmNewPassword" fullWidth />

        <SelectInput source="role" choices={userRoles} isRequired />

        <TextInput source="name" fullWidth isRequired />
        <TextInput source="email" fullWidth isRequired />
        <AutocompleteInput
          source="country"
          choices={countryList}
          optionValue="code"
          fullWidth
        />
        <TextInput source="address" fullWidth multiline />
      </CustomForm>
    </Edit>
  );
};

export default UserEdit;
