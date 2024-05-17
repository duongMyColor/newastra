import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  return await new BaseRepo(prisma.aplicationMaster).getAll();
};

export const getOneById = async (id: number) => {
  return await new BaseRepo(prisma.aplicationMaster).getOneById(id);
};

export const getManyByIds = async (ids: number[]) => {
  return await new BaseRepo(prisma.aplicationMaster).getManyByIds(ids);
};
