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
import { Box } from '@mui/material';
import {
  boxStyles,
  disabledInputBackgroundStyle,
  textareaStyles,
} from '@repo/styles';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { useState } from 'react';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';
import ButtonPreviewFile from '@repo/ui/src/components/ButtonPreviewFile';


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
            <ButtonPreviewFile />
            <FormatInputDateShow label="公開開始日" typeDate="publishedDate" />
            <FormatInputDateShow label="登録日時" typeDate="createdAt" />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default TermsOfUseManagementShow;
