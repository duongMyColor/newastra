import {
  TextInput,
  Create,
  SelectInput,
  FileInput,
  FileField,
  useCreate,
  useNotify,
} from 'react-admin';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { TermOfUseResponseIF } from '@repo/types/termOfUse';
import { LicenseResponseIF } from '@repo/types/license';
import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RAFile, RecordValue } from '@repo/types/general';
import { REDIRECT_ROUTE } from '@repo/consts/general';
import { useEffect, useState } from 'react';
import { uploadMuiltpart } from '@repo/utils/multipartUpload';
import { convertToFormData } from '@repo/utils/formData';

const MasterCreate = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const [create] = useCreate();
  const [termsOfUseIDs, setTermsOfUseIDs] = useState([]);
  const [licenseIDs, setLicenseIDs] = useState([]);

  const extractFile = (value: RAFile): File => {
    return value.rawFile;
  };

  const handleSave = async (values: RecordValue) => {
    const encryptKey = CryptoJS.lib.WordArray.random(16).toString();

    const { assetBundleIOS, assetBundleAndroid, ...rest } = values;

    console.log({ ...rest });

    const assetBundleIOSFile = extractFile(assetBundleIOS);
    const assetBundleAndroidFile = extractFile(assetBundleAndroid);

    const keyIOS = await uploadMuiltpart(assetBundleIOSFile, encryptKey);
    const keyAndroid = await uploadMuiltpart(
      assetBundleAndroidFile,
      encryptKey
    );

    const req = {
      ...rest,
      encryptKey,
      assetBundleIOS: keyIOS,
      assetBundleAndroid: keyAndroid,
    };

    try {
      const formData = convertToFormData(req, ['outlineUrl']);

      const data = await create(resource, {
        data: formData,
      });

      notify('成功: アプリケーション マスターが正常に作成されました', {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify(
        'エラー: アプリケーション マスターの作成に失敗しました: ' + error,
        {
          type: 'warning',
        }
      );
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
    <Create
      redirect={REDIRECT_ROUTE.list}
      title="アプリケーションマスタ　新规作成"
    >
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
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
          label="ライセンスID"
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
          <FileField source="src" title="title" />
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
    </Create>
  );
};

export default MasterCreate;
