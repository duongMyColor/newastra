import { countryList, userRoles } from '@repo/consts/user';
import {
  TextInput,
  PasswordInput,
  Create,
  SelectInput,
  AutocompleteInput,
  BooleanInput,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';

const UserCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showDeleteButton={false}
      >
        <div style={{ display: 'flex', alignItems: 'center', columnGap: 20 }}>
          <TextInput source="username" isRequired />
          <BooleanInput source="enabled" label="Enable" defaultValue={true} />
        </div>
        <PasswordInput source="password" fullWidth isRequired />
        <PasswordInput source="confirmPassword" fullWidth isRequired />
        <SelectInput
          source="role"
          choices={userRoles}
          isRequired
          defaultValue={'USER'}
        />
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
    </Create>
  );
};

export default UserCreate;
