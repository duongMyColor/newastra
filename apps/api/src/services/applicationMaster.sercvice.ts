import { getPresignedUrl } from '../lib/cloudflare-r2';
import {
  getAll,
  getOneById,
  getManyByIds,
  getUpdateData,
} from '../repos/applicationMaster.repo';
import {
  AplicationMasterPostIF,
  AplicationMasterResponseIF,
} from '@repo/types/applicationMaster';
class ApplicationMasterFactory {
  static async getAll() {
    const applicationMasters = await getAll();

    if (!applicationMasters?.length) {
      return [];
    }
    const res = applicationMasters.map(
      (applicationMaster: AplicationMasterResponseIF) => {
        return new ApplicationMaster().getData(applicationMaster);
      }
    );
    return res;
  }

  static async getOneById(id: number) {
    const applicationMaster: AplicationMasterResponseIF = await getOneById(id);

    return new ApplicationMaster().getData(applicationMaster);
  }

  static async getManyByIds(ids: number[]) {
    const applicationMasters = await getManyByIds(ids);
    if (!applicationMasters?.length) {
      return [];
    }

    return applicationMasters.map((app: AplicationMasterResponseIF) => {
      return new ApplicationMaster().getData(app);
    });
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const apps = await getUpdateData(lastSyncDate);

    if (!apps?.length) {
      return [];
    }
    return apps.map((app: AplicationMasterResponseIF) => {
      return new ApplicationMaster().getData(app);
    });
  }
}

class ApplicationMaster {
  async getData({
    id,
    appName,
    assetBundleIOS,
    assetBundleAndroid,
    outlineUrl,
  }: AplicationMasterPostIF) {
    return {
      appId: id,
      appName,
      assetBundleIOS: await getPresignedUrl('da-acsta', assetBundleIOS),
      assetBundleAndroid: await getPresignedUrl('da-acsta', assetBundleAndroid),
      outlineUrl: await getPresignedUrl('da-acsta', outlineUrl),
    };
  }
}

export default ApplicationMasterFactory;
