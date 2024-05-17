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
} from '../repos/imgRecSelection.repo';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import path from 'path';
import { baseUploadFolder } from '@repo/consts/general';
import { readFileToBase64, saveFile } from '@repo/lib/fileUpload';

import { GetAllQueryIF } from '@repo/types/response';
import {
  ImgRecSelectionPostIF,
  ImgRecSelectionResponseIF,
} from '@repo/types/imgRecSelection';
import { generateFileName } from '@repo/utils/fileUtils';

class AnimalFactory {
  static async create({ payload }: { payload: FormData }) {
    console.log('::: payloadFormData', payload);

    const body = await new UploadFileService(payload).uploadFile();
    console.log('::: body', body);

    return await new ImgRecSelection(body as ImgRecSelectionPostIF).create();
  }

  static async createMany(animals: ImgRecSelectionPostIF[]) {
    const payload = animals.map((animal) => new ImgRecSelection(animal));
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await this.responseImgRecSelection(await getOneById(id));
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

  static async updateById({ id, payload }: { id: number; payload: FormData }) {
    let body;

    if (payload.get('img')) {
      body = await new UploadFileService(payload).uploadFile();
    } else {
      body = convertFormDataToObject(payload);
    }

    return await new ImgRecSelection(body as ImgRecSelectionPostIF).updateById({
      id,
    });
  }

  static async updateMany(updates: ImgRecSelectionPostIF[]) {
    const payload = updates.map((update) => new ImgRecSelection(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }

  static async responseImgRecSelection(
    imgRecSelectionResponse: ImgRecSelectionResponseIF
  ) {
    return this.readFileLocal(imgRecSelectionResponse);
  }

  static async readFileLocal(
    imgRecSelectionResponse: ImgRecSelectionResponseIF
  ) {
    let temp = { ...imgRecSelectionResponse };
    temp.imgPath = await readFileToBase64(imgRecSelectionResponse.imgPath);
    return temp;
  }
}

class ImgRecSelection implements ImgRecSelectionPostIF {
  public id?: number;
  public name: string;
  public imgPath: string;
  public data: JSON;

  public constructor({ id, name, imgPath, data }: ImgRecSelectionPostIF) {
    this.id = id;
    this.imgPath = imgPath as string;
    this.name = name as string;
    this.data = data ? JSON.parse(data as string) : data;
  }

  public async create() {
    const payload: ImgRecSelectionPostIF = this;

    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: ImgRecSelectionPostIF = this;
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
    const file = this.formData.get('img') as File;
    console.log('::: file', file);

    const fileName = generateFileName(file.name);
    const folderPath = path.join(baseUploadFolder, 'imgRecSelection');

    const { filePath } = await saveFile(file, fileName, folderPath);

    this.formData.set('imgPath', filePath);
    const body = convertFormDataToObject(this.formData);
    return body;
  }

  public uploadFile() {
    return this.uploadToLocalFile();
  }
}

export default AnimalFactory;
