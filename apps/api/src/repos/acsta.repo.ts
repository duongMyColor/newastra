import { getDb } from '@/lib/globalObject';

import { BaseRepo } from './base/base.repo';
const child = 'performace';

export const getAll = async () => {
  const prisma = getDb();
  return await new BaseRepo(prisma.acstaManagement).getAllAndChild(
    'performace'
  );
};

export const getAllByAppId = async (applicationId: number) => {
  const prisma = getDb();

  return await prisma.acstaManagement.findMany({
    include: {
      [child]: true,
    },
    where: {
      applicationId: applicationId,
    },
  });
};

export const getOneById = async (id: number, applicationId: number) => {
  const prisma = getDb();
  return await prisma.acstaManagement.findFirst({
    where: {
      id: id,
      applicationId: applicationId,
    },
    include: {
      [child]: true,
    },
  });
};

export const getManyByAppId = async (applicationId: number) => {
  const prisma = getDb();
  return await prisma.acstaManagement.findMany({
    where: {
      applicationId: applicationId,
    },
  });
};

export const getManyByIds = async (ids: number[], applicationId: number) => {
  const prisma = getDb();

  return await prisma.acstaManagement.findMany({
    where: {
      id: {
        in: ids,
      },
      applicationId: applicationId,
    },
  });
};

export const getManyByIdsAndChildren = async (
  ids: number[],
  applicationId: number
) => {
  const prisma = getDb();
  return await prisma.acstaManagement.findMany({
    where: {
      id: {
        in: ids,
      },
      applicationId: applicationId,
    },
    include: {
      [child]: true,
    },
  });
};

export const getUpdateData = async (
  lastSyncDate: Date | string,
  applicationId: number
) => {
  const prisma = getDb();

  return await prisma.acstaManagement.findMany({
    where: {
      updatedAt: {
        gt: lastSyncDate,
      },
      applicationId: applicationId,
    },
    include: {
      performace: true,
    },
  });
};
