import { getDb } from '@/lib/globalObject';
import { BaseRepo } from './base/base.repo';

export const getAll = async () => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getAll();
};

export const getAllByAcstaId = async (acstaId: number) => {
  const prisma = getDb();

  return await prisma.performaceManagement.findMany({
    where: {
      acstaId: acstaId,
    },
  });
};

export const getOneById = async (id: number) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getOneById(id);
};

export const getManyByIds = async (ids: number[]) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getManyByIds(ids);
};

// export const getOneByAcstaId = async (acstaId: number) => {
//   const prisma = getDb();
//   return await prisma.aplicationMaster.findFirst({
//     where: {
//       acstaId: acstaId,
//     },
//   });
// };

export const getUpdateData = async (lastSyncDate: Date | string) => {
  const prisma = getDb();

  return await new BaseRepo(prisma.performaceManagement).getUpdated(
    lastSyncDate
  );
};
