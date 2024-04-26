import {
  TextInput,
  ShowBase,
  Title,
  TextField,
  SimpleShowLayout,
  useRecordContext,
  ImageInput,
  ImageField,
  useGetRecordId,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { useState } from 'react';
import { StatusTextField } from '@repo/ui/src/components/CustomField/StatusTextField';
import { ScanDataField } from '@repo/ui/src/components/CustomField/ScanDataField';
import { bgColorDisiable, boxStyles } from '@repo/styles';
const AxtaManagementShow = ({ actions, resource }: BaseComponentProps) => {
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
          <Title title="アクスタ管理　参照" />

          {isScanRange ? (
            <>
              <CustomForm
                pathTo={`/${resource}/${recordId}/show`}
                showSaveButton={true}
                showCancelButton={true}
                moveScanRange={moveScanRange}
              >
                <Box
                  sx={{
                    width: '100%',
                    minHeight: '400px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      minHeight: '300px',
                      border: 'dotted ',
                      width: '200px',
                      position: 'relative',
                    }}
                  >
                    <ImageField
                      source="scanData"
                      title="title"
                      sx={{
                        '& .RaImageField-image': {
                          position: 'absolute',
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </CustomForm>
            </>
          ) : (
            <CustomForm
              pathTo={resourcePath}
              showEditButton={validRole('edit', actions)}
              showCancelButton={true}
            >
              <TextInput
                source="acstaId"
                label="アクスタ ID"
                disabled
                sx={bgColorDisiable}
              />

              <TextInput
                source="managementName"
                label="管理名"
                disabled
                sx={bgColorDisiable}
              />
              <TextInput
                source="acstaName"
                label="アクスタ名"
                disabled
                sx={bgColorDisiable}
              />

              <TextInput
                source="appId"
                label="利用規約ID"
                disabled
                sx={bgColorDisiable}
              />
              <SimpleShowLayout spacing={3}>
                <TextField
                  source="acstaThumbnail"
                  label="アクスタサムネイル"
                  disabled
                  sx={bgColorDisiable}
                />
              </SimpleShowLayout>
              <ScanDataField
                source="scanData"
                moveScanRange={moveScanRange}
              ></ScanDataField>

              <StatusTextField source="status"></StatusTextField>

              <TextInput
                source="dateStart"
                label="公開開始日"
                disabled
                sx={bgColorDisiable}
              />

              <TextInput
                source="dateEnd"
                label="公開終了日"
                disabled
                sx={bgColorDisiable}
              />
              <TextInput
                source="dataRegistration"
                label="登録日時"
                disabled
                sx={bgColorDisiable}
              />

              <TextInput
                source="SumoId"
                label="力士基本情報ID"
                disabled
                sx={bgColorDisiable}
              />
            </CustomForm>
          )}
        </>
      </ShowBase>
    </Box>
  );
};

export default AxtaManagementShow;
