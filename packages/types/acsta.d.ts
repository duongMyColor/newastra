export interface AcstaResponseIF {
  [key: string]: any;
  id?: number;
  managementName: string;
  acstaName: string;
  status: string;
  applicationID: number;
  thumbnailUrl:
    | string
    | Buffer
    | Blob
    | File
    | FormData
    | URL
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  scanImageUrl:
    | string
    | Buffer
    | Blob
    | File
    | FormData
    | URL
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  acstaBasicInfoID: number;
  scanOriginX: float;
  scanOriginY: float;
  scanWidth: float;
  scanHeight: float;
  scanColors: string;
  modeId: number;
  dateStart: string | Date;
  dateEnd: string | Date;
  updatedAt: string | Date;
}

export interface AcstaPostIF {
  [key: string]: any;
  id?: number;
  managementName: string;
  acstaName: string;
  status: string;
  applicationID: number;
  thumbnailUrl: string | Buffer | File;
  scanImageUrl: string | Buffer | File;
  acstaBasicInfoID: number;
  scanOriginX: float;
  scanOriginY: float;
  scanWidth: float;
  scanHeight: float;
  scanColors: string;
  modeId: number;
  dateStart: string | Date;
  dateEnd: string | Date;
  updatedAt: string | Date;
}
