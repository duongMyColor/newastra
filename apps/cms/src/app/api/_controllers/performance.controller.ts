import ProductDetailService from '../_services/performance.service';
import { OK, CREATED } from '../_core/success.response';

import { PerformancePostIF } from '@repo/types/product';
import type { NextRequest } from 'next/server';

class ProductDetailController {
  create = async (request: NextRequest) => {
    const payload: PerformancePostIF = await request.json();

    return new CREATED({
      message: 'created ProductDetail OK!',
      metadata: await ProductDetailService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: PerformancePostIF[] = await request.json();

    return new CREATED({
      message: 'created batch ProductDetail OK!',
      metadata: await ProductDetailService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Users success!',
      metadata: await ProductDetailService.getAll(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get User success!',
      metadata: await ProductDetailService.getOneById(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: PerformancePostIF = await request.json();

    return new OK({
      message: 'updated ProductDetail OK!',
      metadata: await ProductDetailService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: PerformancePostIF[] = await request.json();

    return new OK({
      message: 'updated batch ProductDetail OK!',
      metadata: await ProductDetailService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted ProductDetail OK!',
      metadata: await ProductDetailService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch ProductDetail OK!',
      metadata: await ProductDetailService.deleteManyById(payload),
    });
  };
}

const userController = new ProductDetailController();
export default userController;
