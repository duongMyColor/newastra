import { ForcedUpdateManagementPostIF } from '@repo/types/forceUpdateManagement';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { prisma } from '@/lib/prisma';

const model = prisma.forcedUpdateManagement;

const getAll = async () => {
  return await new BaseRepo(model).getAll();
};
const getAllParen = async () => {
  return await new BaseRepo(model).getAllParen({
    include: {
      aplicationMaster: true,
    },
  });
};

const count = async () => {
  return await new BaseRepo(model).count();
};

const getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithQuery({ sort, range, filter });
};
const getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithFilters({ sort, range, filter });
};
const getAllAndParentWithFilters = async ({
  sort,
  range,
  filter,
}: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithParm({
    sort,
    range,
    filter,
    include: {
      aplicationMaster: true,
    },
  });
};

const getManyReference = async (params: GetManyReferenceParams) => {
  return new BaseRepo(model).getManyReference(params);
};

const getOneById = async (id: number) => {
  return await new BaseRepo(model).getOneById(id);
};
const getOneAndParent = async (id: number) => {
  return await new BaseRepo(model).getOneByIdWithParam(id, {
    include: {
      aplicationMaster: true,
    },
  });
};

const insert = async (payload: ForcedUpdateManagementPostIF) => {
  await new BaseRepo(prisma.idLastestOfRecord).updateIdLastestOfRecord({
    record: payload.record,
  });
  delete payload.record;
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (body: ForcedUpdateManagementPostIF[]) => {
  return await new BaseRepo(model).insertMany(body);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: ForcedUpdateManagementPostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (updates: ForcedUpdateManagementPostIF[]) => {
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
  getOneById,
  insert,
  updateById,
  deleteById,
  updateManyById,
  insertMany,
  getAllWithQuery,
  deleteManyById,
  getAllWithFilters,
  getManyReference,
  getOneAndParent,
  getAllAndParentWithFilters,
  getAllParen,
  count,
};
