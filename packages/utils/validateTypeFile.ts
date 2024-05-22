
import { ACCEPT_TYPE_FILE } from '@repo/consts/general';

export const validateTypeFile = async (
  file: string
) => {

    if(!file)return

    const typeFile = file?.split('.')?.pop()
   return ACCEPT_TYPE_FILE.includes(`${typeFile}`)

};
