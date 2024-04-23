import React from 'react';
import { TextInput, Create } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateAnimalCfCreation } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';

const AnimalClassificationCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list">
      <CustomForm
        pathTo={resourcePath}
        validate={validateAnimalCfCreation}
        showDeleteButton={false}
      >
        <TextInput source="name" isRequired fullWidth />
      </CustomForm>
    </Create>
  );
};
export default AnimalClassificationCreate;
