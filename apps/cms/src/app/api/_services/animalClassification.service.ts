import { AnimalClassificationPostIF } from '@repo/types/animal';
import {
  getAll,
  getOneById,
  insert,
  updateById,
  deleteById,
  getByIdWithDetail,
  deleteManyById,
  deleteWithRelation,
} from '../_repos/animalClassification.repo';

class AnimalClassificationFactory {
  static async create({ payload }: { payload: AnimalClassificationPostIF }) {
    return await new AnimalClassification(payload).create();
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }

  static async getByIdWithDetail(id: number) {
    return await getByIdWithDetail(id);
  }

  static async getAll() {
    return await getAll();
  }

  static async updateById({
    id,
    payload,
  }: {
    id: number;
    payload: AnimalClassificationPostIF;
  }) {
    return await new AnimalClassification(payload).updateById({ id });
  }

  static async deleteById(id: number) {
    return await deleteWithRelation(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }
}

class AnimalClassification implements AnimalClassificationPostIF {
  public name: string;
  public animalCount: number;

  public constructor({ name, animalCount }: AnimalClassificationPostIF) {
    this.name = name;
    this.animalCount = animalCount as number;
  }

  public async create() {
    const payload: AnimalClassificationPostIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: AnimalClassificationPostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default AnimalClassificationFactory;
