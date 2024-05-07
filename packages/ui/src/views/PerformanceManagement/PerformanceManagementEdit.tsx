import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  SelectInput,
  EditBase,
  Title,
  usePermissions,
  FileInput,
  FileField,
  DateInput,
  useDataProvider,
  useUpdate,
  useRecordContext,
  useNotify,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { useNavigate } from 'react-router-dom';
import { validateUserCreation, validateUserEdition } from './formValidator';
import { BaseComponentProps, RAFile, RecordValue } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { boxStyles } from '@repo/styles';
import { useEffect, useState } from 'react';
import { AcstaResponseIF } from '@repo/types/acsta';
import { PerformanceTypeMasterResponseIF } from '@repo/types/performanceTypeMaster';
import { convertToFormData } from '@repo/utils/formData';
import { uploadMuiltpart } from '@repo/utils/multipartUpload';

interface typeFormSelected {
  id: string;
  name: string;
}

const PerformanceEditForm = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const dataProvider = useDataProvider();
  const [acstaId, setAcstaId] = useState<Array<typeFormSelected>>([]);
  const [performanceTypeMasterId, setPerformanceTypeMasterId] = useState<
    Array<typeFormSelected>
  >([]);
  const notify = useNotify();
  const [update] = useUpdate();
  const navigate = useNavigate();
  const record = useRecordContext();

  const extractFile = (value: RAFile): File => {
    return value.rawFile;
  };
  const handleUpdate = async (values: RecordValue) => {
    console.log('handle values;', values);
    const { assetDataAndroid, assetDataIOS, encryptKey, ...rest } = values;

    if (assetDataAndroid.rawFile) {
      const assetBundleAndroidFile = extractFile(assetDataAndroid);
      const keyAndroid = await uploadMuiltpart(
        assetBundleAndroidFile,
        encryptKey
      );
      rest.assetBundleAndroid = keyAndroid;
    }

    if (assetDataIOS.rawFile) {
      const assetBundleIOSFile = extractFile(assetDataIOS);

      const keyIOS = await uploadMuiltpart(assetBundleIOSFile, encryptKey);
      rest.assetBundleIOS = keyIOS;
    }

    try {
      const formData = convertToFormData(rest);

      const data = await update(resource, {
        id: values.id,
        data: formData,
        previousData: record,
      });

      notify('Success: Create Application Master successffuly', {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify('Error: Create Application Master failed: ' + error, {
        type: 'warning',
      });
    }
  };

  const fetchIdLastest = async () => {
    const setIdAcstaFunc = async () => {
      const resAcstaId = await dataProvider.getAll('acstas');
      setAcstaId(
        resAcstaId.map(({ id }: AcstaResponseIF) => {
          return { id, name: id };
        })
      );
    };

    const setPerformanceTypeMasterIdFunc = async () => {
      const resPerformanceTypeMasterId = await dataProvider.getAll(
        'performance-type-masters'
      );

      setPerformanceTypeMasterId(
        resPerformanceTypeMasterId.map(
          ({ id, typeName }: PerformanceTypeMasterResponseIF) => {
            return { id, name: `${id} :${typeName}` };
          }
        )
      );
    };

    await Promise.all([setIdAcstaFunc(), setPerformanceTypeMasterIdFunc()]);
  };
  useEffect(() => {
    fetchIdLastest();
  }, []);
  return (
    <>
      <Title title="演出管理　編集" />
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserEdition}
        showSaveButton={true}
        showReferenceButton={true}
        showCancelButton={true}
        handleSave={handleUpdate}
      >
        <TextInput source="id" label="演出ID" isRequired fullWidth />
        <TextInput source="name" label="演出名" fullWidth isRequired />

        <SelectInput
          source="performanceTypeMasterID"
          choices={performanceTypeMasterId}
          fullWidth
          isRequired
          label="演出種別ID"
        />

        <FileInput
          source="assetDataIOS"
          label="アセットバンドルデータ (iOS)"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="assetDataAndroid"
          label="アセットバンドルデータ (Android)"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <SelectInput
          source="acstaID"
          choices={acstaId}
          fullWidth
          isRequired
          label="アクスタ ID"
        />
      </CustomForm>
    </>
  );
};

const PerformanceManagementEdit = (props: BaseComponentProps) => {
  return (
    <Box sx={boxStyles}>
      <EditBase>
        <PerformanceEditForm {...props} />
      </EditBase>
    </Box>
  );
};

export default PerformanceManagementEdit;
