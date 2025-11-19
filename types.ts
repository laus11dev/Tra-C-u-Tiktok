
export interface ShopeeProduct {
  productName?: string;
  shopeeCode: string;
  shopeeLink: string;
}

export interface TiktokShopeeMap {
  tiktokLink: string;
  products: ShopeeProduct[];
}

export type SearchResult = TiktokShopeeMap | { notFound: true } | null;