import { convertRASingleFileWithRaw } from '@repo/utils/fileUtils';
// import dataProvider from '../../providers/dataProviders/dataProvider';
import { FieldValues } from 'react-hook-form';
import { RecordValue } from '@repo/types/general';
import { DataProvider } from 'react-admin';

const appendDataToFormData = (formData: FormData, data: RecordValue) => {
  const { gender, feedType, ...otherData } = data;

  formData.append('gender', gender && Number(gender));
  formData.append('feedType', feedType && Number(feedType));

  Object.entries(otherData).forEach(([key, value]) => {
    if (!formData.has(key)) {
      formData.append(key, value as string);
    }
  });
};

const getPostDataWithFile = async (values: FieldValues): Promise<FormData> => {
  const { pictures, ...data } = values;

  const formData = new FormData();

  if (pictures) {
    const { title, src } = await convertRASingleFileWithRaw(pictures);
    formData.append('thumbImg', src as File);
    formData.append('thumbImgName', title);
  }

  appendDataToFormData(formData, data);

  return formData;
};

const uploadFileToS3ViaPresignedUrl = async (
  values: FieldValues,
  dataProvider: DataProvider
): Promise<FormData> => {
  const { pictures, ...data } = values;
  const formData = new FormData();

  if (pictures) {
    const { title, src } = await convertRASingleFileWithRaw(pictures);

    const key = `animal/${title}`;

    const {
      data: { presignedUrl },
    } = await dataProvider.getPutPresignedUrl('upload/presigned_url', {
      data: {
        fileKey: key,
      },
    });

    if (!presignedUrl) {
      throw new Error('Failed to get presigned url');
    }

    await dataProvider.putObjectViaPresignedUrl(presignedUrl, {
      body: src,
      type: (src as File).type,
    });

    formData.append('thumbImg', key);
    formData.append('thumbImgName', title);
  }

  appendDataToFormData(formData, data);

  return formData;
};

const getPostData = (
  values: FieldValues,
  cancelEdit: boolean = false,
  isEditting: boolean = false,
  dataProvider: DataProvider
) => {
  if (!isEditting) {
    delete values.thumbImg;
    delete values.thumbImgName;
  }

  if (cancelEdit) {
    delete values.pictures;
  }

  switch (values.uploadType) {
    case 'DB':
    case 'LOCAL':
      return getPostDataWithFile(values);
    case 'S3':
      return uploadFileToS3ViaPresignedUrl(values, dataProvider);
  }
};

export { getPostData };
