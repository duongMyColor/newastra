export interface ProductResponseIF {
  id: id;
  name: string;
  masterCategory?: number;
  subCategory?: number;
  created: string;
  updated: string;
  ProductDetail?: PerformanceResponseIF[];
}

export interface ProductPostIF {
  name: string;
  masterCategory?: number;
  subCategory?: number;
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
