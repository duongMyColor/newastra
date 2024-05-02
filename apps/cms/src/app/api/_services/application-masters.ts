import {
  AnimalPostIF,
  AnimalResponselIF,
  UploadType,
} from '@repo/types/animal';
import {
  getAll,
  getOneById,
  insert,
  insertMany,
  updateById,
  updateManyById,
  deleteById,
  deleteManyById,
  getOneAndParent,
  getOneAndChildAndParent,
  getAllWithQuery,
  getAllWithFilters,
  getManyReference,
} from '../_repos/application-masters';
import { convertFormDataToObject } from '@repo/utils/objectUtils';
import path from 'path';
import { baseUploadFolder } from '@repo/consts/general';
import { readFileToBase64, saveFile } from '@repo/lib/fileUpload';
import { convertFileToBase64Server } from '@repo/utils/server_actions/converFileToBase64Server';
import { createGetPresignedUrlWithClient } from '@repo/lib/aws-s3';
import { GetAllQueryIF } from '@repo/types/response';
import { GetManyReferenceParams } from 'react-admin';

class AnimalFactory {
  static async create({ payload }: { payload: FormData }) {
    console.log('::: payloadFormData', payload);

    const body = await new UploadFileService(payload).uploadFile();

    return await new Animal(body as AnimalPostIF).create();
  }

  static async createMany(animals: AnimalPostIF[]) {
    const payload = animals.map((animal) => new Animal(animal));
    return await insertMany(payload);
  }

  static async getOneById(id: number) {
    return await this.responseAnimal(await getOneById(id));
  }
  static async getOneAndParent(id: number) {
    return await this.responseAnimal(await getOneAndParent(id));
  }

  static async getOneAndChildAndParent(id: number) {
    return await this.responseAnimal(await getOneAndChildAndParent(id));
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
      await new Animal(body as AnimalPostIF).updateById({ id })
    );
  }

  static async updateMany(updates: AnimalPostIF[]) {
    const payload = updates.map((update) => new Animal(update));

    return await updateManyById(payload);
  }

  static async deleteById(id: number) {
    return await deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await deleteManyById(ids);
  }

  static async responseAnimal(animalResponse: AnimalResponselIF) {
    switch (animalResponse.uploadType) {
      case 'DB':
        return animalResponse;
      case 'LOCAL':
        return this.readFileLocal(animalResponse);
      case 'S3':
        return this.addPresignedUrl(animalResponse);
      default:
        break;
    }
  }

  static async readFileLocal(animalResponse: AnimalResponselIF) {
    let temp = { ...animalResponse };
    temp.thumbImg = await readFileToBase64(animalResponse.thumbImg as string);
    return temp;
  }

  static async addPresignedUrl(animalResponse: AnimalResponselIF) {
    let temp = { ...animalResponse };
    temp.thumbImg = await createGetPresignedUrlWithClient(
      animalResponse.thumbImg as string
    );
    return temp;
  }
}

class Animal implements AnimalPostIF {
  public id?: number;
  public classificationId: number;
  public name: string;
  public thumbImg: string;
  public thumbImgName: string;
  public uploadType: UploadType;
  public continent: string;
  public extinction: number;
  public gender: number;
  public feedType: number;

  public constructor({
    id,
    classificationId,
    name,
    thumbImg,
    thumbImgName,
    uploadType,
    continent,
    extinction,
    gender,
    feedType,
  }: AnimalPostIF) {
    this.id = id;
    this.classificationId = classificationId;
    this.name = name;
    this.thumbImg = thumbImg as string;
    this.uploadType = uploadType;
    this.thumbImgName = thumbImgName;
    this.continent = continent;
    this.extinction = extinction;
    this.gender = gender;
    this.feedType = feedType;
  }

  public async create() {
    const payload: AnimalPostIF = this;

    // TODO: validate payload
    return await insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: AnimalPostIF = this;
    // TODO: validate payload
    return await updateById({ id, payload });
  }
}

class UploadFileService {
  private formData: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  private async uploadToDB() {
    const file = this.formData.get('thumbImg') as File;
    if (!file) return convertFormDataToObject(this.formData);

    const fileBase64 = await convertFileToBase64Server(file);
    this.formData.set('thumbImg', fileBase64);

    return convertFormDataToObject(this.formData);
  }

  private async uploadToLocalFile() {
    const file = this.formData.get('thumbImg');
    if (!file) return convertFormDataToObject(this.formData);

    const fileName = this.formData.get('thumbImgName');
    const folderPath = path.join(baseUploadFolder, 'animal');

    const { filePath } = await saveFile(
      file as File,
      fileName as string,
      folderPath
    );
    this.formData.set('thumbImg', filePath);
    const body = convertFormDataToObject(this.formData);
    return body;
  }

  private uploadToS3() {
    return convertFormDataToObject(this.formData);
  }

  public uploadFile() {
    const uploadType = this.formData.get('uploadType');
    console.log('::: uploadType', uploadType);

    switch (uploadType) {
      case 'DB':
        return this.uploadToDB();
      case 'LOCAL':
        return this.uploadToLocalFile();
      case 'S3':
        return this.uploadToS3();
      default:
        this.uploadToLocalFile();
    }
  }
}

export default AnimalFactory;
