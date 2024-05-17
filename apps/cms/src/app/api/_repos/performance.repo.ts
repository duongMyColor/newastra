import { PerformancePostIF } from '@repo/types/performance';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';

const model = prisma.performaceManagement;

const getAll = async () => {
  return await new BaseRepo(model).getAll();
};

const count = async () => {
  return await new BaseRepo(model).count();
};

const getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithQuery({ sort, range, filter });
};

const getAllAndParent = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithParm({
    sort,
    range,
    filter,
    include: {
      performanceTypeMaster: true,
      acsta: true,
    },
  });
};

const getOneById = async (id: number) => {
  return await new BaseRepo(model).getOneById(id);
};
const getOneAndParent = async (id: number) => {
  return await new BaseRepo(model).getOneByIdWithParam(id, {
    include: {
      performanceTypeMaster: true,
      acsta: true,
    },
  });
};

const insert = async (payload: PerformancePostIF) => {
  await new BaseRepo(prisma.idLastestOfRecord).updateIdLastestOfRecord({
    record: payload.record,
  });
  delete payload.record;
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (products: PerformancePostIF[]) => {
  console.log('products: ', products);

  return await new BaseRepo(model).insertMany(products);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: PerformancePostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (updates: PerformancePostIF[]) => {
  return await new BaseRepo(model).updateManyById(updates);
};

const deleteById = async (id: number) => {
  return await new BaseRepo(model).deleteById(id);
};

const deleteManyById = async (ids: number[]) => {
  return await new BaseRepo(model).deleteManyById(ids);
};

export {
  getAll,
  count,
  getOneById,
  insert,
  updateById,
  deleteById,
  updateManyById,
  insertMany,
  getAllWithQuery,
  deleteManyById,
  getOneAndParent,
  getAllAndParent,
};
