export interface LicenseResponselIF {
  id?: number;
  memo: string;
  content:
    | string
    | Buffer
    | Blob
    | File
    | FormData
    | URL
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface LicensePostIF {
  [key: string]: any;
  id?: number;
  memo: string;
  version: string;
  content: string | Buffer | File;
  publishedDate: string | Date;
  updatedAt?: string | Date;
}
