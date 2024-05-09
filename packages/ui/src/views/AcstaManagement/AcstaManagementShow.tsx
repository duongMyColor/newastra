import {
  TextInput,
  ShowBase,
  Title,
  SimpleShowLayout,
  ImageField,
  useGetRecordId,
  useShowContext,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { useState } from 'react';
import { StatusTextField } from '@repo/ui/src/components/CustomField/StatusTextField';
import { ScanDataField } from '@repo/ui/src/components/CustomField/ScanDataField';
import {
  disabledInputBackgroundStyle,
  boxStyles,
  imageFieldStyles,
} from '@repo/styles';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';
import RectEditor from './RectEditor/RectEditor';
import { RectData } from '@repo/types/rectangleEditor';

const RectEditorArea = ({
  onChange,
}: {
  onChange: (data: RectData) => void;
}) => {
  const { record } = useShowContext();
  const scanImageUrl = record.scanImageUrl;

  return (
    <RectEditor
      imagePath={scanImageUrl}
      data={record.data}
      onChange={onChange}
    ></RectEditor>
  );
};

const AcstaManagementShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const [rectPosition, setRectPosition] = useState<RectData>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const recordId = useGetRecordId();
  const [isScanRange, setIsScanRange] = useState<boolean>(false);

  const moveScanRange = () => {
    setIsScanRange(!isScanRange);
  };

  const onChange = (data: RectData) => {
    console.log( data );

    setRectPosition(data);
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
            <CustomForm
              pathTo={`/${resource}/${recordId}/show`}
              showSaveButton={true}
              showCancelButton={true}
              moveScanRange={moveScanRange}
            >
              <RectEditorArea onChange={onChange} />
            </CustomForm>
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
