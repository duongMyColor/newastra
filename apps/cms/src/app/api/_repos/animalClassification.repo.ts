import { AnimalClassificationPostIF } from '@repo/types/animal';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';

const model = prisma.animalClassification;
const relationFieldName = 'animals';

const getAll = async () => {
  return await new BaseRepo(model).getAll();
};

const getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
  return await new BaseRepo(model).getAllWithQuery({ sort, range, filter });
};

const getOneById = async (id: number) => {
  return await new BaseRepo(model).getOneById(id);
};

const getByIdWithDetail = async (id: number) => {
  const animalclassification = await prisma.animalClassification.findUnique({
    where: {
      id: id,
    },
    include: {
      animals: true,
    },
  });
  return animalclassification;
};

const insert = async (payload: AnimalClassificationPostIF) => {
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (
  animalclassifications: AnimalClassificationPostIF[]
) => {
  return await new BaseRepo(model).insertMany(animalclassifications);
};

const updateById = async ({
  id,
  payload,
}: {
  id: number;
  payload: AnimalClassificationPostIF;
}) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const updateManyById = async (
  updates: { id: number; data: AnimalClassificationPostIF }[]
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
  getByIdWithDetail,
  updateManyById,
  insertMany,
  getAllWithQuery,
  deleteManyById,
  deleteWithRelation,
};
