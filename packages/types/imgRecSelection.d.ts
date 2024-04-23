export interface ImgRecSelectionResponseIF {
  id?: number;
  name: string;
  imgPath: string;
  data: string;
  created: string;
  updated: string;
}

export interface ImgRecSelectionPostIF {
  id?: number;
  pictures?: RAFile;
  name?: string;
  img?: Buffer;
  imgname?: string;
  imgPath?: string;
  data?: JSON | string;
}

export type RAFile = {
  rawFile: File;
  src: string;
  title: string;
};
