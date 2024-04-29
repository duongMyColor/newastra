import { Role, UserIF } from '@repo/types/user';
import {
  getAll,
  getOneById,
  insert,
  updateById,
  deleteById,
  deleteManyById,
  getOneWithParam,
  getPermission,
  getAllWithQuery,
  safetyDeleteById,
  safetyDeleteManyById,
} from '../_repos/user.repo';
import { hashPassword } from '@repo/utils/password';
import { GetAllQueryIF } from '@repo/types/response';

class UserFactory {
  static async create({ payload }: { payload: UserIF }) {
    return await new User(payload).create();
  }

  static async getOneById(id: number) {
    return await getOneById(id);
  }

  static async getAll() {
    return await getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await getAllWithQuery({ filter, range, sort });
  }

  static async getPermission(userId: number) {
    return await getPermission(userId);
  }

  static async updateById({ id, payload }: { id: number; payload: UserIF }) {
    return await new User(payload).updateById({ id });
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }

  static async safetyDeleteById(id: number) {
    return await safetyDeleteById(id);
  }

  static async safetyDeleteManyById(ids: number[]) {
    return await safetyDeleteManyById(ids);
  }

  static async findByEmail({ email }: { email: string }) {
    return await getOneWithParam({ where: { email } });
  }

  static async findByUsername({ username }: { username: string }) {
    return await getOneWithParam({ where: { username } });
  }
}

class User implements UserIF {
  public username: string;
  public role: Role;
  public enabled: boolean;
  public email: string;
  public password!: string;
  public isDeleted: boolean;
  public updatedAt: Date;

  public constructor({
    username,
    role,
    enabled = true,
    email,
    password,
    newPassword,
    isDeleted = false,
  }: UserIF) {
    this.username = username;
    this.role = role;
    this.enabled = enabled;
    this.email = email;
    this.isDeleted = isDeleted;
    this.updatedAt = new Date();

    if (password) {
      this.password = newPassword
        ? hashPassword(newPassword)
        : hashPassword(password);
    }
  }

  public async create() {
    const payload: UserIF = this;
    console.log('payload', payload);

    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: UserIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

export default UserFactory;
