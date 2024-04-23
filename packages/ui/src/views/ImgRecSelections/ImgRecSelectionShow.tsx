import { TextInput, ImageField, Show } from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';

import CustomForm from '@repo/ui/src/components/CustomForm';

const ImgRecSelectionShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Show>
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        showSaveButton={false}
      >
        <TextInput source="name" isRequired fullWidth disabled />

        <ImageField source="imgPath" title="title" />
      </CustomForm>
    </Show>
  );
};

export default ImgRecSelectionShow;
