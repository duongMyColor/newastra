import { AcstaApiResponseIF } from '@repo/types/acsta';
import {
  getAll,
  getOneById,
  getManyByIdsAndChildren,
  getManyByIds,
} from '../repos/acsta.repo';
import { PerformanceResponseIF } from '@repo/types/performance';

class AcstaFactory {
  static async getAll() {
    const acstas = await getAll();
    const res = acstas.map((acsta: AcstaApiResponseIF) => {
      return new Acsta(acsta);
    });
    return res;
  }

  static async getOneById(id: number) {
    return new Acsta(await getOneById(id));
  }

  static async getManyByIds(ids: number[]) {
    const acstas = await getManyByIds(ids);
    console.log('acstas', acstas);

    return acstas.map((acsta: AcstaApiResponseIF) => {
      return new Acsta(acsta);
    });
  }

  static async getManyByIdsAndChildren(ids: number[]) {
    const acstas = await getManyByIdsAndChildren(ids);
    console.log('acstas', acstas);

    return acstas.map((acsta: AcstaApiResponseIF) => {
      return new Acsta(acsta);
    });
  }
}

class Acsta implements AcstaApiResponseIF {
  public acstaId: number;
  public appId: number;
  public acstaName: string;
  public thumbnailUrl: string;
  public scanImageUrl: string;
  public scanOriginX: number;
  public scanOriginY: number;
  public scanWidth: number;
  public scanHeight: number;
  public scanColors: string | number[];
  public modeId: string;

  public constructor({
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
    this.acstaId = id as number;
    this.acstaName = acstaName;
    this.appId = applicationId as number;
    this.thumbnailUrl = thumbnailUrl as string;
    this.scanImageUrl = scanImageUrl as string;
    this.scanOriginX = scanOriginX;
    this.scanOriginY = scanOriginY;
    this.scanWidth = scanWidth;
    this.scanHeight = scanHeight;
    this.scanColors = JSON.parse(scanColors as string);

    this.modeId = performace
      ? performace.map((p: PerformanceResponseIF) => p.id)
      : [];
  }
}

export default AcstaFactory;
