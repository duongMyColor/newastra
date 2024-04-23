import { Edit, FileField, FileInput, TextInput } from 'react-admin';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
// import { validateEdition } from './formValidator';

const PerformanceManagementEdit = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Edit>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        // validate={validateEdition}
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
    </Edit>
  );
};

export default PerformanceManagementEdit;
