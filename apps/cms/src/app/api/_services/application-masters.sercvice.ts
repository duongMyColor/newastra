import { AplicationMasterPostIF } from '@repo/types/applicationMaster';
import {
  getAll,
  getOneById,
  insert,
  insertMany,
  updateById,
  updateManyById,
  deleteById,
  deleteManyById,
  getOneAndParent,
  getOneAndChildAndParent,
  getAllWithQuery,
  getAllWithFilters,
  getManyReference,
} from '../_repos/application-masters.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import UploadFileService from './upload.service';
import { UPLOAD_FOLDER_MAP } from '@repo/consts/general';

class ApplicationMasterFactory {
  static async create({ payload }: { payload: FormData }) {
    const paylodObj = convertFormDataToObject(payload);
    const timeStamps = new Date().getTime();
    const key = `${UPLOAD_FOLDER_MAP.applicationMaster}/${timeStamps}/${paylodObj.appName}`;

    const body = await new UploadFileService(
      paylodObj as AplicationMasterPostIF,
      key
    ).uploadFile();

    return await new ApplicationMaster(body).create();
  }

  static async createMany(animals: AplicationMasterPostIF[]) {
    const payload = animals.map((animal) => new ApplicationMaster(animal));
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await await getOneById(id);
  }
  static async getOneAndParent(id: number) {
    return await await getOneAndParent(id);
  }

  static async getOneAndChildAndParent(id: number) {
    return await await getOneAndChildAndParent(id);
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
    const timeStamps = new Date().getTime();
    const key = `${UPLOAD_FOLDER_MAP.applicationMaster}/${timeStamps}/${paylodObj.appName}`;

    const body = await new UploadFileService(
      paylodObj as AplicationMasterPostIF,
      key
    ).uploadFile();
    return await new ApplicationMaster(body).updateById({ id });
  }

  static async updateMany(updates: AplicationMasterPostIF[]) {
    const payload = updates.map((update) => new ApplicationMaster(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class ApplicationMaster implements AplicationMasterPostIF {
  public appName: string;
  public packageName: string;
  public termsOfUseID: number;
  public licenseID: string;
  public assetBundleIOS: string;
  public assetBundleAndroid: string;
  public outlineUrl: number;
  public encryptKey: string;
  public updatedAt?: string | Date;

  public constructor({
    appName,
    packageName,
    termsOfUseID,
    licenseID,
    assetBundleIOS,
    assetBundleAndroid,
    outlineUrl,
    encryptKey,
  }: AplicationMasterPostIF) {
    this.appName = appName;
    this.packageName = packageName;
    this.termsOfUseID = termsOfUseID;
    this.licenseID = licenseID;
    this.assetBundleIOS = assetBundleIOS;
    this.assetBundleAndroid = assetBundleAndroid;
    this.outlineUrl = outlineUrl;
    this.encryptKey = encryptKey;
    this.updatedAt = new Date().toISOString();
  }

  public async create() {
    const payload: AplicationMasterPostIF = this;

    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: AplicationMasterPostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default ApplicationMasterFactory;
