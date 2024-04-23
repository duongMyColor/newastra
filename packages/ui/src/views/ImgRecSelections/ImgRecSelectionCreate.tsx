import {
  TextInput,
  Create,
  ImageInput,
  ImageField,
  useNotify,
} from 'react-admin';

import { useNavigate } from 'react-router-dom';
import { validateImgRecSelectionCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { getPostData } from './handler';
import { BaseComponentProps } from '@repo/types/general';
import { ImgRecSelectionPostIF } from '@repo/types/imgRecSelection';

const ImgRecSelectionCreate = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const notify = useNotify();
  const navigate = useNavigate();
  const resourcePath = `/${resource}`;

  const handleSave = async (values: ImgRecSelectionPostIF) => {
    console.log('values', values);

    try {
      const postData = await getPostData(values);
      console.log('postData', postData);

      await dataProvider.create(resource, {
        data: postData ?? {},
      });

      notify('Success: Create ImgRecSelection success', { type: 'success' });
      navigate(resourcePath);
    } catch (error) {
      console.log(':::error', error);

      notify('Error: Create ImgRecSelection failed: ' + error, {
        type: 'warning',
      });
    }
  };

  return (
    <Create>
      <CustomForm
        pathTo={resourcePath}
        validate={validateImgRecSelectionCreation}
        handleSave={handleSave}
        showDeleteButton={false}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput source="name" isRequired fullWidth />
        <ImageInput source="pictures" label="Thumb Image" isRequired>
          <ImageField source="src" title="title" />
        </ImageInput>
      </CustomForm>
    </Create>
  );
};
export default ImgRecSelectionCreate;
