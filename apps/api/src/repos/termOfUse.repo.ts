import { getDb } from '@/lib/globalObject';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  const prisma = getDb();

  return await new BaseRepo(prisma.termsOfUse).getAll();
};

export const getCurrentTermOfUse = async () => {
  const prisma = getDb();

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
  const prisma = getDb();
  return await new BaseRepo(prisma.termsOfUse).getOneById(id);
};
