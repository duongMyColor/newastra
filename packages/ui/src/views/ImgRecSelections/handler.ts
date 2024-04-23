import { ImgRecSelectionPostIF, RAFile } from '@repo/types/imgRecSelection';
import { convertRASingleFileWithRaw } from '@repo/utils/fileUtils';

const getPostData = (values: ImgRecSelectionPostIF) => {
  return getPostDataWithFile(values);
};

const getPostDataWithFile = async (
  values: ImgRecSelectionPostIF
): Promise<FormData> => {
  const formData = new FormData();
  const { src } = await convertRASingleFileWithRaw(values.pictures as RAFile);
  formData.append('img', src as File);
  Object.entries(values).forEach(([key, value]) => {
    if (!formData.has(key)) {
      formData.append(key, value as string);
    }
  });

  return formData;
};

export { getPostData };
