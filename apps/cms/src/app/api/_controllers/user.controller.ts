import UserService from '../_services/user.service';
import { OK, CREATED } from '../_core/success.response';
import { count } from '../_repos/user.repo';

import { UserIF } from '@repo/types/user';
import type { NextRequest } from 'next/server';
import { getServerCookieValue } from '@repo/utils/server_actions/cookies';
import { HEADER } from '@repo/consts/access';
import { parseSearchParams } from '@repo/utils/parseParams';

class UserController {
  create = async (request: NextRequest) => {
    console.log('payload', request);
    const payload: UserIF = await request.json();

    return new CREATED({
      message: 'created User OK!',
      metadata: await UserService.create({
        payload: payload,
      }),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Users success!',
      metadata: await UserService.getAll(),
      count: await count(),
    });
  };
  getAllWithQuery = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const { filter, range, sort } = parseSearchParams(searchParams);
    return new OK({
      message: 'get all Users success!',
      metadata: await UserService.getAllWithQuery({ filter, range, sort }),
      count: await count(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get User success!',
      metadata: await UserService.getOneById(id),
    });
  };

  getPermission = async () => {
    const userId = Number(getServerCookieValue(HEADER.CLIENT_ID));

    return new OK({
      message: 'get User permissions success!',
      metadata: await UserService.getPermission(userId),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: UserIF = await request.json();

    return new OK({
      message: 'updated User OK!',
      metadata: await UserService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted User OK!',
      metadata: await UserService.safetyDeleteById(id),
    });
  };
  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch User OK!',
      metadata: await UserService.safetyDeleteManyById(payload),
    });
  };
}

const userController = new UserController();
export default userController;
