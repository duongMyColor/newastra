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

    if (!acstas?.length) {
      return [];
    }

    return await this.convertArrayData(acstas);
  }

  static async getOneById(id: number) {
    return await new Acsta().getData(await getOneById(id));
  }

  static async getManyByIds(ids: number[]) {
    const acstas = await getManyByIds(ids);
    if (!acstas?.length) {
      return [];
    }

    return await this.convertArrayData(acstas);
  }

  static async getManyByIdsAndChildren(ids: number[]) {
    const acstas = await getManyByIdsAndChildren(ids);
    if (!acstas?.length) {
      return [];
    }

    return await this.convertArrayData(acstas);
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const acstas = await getUpdateData(lastSyncDate);

    if (!acstas?.length) {
      return [];
    }
    return await this.convertArrayData(acstas);
  }

  static async convertArrayData(apps: AcstaApiResponseIF[]) {
    let result = [];
    for (const app of apps) {
      result.push(await new Acsta().getData(app));
    }
    return result;
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

      thumbnailUrl: await getPresignedUrl('da-acsta-bucket', thumbnailUrl),
      scanImageUrl: await getPresignedUrl('da-acsta-bucket', scanImageUrl),
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
