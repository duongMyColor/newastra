import { AcstaPostIF } from '@repo/types/acsta';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import type { PrismaClient } from '@prisma/client/extension';
import { generateClient } from '@/lib/prisma';

class AcstaRepo {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = generateClient();
  }

  getAll = async () => {
    return await new BaseRepo(this.prisma.acstaManagement).getAll();
  };

  count = async () => {
    return await new BaseRepo(this.prisma.acstaManagement).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.acstaManagement).getAllWithQuery({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.acstaManagement).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(this.prisma.acstaManagement).getManyReference(params);
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(this.prisma.acstaManagement).getOneById(id);
  };

  insert = async (payload: AcstaPostIF) => {
    await new BaseRepo(this.prisma.idLastestOfRecord).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(this.prisma.acstaManagement).insert(payload);
  };

  insertMany = async (body: AcstaPostIF[]) => {
    return await new BaseRepo(this.prisma.acstaManagement).insertMany(body);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: AcstaPostIF;
  }) => {
    return await new BaseRepo(this.prisma.acstaManagement).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: AcstaPostIF[]) => {
    return await new BaseRepo(this.prisma.acstaManagement).updateManyById(
      updates
    );
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.acstaManagement).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.acstaManagement).deleteManyById(ids);
  };
}

export default new AcstaRepo();
