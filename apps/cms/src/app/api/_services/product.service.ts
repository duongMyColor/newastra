import { ProductPostIF } from '@repo/types/product';
import {
  getAll,
  getOneById,
  insert,
  updateById,
  deleteById,
  getByIdWithDetail,
  deleteManyById,
  deleteWithRelation,
  getAllWithQuery,
} from '../_repos/product.repo';
import { GetAllQueryIF } from '@repo/types/response';

class ProductFactory {
  static async create({ payload }: { payload: ProductPostIF }) {
    return await new Product(payload).create();
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }

  static async getByIdWithDetail(id: number) {
    return await getByIdWithDetail(id);
  }

  static async getAll() {
    return await getAll();
  }
  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await getAllWithQuery({ filter, range, sort });
  }

  static async updateById({
    id,
    payload,
  }: {
    id: number;
    payload: ProductPostIF;
  }) {
    return await new Product(payload).updateById({ id });
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteWithRelation(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class Product implements ProductPostIF {
  public name: string;
  public masterCategory: number;
  public subCategory: number;

  public constructor({ name, masterCategory, subCategory }: ProductPostIF) {
    this.name = name;
    this.masterCategory = masterCategory;
    this.subCategory = subCategory;
  }

  public async create() {
    const payload: ProductPostIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: ProductPostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default ProductFactory;
