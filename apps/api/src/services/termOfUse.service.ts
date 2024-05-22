import {
  getCurrentTermOfUse,
  getOneById,
  getAll,
} from '../repos/termOfUse.repo';
import { getPresignedUrl } from '../lib/cloudflare-r2';

class TermOfUseService {
  static async getAll() {
    return await getAll();
  }

  static async getCurrentTermOfUse() {
    const currentTermsOfUse = await getCurrentTermOfUse();

    const contentUrl = await getPresignedUrl(
      'da-acsta-bucket',
      currentTermsOfUse?.content as string
    );
    return { contentUrl };
  }

  static async getOneById(id: number) {
    const termOfUse = await getOneById(id);
    const contentUrl = await getPresignedUrl(
      'da-acsta-bucket',
      termOfUse?.content as string
    );
    return { contentUrl };
  }
}
export default TermOfUseService;
