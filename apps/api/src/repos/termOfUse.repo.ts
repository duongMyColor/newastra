import { prisma } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  return await new BaseRepo(prisma.termsOfUse).getAll();
};

export const getCurrentTermOfUse = async () => {
  const currentLicense = await prisma.termsOfUse.findFirst({
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
  return await new BaseRepo(prisma.termsOfUse).getOneById(id);
};
