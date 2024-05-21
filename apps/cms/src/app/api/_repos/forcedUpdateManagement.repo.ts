import { ForcedUpdateManagementPostIF } from '@repo/types/forceUpdateManagement';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import { generateClient } from '@/lib/prisma';
import type { PrismaClient } from '@prisma/client/extension';

// const this.prisma.forcedUpdateManagement = prisma.forcedUpdateManagement;

class ForcedUpdateRepo {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = generateClient();
  }

  getAll = async () => {
    return await new BaseRepo(this.prisma.forcedUpdateManagement).getAll();
  };
  getAllParen = async () => {
    return await new BaseRepo(this.prisma.forcedUpdateManagement).getAllParen({
      include: {
        aplicationMaster: true,
      },
    });
  };

  count = async () => {
    return await new BaseRepo(this.prisma.forcedUpdateManagement).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      this.prisma.forcedUpdateManagement
    ).getAllWithQuery({ sort, range, filter });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(
      this.prisma.forcedUpdateManagement
    ).getAllWithFilters({ sort, range, filter });
  };
  getAllAndParentWithFilters = async ({
    sort,
    range,
    filter,
  }: GetAllQueryIF) => {
    return await new BaseRepo(
      this.prisma.forcedUpdateManagement
    ).getAllWithParm({
      sort,
      range,
      filter,
      include: {
        aplicationMaster: true,
      },
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(this.prisma.forcedUpdateManagement).getManyReference(
      params
    );
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(this.prisma.forcedUpdateManagement).getOneById(
      id
    );
  };
  getOneAndParent = async (id: number) => {
    return await new BaseRepo(
      this.prisma.forcedUpdateManagement
    ).getOneByIdWithParam(id, {
      include: {
        aplicationMaster: true,
      },
    });
  };

  insert = async (payload: ForcedUpdateManagementPostIF) => {
    await new BaseRepo(this.prisma.idLastestOfRecord).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(this.prisma.forcedUpdateManagement).insert(
      payload
    );
  };

  insertMany = async (body: ForcedUpdateManagementPostIF[]) => {
    return await new BaseRepo(this.prisma.forcedUpdateManagement).insertMany(
      body
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: ForcedUpdateManagementPostIF;
  }) => {
    return await new BaseRepo(this.prisma.forcedUpdateManagement).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: ForcedUpdateManagementPostIF[]) => {
    return await new BaseRepo(
      this.prisma.forcedUpdateManagement
    ).updateManyById(updates);
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.forcedUpdateManagement).deleteById(
      id
    );
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(
      this.prisma.forcedUpdateManagement
    ).deleteManyById(ids);
  };
}
export default new ForcedUpdateRepo();
