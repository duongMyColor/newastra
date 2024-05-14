export interface ProductPostFormIF extends ProductPostIF {
  Performance: PerformancePostIF[];
}

export interface PerformanceResponseIF {
  id: id;
  name: string;
  performanceTypeMasterId: number;
  assetBundleIOS: string;
  acstaId: number;
  encryptKey: string;
  assetBundleAndroid: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PerformancePostIF {
  id?: id;
  name: string;
  performanceTypeMasterId: number;
  assetBundleIOS: string;
  acstaId: number;
  encryptKey: string;
  assetBundleAndroid: string;
  record?: string;
}
