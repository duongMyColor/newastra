import { getPresignedUrl } from '../lib/cloudflare-r2';
import { getCurrentLicense, getOneById, getAll } from '../repos/license.repo';

class LicenseService {
  static async getAll() {
    const licenses = await getAll();
    return licenses;
  }

  static async getCurrentLicense() {
    const currentLicense = await getCurrentLicense();
    const contentUrl = await getPresignedUrl(
      'da-acsta-bucket',
      currentLicense?.content as string
    );

    return { contentUrl };
  }

  static async getOneById(id: number) {
    const license = await getOneById(id);
    const contentUrl = await getPresignedUrl(
      'da-acsta-bucket',
      license?.content as string
    );
    return { contentUrl };
  }
}

export default LicenseService;
