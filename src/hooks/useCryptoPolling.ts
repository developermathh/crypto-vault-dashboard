import { useEffect, useRef, useState } from 'react';
import { TOP_COIN_IDS, type CoinData, type CoinRow } from '@/types';

const API = 'https://api.coingecko.com/api/v3';
const POLL_MS = 15_000;

interface RawCoin extends CoinData {}

export function useCryptoPolling() {
  const [coins, setCoins] = useState<CoinRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrices() {
      const ids = TOP_COIN_IDS.join(',');
      const url = `${API}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h&precision=full`;
      try {
        const res = await fetch(url, { headers: { accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as RawCoin[];
        setCoins((prev) => {
          const map = new Map(prev.map((p) => [p.id, p]));
          const order = new Map(TOP_COIN_IDS.map((id, i) => [id, i]));
          return data
            .map((raw) => ({
              ...raw,
              previousPrice: map.get(raw.id)?.previousPrice ?? raw.current_price,
            }))
            .sort((a, b) => (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99));
        });
        if (!cancelled) {
          setError(null);
          setLoading(false);
          setLastUpdate(Date.now());
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Error');
          setLoading(false);
        }
      }
    }

    void fetchPrices();
    timer.current = setInterval(() => void fetchPrices(), POLL_MS);
    return () => {
      cancelled = true;
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return { coins, loading, error, lastUpdate };
}
