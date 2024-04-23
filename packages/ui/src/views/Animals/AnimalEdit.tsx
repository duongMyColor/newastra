import {
  Edit,
  TextInput,
  useNotify,
  useRefresh,
  useEditContext,
  BooleanInput,
  AutocompleteInput,
  useUpdate,
  RadioButtonGroupInput,
  useCreate,
  SelectInput,
} from 'react-admin';

import { FieldValues } from 'react-hook-form';

import { Stack } from '@mui/material';
import { CustonRichTextInput } from '../../components/CustomRichTextInput';
import {
  AnimalClassificationResponseIF,
  AnimalFormIF,
} from '@repo/types/animal';
import {
  continents,
  feedTypes,
  genders,
  uploadTypes,
} from '@repo/consts/animal';
import { useEffect, useState } from 'react';
import { ImageEdit, ImageShow } from '../../components/ImageUpload';
import CustomForm from '@repo/ui/src/components/CustomForm';

import { validateAnimalEdition } from './formValidator';
import { getPostData } from './handler';
import { BaseComponentProps } from '@repo/types/general';

const EditForm = ({ actions, resource, dataProvider }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const [classification, setClassification] = useState<
    AnimalClassificationResponseIF[]
  >([]);
  const [isEditting, setIsEditting] = useState(false);
  const [cancelImageEditing, setCancelImageEditing] = useState(false);
  const { record } = useEditContext();

  const [update] = useUpdate();
  const [create] = useCreate();

  const notify = useNotify();
  const refresh = useRefresh();

  const handleMemoUpdate = async (content: string) => {
    if (record?.memo?.id) {
      await update('memos', {
        id: record.memo.id,
        data: { content },
        previousData: record.memo,
      });
      record.memo.content = content;
    } else {
      await create('memos', {
        data: { content, animalId: record.id },
      });
    }
  };

  const handleSave = async (values: FieldValues) => {
    const {
      memo: { content },
    } = values;

    try {
      const postData = await getPostData(
        values,
        cancelImageEditing,
        isEditting,
        dataProvider
      );

      await update(resource, {
        id: record.id,
        data: postData ?? {},
        previousData: record,
      });

      if (content !== record?.memo?.content) {
        await handleMemoUpdate(content);
      }

      notify('Success: Edit Animal success', { type: 'success' });
      setIsEditting(false);
      setTimeout(refresh, 0);
    } catch (error) {
      notify('Error: Edit Animal failed: ' + error, { type: 'warning' });
    }
  };

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const { data } = await dataProvider.getMany('animal_classifications', {
          ids: [],
        });
        setClassification(data);
      } catch (error) {
        notify('Error: Get Classification failed: ' + error, {
          type: 'warning',
        });
      }
    };
    fetchClassification();
  }, []);

  return (
    <CustomForm
      handleSave={handleSave}
      pathTo={resourcePath}
      validate={validateAnimalEdition}
    >
      <TextInput source="name" isRequired fullWidth />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width={'100%'}
      >
        {isEditting ? (
          <ImageEdit
            label="Cancel"
            onCancel={() => {
              setCancelImageEditing(true);
              setIsEditting(false);
            }}
          />
        ) : (
          <ImageShow
            label="Change"
            source="thumbImg"
            onChange={() => {
              setCancelImageEditing(false);
              setIsEditting(true);
            }}
          />
        )}
      </Stack>
      <SelectInput
        source="uploadType"
        label="Upload Type"
        choices={uploadTypes}
        defaultValue={'LOCAL'}
      ></SelectInput>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width={'100%'}
      >
        <AutocompleteInput
          source="classificationId"
          choices={classification}
          fullWidth
          label="Classification"
          isRequired
        />
        <BooleanInput
          source="extinction"
          label="Extinction"
          fullWidth
          defaultValue={false}
        />
      </Stack>
      <AutocompleteInput
        source="continent"
        choices={continents}
        fullWidth
        label="Continent"
        isRequired
      />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width={'100%'}
      >
        <RadioButtonGroupInput
          label="Gender"
          source="gender"
          choices={genders}
          fullWidth
        />
        <RadioButtonGroupInput
          label="Feed Type"
          source="feedType"
          choices={feedTypes}
          fullWidth
        />
      </Stack>

      <CustonRichTextInput
        source="memo.content"
        size="small"
        label="Description"
      />
    </CustomForm>
  );
};

const AnimalClassificationEdit = (props: BaseComponentProps) => {
  return (
    <Edit>
      <EditForm {...props} />
    </Edit>
  );
};

export default AnimalClassificationEdit;
