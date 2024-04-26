import { TextInput, ShowBase, Title, useShowContext } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { useState } from 'react';
import { boxStyles, bgColorDisiable } from '@repo/styles';

const TermsOfUseManagementShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const { record } = useShowContext();
  console.log('record', record);
  const [fileContent, setFileContent] = useState('');

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="利用規約管理　参照" />
          <CustomForm pathTo={resourcePath} showCancelButton={true}>
            <TextInput
              source="termOfUseId"
              label="利用規約ID"
              fullWidth
              disabled
              sx={bgColorDisiable}
            />
            <TextInput
              source="version"
              label="バージョン"
              disabled
              fullWidth
              sx={bgColorDisiable}
            />
            <TextInput
              source="memo"
              label="メモ"
              disabled
              fullWidth
              sx={bgColorDisiable}
            />
            <textarea
              style={{
                width: '100%',
                height: 300,
                padding: '12px 20px',
                boxSizing: 'border-box',
                borderRadius: 4,
                backgroundColor: '#f8f8f8',
                fontSize: 16,
                resize: 'none',
              }}
              value={fileContent}
              disabled
            ></textarea>
            <TextInput
              source="dateStart"
              label="公開開始日"
              disabled
              fullWidth
              sx={bgColorDisiable}
            />
            <TextInput
              source="dateRegistration"
              label="登録日時"
              disabled
              fullWidth
              sx={bgColorDisiable}
            />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default TermsOfUseManagementShow;
