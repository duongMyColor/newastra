import { getDb } from '@/lib/globalObject';
import { BaseRepo } from './base/base.repo';
import {getCurrentDate} from '@repo/utils/currentDate'


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
      dateStart: {
        lte: getCurrentDate(),
      },
      OR: [
        {
          dateEnd: {
            gte: getCurrentDate(),
          },
        },
        {
          dateEnd: {
            equals: null,
          },
        },
      ],
      applicationId: applicationId,
      isDeleted: false,
    },
  });
};

export const getOneById = async (id: number, applicationId: number) => {
  const prisma = getDb();
  return await prisma.acstaManagement.findFirst({
    where: {
      id: id,
      applicationId: applicationId,
      isDeleted: false,
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
      isDeleted: false,
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
      isDeleted: false,
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
      isDeleted: false,
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
      dateStart: {
        lte: getCurrentDate(),
      },
      OR: [
        {
          dateEnd: {
            gte: getCurrentDate(),
          },
        },
        {
          dateEnd: {
            equals: null,
          },
        },
      ],
      updatedAt: {
        gt: lastSyncDate,
      },
      applicationId: applicationId,
      isDeleted: false,
    },
    include: {
      performace: true,
    },
  });
};
