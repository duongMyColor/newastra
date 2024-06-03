import {
  TextInput,
  ShowBase,
  Title,
  SimpleShowLayout,
  ImageField,
  useGetRecordId,
} from 'react-admin';
import { Box } from '@mui/material';
import { useState } from 'react';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { StatusTextField } from '@repo/ui/src/components/CustomField/StatusTextField';
import { ScanDataField } from '@repo/ui/src/components/CustomField/ScanDataField';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';
import RectEditorArea from './RectEditorArea';

import { validRole } from '../_core/permissions';
import {
  disabledInputBackgroundStyle,
  boxStyles,
  imageFieldStyles,
} from '@repo/styles';

import { BaseComponentProps } from '@repo/types/general';

const AcstaManagementShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const [isScanRange, setIsScanRange] = useState<boolean>(false);

  const moveScanRange = () => {
    setIsScanRange(!isScanRange);
  };

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title
            title={
              isScanRange
                ? 'アクスタ管理　スキャン範囲指定'
                : 'アクスタ管理　参照'
            }
          />

          {isScanRange ? (
            <RectEditorArea moveScanRange={moveScanRange} resource={resource} />
          ) : (
            <CustomForm
              pathTo={resourcePath}
              showEditButton={validRole('edit', actions)}
              showCancelButton={true}
            >
              <TextInput
                source="id"
                label="アクスタ ID"
                disabled
                sx={disabledInputBackgroundStyle}
              />

              <TextInput
                source="managementName"
                label="管理名"
                disabled
                fullWidth
                sx={disabledInputBackgroundStyle}
              />
              <TextInput
                source="acstaName"
                label="アクスタ名"
                disabled
                fullWidth
                sx={disabledInputBackgroundStyle}
              />

              <TextInput
                source="applicationId"
                label="アプリケーションID"
                disabled
                fullWidth
                sx={disabledInputBackgroundStyle}
              />

              <SimpleShowLayout spacing={3}>
                <ImageField
                  source="thumbnailUrl.src"
                  label="アクスタサムネイル"
                  sx={imageFieldStyles}
                />
              </SimpleShowLayout>

              <ScanDataField
                source="scanImageUrl.src"
                moveScanRange={moveScanRange}
              ></ScanDataField>

              <StatusTextField source="status"></StatusTextField>

              <FormatInputDateShow label="公開開始日" source="dateStart" />
              <FormatInputDateShow label="公開終了日" source="dateEnd" />
              <FormatInputDateShow label="登録日時" source="createdAt" />

              {/* <TextInput
                source="acstaBasicInfoId"
                label="力士基本情報ID"
                disabled
                sx={disabledInputBackgroundStyle}
                fullWidth
              /> */}
            </CustomForm>
          )}
        </>
      </ShowBase>
    </Box>
  );
};

export default AcstaManagementShow;
