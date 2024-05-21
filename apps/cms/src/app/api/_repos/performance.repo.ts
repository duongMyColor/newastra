import { PerformancePostIF } from '@repo/types/performance';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import type { PrismaClient } from '@prisma/client/extension';

// const this.prisma.performaceManagement = prisma.performaceManagement;

class PerformanceRepo {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = generateClient();
  }

  getAll = async () => {
    return await new BaseRepo(this.prisma.performaceManagement).getAll();
  };

  count = async () => {
    return await new BaseRepo(this.prisma.performaceManagement).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.performaceManagement).getAllWithQuery(
      { sort, range, filter }
    );
  };

  getAllAndParent = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.performaceManagement).getAllWithParm({
      sort,
      range,
      filter,
      include: {
        performanceTypeMaster: true,
        acsta: true,
      },
    });
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(this.prisma.performaceManagement).getOneById(id);
  };
  getOneAndParent = async (id: number) => {
    return await new BaseRepo(
      this.prisma.performaceManagement
    ).getOneByIdWithParam(id, {
      include: {
        performanceTypeMaster: true,
        acsta: true,
      },
    });
  };

  insert = async (payload: PerformancePostIF) => {
    await new BaseRepo(this.prisma.idLastestOfRecord).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(this.prisma.performaceManagement).insert(payload);
  };

  insertMany = async (products: PerformancePostIF[]) => {
    console.log('products: ', products);

    return await new BaseRepo(this.prisma.performaceManagement).insertMany(
      products
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: PerformancePostIF;
  }) => {
    return await new BaseRepo(this.prisma.performaceManagement).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: PerformancePostIF[]) => {
    return await new BaseRepo(this.prisma.performaceManagement).updateManyById(
      updates
    );
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.performaceManagement).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.performaceManagement).deleteManyById(
      ids
    );
  };
}

export default new PerformanceRepo();
