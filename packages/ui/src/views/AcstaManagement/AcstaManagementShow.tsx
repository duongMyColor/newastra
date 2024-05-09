import {
  TextInput,
  ShowBase,
  Title,
  SimpleShowLayout,
  ImageField,
  useGetRecordId,
  useShowContext,
  SimpleForm,
} from 'react-admin';
import { Box, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

import CustomForm from '@repo/ui/src/components/CustomForm';
import { StatusTextField } from '@repo/ui/src/components/CustomField/StatusTextField';
import { ScanDataField } from '@repo/ui/src/components/CustomField/ScanDataField';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';
import RectEditor from './RectEditor/RectEditor';

import { validRole } from '../_core/permissions';
import {
  disabledInputBackgroundStyle,
  boxStyles,
  imageFieldStyles,
} from '@repo/styles';
import dataProvider from '../../../../../apps/cms/src/providers/dataProviders/dataProvider';

import { BaseComponentProps } from '@repo/types/general';
import { RectData } from '@repo/types/rectangleEditor';
import extractColorDistribution from './scanImage';

const RectEditorArea = ({
  moveScanRange,
  resource,
  recordId,
}: {
  moveScanRange: () => void;
  resource: string;
  recordId: string | number;
}) => {
  const { record } = useShowContext();
  const scanImageUrl = record.scanImageUrl;
  const pathTo = `/${resource}/${recordId}/show`;
  const [rectPosition, setRectPosition] = useState<RectData>({
    originX: 0,
    originY: 0,
    width: 0,
    height: 0,
  });

  const saveRectData = async () => {
    // const res = await dataProvider.updateScanData(
    //   {
    //     ...rectPosition,
    //   },
    //   recordId
    // );

    const result = await extractColorDistribution(
      scanImageUrl,
      rectPosition.originX,
      rectPosition.originY,
      rectPosition.width,
      rectPosition.height
    );
    console.log({ result });
  };

  const onChange = (data: RectData) => {
    console.log(data);

    setRectPosition(data);
  };

  return (
    <SimpleForm warnWhenUnsavedChanges={true} toolbar={false}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        width="100%"
        height="100%"
        gap={3}
        alignItems="center"
      >
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveRectData}
        >
          保存
        </Button>
      </Stack>

      <RectEditor
        imagePath={scanImageUrl}
        data={record.data}
        onChange={onChange}
      ></RectEditor>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        width="100%"
        sx={{
          backgroundColor: '#f1f1f1',
          padding: '1rem',
          borderRadius: '4px',
          marginTop: '1rem',
        }}
      >
        <Link to={pathTo}>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={moveScanRange}
          >
            戻る
          </Button>
        </Link>
      </Stack>
    </SimpleForm>
  );
};

const AcstaManagementShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const recordId = useGetRecordId();
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
            <RectEditorArea
              moveScanRange={moveScanRange}
              resource={resource}
              recordId={recordId}
            />
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
                source="applicationID"
                label="利用規約ID"
                disabled
                fullWidth
                sx={disabledInputBackgroundStyle}
              />

              <SimpleShowLayout spacing={3}>
                <ImageField
                  source="thumbnailUrl"
                  label="アクスタサムネイル"
                  sx={imageFieldStyles}
                />
              </SimpleShowLayout>

              <ScanDataField
                source="scanImageUrl"
                moveScanRange={moveScanRange}
              ></ScanDataField>

              <StatusTextField source="status"></StatusTextField>

              <FormatInputDateShow label="公開開始日" source="dateStart" />
              <FormatInputDateShow label="公開終了日" source="dateEnd" />
              <FormatInputDateShow label="登録日時" source="createdAt" />

              <TextInput
                source="acstaBasicInfoID"
                label="力士基本情報ID"
                disabled
                sx={disabledInputBackgroundStyle}
                fullWidth
              />
            </CustomForm>
          )}
        </>
      </ShowBase>
    </Box>
  );
};

export default AcstaManagementShow;
