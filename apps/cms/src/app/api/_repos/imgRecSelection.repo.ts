import { ImgRecSelectionPostIF } from '@repo/types/imgRecSelection';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';

const model = prisma.imgRecSelection;

const getAll = async () => {
  return await new BaseRepo(model).getAll();
};

const getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithQuery({ sort, range, filter });
};
const getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithFilters({ sort, range, filter });
};

const getOneById = async (id: number) => {
  return await new BaseRepo(model).getOneById(id);
};

const insert = async (payload: ImgRecSelectionPostIF) => {
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (animals: ImgRecSelectionPostIF[]) => {
  return await new BaseRepo(model).insertMany(animals);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: ImgRecSelectionPostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (updates: ImgRecSelectionPostIF[]) => {
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
};
