import { ForcedUpdateManagementPostIF } from '@repo/types/forceUpdateManagement';
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
} from '../_repos/forcedUpdateManagement.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';
import UploadFileService from './upload.service';

class ForcedUpdateManagementFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);
    return await new ForcedUpdateManagement(
      paylodObj as ForcedUpdateManagementPostIF
    ).create();
  }

  static async createMany(body: ForcedUpdateManagementPostIF[]) {
    const payload = body.map(
      (terms_and_conditions) => new ForcedUpdateManagement(terms_and_conditions)
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

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);

    const body = await new UploadFileService().uploadFile(
      paylodObj as ForcedUpdateManagementPostIF,
      UPLOAD_FOLDER_MAP.termOfUse
    );

    return await new ForcedUpdateManagement(body).updateById({ id });
  }

  static async updateMany(updates: ForcedUpdateManagementPostIF[]) {
    const payload = updates.map((update) => new ForcedUpdateManagement(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class ForcedUpdateManagement implements ForcedUpdateManagementPostIF {
  public id?: number;
  public managementName: string;
  public version: string;
  public operateSystem: string;
  public publishedDate: string | Date;
  public updatedAt: string;
  public record?: string;

  public constructor({
    version,
    managementName,
    operateSystem,
    publishedDate,
    record,
  }: ForcedUpdateManagementPostIF) {
    this.version = version.toString();
    this.managementName = managementName;
    this.operateSystem = operateSystem;
    this.publishedDate = new Date(publishedDate).toISOString();
    this.updatedAt = new Date().toISOString();
    this.record = record;
  }

  public async create() {
    const payload: ForcedUpdateManagementPostIF = this;
    payload['operateSystem'] = payload['operateSystem'].toString();
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: ForcedUpdateManagementPostIF = this;
    return await updateById({ id, payload });
  }
}

export default ForcedUpdateManagementFactory;
