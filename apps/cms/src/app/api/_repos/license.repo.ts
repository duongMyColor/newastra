import { TermOfUsePostIF } from '@repo/types/termOfUse';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import type { PrismaClient } from '@prisma/client/extension';

class LicenseRepo {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = generateClient();
  }
  getAll = async () => {
    return await new BaseRepo(this.prisma.license).getAll();
  };

  count = async () => {
    return await new BaseRepo(this.prisma.license).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.license).getAllWithQuery({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.license).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(this.prisma.license).getManyReference(params);
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(this.prisma.license).getOneById(id);
  };

  insert = async (payload: TermOfUsePostIF) => {
    await new BaseRepo(this.prisma.idLastestOfRecord).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(this.prisma.license).insert(payload);
  };

  insertMany = async (body: TermOfUsePostIF[]) => {
    return await new BaseRepo(this.prisma.license).insertMany(body);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: TermOfUsePostIF;
  }) => {
    return await new BaseRepo(this.prisma.license).updateById({ id, payload });
  };

  updateManyById = async (updates: TermOfUsePostIF[]) => {
    return await new BaseRepo(this.prisma.license).updateManyById(updates);
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.license).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.license).deleteManyById(ids);
  };
}

export default new LicenseRepo();
