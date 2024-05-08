import { AcstaPostIF } from '@repo/types/acsta';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

const model = prisma.acstaManagement;

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

const insert = async (payload: AcstaPostIF) => {
  await new BaseRepo(prisma.idLastestOfRecord).updateIdLastestOfRecord({
    record: 'acstaManagement',
  });
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (body: AcstaPostIF[]) => {
  return await new BaseRepo(model).insertMany(body);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: AcstaPostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (updates: AcstaPostIF[]) => {
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
