import { BaseRepo } from './base/base.repo';
import { getDb } from '@/lib/globalObject';

export const getAll = async () => {
  const prisma = getDb();

  return await new BaseRepo(prisma.license).getAll();
};

export const getCurrentLicense = async () => {
  const prisma = getDb();

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
  const prisma = getDb();

  return await new BaseRepo(prisma.license).getOneById(id);
};
