import { TextInput, ShowBase, Title, useShowContext } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import {
  boxStyles,
  disabledInputBackgroundStyle,
  textareaStyles,
} from '@repo/styles';

const TermsOfUseManagementPreview = () => {
  const { record } = useShowContext();
  console.log(':::record', record);

  return (
    <div
      style={textareaStyles}
      dangerouslySetInnerHTML={{ __html: record?.content }}
    />
  );
};

const TermsOfUseManagementShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const { record } = useShowContext();
  console.log(':::record', record);

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
            <TextInput
              source="publishedDate"
              label="公開開始日"
              disabled
              fullWidth
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="createdAt"
              label="登録日時"
              disabled
              fullWidth
              sx={disabledInputBackgroundStyle}
            />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default TermsOfUseManagementShow;
