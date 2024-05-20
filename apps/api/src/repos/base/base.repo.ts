import { prisma } from '../../lib/prisma';
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

  getAllAndChild = async (child: string, select: any = {}) => {
    return await this.tableModel.findMany({
      include: {
        [child]: true,
      },
    });
  };

  getOneByIdAndChildren = async (id: number, child: string) => {
    const res = await this.tableModel.findUnique({
      where: {
        id: id,
      },
      include: {
        [child]: true,
      },
    });

    return res;
  };

  getOneById = async (id: number) => {
    const res = await this.tableModel.findUnique({
      where: {
        id: id,
      },
    });

    return res;
  };

  getManyByIds = async (ids: number[]) => {
    return await this.tableModel.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  };

  getManyAndChildrenByIds = async (ids: number[], child: string) => {
    return await this.tableModel.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        [child]: true,
      },
    });
  };
}

export { BaseRepo };
