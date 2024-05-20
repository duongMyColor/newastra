import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  return await new BaseRepo(prisma.performaceManagement).getAll();
};

export const getOneById = async (id: number) => {
  return await new BaseRepo(prisma.performaceManagement).getOneById(id);
};

export const getManyByIds = async (ids: number[]) => {
  return await new BaseRepo(prisma.performaceManagement).getManyByIds(ids);
};

export const getUpdateData = async (lastSyncDate: Date | string) => {
  return await new BaseRepo(prisma.performaceManagement).getUpdated(
    lastSyncDate
  );
};
