import { MemoIF } from '@repo/types/memo';
import {
  getAll,
  getOneById,
  insert,
  updateById,
  deleteById,
  getOneByUserId,
  deleteManyById,
} from '../_repos/memo.repo';

class MemoFactory {
  static async create({ payload }: { payload: MemoIF }) {
    return await new Memo(payload).create();
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }

  static async getOneByUserId(userId: number) {
    return await getOneByUserId(userId);
  }

  static async getAll() {
    return await getAll();
  }

  static async updateById({ id, payload }: { id: number; payload: MemoIF }) {
    return await new Memo(payload).updateById({ id });
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class Memo implements MemoIF {
  content: string;
  animalId: number;

  public constructor({ content, animalId }: MemoIF) {
    this.content = content;
    this.animalId = animalId;
  }

  public async create() {
    const payload: MemoIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: MemoIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default MemoFactory;
