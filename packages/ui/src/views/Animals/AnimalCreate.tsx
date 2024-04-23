import {
  TextInput,
  Create,
  ImageInput,
  ImageField,
  AutocompleteInput,
  BooleanInput,
  RadioButtonGroupInput,
  useNotify,
  SelectInput,
  required,
} from 'react-admin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { FieldValues } from 'react-hook-form';

import { CustonRichTextInput } from '../../components/CustomRichTextInput';
import CustomForm from '@repo/ui/src/components/CustomForm';

import {
  continents,
  feedTypes,
  genders,
  uploadTypes,
} from '@repo/consts/animal';
import {
  AnimalClassificationResponseIF,
  AnimalPostIF,
} from '@repo/types/animal';
import { BaseComponentProps } from '@repo/types/general';

import { validateAnimalCreation } from './formValidator';
import { getPostData } from './handler';

const DEFAULT_UPLOAD_TYPE = 'LOCAL';

const AnimalClassificationCreate = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();

  const [classification, setClassification] = useState<
    AnimalClassificationResponseIF[]
  >([]);

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

  const handleSave = async (values: FieldValues) => {
    console.log('values', values);

    try {
      const postData = await getPostData(values, false, false, dataProvider);

      const { description } = values;

      const {
        data: { id },
      } = await dataProvider.create(resource, {
        data: postData ?? {},
      });

      if (!id) throw new Error('Create Animal failed');

      await dataProvider.create('memos', {
        data: {
          content: description,
          animalId: id,
        },
      });

      notify('Success: Create Animal success', { type: 'success' });
      navigate(resourcePath);
    } catch (error) {
      console.log(':::error', error);

      notify('Error: Create Animal failed: ' + error, { type: 'warning' });
    }
  };

  return (
    <Create redirect="list">
      <CustomForm
        pathTo={resourcePath}
        validate={validateAnimalCreation}
        handleSave={handleSave}
        showDeleteButton={false}
      >
        <TextInput source="name" isRequired fullWidth />
        <ImageInput source="pictures" label="Image" isRequired>
          <ImageField source="src" title="title" />
        </ImageInput>
        <SelectInput
          source="uploadType"
          label="Upload Type"
          choices={uploadTypes}
          defaultValue={DEFAULT_UPLOAD_TYPE}
          validate={required()}
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
          source="description"
          size="small"
          label="Description"
        />
      </CustomForm>
    </Create>
  );
};
export default AnimalClassificationCreate;
