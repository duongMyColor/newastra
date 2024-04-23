import { Edit, FileField, FileInput, TextInput } from 'react-admin';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { validateTermsAnsConditionsEdition } from './formValidator';

const AnimalClassificationEdit = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Edit>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        validate={validateTermsAnsConditionsEdition}
      >
        <TextInput source="name" isRequired />
        <TextInput source="version" isRequired />
        <TextInput source="memo" isRequired fullWidth multiline />
        <FileInput source="files" accept="text/plain, text/html">
          <FileField source="src" title="title" />
        </FileInput>
      </CustomForm>
    </Edit>
  );
};

export default AnimalClassificationEdit;
