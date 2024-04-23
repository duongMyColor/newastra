import MemoService from '../_services/memo.service';
import { OK, CREATED } from '../_core/success.response';

import { MemoIF } from '@repo/types/memo';
import type { NextRequest } from 'next/server';

class MemoController {
  create = async (request: NextRequest) => {
    const payload: MemoIF = await request.json();

    return new CREATED({
      message: 'created Memo OK!',
      metadata: await MemoService.create({
        payload: payload,
      }),
    });
  };

  getAll = async () => {
    return new OK({
      message: 'get all Memos success!',
      metadata: await MemoService.getAll(),
    });
  };

  getOneById = async (id: number) => {
    return new OK({
      message: 'get Memo success!',
      metadata: await MemoService.getOneById(id),
    });
  };

  getOneByUserId = async (userId: number) => {
    return new OK({
      message: 'get Memo by User ID success!',
      metadata: await MemoService.getOneByUserId(userId),
    });
  };

  update = async (request: NextRequest, id: number) => {
    const payload: MemoIF = await request.json();

    return new OK({
      message: 'updated Memo OK!',
      metadata: await MemoService.updateById({
        id: id,
        payload: payload,
      }),
    });
  };

  delete = async (id: number) => {
    return new OK({
      message: 'deleted Memo OK!',
      metadata: await MemoService.deleteById(id),
    });
  };

  deleteMany = async (request: NextRequest) => {
    const payload: number[] = await request.json();

    return new OK({
      message: 'deleted batch Memo OK!',
      metadata: await MemoService.deleteManyById(payload),
    });
  };
}

const memoController = new MemoController();
export default memoController;
