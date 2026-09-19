import { useEffect, useState } from 'react';
import { Search, X, Loader2, Activity, WifiOff, Star } from 'lucide-react';
import { useCryptoPolling } from '@/hooks/useCryptoPolling';
import { useCoinSearch } from '@/hooks/useCoinSearch';
import { useLang } from '@/i18n/LanguageContext';
import { Sparkline } from './Sparkline';
import type { CoinRow } from '@/types';

function fmtPrice(n: number): string {
  if (n >= 1) return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n.toLocaleString('en-US', { style: 'currency', 'currency': 'USD', minimumFractionDigits: 4, maximumFractionDigits: 6 });
}

function fmtCompact(n: number): string {
  return n.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: 2 });
}

function PriceCell({ coin }: { coin: CoinRow }) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  useEffect(() => {
    if (coin.previousPrice === coin.current_price) return;
    setFlash(coin.current_price > coin.previousPrice ? 'up' : 'down');
    const t = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(t);
  }, [coin.current_price, coin.previousPrice]);
  return (
    <span
      className={`tabular text-sm font-semibold transform-gpu will-change-transform ${
        flash === 'up' ? 'animate-flashUp text-pos' : flash === 'down' ? 'animate-flashDown text-neg' : 'text-white'
      }`}
    >
      {fmtPrice(coin.current_price)}
    </span>
  );
}

