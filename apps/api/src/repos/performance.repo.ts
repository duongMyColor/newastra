import { getDb } from '@/lib/globalObject';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getAll();
};

export const getOneById = async (id: number) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getOneById(id);
};

export const getManyByIds = async (ids: number[]) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getManyByIds(ids);
};

export const getUpdateData = async (lastSyncDate: Date | string) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getUpdated(
    lastSyncDate
  );
};
