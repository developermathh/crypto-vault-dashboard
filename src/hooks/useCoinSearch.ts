import { useCallback, useEffect, useRef, useState } from 'react';
import type { CoinData, CoinRow } from '@/types';

const API = 'https://api.coingecko.com/api/v3';

interface SearchResult extends CoinRow {}

export function useCoinSearch() {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqId = useRef(0);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (!q) {
      setDebounced('');
      setResults([]);
      setError(null);
      return;
    }
    debounceRef.current = setTimeout(() => setDebounced(q), 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    const currentReq = ++reqId.current;
    setSearching(true);
    setError(null);

    async function search() {
      try {
        const searchRes = await fetch(`${API}/search?query=${encodeURIComponent(debounced)}`, {
          headers: { accept: 'application/json' },
        });
        if (!searchRes.ok) throw new Error(`HTTP ${searchRes.status}`);
        const searchData = (await searchRes.json()) as {
          coins: { id: string }[];
        };
        const matches = (searchData.coins ?? []).slice(0, 12);
        if (matches.length === 0) {
          if (!cancelled && currentReq === reqId.current) {
            setResults([]);
            setSearching(false);
          }
          return;
        }
        const ids = matches.map((m) => m.id).join(',');
        const marketRes = await fetch(
          `${API}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h&precision=full`,
          { headers: { accept: 'application/json' } }
        );
        if (!marketRes.ok) throw new Error(`HTTP ${marketRes.status}`);
        const marketData = (await marketRes.json()) as CoinData[];
        const lowerQ = debounced.toLowerCase();
        const sorted = marketData
          .map((raw) => ({ ...raw, previousPrice: raw.current_price }))
          .sort((a, b) => {
            const aExact = a.name.toLowerCase() === lowerQ || a.symbol.toLowerCase() === lowerQ;
            const bExact = b.name.toLowerCase() === lowerQ || b.symbol.toLowerCase() === lowerQ;
            if (aExact !== bExact) return aExact ? -1 : 1;
            return (a.market_cap_rank || 999) - (b.market_cap_rank || 999);
          });
        if (!cancelled && currentReq === reqId.current) {
          setResults(sorted);
          setSearching(false);
        }
      } catch (e) {
        if (!cancelled && currentReq === reqId.current) {
          setError(e instanceof Error ? e.message : 'Error');
          setSearching(false);
        }
      }
    }

    void search();
    return () => { cancelled = true; };
  }, [debounced]);

  const clear = useCallback(() => {
    setQuery('');
    setDebounced('');
    setResults([]);
    setError(null);
  }, []);

  return { query, setQuery, results, searching, error, clear, hasQuery: debounced.length > 0 };
}
