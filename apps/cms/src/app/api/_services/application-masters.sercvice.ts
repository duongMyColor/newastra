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

class ApplicationMasterFactory {
  static async create({ payload }: { payload: AplicationMasterPostIF }) {
    return await new ApplicationMaster(payload).create();
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

  static async updateById({
    id,
    payload,
  }: {
    id: number;
    payload: AplicationMasterPostIF;
  }) {
    return await new ApplicationMaster(payload).updateById({ id });
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
  public updatedAt?: string | Date;

  public constructor({
    appName,
    packageName,
    termsOfUseID,
    licenseID,
    assetBundleIOS,
    assetBundleAndroid,
    outlineUrl,
  }: AplicationMasterPostIF) {
    this.appName = appName;
    this.packageName = packageName;
    this.termsOfUseID = termsOfUseID;
    this.licenseID = licenseID;
    this.assetBundleIOS = assetBundleIOS;
    this.assetBundleAndroid = assetBundleAndroid;
    this.outlineUrl = outlineUrl;
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
