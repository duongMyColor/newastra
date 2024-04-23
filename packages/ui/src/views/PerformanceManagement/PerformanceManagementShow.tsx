import { FileField, Show, TextInput, useShowContext } from 'react-admin';
import { useEffect, useState } from 'react';
import { Link, Stack } from '@mui/material';
import { downloadFileRaw, downloadFile } from '@repo/lib/supabase';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import {
  encryptFile,
  decryptFile,
  extractFilename,
} from '@repo/utils/fileUtils';

const ShowContent = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const { record } = useShowContext();

  const downloadEncryptedFile = async (filePath: string, key: string) => {
    const file = await downloadFileRaw(filePath);
    const decryptedFile = await decryptFile(file, record.key);

    const blob = new Blob([decryptedFile], {
      type: 'application/octet-stream',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = extractFilename(filePath) ?? filePath;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <CustomForm
      pathTo={resourcePath}
      showDeleteButton={false}
      showSaveButton={false}
    >
      <TextInput source="id" readOnly />
      <TextInput source="name" readOnly />
      <Stack width={'100%'} spacing={2} alignItems="flex-start">
        <b>Asset bundle data (iOS)</b>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            downloadEncryptedFile(record?.iosFilepath, record?.key);
          }}
        >
          {record?.iosFilepath}
        </Link>
      </Stack>
      <Stack width={'100%'} spacing={2} alignItems="flex-start">
        <b>Asset bundle data (Android)</b>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            downloadEncryptedFile(record?.androidFilepath, record?.key);
          }}
        >
          {record?.androidFilepath}
        </Link>
      </Stack>
    </CustomForm>
  );
};

const PerformanceManagementShow = (props: BaseComponentProps) => {
  return (
    <Show>
      <ShowContent {...props} />
    </Show>
  );
};

export default PerformanceManagementShow;
