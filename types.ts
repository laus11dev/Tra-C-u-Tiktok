
export interface TiktokShopeeMap {
  tiktokLink: string;
  tiktokId: string;
  shopeeCode: string;
  shopeeLink: string;
}

export type SearchResult = TiktokShopeeMap | { notFound: true } | null;