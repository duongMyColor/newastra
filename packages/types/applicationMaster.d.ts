export interface AplicationMasterResponseIF {
  id?: number;
  appId?: number;

  appName: string;
  packageName: string | number;
  termsOfUseId: number;
  licenseId: string;
  assetBundleIOS: string;
  assetBundleAndroid: string;
  outlineUrl: number;
  encryptKey: string;

  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AplicationMasterPostIF {
  id?: number;
  appId?: number;
  appName: string;
  packageName: string | number;
  termsOfUseId: number;
  licenseId: string;
  assetBundleIOS: string;
  assetBundleAndroid: string;
  encryptKey: string;
  outlineUrl: number;
  updatedAt?: string | Date;
}
