export interface AplicationMasterResponselIF {
  id?: number;
  appName: string;
  packageName: string;
  termsOfUseID: number;
  licenseID: string;
  assetBundleIOS: string;
  assetBundleAndroid: string;
  outlineUrl: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AplicationMasterPostIF {
  id?: number;
  appName: string;
  packageName: string;
  termsOfUseID: number;
  licenseID: string;
  assetBundleIOS: string;
  assetBundleAndroid: string;
  outlineUrl: number;
  updatedAt?: string | Date;
}
