import {
  getCurrentTermOfUse,
  getOneById,
  getAll,
} from '../repos/termOfUse.repo';
import { getPresignedUrl } from '../lib/cloudflare-r2';
import { NotFoundError } from '@/core/error.response';

class TermOfUseService {
  static async getAll() {
    const result = await getAll();
    if (!result?.length) {
      throw new NotFoundError('Term of use not found');
    }
    return result;
  }

  static async getCurrentTermOfUse() {
    const currentTermsOfUse = await getCurrentTermOfUse();
    if (!currentTermsOfUse) {
      throw new NotFoundError('Term of use not found');
    }

    const contentUrl = await getPresignedUrl(
      'da-acsta-bucket',
      currentTermsOfUse?.content as string
    );
    return { contentUrl };
  }

  static async getOneById(id: number) {
    const termOfUse = await getOneById(id);
    if (!termOfUse) {
      throw new NotFoundError('Term of use not found');
    }

    const contentUrl = await getPresignedUrl(
      'da-acsta-bucket',
      termOfUse?.content as string
    );
    return { contentUrl };
  }
}
export default TermOfUseService;
