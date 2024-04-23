import { Edit, TextInput } from 'react-admin';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateAnimalCfEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
const AnimalClassificationEdit = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Edit>
      <CustomForm pathTo={resourcePath} validate={validateAnimalCfEdition}>
        <TextInput source="name" isRequired fullWidth />
        <TextInput source="animalCount" disabled />
      </CustomForm>
    </Edit>
  );
};

export default AnimalClassificationEdit;
