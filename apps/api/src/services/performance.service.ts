import {
  PerformanceApiResponseIF,
  PerformanceResponseIF,
} from '@repo/types/performance';
import {
  getAll,
  getOneById,
  getManyByIds,
  getUpdateData,
} from '../repos/performance.repo';
import { NotFoundError } from '@/core/error.response';
import { getPresignedUrl } from '@/lib/cloudflare-r2';

class PerformanceFactory {
  static async getOneById(id: number) {
    const res = await getOneById(id);
    if (!res) throw new NotFoundError('Project not found');

    return await new Performance().getData(await getOneById(id));
  }

  static async getAll() {
    const performances = await getAll();
    if (!performances?.length) throw new NotFoundError('Project not found');
    return await this.convertArrayData(performances);
  }

  static async getManyByIds(ids: number[]) {
    const performances = await getManyByIds(ids);
    if (!performances?.length) throw new NotFoundError('Project not found');

    return await this.convertArrayData(performances);
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const performances = await getUpdateData(lastSyncDate);
    if (!performances?.length) throw new NotFoundError('Project not found');

    return await this.convertArrayData(performances);
  }

  static async convertArrayData(apps: PerformanceResponseIF[]) {
    let result = [];
    for (const app of apps) {
      result.push(await new Performance().getData(app));
    }
    return result;
  }
}

class Performance {
  async getData({
    id,
    performanceTypeMasterId,
    assetBundleIOS,
    acstaId,
    assetBundleAndroid,
  }: PerformanceApiResponseIF) {
    return {
      modeId: id,
      modeTypeId: performanceTypeMasterId,
      acstaId,
      assetBundleIOS: await getPresignedUrl('da-acsta-bucket', assetBundleIOS),
      assetBundleAndroid: await getPresignedUrl(
        'da-acsta-bucket',
        assetBundleAndroid
      ),
    };
  }
}

export default PerformanceFactory;
