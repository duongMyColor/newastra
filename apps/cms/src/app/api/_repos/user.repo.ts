import { UserIF } from '@repo/types/user';
import { prisma } from '@/lib/prisma';
import { exclude } from '@repo/utils/excludeKey';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { RecordValue } from '@repo/types/general';

const model = prisma.user;

const getAll = async () => {
  const res = (await new BaseRepo(model).getAll()).map((user: UserIF) =>
    exclude(user, ['password'])
  );

  return res;
};

const count = async () => {
  return await new BaseRepo(model).count();
};

const getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
  const res = (
    await new BaseRepo(model).getAllWithQueryAndSafety({ sort, range, filter })
  ).map((user: UserIF) => exclude(user, ['password']));

  return res;
};

const getOneById = async (id: number) => {
  const res = exclude(await new BaseRepo(model).getOneById(id), ['password']);

  return res;
};

const getOneWithParam = async (params: RecordValue) => {
  const res = await new BaseRepo(model).getOneWithParam(params);
  return res;
};

const getPermission = async (userId: number) => {
  const res = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });

  return res;
};

const insert = async (payload: UserIF) => {
  return await new BaseRepo(model).insert(payload);
};

const insertMany = async (users: UserIF[]) => {
  return await new BaseRepo(model).insertMany(users);
};

const updateManyById = async (updates: { id: number; data: UserIF }[]) => {
  return await new BaseRepo(model).updateManyById(updates);
};

const updateLastLogin = async ({ id }: { id: number }) => {
  return await new BaseRepo(model).updateById({
    id,
    payload: { lastLogin: new Date() },
  });
};

const updateById = async ({ id, payload }: { id: number; payload: UserIF }) => {
  return await new BaseRepo(model).updateById({ id, payload });
};

const deleteById = async (id: number) => {
  return await new BaseRepo(model).deleteById(id);
};

const deleteManyById = async (ids: number[]) => {
  return await new BaseRepo(model).deleteManyById(ids);
};

const safetyDeleteById = async (id: number) => {
  return await new BaseRepo(model).safetyDeleteById(id);
};

const safetyDeleteManyById = async (ids: number[]) => {
  return await new BaseRepo(model).safetyDeleteManyById(ids);
};

export {
  getAll,
  getOneById,
  insert,
  updateById,
  deleteById,
  insertMany,
  updateManyById,
  getAllWithQuery,
  deleteManyById,
  getOneWithParam,
  getPermission,
  safetyDeleteById,
  safetyDeleteManyById,
  count,
  updateLastLogin,
};
