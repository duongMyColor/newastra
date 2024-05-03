import LicenseService from '../_services/license.service';
import { OK, CREATED } from '../_core/success.response';
import type { NextRequest } from 'next/server';
import { parseParams } from '@repo/utils/parseParams';
import { BaseRepo } from '../_repos/base/base.repo';
import { prisma } from '@/lib/prisma';

class IdLastestController {

  getOneByIdLastest = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    let typeSource = searchParams.get('source') as any;
    const model = prisma[typeSource];

    return new OK({
      message: `get ${typeSource} success!`,
      metadata: await new BaseRepo(model).getOneByIdLastest(),
    });
  };
}

const idLastestController = new IdLastestController();
export default idLastestController;
