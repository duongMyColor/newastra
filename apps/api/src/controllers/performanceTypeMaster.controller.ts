import ProductService from '../services/performanceTypeMaster.service';
import { OK, CREATED } from '../core/success.response';

import { PerformanceTypeMasterPostIF } from '@repo/types/performanceTypeMaster';
import { count } from '../repos/performanceTypeMaster.repo';
import type { NextRequest } from 'next/server';
import { parseSearchParams } from '@repo/utils/parseParams';

class ProductController {
  create = async (request: NextRequest) => {
    const payload: PerformanceTypeMasterPostIF = await request.json();

    return new CREATED({
      message: 'created Product OK!',
      metadata: await ProductService.create({
        payload: payload,
      }),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Products success!',
      metadata: await ProductService.getAll(),
      count: await count(),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Products success!',
      metadata: await ProductService.getAllWithQuery({ filter, range, sort }),
      count: await count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Product success!',
      metadata: await ProductService.getOneById(id),
    });
  };

  getByIdWithDetail = async (id: number) => {
    return new OK({
      message: 'get Product with detail success!',
      metadata: await ProductService.getOneById(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: PerformanceTypeMasterPostIF = await request.json();

    return new OK({
      message: 'updated Product OK!',
      metadata: await ProductService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Product OK!',
      metadata: await ProductService.deleteById(id),
    });
  };

  deleteWithRelation = async (id: number) => {
    return new OK({
      message: 'deleted Product an details OK!',
      metadata: await ProductService.deleteWithRelation(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Product OK!',
      metadata: await ProductService.deleteManyById(payload),
    });
  };
}

const userController = new ProductController();
export default userController;
