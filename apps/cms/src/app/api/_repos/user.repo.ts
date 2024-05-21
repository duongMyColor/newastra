import { UserIF } from '@repo/types/user';
import { generateClient } from '@/lib/prisma';
import { exclude } from '@repo/utils/excludeKey';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { RecordValue } from '@repo/types/general';
import type { PrismaClient } from '@prisma/client/extension';

// const this.prisma.user = prisma.user;

class UserRepo {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = generateClient();
  }

  getAll = async () => {
    const res = (await new BaseRepo(this.prisma.user).getAll()).map(
      (user: UserIF) => exclude(user, ['password'])
    );

    return res;
  };

  count = async () => {
    return await new BaseRepo(this.prisma.user).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    const res = (
      await new BaseRepo(this.prisma.user).getAllWithQueryAndSafety({
        sort,
        range,
        filter,
      })
    ).map((user: UserIF) => exclude(user, ['password']));

    return res;
  };

  getOneById = async (id: number) => {
    const res = exclude(await new BaseRepo(this.prisma.user).getOneById(id), [
      'password',
    ]);

    return res;
  };

  getOneWithParam = async (params: RecordValue) => {
    const res = await new BaseRepo(this.prisma.user).getOneWithParam(params);
    return res;
  };

  getPermission = async (userId: number) => {
    const res = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    return res;
  };

  insert = async (payload: UserIF) => {
    return await new BaseRepo(this.prisma.user).insert(payload);
  };

  insertMany = async (users: UserIF[]) => {
    return await new BaseRepo(this.prisma.user).insertMany(users);
  };

  updateManyById = async (updates: { id: number; data: UserIF }[]) => {
    return await new BaseRepo(this.prisma.user).updateManyById(updates);
  };

  updateLastLogin = async ({ id }: { id: number }) => {
    return await new BaseRepo(this.prisma.user).updateById({
      id,
      payload: { lastLogin: new Date() },
    });
  };

  updateById = async ({ id, payload }: { id: number; payload: UserIF }) => {
    return await new BaseRepo(this.prisma.user).updateById({ id, payload });
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.user).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.user).deleteManyById(ids);
  };

  safetyDeleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.user).safetyDeleteById(id);
  };

  safetyDeleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.user).safetyDeleteManyById(ids);
  };
}

export default new UserRepo();
