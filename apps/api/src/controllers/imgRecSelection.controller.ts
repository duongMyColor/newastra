import ImgRecSelectionService from '../services/imgRecSelection.service';
import { OK, CREATED } from '../core/success.response';

import { ImgRecSelectionPostIF } from '@repo/types/imgRecSelection';
import type { NextRequest } from 'next/server';
import { parseSearchParams } from '@repo/utils/parseParams';

class ImgRecSelectionController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();
    console.log('::: payload', payload);

    return new CREATED({
      message: 'created ImgRecSelection OK!',
      metadata: await ImgRecSelectionService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: ImgRecSelectionPostIF[] = await request.json();

    return new CREATED({
      message: 'created batch ImgRecSelection OK!',
      metadata: await ImgRecSelectionService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all ImgRecSelections success!',
      metadata: await ImgRecSelectionService.getAll(),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all ImgRecSelections success!',
      metadata: await ImgRecSelectionService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
    });
  };

  getOne = async (id: number) => {
    return new OK({
      message: 'get one ImgRecSelection success!',
      metadata: await ImgRecSelectionService.getOneById(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated ImgRecSelection OK!',
      metadata: await ImgRecSelectionService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: ImgRecSelectionPostIF[] = await request.json();

    return new OK({
      message: 'updated batch ImgRecSelection OK!',
      metadata: await ImgRecSelectionService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted ImgRecSelection OK!',
      metadata: await ImgRecSelectionService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch ImgRecSelection OK!',
      metadata: await ImgRecSelectionService.deleteManyById(payload),
    });
  };
}

const userController = new ImgRecSelectionController();
export default userController;
