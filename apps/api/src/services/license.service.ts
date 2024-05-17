import { getCurrentLicense, getOneById, getAll } from '../repos/license.repo';

class LicenseService {
  static async getAll() {
    const licenses = await getAll();
    return licenses;
  }

  static async getCurrentLicense() {
    const currentLicense = await getCurrentLicense();
    const contentUrl = currentLicense?.content;
    return { contentUrl };
  }

  static async getOneById(id: number) {
    const license = await getOneById(id);
    const contentUrl = license?.content;
    return { contentUrl };
  }
}

export default LicenseService;
