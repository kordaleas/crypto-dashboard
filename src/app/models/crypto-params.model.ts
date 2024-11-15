export interface CryptoQueryParams {
    vs_currency?: string;
    order?: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc' | 'volume_asc';
    per_page?: number;
    page?: number;
    sparkline?: boolean;
    price_change_percentage?: string;
    category?: string;
  }
  
  export const DEFAULT_PARAMS: CryptoQueryParams = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 250,
    page: 1,
    sparkline: false
  };