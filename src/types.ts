export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d?: { price: number[] };
  last_updated: string;
}

export interface CoinRow extends CoinData {
  previousPrice: number;
}

export const TOP_COIN_IDS = [
  'bitcoin', 'ethereum', 'binancecoin', 'solana', 'ripple',
  'cardano', 'dogecoin', 'tron', 'polkadot', 'litecoin',
];
