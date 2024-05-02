import { PerformancePostIF } from '@repo/types/product';
import {
  getAll,
  getOneById,
  insert,
  insertMany,
  updateById,
  updateManyById,
  deleteById,
  deleteManyById,
} from '../_repos/performance.repo';

class ProductDetailFactory {
  static async create({ payload }: { payload: PerformancePostIF }) {
    return await new ProductDetail(payload).create();
  }

  static async createMany(products: PerformancePostIF[]) {
    const payload = products.map((product) => new ProductDetail(product));
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }

  static async getAll() {
    return await getAll();
  }

  static async updateById({
    id,
    payload,
  }: {
    id: number;
    payload: PerformancePostIF;
  }) {
    return await new ProductDetail(payload).updateById({ id });
  }

  static async updateMany(updates: PerformancePostIF[]) {
    const payload = updates.map((update) => new ProductDetail(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class ProductDetail implements PerformancePostIF {
  public id?: number;
  public name: string;
  public performanceTypeMasterID: number;
  public assetBundleIOS: string;
  public acstaID: number;
  public assetBundleAndroid: string;
  public updatedAt: string | Date;

  public constructor({
    name,
    performanceTypeMasterID,
    assetBundleIOS,
    acstaID,
    assetBundleAndroid,
  }: PerformancePostIF) {
    this.name = name;
    this.performanceTypeMasterID = performanceTypeMasterID;
    this.assetBundleIOS = assetBundleIOS;
    this.acstaID = acstaID;
    this.assetBundleAndroid = assetBundleAndroid;
    this.updatedAt = new Date();
  }

  public async create() {
    const payload: PerformancePostIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: PerformancePostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default ProductDetailFactory;
