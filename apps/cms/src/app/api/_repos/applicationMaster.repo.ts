import { AplicationMasterPostIF } from '@repo/types/applicationMaster';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import type { PrismaClient } from '@prisma/client/extension';

// const this.prisma.applicationMaster = prisma.aplicationMaster;
// const child = 'memo';
// const parent = 'classification';

class AplicationMasterRepo {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = generateClient();
  }

  getAll = async () => {
    return await new BaseRepo(this.prisma.applicationMaster).getAll();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.applicationMaster).getAllWithQuery({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.applicationMaster).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(this.prisma.applicationMaster).getManyReference(params);
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(this.prisma.applicationMaster).getOneById(id);
  };

  getOneAndParent = async (id: number) => {
    return await new BaseRepo(
      this.prisma.applicationMaster
    ).getOneByIdWithParam(id, {
      include: {
        classification: true,
      },
    });
  };

  // const getOneAndChildren = async (id: number, child: string) => {
  //   return await new BaseRepo(this.prisma.applicationMaster).getOneByIdWithParam(id, {
  //     include: {
  //       [child]: true,
  //     },
  //   });
  // };

  // const getOneAndChildAndParent = async (id: number) => {
  //   return await new BaseRepo(this.prisma.applicationMaster).getOneByIdWithParam(id, {
  //     include: {
  //       [child]: true,
  //       [parent]: true,
  //     },
  //   });
  // };

  insert = async (payload: AplicationMasterPostIF) => {
    return await new BaseRepo(this.prisma.applicationMaster).insert(payload);
  };

  insertMany = async (animals: AplicationMasterPostIF[]) => {
    return await new BaseRepo(this.prisma.applicationMaster).insertMany(
      animals
    );
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: AplicationMasterPostIF;
  }) => {
    return await new BaseRepo(this.prisma.applicationMaster).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: AplicationMasterPostIF[]) => {
    return await new BaseRepo(this.prisma.applicationMaster).updateManyById(
      updates
    );
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.applicationMaster).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.applicationMaster).deleteManyById(
      ids
    );
  };
}

export default new AplicationMasterRepo();
