import { UserIF } from '@repo/types/user';
import { prisma } from '@/lib/prisma';
import { exclude } from '@repo/utils/excludeKey';
import { BaseRepo } from './base/base.repo';

const model = prisma.bootUpdate;

const getAll = async () => {
  const res = (await new BaseRepo(model).getAll()).map((user: UserIF) =>
    exclude(user, ['password'])
  );

  return res;
};

const count = async () => {
  return await new BaseRepo(model).count();
};

const insertMany = async (users: UserIF[]) => {
  return await new BaseRepo(model).insertMany(users);
};

const updateById = async ({ id }: { id: number }) => {
  return await new BaseRepo(model).updateById({
    id,
    payload: { updateAt: new Date() },
  });
};

const updateByTableName = async (tableName: string) => {
  return await prisma.bootUpdate.update({
    where: {
      tableName: tableName,
    },
    data: { updatedAt: new Date() },
  });
};

const deleteById = async (id: number) => {
  return await new BaseRepo(model).deleteById(id);
};

export { getAll, updateById, deleteById, insertMany, count, updateByTableName };
