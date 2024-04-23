export interface TermsAndConditionsResponselIF {
  id?: number;
  name: string;
  filePath:
    | string
    | Buffer
    | Blob
    | File
    | FormData
    | URL
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null;
  fileUrl?: string;
  version: string;
  memo: string;
  created: string;
  updated: string;
}

export interface TermsAndConditionsPostIF {
  id?: number;
  name: string;
  filePath: string | Buffer;
  version: string;
  memo: string;
}
