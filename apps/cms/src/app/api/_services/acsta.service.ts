import { AcstaPostIF } from '@repo/types/acsta';
import {
  getAll,
  getOneById,
  insert,
  insertMany,
  updateById,
  updateManyById,
  deleteById,
  deleteManyById,
  getAllWithQuery,
  getAllWithFilters,
  getManyReference,
} from '../_repos/acsta.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import { putObject } from '@/lib/cloudflare-r2';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
class AcstaFactory {
  // static async create({ payload }: { payload: FormData }) {
  //   const paylodObj = convertFormDataToObject(payload);

  //   const body = await new UploadFileService(
  //     paylodObj as AcstaPostIF
  //   ).uploadFile();

  //   return await new AcstaPostIF(body).create();
  // }

  static async createMany(body: AcstaPostIF[]) {
    const payload = body.map(
      (acsta_and_conditions) => new Acsta(acsta_and_conditions)
    );
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }

  static async getAll() {
    return await getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await getAllWithQuery({ filter, range, sort });
  }

  static async getAllWithFilters({ filter, range, sort }: GetAllQueryIF) {
    return await getAllWithFilters({ filter, range, sort });
  }

  static async getManyReference(params: GetManyReferenceParams) {
    return await getManyReference(params);
  }

  // static async updateById({ id, payload }: { id: number; payload: FormData }) {
  //   const paylodObj = convertFormDataToObject(payload);

  //   const body = await new UploadFileService(
  //     paylodObj as AcstaPostIF
  //   ).uploadFile();

  //   return await new AcstaPostIF(body).updateById({ id });
  // }

  static async updateMany(updates: AcstaPostIF[]) {
    const payload = updates.map((update) => new Acsta(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class Acsta implements AcstaPostIF {
  public id?: number;
  public managementName: string;
  public acstaName: string;
  public status: string;
  public applicationID: number;
  public thumbnailUrl: string;
  public scanImageUrl: string;
  public acstaBasicInfoID: number;
  public scanOriginX: GLfloat;
  public scanOriginY: GLfloat;
  public scanWidth: GLfloat;
  public scanHeight: GLfloat;
  public scanColors: string;
  public modeId: number;
  public dateStart: string | Date;
  public dateEnd: string | Date;
  public updatedAt: string | Date;

  public constructor({
    managementName,
    acstaName,
    status,
    applicationID,
    thumbnailUrl,
    scanImageUrl,
    acstaBasicInfoID,
    scanOriginX,
    scanOriginY,
    scanWidth,
    scanHeight,
    scanColors,
    modeId,
    dateStart,
    dateEnd,
  }: AcstaPostIF) {
    this.acstaName = acstaName.toString();
    this.managementName = managementName.toString();
    this.status = status.toString();
    this.thumbnailUrl = thumbnailUrl.toString();
    this.scanImageUrl = scanImageUrl.toString();
    this.applicationID = applicationID;
    this.acstaBasicInfoID = acstaBasicInfoID;
    this.scanOriginX = scanOriginX;
    this.scanOriginY = scanOriginY;
    this.scanWidth = scanWidth;
    this.scanHeight = scanHeight;
    this.scanColors = scanColors;

    this.modeId = modeId;
    this.dateStart = new Date(dateStart).toISOString();
    this.dateEnd = new Date(dateEnd).toISOString();
    this.dateStart = new Date(dateStart).toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public async create() {
    const payload: AcstaPostIF = this;
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: AcstaPostIF = this;
    return await updateById({ id, payload });
  }
}

// class UploadFileService {
//   private object: AcstaPostIF;

//   constructor(object: AcstaPostIF) {
//     this.object = object;
//   }

//   private async uploadToR2() {
//     for (const key in this.object) {
//       console.log('::: key', typeof this.object[key]);

//       if (typeof this.object[key] == 'object') {
//         const file = this.object[key];
//         const fileName = file?.name;
//         console.log('::: fileName', fileName);

//         const objKey = `${UPLOAD_FOLDER_MAP.license}/${fileName}`;
//         const buffer = await file.arrayBuffer();
//         console.log('::: buffer', buffer);

//         this.object[key] = await putObject(objKey, buffer);
//       }
//     }

//     return this.object;
//   }

//   public uploadFile() {
//     return this.uploadToR2();
//   }
// }

export default AcstaFactory;
