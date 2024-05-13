export interface ForcedUpdateManagementResponseIF {
  id?: number;
  managementName: string;
  operateSystem: string;
  version: string;
  publishedDate: string | date;
  updatedAt?: string | date;
  no: number;
  status?: string;
  record?: string;
}

export interface ForcedUpdateManagementPostIF {
  id?: number;
  managementName: string;
  operateSystem: string;
  version: string;
  publishedDate: string | date;
  updatedAt?: string | date;
  record?: string;
}
