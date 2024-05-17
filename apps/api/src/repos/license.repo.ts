import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  return await new BaseRepo(prisma.license).getAll();
};

export const getCurrentLicense = async () => {
  const currentLicense = await prisma.license.findFirst({
    where: {
      publishedDate: {
        lt: new Date(),
      },
    },
    orderBy: {
      publishedDate: 'desc',
    },
  });

  return currentLicense;
};

export const getOneById = async (id: number) => {
  return await new BaseRepo(prisma.license).getOneById(id);
};
