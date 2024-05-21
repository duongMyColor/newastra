import { UserIF } from '@repo/types/user';
import { generateClient } from '@/lib/prisma';
import { exclude } from '@repo/utils/excludeKey';
import { BaseRepo } from './base/base.repo';
import type { PrismaClient } from '@prisma/client/extension';

// const this.prisma.bootUpdate = prisma.bootUpdate;

class BootUpdateRepo {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = generateClient();
  }
  getAll = async () => {
    const res = (await new BaseRepo(this.prisma.bootUpdate).getAll()).map(
      (user: UserIF) => exclude(user, ['password'])
    );

    return res;
  };

  count = async () => {
    return await new BaseRepo(this.prisma.bootUpdate).count();
  };

  insertMany = async (users: UserIF[]) => {
    return await new BaseRepo(this.prisma.bootUpdate).insertMany(users);
  };

  updateById = async ({ id }: { id: number }) => {
    return await new BaseRepo(this.prisma.bootUpdate).updateById({
      id,
      payload: { updateAt: new Date() },
    });
  };

  updateByTableName = async (tableName: string) => {
    return await this.prisma.bootUpdate.update({
      where: {
        tableName: tableName,
      },
      data: { updatedAt: new Date() },
    });
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.bootUpdate).deleteById(id);
  };
}

export default new BootUpdateRepo();
