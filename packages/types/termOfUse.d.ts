export interface TermOfUseResponselIF {
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

export interface TermOfUsePostIF {
  id?: number;
  memo: string;
  version: string;
  content: string | Buffer;
  publishedDate: string | Date;
}
