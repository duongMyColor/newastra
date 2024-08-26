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
import { UPDATED_SUCCESS } from '@repo/consts/general';

const MasterEditForm = ({ resource, dataProvider }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  let { record } = useEditContext();

  const notify = useNotify();
  const navigate = useNavigate();
  const [termsOfUseIds, settermsOfUseIds] = useState([]);
  const [licenseIDs, setLicenseIDs] = useState([]);

  const extractFile = (value: RAFile): File => {
    return value.rawFile;
  };

  const handleSave = async (values: RecordValue) => {
    const [checkPackageName, checkAppName] = await Promise.all([
      dataProvider.checkExistName(
        'application-masters',
        values.packageName,
        'packageName'
      ),
      dataProvider.checkExistName(
        'application-masters',
        values.appName,
        'appName'
      ),
    ]);

    if (
      checkPackageName.data?.packageName &&
      values.packageName !== record.packageName
    ) {
      notify('バンドルID/パッケージ名はすでに存在します', {
        type: 'warning',
      });
      return false;
    }

    if (checkAppName.data?.appName && values.appName !== record.appName) {
      notify('アプリケーション名はすでに存在します', {
        type: 'warning',
      });
      return false;
    }

    const { assetDataIOS, assetDataAndroid, assetDataOutlineUrl, ...rest } =
      values;

    record.appName = values.appName;
    record.packageName = values.packageName;

    if (assetDataIOS?.rawFile) {
      const assetBundleIOSFile = extractFile(assetDataIOS);
      const keyIOS = await uploadMuiltpart(assetBundleIOSFile);
      rest.assetBundleIOS = keyIOS;
      record.assetDataIOS = values.assetDataIOS;
    }

    if (assetDataAndroid?.rawFile) {
      const assetBundleAndroidFile = extractFile(assetDataAndroid);
      const keyAndroid = await uploadMuiltpart(assetBundleAndroidFile);
      rest.assetBundleAndroid = keyAndroid;

      record.assetDataAndroid = values.assetDataAndroid;
    }
    if (assetDataOutlineUrl?.rawFile) {
      rest.outlineUrl = values.assetDataOutlineUrl;
      record.assetDataOutlineUrl = values.assetDataOutlineUrl;
    }

    try {
      const formData = convertToFormData(rest, ['outlineUrl']);

      await dataProvider.update(resource, {
        id: record.id,
        data: formData,
        previousData: record,
      });

      await notify(UPDATED_SUCCESS, {
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

      settermsOfUseIds(
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
          source="termsOfUseId"
          choices={termsOfUseIds}
          isRequired
          label="利用規約ID"
        />
        <SelectInput
          source="licenseId"
          choices={licenseIDs}
          isRequired
          label="ライセンスID"
        />
        <TextInput
          source="packageName"
          label="バンドルID/パッケージ名"
          fullWidth
          isRequired
        />
        <FileInput
          source="assetDataIOS"
          label="iOS用共通アセットバンドル*"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="assetDataAndroid"
          label="Android用共通アセットバンドル*"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="assetDataOutlineUrl"
          label="アクスタ枠データパス*"
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
