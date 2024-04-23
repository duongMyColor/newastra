import { AnimalPostIF } from '@repo/types/animal';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

const model = prisma.animal;
const child = 'memo';
const parent = 'classification';

const getAll = async () => {
  return await new BaseRepo(model).getAll();
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

const getOneAndParent = async (id: number) => {
  return await new BaseRepo(model).getOneByIdWithParam(id, {
    include: {
      classification: true,
    },
  });
};

const getOneAndChildren = async (id: number, child: string) => {
  return await new BaseRepo(model).getOneByIdWithParam(id, {
    include: {
      [child]: true,
    },
  });
};

const getOneAndChildAndParent = async (id: number) => {
  return await new BaseRepo(model).getOneByIdWithParam(id, {
    include: {
      [child]: true,
      [parent]: true,
    },
  });
};

const insert = async (payload: AnimalPostIF) => {
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (animals: AnimalPostIF[]) => {
  return await new BaseRepo(model).insertMany(animals);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: AnimalPostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (updates: AnimalPostIF[]) => {
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
  getOneAndParent,
  getOneAndChildren,
  getOneAndChildAndParent,
  getAllWithFilters,
  getManyReference,
};
