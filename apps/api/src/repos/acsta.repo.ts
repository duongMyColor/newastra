import { BaseRepo } from './base/base.repo';
import { getDb } from '@/lib/globalObject';

export const getAll = async () => {
  const prisma = getDb();
  return await new BaseRepo(prisma.acstaManagement).getAllAndChild(
    'performace'
  );
};

export const getOneById = async (id: number) => {
  const prisma = getDb();
  return await new BaseRepo(prisma.acstaManagement).getOneByIdAndChildren(
    id,
    'performace'
  );
};

export const getManyByIds = async (ids: number[]) => {
  const prisma = getDb();
  return await new BaseRepo(prisma.acstaManagement).getManyByIds(ids);
};

export const getManyByIdsAndChildren = async (ids: number[]) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.acstaManagement).getManyAndChildrenByIds(
    ids,
    'performace'
  );
};

export const getUpdateData = async (lastSyncDate: Date | string) => {
  const prisma = getDb();
  const include = {
    performace: true,
  };
  return await new BaseRepo(prisma.acstaManagement).getUpdated(
    lastSyncDate,
    include
  );
};
