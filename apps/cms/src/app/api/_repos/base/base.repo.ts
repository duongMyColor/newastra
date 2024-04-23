import { prisma } from '@/lib/prisma';
import { ModelDeligate, RecordValue } from '@repo/types/general';
import { GetAllQueryIF } from '@repo/types/response';
import removeEmptyProperties from '@repo/utils/removeEmptyProperties';
import { GetManyReferenceParams, GetManyReferenceResult } from 'react-admin';

class BaseRepo {
  private tableModel: ModelDeligate;

  constructor(tableModel: ModelDeligate) {
    this.tableModel = tableModel;
  }

  getAll = async () => {
    return await this.tableModel.findMany();
  };

  getAllWithQuery = async ({ sort, range, filter }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;
    console.log(':::filter getAllWithQuery', filter);

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    const res = await this.tableModel.findMany({
      orderBy: {
        [String(sortField)]: sortOrder?.toLowerCase() ?? '',
      },
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: whereClause,
    });

    return res;
  };

  getAllWithFilters = async ({ sort, range, filter }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;
    console.log(':::filter getAllWithFilters', filter);
    let whereClause = {} as any;

    if (filter.classificationId) {
      whereClause.classificationId = filter.classificationId;
    }

    whereClause.created = {};

    if (filter.createdFrom) {
      whereClause.created.gte = new Date(filter.createdFrom);
    }

    if (filter.createdTo) {
      whereClause.created.lte = new Date(filter.createdTo);
    }

    if (!filter.createdFrom && !filter.createdTo) {
      delete whereClause.created;
    }

    const res = await this.tableModel.findMany({
      orderBy: {
        [String(sortField)]: sortOrder?.toLowerCase() ?? '',
      },
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: whereClause,
      include: {
        classification: true,
      },
    });

    return res;
  };

  getManyReference = async (
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    const { target, id, pagination, sort, filter } = params;
    const { page, perPage } = pagination;
    const { field, order } = sort;

    const whereClause = { ...filter, [target]: id };
    const skip = (page - 1) * perPage;
    const take = perPage;

    const data = await this.tableModel.findMany({
      where: whereClause,
      orderBy: { [field]: order.toLowerCase() },
      skip,
      take,
    });

    const total = await this.tableModel.count({ where: whereClause });

    return {
      data,
      total,
      pageInfo: {
        hasNextPage: page * perPage < total,
        hasPreviousPage: page > 1,
      },
    };
  };

  getAllWithQueryAndSafety = async ({ sort, range, filter }: GetAllQueryIF) => {
    const [sortField, sortOrder] = sort;
    const [start, end] = range;

    const whereClause = Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key,
        {
          search: (value as string)
            .trim()
            .split(' ')
            .map((word: string) => `${word} ${word}*`.toLowerCase())
            .join(' '),
        },
      ])
    );

    const res = await this.tableModel.findMany({
      orderBy: {
        [String(sortField)]: sortOrder?.toLowerCase() ?? '',
      },
      skip: start ?? 0,
      take: (end ?? 0) - (start ?? 0) + 1,
      where: { ...whereClause, isDeleted: false },
    });

    return res;
  };

  getOneById = (id: number) => {
    const res = this.tableModel.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  };

  getOneWithParam = (params: RecordValue) => {
    const res = this.tableModel.findUnique({
      ...params,
    });
    return res;
  };

  getOneByIdWithParam = (id: number, params: RecordValue) => {
    const res = this.tableModel.findUnique({
      where: {
        id,
      },
      ...params,
    });
    return res;
  };

  insert = async (payload: RecordValue) => {
    const data = removeEmptyProperties(payload);
    return await this.tableModel.create({
      data,
    });
  };

  insertMany = async (items: RecordValue[]) => {
    const operations = items.map((item: RecordValue) => {
      const data = removeEmptyProperties(item);

      return this.tableModel.create({ data });
    });

    return await prisma.$transaction(operations);
  };

  updateById = async ({
    id,
    payload,
  }: {
    id: number;
    payload: RecordValue;
  }) => {
    const data = removeEmptyProperties(payload);
    console.log(':::data', data);

    return await this.tableModel.update({
      where: {
        id: id,
      },
      data,
    });
  };

  updateManyById = async (updates: RecordValue[]) => {
    const operations = updates.map((update) => {
      const { id, ...data } = update;

      const updateContent = removeEmptyProperties(data);

      return this.tableModel.update({
        where: { id },
        data: updateContent,
      });
    });

    return await prisma.$transaction(operations);
  };

  deleteById = async (id: number) => {
    return await this.tableModel.delete({
      where: {
        id: id,
      },
    });
  };

  safetyDeleteById = async (id: number) => {
    return await this.tableModel.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
  };

  deleteWithRelation = async (id: number, relationFieldName: string) => {
    // await this.tableModel.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     [relationFieldName]: {
    //       deleteMany: {},
    //     },
    //   },
    //   include: {
    //     [relationFieldName]: true,
    //   },
    // });

    return await this.tableModel.delete({
      where: {
        id: id,
      },
    });
  };

  deleteManyById = async (ids: number[]) => {
    const operations = ids.map((id) =>
      this.tableModel.delete({
        where: { id },
      })
    );

    return await prisma.$transaction(operations);
  };

  safetyDeleteManyById = async (ids: number[]) => {
    const operations = ids.map((id) =>
      this.tableModel.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      })
    );

    return await prisma.$transaction(operations);
  };
}

export { BaseRepo };
