import { generateFileName } from '@repo/utils/fileUtils';
import { createClient } from '@supabase/supabase-js';

const UPLOAD_SOURCE = 'uploads';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const downloadFileRaw = async (path: string): Promise<Blob> => {
  const { data, error } = await supabase.storage
    .from(UPLOAD_SOURCE)
    .download(path);

  return data as Blob;
};

const downloadFile = async (path: string) => {
  let url;

  try {
    const { data, error } = await supabase.storage
      .from(UPLOAD_SOURCE)
      .download(path);
    if (error) {
      throw error;
    }

    url = URL.createObjectURL(data);
  } catch (error) {
    console.log('Error downloading image: ', error);
  }

  return url;
};

const uploadFile = async (file: File, fileName: string, folder: string) => {
  let filePath;
  try {
    filePath = `${folder}/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from(UPLOAD_SOURCE)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }
  } catch (error) {
    console.log('Error uploading file: ', error);
  } finally {
    return filePath;
  }
};

export { downloadFile, uploadFile, supabase, downloadFileRaw };
