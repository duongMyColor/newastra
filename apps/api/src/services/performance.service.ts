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

class PerformanceFactory {
  static async getOneById(id: number) {
    const res = await getOneById(id);
    if (!res) throw new BadRequestError('Performance not found');

    return new Performance(await getOneById(id));
  }

  static async getAll() {
    const performances = await getAll();
    if (!performances?.length) return [];
    return performances.map(
      (performance: PerformanceResponseIF) => new Performance(performance)
    );
  }

  static async getManyByIds(ids: number[]) {
    const performances = await getManyByIds(ids);
    if (!performances?.length) return [];
    return performances.map(
      (performance: PerformanceResponseIF) => new Performance(performance)
    );
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const performances = await getUpdateData(lastSyncDate);
    if (!performances?.length) return [];
    return performances.map(
      (performance: PerformanceResponseIF) => new Performance(performance)
    );
  }
}

class Performance implements PerformanceApiResponseIF {
  public modeId: number;
  public modeTypeId: number;
  public assetBundleIOS: string;
  public acstaId: number;
  public assetBundleAndroid: string;
  public record?: string;

  public constructor({
    id,
    performanceTypeMasterId,
    assetBundleIOS,
    acstaId,
    assetBundleAndroid,
  }: PerformanceApiResponseIF) {
    this.modeId = id;
    this.modeTypeId = performanceTypeMasterId as number;
    this.assetBundleIOS = assetBundleIOS;
    this.assetBundleAndroid = assetBundleAndroid;
    this.acstaId = acstaId;
  }
}

export default PerformanceFactory;
