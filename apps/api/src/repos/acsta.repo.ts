import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  return await new BaseRepo(prisma.acstaManagement).getAllAndChild(
    'performace'
  );
};

export const getOneById = async (id: number) => {
  return await new BaseRepo(prisma.acstaManagement).getOneByIdAndChildren(
    id,
    'performace'
  );
};

export const getManyByIds = async (ids: number[]) => {
  return await new BaseRepo(prisma.acstaManagement).getManyByIds(ids);
};

export const getManyByIdsAndChildren = async (ids: number[]) => {
  return await new BaseRepo(prisma.acstaManagement).getManyAndChildrenByIds(
    ids,
    'performace'
  );
};
