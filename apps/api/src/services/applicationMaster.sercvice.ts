import { NotFoundError } from '@/core/error.response';
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
      throw new NotFoundError('Application not found');
    }

    return await this.convertArrayData(applicationMasters);
  }

  static async getOneById(id: number) {
    const applicationMaster: AplicationMasterResponseIF = await getOneById(id);

    return await new ApplicationMaster().getData(applicationMaster);
  }

  static async getManyByIds(ids: number[]) {
    const applicationMasters = await getManyByIds(ids);
    if (!applicationMasters?.length) {
      throw new NotFoundError('Application not found');
    }

    return await this.convertArrayData(applicationMasters);
  }

  static async getUpdateData(lastSyncDate: Date | string) {
    const apps = await getUpdateData(lastSyncDate);

    if (!apps?.length) {
      throw new NotFoundError('Application not found');
    }

    return await this.convertArrayData(apps);
  }

  static async convertArrayData(apps: AplicationMasterResponseIF[]) {
    let result = [];
    for (const app of apps) {
      result.push(await new ApplicationMaster().getData(app));
    }
    return result;
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
      assetBundleIOS: await getPresignedUrl('da-acsta-bucket', assetBundleIOS),
      assetBundleAndroid: await getPresignedUrl(
        'da-acsta-bucket',
        assetBundleAndroid
      ),
      outlineUrl: await getPresignedUrl('da-acsta-bucket', outlineUrl),
    };
  }
}

export default ApplicationMasterFactory;
