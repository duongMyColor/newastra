import {
  getCurrentTermOfUse,
  getOneById,
  getAll,
} from '../repos/termOfUse.repo';

class TermOfUseService {
  static async getAll() {
    return await getAll();
  }

  static async getCurrentTermOfUse() {
    const currentTermsOfUse = await getCurrentTermOfUse();
    const contentUrl = currentTermsOfUse?.content;
    return { contentUrl };
  }

  static async getOneById(id: number) {
    const termOfUse = await getOneById(id);
    const contentUrl = termOfUse?.content;
    return { contentUrl };
  }
}
export default TermOfUseService;
