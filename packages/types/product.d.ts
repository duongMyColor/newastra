export interface ProductResponseIF {
  id: id;
  name: string;
  masterCategory?: number;
  subCategory?: number;
  created: string;
  updated: string;
  ProductDetail?: ProductDetaiResponselIF[];
}

export interface ProductPostIF {
  name: string;
  masterCategory?: number;
  subCategory?: number;
}

export interface ProductPostFormIF extends ProductPostIF {
  ProductDetail: ProductDetailPostIF[];
}

export interface ProductDetaiResponselIF {
  id: id;
  productId: number;
  count: number;
  detailName: string;
  created: string;
  updated: string;
}

export interface ProductDetailPostIF {
  id?: number;
  productId: number;
  count: number;
  detailName: string;
}
