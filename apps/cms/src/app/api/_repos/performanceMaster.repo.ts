import { PerformanceMasterPostIF } from '@repo/types/performanceMaster';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';

const model = prisma.performaceTypeMaster;
const relationFieldName = 'ProductDetail';

const getAll = async () => {
  return await new BaseRepo(model).getAll();
};

const getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithQuery({ sort, range, filter });
};

const getOneById = async (id: number) => {
  return await new BaseRepo(model).getOneById(id);
};

// const getByIdWithDetail = async (id: number) => {
//   const product = awai tmodel.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       ProductDetail: true,
//     },
//   });
//   return product;
// };

const insert = async (payload: PerformanceMasterPostIF) => {
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (products: PerformanceMasterPostIF[]) => {
  return await new BaseRepo(model).insertMany(products);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: PerformanceMasterPostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (
  updates: { id: number; data: PerformanceMasterPostIF }[]
) => {
  return await new BaseRepo(model).updateManyById(updates);
};

const deleteById = async (id: number) => {
  return await new BaseRepo(model).deleteById(id);
};

const deleteWithRelation = async (id: number) => {
  return await new BaseRepo(model).deleteWithRelation(id, relationFieldName);
};

const deleteManyById = async (ids: number[]) => {
  return await new BaseRepo(model).deleteManyById(ids);
};

export {
  getAll,
  getOneById,
  insert,
  updateById,
  deleteById,
  // getByIdWithDetail,
  updateManyById,
  insertMany,
  getAllWithQuery,
  deleteManyById,
  deleteWithRelation,
};
