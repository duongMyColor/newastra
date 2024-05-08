import { TermOfUsePostIF } from '@repo/types/termOfUse';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

const model = prisma.license;

const getAll = async () => {
  return await new BaseRepo(model).getAll();
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

const getManyReference = async (params: GetManyReferenceParams) => {
  return new BaseRepo(model).getManyReference(params);
};

const getOneById = async (id: number) => {
  return await new BaseRepo(model).getOneById(id);
};

const insert = async (payload: TermOfUsePostIF) => {
  await new BaseRepo(prisma.idLastestOfRecord).updateIdLastestOfRecord({
    record: 'license',
  });
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (body: TermOfUsePostIF[]) => {
  return await new BaseRepo(model).insertMany(body);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: TermOfUsePostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (updates: TermOfUsePostIF[]) => {
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
  count,
};
