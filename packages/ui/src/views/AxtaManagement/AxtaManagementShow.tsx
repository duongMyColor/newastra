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



const AxtaManagementShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const recordId = useGetRecordId();

  const [isScanRange, setIsScanRange] = useState<boolean>(false);

  console.log(`/${resource}/${recordId}/show`);
  const moveScanRange = () => {
    setIsScanRange(!isScanRange);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        WebkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderRadius: '4px',
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        marginTop: '1em',
      }}
    >
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
              <TextInput source="acstaId" label="アクスタ ID" disabled />

              <TextInput source="managementName" label="管理名" disabled />
              <TextInput source="acstaName" label="アクスタ名" disabled />

              <TextInput source="appId" label="利用規約ID" disabled />
              <SimpleShowLayout spacing={3}>
                <TextField
                  source="acstaThumbnail"
                  label="アクスタサムネイル"
                  disabled
                />
              </SimpleShowLayout>
              <ScanDataField
                source="scanData"
                moveScanRange={moveScanRange}
              ></ScanDataField>

              <StatusTextField source="status"></StatusTextField>

              <TextInput source="dateStart" label="公開開始日" disabled />

              <TextInput source="dateEnd" label="公開終了日" disabled />
              <TextInput source="dataRegistration" label="登録日時" disabled />

              <TextInput source="SumoId" label="力士基本情報ID" disabled />
            </CustomForm>
          )}
        </>
      </ShowBase>
    </Box>
  );
};

export default AxtaManagementShow;
