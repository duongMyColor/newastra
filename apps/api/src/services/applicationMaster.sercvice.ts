import { NotFoundError } from '@/core/error.response';
import { getPresignedUrl } from '../lib/cloudflare-r2';
import {
  getAll,
  getOneById,
  getManyByIds,
  getUpdateData,
  getOneByBundleId,
} from '../repos/applicationMaster.repo';
import {
  AplicationMasterPostIF,
  AplicationMasterResponseIF,
} from '@repo/types/applicationMaster';
import { getBundleId } from '@/lib/globalObject';
class ApplicationMasterFactory {
  static async getAll() {
    const applicationMasters = await getAll();

    if (!applicationMasters?.length) {
      throw new NotFoundError('Application not found');
    }

    return await this.convertArrayData(applicationMasters);
  }

  static async getOneById(id: number) {
    const applicationMaster: AplicationMasterResponseIF = await getOneById(id);

    return await new ApplicationMaster().convertData(applicationMaster);
  }

  static async getOneByBundleId() {
    const bundleId = getBundleId();

    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }

    const application = await getOneByBundleId(bundleId);
    if (!application) {
      return {};
    }

    return await new ApplicationMaster().convertData(application);
  }

  static async getManyByIds(ids: number[]) {
    const applicationMasters = await getManyByIds(ids);
    if (!applicationMasters?.length) {
      throw new NotFoundError('Application not found');
    }

    return await this.convertArrayData(applicationMasters);
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const bundleId = getBundleId();
    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }

    const app = await getUpdateData(lastSyncDate, bundleId);

    if (!app) {
      return {};
    }

    return await new ApplicationMaster().convertData(app);
  }

  static async convertArrayData(apps: AplicationMasterResponseIF[]) {
    let result = [];
    for (const app of apps) {
      result.push(await new ApplicationMaster().convertData(app));
    }
    return result;
  }
}

class ApplicationMaster {
  async convertData({
    id,
    appName,
    assetBundleIOS,
    assetBundleAndroid,
    outlineUrl,
  }: AplicationMasterPostIF) {
    return {
      appId: id,
      appName,
      assetBundleIOS: await getPresignedUrl(assetBundleIOS),
      assetBundleAndroid: await getPresignedUrl(assetBundleAndroid),
      outlineUrl: await getPresignedUrl(outlineUrl),
    };
  }
}

export default ApplicationMasterFactory;
