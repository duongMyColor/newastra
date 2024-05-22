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
import { BadRequestError } from '@/core/error.response';
import { getPresignedUrl } from '@/lib/cloudflare-r2';

class PerformanceFactory {
  static async getOneById(id: number) {
    const res = await getOneById(id);
    if (!res) throw new BadRequestError('Performance not found');

    return new Performance().getData(await getOneById(id));
  }

  static async getAll() {
    const performances = await getAll();
    if (!performances?.length) return [];
    return performances.map((performance: PerformanceResponseIF) =>
      new Performance().getData(performance)
    );
  }

  static async getManyByIds(ids: number[]) {
    const performances = await getManyByIds(ids);
    if (!performances?.length) return [];
    return performances.map((performance: PerformanceResponseIF) =>
      new Performance().getData(performance)
    );
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const performances = await getUpdateData(lastSyncDate);
    if (!performances?.length) return [];
    return performances.map((performance: PerformanceResponseIF) =>
      new Performance().getData(performance)
    );
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
      assetBundleIOS: await getPresignedUrl('da-acsta', assetBundleIOS),
      assetBundleAndroid: await getPresignedUrl('da-acsta', assetBundleAndroid),
    };
  }
}

export default PerformanceFactory;
