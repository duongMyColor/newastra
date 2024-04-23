import { Show, TextInput } from 'react-admin';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';

const AnimalClassificationShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Show>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        showSaveButton={false}
      >
        <TextInput source="name" disabled />
        <TextInput source="animalCount" disabled />
      </CustomForm>
    </Show>
  );
};

export default AnimalClassificationShow;
