import { PerformanceMasterPostIF } from '@repo/types/performanceMaster';
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
} from '../_repos/performanceMaster.repo';
import { GetAllQueryIF } from '@repo/types/response';

class PerformanceMasterFactory {
  static async create({ payload }: { payload: PerformanceMasterPostIF }) {
    return await new PerformanceMaster(payload).create();
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
    payload: PerformanceMasterPostIF;
  }) {
    return await new PerformanceMaster(payload).updateById({ id });
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

class PerformanceMaster implements PerformanceMasterPostIF {
  public typeName: string;
  public updatedAt: string | Date;

  public constructor({ typeName }: PerformanceMasterPostIF) {
    this.typeName = typeName;
    this.updatedAt = new Date().toISOString();
  }

  public async create() {
    const payload: PerformanceMasterPostIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: PerformanceMasterPostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default PerformanceMasterFactory;
