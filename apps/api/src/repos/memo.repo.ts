import { MemoIF } from '@repo/types/memo';
import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';

const model = prisma.memo;

const getAll = async () => {
  return await new BaseRepo(model).getAll();
};

const getOneById = async (id: number) => {
  return await new BaseRepo(model).getOneById(id);
};

const getOneByUserId = async (userId: number) => {
  const res = await prisma.memo.findFirst({
    where: {
      animalId: {
        equals: userId,
      },
    },
  });
  return res;
};

const insert = async (payload: MemoIF) => {
  return await new BaseRepo(model).insert(payload);
};

const updateById = async ({ id, payload }: { id: number; payload: MemoIF }) => {
  return await new BaseRepo(model).updateById({ id, payload });
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
  getOneByUserId,
  deleteManyById,
};
