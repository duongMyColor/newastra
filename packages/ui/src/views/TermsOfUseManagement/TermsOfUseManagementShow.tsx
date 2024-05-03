import {
  TextInput,
  ShowBase,
  Title,
  useShowContext,
  FileField,
  useRecordContext,
  FunctionField,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box, TextField, Button } from '@mui/material';
import {
  boxStyles,
  disabledInputBackgroundStyle,
  textareaStyles,
} from '@repo/styles';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { useState } from 'react';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';

const TermsOfUseManagementPreview = () => {
  const record = useRecordContext();
  console.log(':::record fdgvfg', record);

  const previewFile = () => {
    const newTab = window.open('', '_blank') as Window;
    newTab.document.write(record.content);
    newTab.document.close();
  };

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      onClick={previewFile}
    >
      別タブでプレビュー
    </Button>
  );
};



const TermsOfUseManagementShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const record = useRecordContext();
  console.log(':::record show', record);

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="利用規約管理　参照" />
          <CustomForm pathTo={resourcePath} showCancelButton={true}>
            <TextInput
              source="id"
              label="利用規約ID"
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="version"
              label="バージョン"
              disabled
              fullWidth
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="memo"
              label="メモ"
              disabled
              fullWidth
              sx={disabledInputBackgroundStyle}
            />
            <TermsOfUseManagementPreview />
            <FormatInputDateShow label="公開開始日" typeDate="publishedDate" />
            <FormatInputDateShow label="登録日時" typeDate="createdAt" />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default TermsOfUseManagementShow;
