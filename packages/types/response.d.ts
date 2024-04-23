export type FilterType = Filter;

export interface ResponseIF {
  message: string;
  status?: number;
  reason?: string;
  metadata: RecordValue;
}

export interface GetAllQueryIF {
  filter: FilterType;
  range: number[];
  sort: string[];
}
