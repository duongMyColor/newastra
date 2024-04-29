import { TermOfUsePostIF, TermOfUseResponselIF } from '@repo/types/termOfUse';
import {
  getAll,
  getOneById,
  insert,
  insertMany,
  updateById,
  updateManyById,
  deleteById,
  deleteManyById,
  getAllWithQuery,
  getAllWithFilters,
  getManyReference,
} from '../_repos/termOfUse.repo';
import { createGetPresignedUrlWithClient } from '@repo/lib/aws-s3';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

class TermOfUseFactory {
  static async create({ payload }: { payload: FormData }) {
    console.log('::: payloadFormData', payload);

    const body = await new UploadFileService(payload).uploadFile();

    return await new TermOfUse(body as TermOfUsePostIF).create();
  }

  static async createMany(body: TermOfUsePostIF[]) {
    const payload = body.map(
      (terms_and_conditions) => new TermOfUse(terms_and_conditions)
    );
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await this.responseTermOfUse(await getOneById(id));
  }

  static async getAll() {
    return await getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await getAllWithQuery({ filter, range, sort });
  }

  static async getAllWithFilters({ filter, range, sort }: GetAllQueryIF) {
    return await getAllWithFilters({ filter, range, sort });
  }

  static async getManyReference(params: GetManyReferenceParams) {
    return await getManyReference(params);
  }

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    const body = await new UploadFileService(payload).uploadFile();

    return this.responseTermOfUse(
      await new TermOfUse(body as TermOfUsePostIF).updateById({ id })
    );
  }

  static async updateMany(updates: TermOfUsePostIF[]) {
    const payload = updates.map((update) => new TermOfUse(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }

  static async responseTermOfUse(response: TermOfUseResponselIF) {
    return this.addPresignedUrl(response);
  }

  static async addPresignedUrl(response: TermOfUseResponselIF) {
    let temp = { ...response };
    temp.content = await createGetPresignedUrlWithClient(
      response.content as string
    );
    return temp;
  }
}

class TermOfUse implements TermOfUsePostIF {
  public id?: number;
  public memo: string;
  public version: string;
  public content: string;
  public publishedDate: string | Date;
  public updatedAt: string;

  public constructor({
    id,
    version,
    content,
    memo,
    publishedDate,
  }: TermOfUsePostIF) {
    this.id = id;
    this.version = version;
    this.content = content as string;
    this.memo = memo.toString();
    this.publishedDate = publishedDate;
    this.updatedAt = new Date().toISOString();
  }

  public async create() {
    const payload: TermOfUsePostIF = this;
    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: TermOfUsePostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

class UploadFileService {
  private formData: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  private async uploadToR2() {
    // const file = this.formData.get('filePath');
    // if (!file) return convertFormDataToObject(this.formData);
    // const fileName = this.formData.get('filePathName');
    // const folderPath = path.join(baseUploadFolder, 'terms_and_conditions');
    // const { filePath } = await saveFile(
    //   file as File,
    //   fileName as string,
    //   folderPath
    // );
    // this.formData.set('filePath', filePath);
    // const body = convertFormDataToObject(this.formData);
    // return body;
  }

  public uploadFile() {
    return this.uploadToR2();
  }
}

export default TermOfUseFactory;
