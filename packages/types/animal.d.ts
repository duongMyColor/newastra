import { RAFile } from './imgRecSelection';

export interface AnimalClassificationResponseIF {
  id: id;
  name: string;
  animalCount?: number;
  created: string;
  updated: string;
  ProductDetail?: AnimalResponselIF[];
}

export interface AnimalClassificationPostIF {
  name: string;
  animalCount?: number;
}

export interface AnimalResponselIF {
  id?: number;
  classificationId: number;
  name: string;
  thumbImg: string | Buffer;
  thumbImgName: string;
  uploadType: UploadType;
  continent: string;
  extinction: number;
  gender: number;
  feedType: number;
  description: string;
  created: string;
  updated: string;
}

export type UploadType = 'DB' | 'LOCAL' | 'S3';

export interface AnimalPostIF {
  id?: number;
  classificationId: number;
  name: string;
  thumbImg: string | Buffer;
  thumbImgName: string;
  uploadType: UploadType;
  continent: string;
  extinction: number;
  gender: number;
  feedType: number;
}

export interface AnimalFormIF extends AnimalPostIF {
  description: string;
  memo?: MemoIF;
  Memo?: MemoIF;
  pictures?: RAFile;
}

export interface AnimalFilter {
  classificationId: number;
  createdFrom: string;
  createdTo: string;
}
