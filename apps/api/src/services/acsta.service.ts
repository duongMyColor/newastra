import { AcstaApiResponseIF } from '@repo/types/acsta';
import {
  getAll,
  getOneById,
  getManyByIdsAndChildren,
  getManyByIds,
  getUpdateData,
} from '../repos/acsta.repo';
import { PerformanceResponseIF } from '@repo/types/performance';
import { getPresignedUrl } from '@/lib/cloudflare-r2';

class AcstaFactory {
  static async getAll() {
    const acstas = await getAll();
    const res = acstas.map((acsta: AcstaApiResponseIF) => {
      return new Acsta().getData(acsta);
    });
    return res;
  }

  static async getOneById(id: number) {
    return new Acsta().getData(await getOneById(id));
  }

  static async getManyByIds(ids: number[]) {
    const acstas = await getManyByIds(ids);
    console.log('acstas', acstas);
    if (!acstas?.length) {
      return [];
    }

    return acstas.map((acsta: AcstaApiResponseIF) => {
      return new Acsta().getData(acsta);
    });
  }

  static async getManyByIdsAndChildren(ids: number[]) {
    const acstas = await getManyByIdsAndChildren(ids);
    console.log('acstas', acstas);
    if (!acstas?.length) {
      return [];
    }

    return acstas.map((acsta: AcstaApiResponseIF) => {
      return new Acsta().getData(acsta);
    });
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const acstas = await getUpdateData(lastSyncDate);

    if (!acstas?.length) {
      return [];
    }
    return acstas.map((acsta: AcstaApiResponseIF) => {
      return new Acsta().getData(acsta);
    });
  }
}

class Acsta {
  async getData({
    id,
    acstaName,
    applicationId,
    thumbnailUrl,
    scanImageUrl,
    scanOriginX,
    scanOriginY,
    scanWidth,
    scanHeight,
    scanColors,
    performace,
  }: AcstaApiResponseIF) {
    return {
      acstaId: id,
      appId: applicationId,
      acstaName,

      thumbnailUrl: await getPresignedUrl('da-acsta', thumbnailUrl),
      scanImageUrl: await getPresignedUrl('da-acsta', scanImageUrl),
      scanOriginX: scanOriginX,
      scanOriginY: scanOriginY,
      scanWidth: scanWidth,
      scanHeight: scanHeight,
      scanColors: JSON.parse(scanColors as string),
      modeId: performace
        ? performace.map((p: PerformanceResponseIF) => p.id)
        : [],
    };
  }
}

export default AcstaFactory;
