import { ProductDetailPostIF } from '@repo/types/product';
import {
  getAll,
  getOneById,
  insert,
  insertMany,
  updateById,
  updateManyById,
  deleteById,
  deleteManyById,
} from '../_repos/productDetail.repo';

class ProductDetailFactory {
  static async create({ payload }: { payload: ProductDetailPostIF }) {
    return await new ProductDetail(payload).create();
  }

  static async createMany(products: ProductDetailPostIF[]) {
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
    payload: ProductDetailPostIF;
  }) {
    return await new ProductDetail(payload).updateById({ id });
  }

  static async updateMany(updates: ProductDetailPostIF[]) {
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

class ProductDetail implements ProductDetailPostIF {
  public id?: number;
  public detailName: string;
  public id: number;
  public count: number;

  public constructor({ id, detailName, id, count }: ProductDetailPostIF) {
    this.detailName = detailName;
    this.id = id;
    this.count = count;
    this.id = id;
  }

  public async create() {
    const payload: ProductDetailPostIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: ProductDetailPostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default ProductDetailFactory;
