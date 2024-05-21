import { PerformanceTypeMasterPostIF } from '@repo/types/performanceTypeMaster';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import type { PrismaClient } from '@prisma/client/extension';

// const prisma = prisma.performaceTypeMaster;
const relationFieldName = 'Performance';

class PerformanceTypeMasterRepo {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = generateClient();
  }

  getAll = async () => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).getAll();
  };

  count = async () => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).getAllWithQuery(
      { sort, range, filter }
    );
  };
  getAllPerformanceTypeMaster = async ({
    sort,
    range,
    filter,
  }: GetAllQueryIF) => {
    return await new BaseRepo(
      this.prisma.performaceTypeMaster
    ).getAllPerformanceTypeMaster({
      sort,
      range,
      filter,
    });
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).getOneById(id);
  };

  // const getByIdWithDetail = async (id: number) => {
  //   const product = awai tmodel.findUnique({
  //     where: {
  //       id: id,
  //     },
  //     include: {
  //       Performance: true,
  //     },
  //   });
  //   return product;
  // };

  insert = async (payload: PerformanceTypeMasterPostIF) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).insert(payload);
  };

  insertMany = async (products: PerformanceTypeMasterPostIF[]) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).insertMany(
      products
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: PerformanceTypeMasterPostIF;
  }) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (
    updates: { id: number; data: PerformanceTypeMasterPostIF }[]
  ) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).updateManyById(
      updates
    );
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).deleteById(id);
  };

  deleteWithRelation = async (id: number) => {
    return await new BaseRepo(
      this.prisma.performaceTypeMaster
    ).deleteWithRelation(id, relationFieldName);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.performaceTypeMaster).deleteManyById(
      ids
    );
  };
}

export default new PerformanceTypeMasterRepo();
