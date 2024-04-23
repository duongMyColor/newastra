import {
  Edit,
  TextInput,
  useNotify,
  useRefresh,
  useEditContext,
  useUpdate,
  ImageField,
} from 'react-admin';

import { Stack, Button } from '@mui/material';

import CustomForm from '@repo/ui/src/components/CustomForm';

import { validateImgRecSelectionEdition } from './formValidator';
import { getPostData } from './handler';
import { BaseComponentProps } from '@repo/types/general';
import RectEditor from '@repo/ui/src/components/RectEditor/RectEditor';
import { useState } from 'react';
import { RectData } from '@repo/types/rectangleEditor';
import { ImgRecSelectionPostIF } from '@repo/types/imgRecSelection';

const EditForm = ({ actions, resource }: BaseComponentProps) => {
  const { record } = useEditContext();
  const [isEditRect, setIsEditRect] = useState(false);
  const resourcePath = `/${resource}`;

  const [update] = useUpdate();

  const notify = useNotify();
  const refresh = useRefresh();

  const handleSave = async (values: ImgRecSelectionPostIF) => {
    try {
      const postData = await getPostData(values);

      await update(resource, {
        id: record.id,
        data: postData ?? {},
        previousData: record,
      });

      notify('Success: Edit ImgRecSelection success', { type: 'success' });
      setTimeout(refresh, 0);
    } catch (error) {
      notify('Error: Edit ImgRecSelection failed: ' + error, {
        type: 'warning',
      });
    }
  };

  const onEditRectClick = () => {
    setIsEditRect(true);
  };

  const onCancel = () => {
    setIsEditRect(false);
  };

  const onSaveRectData = async (rectData: RectData[]) => {
    const formData = new FormData();
    const rectDataStr = JSON.stringify(rectData);

    formData.append('data', rectDataStr);

    try {
      await update(resource, {
        id: record.id,
        data: formData,
        previousData: record,
      });

      notify('Success: Edit Rect success', { type: 'success' });
      setTimeout(refresh, 0);
    } catch (error) {
      notify('Error: EditRect failed: ' + error, {
        type: 'error',
      });
    }
  };
  const rectEditorArea = (
    <RectEditor
      imagePath={record.imgPath}
      data={record.data}
      onSave={onSaveRectData}
      onCancel={onCancel}
    ></RectEditor>
  );

  const form = (
    <CustomForm
      handleSave={handleSave}
      pathTo={resourcePath}
      validate={validateImgRecSelectionEdition}
    >
      <TextInput source="id" isRequired fullWidth disabled />

      <TextInput source="name" isRequired fullWidth />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width={'100%'}
      >
        <ImageField source="imgPath" title="thumbImgName" />
        <Button
          type="button"
          variant="contained"
          color="info"
          onClick={onEditRectClick}
        >
          Edit Rect
        </Button>
      </Stack>
    </CustomForm>
  );

  return <>{isEditRect ? rectEditorArea : form}</>;
};

const ImgRecSelectionEdit = (props: BaseComponentProps) => {
  return (
    <Edit>
      <EditForm {...props} />
    </Edit>
  );
};

export default ImgRecSelectionEdit;