function Row({ coin, index }: { coin: CoinRow; index: number }) {
  const up = coin.price_change_percentage_24h >= 0;
  return (
    <tr className="border-b border-[#1C1F28] transition-colors duration-200 hover:bg-[#171A21]/50">
      <td className="py-2.5 pl-3 pr-1 text-center tabular text-xs text-slate-500">{coin.market_cap_rank || index + 1}</td>
      <td className="py-2.5 pr-3">
        <div className="flex items-center gap-2">
          {coin.image ? (
            <img src={coin.image} alt="" loading="lazy" className="h-5 w-5 rounded-full" />
          ) : (
            <div className="h-5 w-5 rounded-full bg-base-700" />
          )}
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-200">{coin.symbol.toUpperCase()}</p>
            <p className="truncate text-[0.65rem] text-slate-500">{coin.name}</p>
          </div>
        </div>
      </td>
      <td className="py-2.5 pr-3 text-right"><PriceCell coin={coin} /></td>
      <td className="hidden py-2.5 pr-3 text-right sm:table-cell">
        <span className={`tabular text-xs font-medium ${up ? 'text-pos' : 'text-neg'}`}>
          {up ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </td>
      <td className="hidden py-2.5 pr-3 text-right tabular text-xs text-slate-400 lg:table-cell">
        ${fmtCompact(coin.market_cap)}
      </td>
      <td className="hidden py-2.5 pr-3 text-right md:table-cell">
        <div className="flex justify-end"><Sparkline data={coin.sparkline_in_7d?.price ?? []} positive={up} /></div>
      </td>
      <td className="py-2.5 pr-3 text-right sm:hidden">
        <span className={`tabular text-xs font-medium ${up ? 'text-pos' : 'text-neg'}`}>
          {up ? '+' : ''}{coin.price_change_percentage_24h.toFixed(1)}%
        </span>
      </td>
    </tr>
  );
}

function MobileCard({ coin, index }: { coin: CoinRow; index: number }) {
  const up = coin.price_change_percentage_24h >= 0;
  return (
    <div className="panel gpu p-3 transition-transform duration-200 hover:scale-[1.01]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {coin.image ? <img src={coin.image} alt="" loading="lazy" className="h-6 w-6 rounded-full" /> : <div className="h-6 w-6 rounded-full bg-base-700" />}
          <div>
            <p className="text-xs font-semibold text-slate-200">{coin.symbol.toUpperCase()}</p>
            <p className="text-[0.65rem] text-slate-500">#{coin.market_cap_rank || index + 1}</p>
          </div>
        </div>
        <Sparkline data={coin.sparkline_in_7d?.price ?? []} positive={up} width={60} height={20} />
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div>
          <PriceCell coin={coin} />
          <p className="tabular text-[0.65rem] text-slate-500">${fmtCompact(coin.market_cap)}</p>
        </div>
        <span className={`tabular text-xs font-medium ${up ? 'text-pos' : 'text-neg'}`}>
          {up ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

export function PriceMonitor() {
  const { t } = useLang();
  const { coins, loading, error, lastUpdate } = useCryptoPolling();
  const search = useCoinSearch();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((x) => x + 1), 10_000);
    return () => clearInterval(interval);
  }, []);
  void tick;

  const showSearch = search.hasQuery;
  const display = showSearch ? search.results : coins;
  const isLoading = showSearch ? search.searching : loading;

  const agoStr = (() => {
    if (!lastUpdate) return '—';
    const s = Math.floor((Date.now() - lastUpdate) / 1000);
    return t.monitor.updatedAgo(s);
  })();

  return (
    <section id="precios">
      <div className="mb-3 flex items-center gap-2">
        <span className="pulse-dot" />
        <span className="label-xs text-pos">{t.monitor.liveBadge}</span>
      </div>
      <h2 className="font-display text-lg font-bold text-white sm:text-xl">{t.monitor.title}</h2>
      <p className="mb-4 text-xs text-slate-500">{t.monitor.subtitle}</p>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
        <input
          type="text"
          inputMode="search"
          value={search.query}
          onChange={(e) => search.setQuery(e.target.value)}
          placeholder={t.monitor.searchPlaceholder}
          className="input-field pl-9 pr-9"
          aria-label={t.monitor.searchAria}
        />
        {search.query && (
          <button
            type="button"
            onClick={search.clear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-600 hover:text-slate-400"
            aria-label={t.monitor.clearAria}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {search.searching && (
          <Loader2 className="absolute right-8 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-gold" />
        )}
      </div>

      <div className="mb-3 flex items-center justify-between text-[0.65rem]">
        {showSearch ? (
          <span className="flex items-center gap-1 text-gold">
            <Star className="h-3 w-3" />
            {search.results.length > 0
              ? `${t.monitor.resultsCount(search.results.length)}`
              : search.searching ? t.monitor.searching : `${t.monitor.noResults} "${search.query}"`}
          </span>
        ) : error ? (
          <span className="flex items-center gap-1 text-neg"><WifiOff className="h-3 w-3" /> {t.monitor.noConnection}</span>
        ) : (
          <span className="flex items-center gap-1 text-slate-500">
            <Activity className="h-3 w-3 text-pos" /> {t.monitor.updated} {agoStr}
          </span>
        )}
        {!showSearch && <span className="text-slate-600">{t.monitor.top10}</span>}
      </div>

      {/* Content */}
      {isLoading && display.length === 0 ? (
        <div className="panel gpu p-4 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-5 w-5 animate-pulse rounded-full bg-base-700" />
              <div className="h-3 flex-1 animate-pulse rounded bg-base-700" />
              <div className="h-3 w-16 animate-pulse rounded bg-base-700" />
            </div>
          ))}
        </div>
      ) : display.length === 0 && !showSearch ? (
        <div className="panel gpu flex flex-col items-center gap-2 p-8 text-center">
          <WifiOff className="h-5 w-5 text-slate-600" />
          <p className="text-xs text-slate-500">{t.monitor.loadError}</p>
        </div>
      ) : display.length === 0 && showSearch && !search.searching ? (
        <div className="panel gpu flex flex-col items-center gap-2 p-8 text-center">
          <Search className="h-5 w-5 text-slate-600" />
          <p className="text-xs text-slate-500">{t.monitor.noResults} "{search.query}"</p>
          <p className="text-[0.65rem] text-slate-600">{t.monitor.noResultsHint}</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="panel gpu hidden overflow-hidden sm:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#222630] text-left">
                    <th className="py-2 pl-3 pr-1 text-center label-xs">{t.monitor.thRank}</th>
                    <th className="py-2 pr-3 label-xs">{t.monitor.thAsset}</th>
                    <th className="py-2 pr-3 text-right label-xs">{t.monitor.thPrice}</th>
                    <th className="hidden py-2 pr-3 text-right label-xs sm:table-cell">{t.monitor.th24h}</th>
                    <th className="hidden py-2 pr-3 text-right label-xs lg:table-cell">{t.monitor.thMarketCap}</th>
                    <th className="hidden py-2 pr-3 text-right label-xs md:table-cell">{t.monitor.th7d}</th>
                  </tr>
                </thead>
                <tbody>
                  {display.map((coin, i) => <Row key={coin.id} coin={coin} index={i} />)}
                </tbody>
              </table>
            </div>
          </div>
          {/* Mobile cards */}
          <div className="grid gap-2 sm:hidden">
            {display.map((coin, i) => <MobileCard key={coin.id} coin={coin} index={i} />)}
          </div>
        </>
      )}
    </section>
  );
}
