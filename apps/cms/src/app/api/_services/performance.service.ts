import { PerformancePostIF } from '@repo/types/performance';
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
  getOneAndParent,
  getAllAndParent,
} from '../_repos/performance.repo';
import { GetAllQueryIF } from '@repo/types/response';
import UploadFileService from './upload.service';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
import { convertFormDataToObject } from '@repo/utils/objectUtils';

class PerformanceFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as PerformancePostIF,
      UPLOAD_FOLDER_MAP.applicationMaster
    );

    return await new Performance(body).create();
  }

  static async createMany(products: PerformancePostIF[]) {
    const payload = products.map((product) => new Performance(product));
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }
  static async getOneAndParent(id: number) {
    return await await getOneAndParent(id);
  }

  static async getAllAndParent({ filter, range, sort }: GetAllQueryIF) {
    return await await getAllAndParent({ filter, range, sort });
  }

  static async getAll() {
    return await getAll();
  }
  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await getAllWithQuery({ filter, range, sort });
  }

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);
    const timeStamps = new Date().getTime();
    const key = `${UPLOAD_FOLDER_MAP.applicationMaster}/${timeStamps}/${paylodObj.appName}`;

    const body = await new UploadFileService().uploadFile(
      paylodObj as PerformancePostIF,
      UPLOAD_FOLDER_MAP.applicationMaster
    );
    return await new Performance(body).updateById({ id });
  }

  static async updateMany(updates: PerformancePostIF[]) {
    const payload = updates.map((update) => new Performance(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class Performance implements PerformancePostIF {
  public id?: number;
  public name: string;
  public performanceTypeMasterId: number;
  public assetBundleIOS: string;
  public acstaId: number;
  public encryptKey: string;
  public assetBundleAndroid: string;
  public updatedAt: string | Date;
  public record?: string;

  public constructor({
    name,
    performanceTypeMasterId,
    assetBundleIOS,
    acstaId,
    encryptKey,
    assetBundleAndroid,
    record,
  }: PerformancePostIF) {
    this.name = name;
    this.performanceTypeMasterId = performanceTypeMasterId;
    this.assetBundleIOS = assetBundleIOS;
    this.acstaId = acstaId;
    this.assetBundleAndroid = assetBundleAndroid;
    this.encryptKey = encryptKey;
    this.updatedAt = new Date();
    this.record = record;
  }

  public async create() {
    const payload: PerformancePostIF = this;

    console.log({ payload });
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: PerformancePostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default PerformanceFactory;
