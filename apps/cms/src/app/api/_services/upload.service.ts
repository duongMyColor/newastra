import { putObject } from '@/lib/cloudflare-r2';

class UploadFileService {
  private object: any;
  private keyPrefix: string;

  constructor(object: any, keyPrefix: string) {
    this.object = object;
    this.keyPrefix = keyPrefix;
  }

  private async uploadToR2() {
    for (const key in this.object) {
      console.log('::: key', typeof this.object[key]);

      if (typeof this.object[key] == 'object') {
        const file = this.object[key];
        const fileName = file?.name;
        const timestamp = new Date().getTime();
        const objKey = `${this.keyPrefix}/${timestamp}/${fileName}`;
        const buffer = await file.arrayBuffer();

        this.object[key] = await putObject(objKey, buffer);
      }
    }

    return this.object;
  }

  public uploadFile() {
    return this.uploadToR2();
  }
}

export default UploadFileService;
