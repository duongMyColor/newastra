import {
  PerformanceApiResponseIF,
  PerformanceResponseIF,
} from '@repo/types/performance';
import { getAll, getOneById, getManyByIds } from '../repos/performance.repo';

class PerformanceFactory {
  static async getOneById(id: number) {
    return new Performance(await getOneById(id));
  }

  static async getAll() {
    const performances = await getAll();
    return performances.map(
      (performance: PerformanceResponseIF) => new Performance(performance)
    );
  }

  static async getManyByIds(ids: number[]) {
    const performances = await getManyByIds(ids);
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
