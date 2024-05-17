import { PerformanceTypeMasterPostIF } from '@repo/types/performanceTypeMaster';
import {
  getAll,
  getOneById,
  insert,
  updateById,
  deleteById,
  // getByIdWithDetail,
  deleteManyById,
  deleteWithRelation,
  getAllWithQuery,
} from '../repos/performanceTypeMaster.repo';
import { GetAllQueryIF } from '@repo/types/response';

class PerformanceTypeMasterFactory {
  static async create({ payload }: { payload: PerformanceTypeMasterPostIF }) {
    return await new PerformanceTypeMaster(payload).create();
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }

  // static async getByIdWithDetail(id: number) {
  //   return await getByIdWithDetail(id);
  // }

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
    payload: PerformanceTypeMasterPostIF;
  }) {
    return await new PerformanceTypeMaster(payload).updateById({ id });
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

class PerformanceTypeMaster implements PerformanceTypeMasterPostIF {
  public typeName: string;
  public updatedAt: string | Date;

  public constructor({ typeName }: PerformanceTypeMasterPostIF) {
    this.typeName = typeName;
    this.updatedAt = new Date().toISOString();
  }

  public async create() {
    const payload: PerformanceTypeMasterPostIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: PerformanceTypeMasterPostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default PerformanceTypeMasterFactory;
