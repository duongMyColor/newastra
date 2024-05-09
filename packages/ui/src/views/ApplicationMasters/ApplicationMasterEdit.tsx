import {
  TextInput,
  SelectInput,
  EditBase,
  Title,
  FileInput,
  FileField,
  useNotify,
  useUpdate,
  useEditContext,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserEdition } from './formValidator';
import { useNavigate } from 'react-router-dom';

import { BaseComponentProps, RAFile, RecordValue } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles } from '@repo/styles';
import { LicenseResponseIF } from '@repo/types/license';
import { TermOfUseResponseIF } from '@repo/types/termOfUse';
import { useEffect, useState } from 'react';
import { convertToFormData } from '@repo/utils/formData';
import { uploadMuiltpart } from '@repo/utils/multipartUpload';

const MasterEditForm = ({
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const { record } = useEditContext();

  const notify = useNotify();
  const navigate = useNavigate();
  const [update] = useUpdate();
  const [termsOfUseIDs, setTermsOfUseIDs] = useState([]);
  const [licenseIDs, setLicenseIDs] = useState([]);

  const extractFile = (value: RAFile): File => {
    return value.rawFile;
  };

  const handleSave = async (values: RecordValue) => {
    const encryptKey = record.encryptKey;

    const { assetBundleIOS, assetBundleAndroid, ...rest } = values;

    if (assetBundleIOS.rawFile) {
      const assetBundleIOSFile = extractFile(assetBundleIOS);
      const keyIOS = await uploadMuiltpart(assetBundleIOSFile, encryptKey);
      rest.assetBundleIOS = keyIOS;
    }

    if (assetBundleAndroid.rawFile) {
      const assetBundleAndroidFile = extractFile(assetBundleAndroid);
      const keyAndroid = await uploadMuiltpart(
        assetBundleAndroidFile,
        encryptKey
      );
      rest.assetBundleAndroid = keyAndroid;
    }

    try {
      const formData = convertToFormData(rest, ['outlineUrl']);

      await update(resource, {
        id: record.id,
        data: formData,
        previousData: record,
      });

      notify('成功: アプリケーション マスターを正常に更新しました', {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: アプリケーション マスターの更新に失敗しました:' + error, {
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    const getTermOfUseAndLicense = async () => {
      const termsOfUses = await dataProvider.getAll('term-of-uses');
      const licenses = await dataProvider.getAll('licenses');

      setTermsOfUseIDs(
        termsOfUses.map(({ id, version }: TermOfUseResponseIF) => {
          return { id, name: `${id} : バージョン${version}` };
        })
      );

      setLicenseIDs(
        licenses.map(({ id, version }: LicenseResponseIF) => {
          return { id, name: `${id} : バージョン${version}` };
        })
      );
    };

    getTermOfUseAndLicense();
  }, []);

  return (
    <>
      <Title title="アプリケーションマスタ　編集" />
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserEdition}
        showSaveButton={true}
        showReferenceButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextInput
          source="appName"
          label="アプリケーション名"
          isRequired
          fullWidth
        />

        <SelectInput
          source="termsOfUseID"
          choices={termsOfUseIDs}
          isRequired
          label="利用規約ID"
        />
        <SelectInput
          source="licenseID"
          choices={licenseIDs}
          isRequired
          label="椎ライセンスID限"
        />
        <TextInput
          source="packageName"
          label="バンドルID/パッケージ名"
          fullWidth
          isRequired
        />
        <FileInput
          source="assetBundleIOS"
          label="iOS用共通アセットバンドル"
          placeholder="アップロード"
        >
          <FileField source="src" title="src" />
        </FileInput>

        <FileInput
          source="assetBundleAndroid"
          label="Android用共通アセットバンドル"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="outlineUrl"
          label="アクスタ枠データパス"
          placeholder="アップロード"
          accept={'image/*'}
        >
          <FileField source="src" title="title" />
        </FileInput>
      </CustomForm>
    </>
  );
};

const MasterEdit = (props: BaseComponentProps) => {
  return (
    <Box sx={boxStyles}>
      <EditBase>
        <MasterEditForm {...props} />
      </EditBase>
    </Box>
  );
};

export default MasterEdit;
