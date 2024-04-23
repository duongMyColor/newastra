import { TextInput, Create, FileInput, FileField } from 'react-admin';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { validateTermsAnsConditionsCreation } from './formValidator';

const TermsAndConditionsCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list">
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        validate={validateTermsAnsConditionsCreation}
      >
        <TextInput source="name" isRequired />
        <TextInput source="version" isRequired />
        <TextInput source="memo" isRequired fullWidth multiline />
        <FileInput source="files" accept="text/plain, text/html">
          <FileField source="src" title="title" />
        </FileInput>
      </CustomForm>
    </Create>
  );
};
export default TermsAndConditionsCreate;
