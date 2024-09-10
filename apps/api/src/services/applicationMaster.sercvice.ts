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
import { getBundleId, getDb } from '@/lib/globalObject';

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
    const prisma = getDb();
    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }

    const application = await getOneByBundleId(bundleId);
    if (!application) {
      return {};
    }
    const licensePromise = prisma.license.findFirst({
      where: {
        id: application.licenseId,
      },
    });

    const termsOfUsePromise = prisma.termsOfUse.findFirst({
      where: {
        id: application.termsOfUseId,
      },
    });

    const [currentLicense, currentTermsOfUse] = await Promise.all([
      licensePromise,
      termsOfUsePromise,
    ]);

    if (!currentLicense) {
      throw new NotFoundError('License not found');
    }

    if (!currentTermsOfUse) {
      throw new NotFoundError('Term of use not found');
    }

    const [contentUrlLicense, contentUrlTermsOfUse] = await Promise.all([
      getPresignedUrl(currentLicense.content as string),
      getPresignedUrl(currentTermsOfUse.content as string),
    ]);

    const dataApp = await new ApplicationMaster().convertData(application);

    return {
      ...dataApp,
      license: { contentUrl: contentUrlLicense },
      termOfUse: { contentUrl: contentUrlTermsOfUse },
    };
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
    const prisma = getDb();
    if (!bundleId) {
      throw new NotFoundError('bundleId not found');
    }

    const app = await getUpdateData(lastSyncDate, bundleId);
    if (!app) {
      return {};
    }
    const licensePromise = prisma.license.findFirst({
      where: {
        id: app.licenseId,
      },
    });

    const termsOfUsePromise = prisma.termsOfUse.findFirst({
      where: {
        id: app.termsOfUseId,
      },
    });

    const [currentLicense, currentTermsOfUse] = await Promise.all([
      licensePromise,
      termsOfUsePromise,
    ]);

    if (!currentLicense) {
      throw new NotFoundError('License not found');
    }

    if (!currentTermsOfUse) {
      throw new NotFoundError('Term of use not found');
    }

    const [contentUrlLicense, contentUrlTermsOfUse] = await Promise.all([
      getPresignedUrl(currentLicense.content as string),
      getPresignedUrl(currentTermsOfUse.content as string),
    ]);

    const dataApp = await new ApplicationMaster().convertData(app);

    return {
      ...dataApp,
      license: { contentUrl: contentUrlLicense },
      termOfUse: { contentUrl: contentUrlTermsOfUse },
    };
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
