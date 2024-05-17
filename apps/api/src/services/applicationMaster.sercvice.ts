import {
  getAll,
  getOneById,
  getManyByIds,
} from '../repos/applicationMaster.repo';
import {
  AplicationMasterPostIF,
  AplicationMasterResponseIF,
} from '@repo/types/applicationMaster';
class ApplicationMasterFactory {
  static async getAll() {
    const applicationMasters = await getAll();

    const res = applicationMasters.map(
      (applicationMaster: AplicationMasterResponseIF) => {
        return new ApplicationMaster(applicationMaster);
      }
    );
    return res;
  }

  static async getOneById(id: number) {
    const applicationMaster: AplicationMasterResponseIF = await getOneById(id);

    return new ApplicationMaster(applicationMaster);
  }

  static async getManyByIds(ids: number[]) {
    const applicationMasters = await getManyByIds(ids);
    console.log('applicationMasters', applicationMasters);

    return applicationMasters.map((acsta: AplicationMasterResponseIF) => {
      return new ApplicationMaster(acsta);
    });
  }
}

class ApplicationMaster {
  public appId: number;
  public appName: string;
  public assetBundleIOS: string;
  public assetBundleAndroid: string;
  public outlineUrl: number;

  public constructor({
    id,
    appName,
    assetBundleIOS,
    assetBundleAndroid,
    outlineUrl,
  }: AplicationMasterPostIF) {
    this.appId = id as number;
    this.appName = appName;
    this.assetBundleIOS = assetBundleIOS;
    this.assetBundleAndroid = assetBundleAndroid;
    this.outlineUrl = outlineUrl;
  }
}

export default ApplicationMasterFactory;
