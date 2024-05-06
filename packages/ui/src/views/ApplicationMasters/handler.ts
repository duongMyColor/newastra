import { encryptFile } from '@repo/utils/fileUtils';
import dataProvider from '../../../../../apps/cms/src/providers/dataProviders/dataProvider';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const uploadMuiltpart = async (file: File, encryptKey: string) => {
  const encryptedFile = await encryptFile(file, encryptKey);
  const timeStamp = new Date().getTime();
  const key = `${UPLOAD_FOLDER_MAP.applicationMaster}/${timeStamp}/${file.name}`;
  return key;
};

export const tempUploadMuiltpart = async (file: File, encryptKey: string) => {
  const encryptedFile = await encryptFile(file, encryptKey);
  const timeStamp = new Date().getTime();
  const key = `${UPLOAD_FOLDER_MAP.applicationMaster}/${timeStamp}/${file.name}`;
  const parts = [];

  const {
    data: {
      json: { key: resKey, uploadId },
    },
  } = await dataProvider.multipartUpload('POST', 'mpu-create', {
    key,
  });

  for (let i = 0; i < encryptedFile.length; i += CHUNK_SIZE) {
    const chunk = encryptedFile.slice(i, i + CHUNK_SIZE);
    const partNumber = i / CHUNK_SIZE + 1;
    const {
      data: { json: uploadedPart },
    } = dataProvider.multipartUpload('PUT', 'mpu-uploadpart', {
      body: {
        key: resKey,
        uploadId,
        partNumberString: partNumber.toString(),
        part: chunk,
      },
    });

    parts.push(uploadedPart);
  }

  await dataProvider.multipartUpload('POST', 'mpu-complete', {
    key: resKey,
    uploadId,
    parts,
  });

  return key;
};
