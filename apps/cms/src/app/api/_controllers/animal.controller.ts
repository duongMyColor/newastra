import AnimalService from '../_services/animal.service';
import { OK, CREATED } from '../_core/success.response';

import { AnimalPostIF } from '@repo/types/animal';
import type { NextRequest } from 'next/server';
import { parseParams, parseSearchParams } from '@repo/utils/parseParams';

class AnimalController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();

    return new CREATED({
      message: 'created Animal OK!',
      metadata: await AnimalService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: AnimalPostIF[] = await request.json();

    return new CREATED({
      message: 'created batch Animal OK!',
      metadata: await AnimalService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Animals success!',
      metadata: await AnimalService.getAll(),
    });
  };

  getManyReference = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const params = parseParams(searchParams);

    return new OK({
      message: 'get all Animals success!',
      metadata: await AnimalService.getManyReference(params),
    });
  };

  getAllWithFilters = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all Animals success!',
      metadata: await AnimalService.getAllWithFilters({ filter, range, sort }),
    });
  };

  getOneAndParent = async (id: number) => {
    return new OK({
      message: 'get Animal success!',
      metadata: await AnimalService.getOneAndParent(id),
    });
  };

  getOneAndChildAndParent = async (id: number) => {
    return new OK({
      message: 'get Animal success!',
      metadata: await AnimalService.getOneAndChildAndParent(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated Animal OK!',
      metadata: await AnimalService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: AnimalPostIF[] = await request.json();

    return new OK({
      message: 'updated batch Animal OK!',
      metadata: await AnimalService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Animal OK!',
      metadata: await AnimalService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Animal OK!',
      metadata: await AnimalService.deleteManyById(payload),
    });
  };
}

const userController = new AnimalController();
export default userController;
