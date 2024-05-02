export interface PerformanceTypeMasterResponseIF {
  id: number;
  typeName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceTypeMasterPostIF {
  id?: number;
  typeName: string;
}

export interface ProductPostFormIF extends ProductPostIF {
  ProductDetail: PerformancePostIF[];
}

export interface PerformanceResponseIF {
  id: id;
  name: string;
  performanceTypeMasterID: number;
  assetBundleIOS: string;
  acstaID: number;
  assetBundleAndroid: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PerformancePostIF {
  id?: id;
  name: string;
  performanceTypeMasterID: number;
  assetBundleIOS: string;
  acstaID: number;
  assetBundleAndroid: string;
}
