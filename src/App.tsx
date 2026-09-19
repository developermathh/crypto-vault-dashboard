import { Github, LineChart } from 'lucide-react';
import { PriceMonitor } from '@/components/PriceMonitor';
import { GasCalculator } from '@/components/GasCalculator';
import { Donations } from '@/components/Donations';
import { WalletBar } from '@/components/WalletBar';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LanguageProvider, useLang } from '@/i18n/LanguageContext';
import { useCryptoPolling } from '@/hooks/useCryptoPolling';

function useBnbUsd(): number | undefined {
  const { coins } = useCryptoPolling();
  const bnb = coins.find((c) => c.id === 'binancecoin');
  return bnb ? bnb.current_price : undefined;
}

function AppContent() {
  const { t } = useLang();
  const bnbUsd = useBnbUsd();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#222630] bg-[#0B0C0E]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-2.5 sm:px-4">
          <a href="#top" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/10 border border-gold/20">
              <LineChart className="h-4 w-4 text-gold" />
            </div>
            <div className="leading-none">
              <p className="font-display text-sm font-bold text-white">CryptoVault</p>
              <p className="text-[0.6rem] uppercase tracking-wider text-slate-600">{t.nav.subtitle}</p>
            </div>
          </a>
          <nav className="hidden items-center gap-0.5 sm:flex">
            <a href="#precios" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-200">{t.nav.prices}</a>
            <a href="#gas" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-200">{t.nav.gas}</a>
            <a href="#donaciones" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-200">{t.nav.support}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <WalletBar />
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost hidden sm:inline-flex">
              <Github className="h-3.5 w-3.5" /> {t.nav.code}
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-3 pb-16 pt-6 sm:px-4">
        {/* Hero */}
        <div className="mb-8 animate-fadeIn gpu">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-pos/5 px-2 py-1 text-[0.65rem] font-medium text-pos">
            <span className="pulse-dot" /> {t.hero.badge}
          </span>
          <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            {t.hero.titlePre}{' '}
            <span className="text-gold">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mt-2 max-w-xl text-xs text-slate-500 sm:text-sm">{t.hero.description}</p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          <PriceMonitor />
          <GasCalculator bnbUsd={bnbUsd} />
          <Donations />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#222630] bg-[#0B0C0E]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-3 py-4 text-[0.65rem] text-slate-600 sm:flex-row sm:px-4">
          <p>© {new Date().getFullYear()} CryptoVault · {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            {t.footer.dataBy}
            <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-500 hover:text-gold">CoinGecko</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
