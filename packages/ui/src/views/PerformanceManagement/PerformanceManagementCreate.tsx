import { TextInput, Create, FileInput, FileField } from 'react-admin';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { validateCreation } from './formValidator';

const PerformanceManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list">
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        validate={validateCreation}
      >
        <TextInput source="name" isRequired />

        <FileInput source="iosFiles" label="Asset bundle data (iOS)" isRequired>
          <FileField source="src" title="title" />
        </FileInput>
        <FileInput
          source="androidFiles"
          label="Asset bundle data (Android)"
          isRequired
        >
          <FileField source="src" title="title" />
        </FileInput>
      </CustomForm>
    </Create>
  );
};
export default PerformanceManagementCreate;
