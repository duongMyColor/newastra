import {
  TermOfUsePostIF,
  TermOfUseResponselIF,
} from '@repo/types/termAndConditions';
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
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import path from 'path';
import { baseUploadFolder } from '@repo/consts/general';
import { readFileToBase64, saveFile } from '@repo/lib/fileUpload';
import { createGetPresignedUrlWithClient } from '@repo/lib/aws-s3';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

class AnimalFactory {
  static async create({ payload }: { payload: FormData }) {
    console.log('::: payloadFormData', payload);

    const body = await new UploadFileService(payload).uploadFile();

    return await new TermsAndConditions(body as TermOfUsePostIF).create();
  }

  static async createMany(body: TermOfUsePostIF[]) {
    const payload = body.map(
      (terms_and_conditions) => new TermsAndConditions(terms_and_conditions)
    );
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await this.responseAnimal(await getOneById(id));
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

    return this.responseAnimal(
      await new TermsAndConditions(body as TermOfUsePostIF).updateById({ id })
    );
  }

  static async updateMany(updates: TermOfUsePostIF[]) {
    const payload = updates.map((update) => new TermsAndConditions(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }

  static async responseAnimal(response: TermOfUseResponselIF) {
    return this.readFileLocal(response);
  }

  static async readFileLocal(response: TermOfUseResponselIF) {
    let temp = { ...response };
    temp.fileUrl = await readFileToBase64(response.filePath as string);
    return temp;
  }

  static async addPresignedUrl(response: TermOfUseResponselIF) {
    let temp = { ...response };
    temp.filePath = await createGetPresignedUrlWithClient(
      response.filePath as string
    );
    return temp;
  }
}

class TermsAndConditions implements TermOfUsePostIF {
  public id?: number;
  public name: string;
  public filePath: string;
  public version: string;
  public memo: string;

  public constructor({ id, name, filePath, version, memo }: TermOfUsePostIF) {
    this.id = id;
    this.name = name;
    this.filePath = filePath as string;
    this.version = version.toString();
    this.memo = memo.toString();
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

  private async uploadToLocalFile() {
    const file = this.formData.get('filePath');
    if (!file) return convertFormDataToObject(this.formData);

    const fileName = this.formData.get('filePathName');
    const folderPath = path.join(baseUploadFolder, 'terms_and_conditions');

    const { filePath } = await saveFile(
      file as File,
      fileName as string,
      folderPath
    );
    this.formData.set('filePath', filePath);
    const body = convertFormDataToObject(this.formData);
    return body;
  }

  public uploadFile() {
    return this.uploadToLocalFile();
  }
}

export default AnimalFactory;
