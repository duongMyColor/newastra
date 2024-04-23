import AnimalClassificationService from '../_services/animalClassification.service';
import { OK, CREATED } from '../_core/success.response';

import { AnimalClassificationPostIF } from '@repo/types/animal';
import type { NextRequest } from 'next/server';

class AnimalClassificationController {
  create = async (request: NextRequest) => {
    const payload: AnimalClassificationPostIF = await request.json();

    return new CREATED({
      message: 'created AnimalClassification OK!',
      metadata: await AnimalClassificationService.create({
        payload: payload,
      }),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all AnimalClassifications success!',
      metadata: await AnimalClassificationService.getAll(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get AnimalClassification success!',
      metadata: await AnimalClassificationService.getByIdWithDetail(id),
    });
  };

  getByIdWithDetail = async (id: number) => {
    return new OK({
      message: 'get AnimalClassification with detail success!',
      metadata: await AnimalClassificationService.getByIdWithDetail(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: AnimalClassificationPostIF = await request.json();

    return new OK({
      message: 'updated AnimalClassificationClassification OK!',
      metadata: await AnimalClassificationService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted AnimalClassification OK!',
      metadata: await AnimalClassificationService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch AnimalClassification OK!',
      metadata: await AnimalClassificationService.deleteManyById(payload),
    });
  };
}

const userController = new AnimalClassificationController();
export default userController;
