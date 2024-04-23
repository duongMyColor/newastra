import { FileField, Show, TextInput, useShowContext } from 'react-admin';
import { useEffect, useState } from 'react';
import { Link, Stack } from '@mui/material';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';

const ShowContent = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const { record } = useShowContext();
  console.log('record', record);
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    if (!record?.fileUrl) {
      return;
    }
    fetch(record?.fileUrl)
      .then((response) => response.text())
      .then((data) => {
        console.log('data', data);

        setFileContent(data);
      });
  }, [record?.fileUrl]);

  return (
    <CustomForm
      pathTo={resourcePath}
      showDeleteButton={false}
      showSaveButton={false}
    >
      <TextInput source="id" readOnly />
      <TextInput source="name" readOnly />
      <TextInput source="version" readOnly />
      <TextInput source="memo" fullWidth readOnly />
      <Stack width={'100%'} spacing={2} alignItems="flex-start">
        <b>Terms And Conditions</b>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            let link = document.createElement('a');
            const parts = record.filePath.split('terms_and_conditions');
            const fileName = parts.pop();
            link.download = fileName;
            link.href = record.fileUrl;
            link.click();
          }}
        >
          {record?.filePath}
        </Link>
        <textarea
          style={{
            width: '100%',
            height: 300,
            padding: '12px 20px',
            boxSizing: 'border-box',
            border: '2px solid #ccc',
            borderRadius: 4,
            backgroundColor: '#f8f8f8',
            fontSize: 16,
            resize: 'none',
          }}
          value={fileContent}
          readOnly
        ></textarea>
      </Stack>
      <TextInput source="created" sx={{ width: 300 }} readOnly />
    </CustomForm>
  );
};

const AnimalClassificationShow = (props: BaseComponentProps) => {
  return (
    <Show>
      <ShowContent {...props} />
    </Show>
  );
};

export default AnimalClassificationShow;
