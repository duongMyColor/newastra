import { getDb } from '@/lib/globalObject';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  const prisma = getDb();

  return await new BaseRepo(prisma.aplicationMaster).getAll();
};

export const getOneById = async (id: number) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.aplicationMaster).getOneById(id);
};

export const getManyByIds = async (ids: number[]) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.aplicationMaster).getManyByIds(ids);
};

export const getUpdateData = async (
  lastSyncDate: Date | string,
  bundleId: string
) => {
  const prisma = getDb();

  return await prisma.aplicationMaster.findUnique({
    where: {
      updatedAt: {
        gt: lastSyncDate,
      },
      packageName: bundleId,
    },
  });
};

export const getOneByBundleId = async (bundleId: string) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.aplicationMaster).getOneByCondition({
    packageName: bundleId,
  });
};
