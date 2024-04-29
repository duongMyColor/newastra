import TermsAndConditionsService from '../_services/termOfUse.service';
import { OK, CREATED } from '../_core/success.response';

import { TermOfUsePostIF } from '@repo/types/termAndConditions';
import type { NextRequest } from 'next/server';
import { parseParams, parseSearchParams } from '@repo/utils/parseParams';

class AnimalController {
  create = async (request: NextRequest) => {
    const payload: FormData = await request.formData();

    return new CREATED({
      message: 'created Animal OK!',
      metadata: await TermsAndConditionsService.create({
        payload: payload,
      }),
    });
  };

  createMany = async (request: NextRequest) => {
    const payload: TermOfUsePostIF[] = await request.json();

    return new CREATED({
      message: 'created batch Animal OK!',
      metadata: await TermsAndConditionsService.createMany(payload),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all TermsAndConditions success!',
      metadata: await TermsAndConditionsService.getAll(),
    });
  };

  getManyReference = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const params = parseParams(searchParams);

    return new OK({
      message: 'get all TermsAndConditions success!',
      metadata: await TermsAndConditionsService.getManyReference(params),
    });
  };

  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);

    return new OK({
      message: 'get all TermsAndConditions success!',
      metadata: await TermsAndConditionsService.getAllWithQuery({
        filter,
        range,
        sort,
      }),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Animal success!',
      metadata: await TermsAndConditionsService.getOneById(id),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: FormData = await request.formData();

    return new OK({
      message: 'updated Animal OK!',
      metadata: await TermsAndConditionsService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  updateMany = async (request: NextRequest) => {
    const payload: TermOfUsePostIF[] = await request.json();

    return new OK({
      message: 'updated batch Animal OK!',
      metadata: await TermsAndConditionsService.updateMany(payload),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Animal OK!',
      metadata: await TermsAndConditionsService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Animal OK!',
      metadata: await TermsAndConditionsService.deleteManyById(payload),
    });
  };
}

const userController = new AnimalController();
export default userController;
