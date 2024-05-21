import { TermOfUsePostIF } from '@repo/types/termOfUse';
import { generateClient } from '@/lib/prisma';
import { BaseRepo } from './base/base.repo';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';
import type { PrismaClient } from '@prisma/client/extension';

// const model = prisma.termsOfUse;

class TermsOfUseRepo {
  public prisma: PrismaClient;
  constructor() {
    this.prisma = generateClient();
  }

  getAll = async () => {
    return await new BaseRepo(this.prisma.termsOfUse).getAll();
  };

  count = async () => {
    return await new BaseRepo(this.prisma.termsOfUse).count();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.termsOfUse).getAllWithQuery({
      sort,
      range,
      filter,
    });
  };
  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    return await new BaseRepo(this.prisma.termsOfUse).getAllWithFilters({
      sort,
      range,
      filter,
    });
  };

  getManyReference = async (params: GetManyReferenceParams) => {
    return new BaseRepo(this.prisma.termsOfUse).getManyReference(params);
  };

  getOneById = async (id: number) => {
    return await new BaseRepo(this.prisma.termsOfUse).getOneById(id);
  };

  insert = async (payload: TermOfUsePostIF) => {
    await new BaseRepo(this.prisma.idLastestOfRecord).updateIdLastestOfRecord({
      record: payload.record,
    });
    delete payload.record;
    return await new BaseRepo(this.prisma.termsOfUse).insert(payload);
  };

  insertMany = async (body: TermOfUsePostIF[]) => {
    return await new BaseRepo(this.prisma.termsOfUse).insertMany(body);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: TermOfUsePostIF;
  }) => {
    return await new BaseRepo(this.prisma.termsOfUse).updateById({
      id,
      payload,
    });
  };

  updateManyById = async (updates: TermOfUsePostIF[]) => {
    return await new BaseRepo(this.prisma.termsOfUse).updateManyById(updates);
  };

  deleteById = async (id: number) => {
    return await new BaseRepo(this.prisma.termsOfUse).deleteById(id);
  };

  deleteManyById = async (ids: number[]) => {
    return await new BaseRepo(this.prisma.termsOfUse).deleteManyById(ids);
  };
}

export default new TermsOfUseRepo();
