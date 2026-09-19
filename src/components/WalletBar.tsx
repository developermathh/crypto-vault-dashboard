import { useState } from 'react';
import { Wallet, ChevronDown, X, Loader2, Zap } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { useWallet, type ChainId } from '@/hooks/useWallet';

export function WalletBar() {
  const { t } = useLang();
  const w = useWallet();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative">
      {!w.connected ? (
        <button
          type="button"
          onClick={w.connect}
          disabled={w.connecting}
          className="btn-gold transform-gpu will-change-transform"
        >
          {w.connecting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Wallet className="h-3.5 w-3.5" />
          )}
          {w.connecting ? t.wallet.connecting : t.wallet.connect}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-[#222630] bg-[#171A21] px-2.5 py-1.5 gpu">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: w.chainMeta.color }}
            />
            <span className="text-xs font-medium text-slate-300">
              {w.chainMeta.dummyAddress}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-ghost"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: w.chainMeta.color }} />
            {w.chainMeta.symbol}
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      )}

      {modalOpen && w.connected && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setModalOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-72 animate-slideUp gpu rounded-xl border border-[#222630] bg-[#13151A] p-3 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="label-xs">{t.wallet.selectChain}</span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded p-0.5 text-slate-500 hover:text-slate-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-1.5">
              {(Object.keys(w.CHAINS) as ChainId[]).map((id) => {
                const c = w.CHAINS[id];
                const active = w.chain === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      w.switchChain(id);
                      setModalOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 transition-all duration-200 ${
                      active
                        ? 'border-gold/30 bg-gold/5'
                        : 'border-[#222630] bg-[#171A21] hover:border-[#2A2E3A]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-200">
                          {t.wallet.chains[id]}
                        </p>
                        <p className="text-[0.65rem] text-slate-500">{c.dummyAddress}</p>
                      </div>
                    </div>
                    {active && <Zap className="h-3.5 w-3.5 text-gold" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 rounded-lg border border-[#222630] bg-[#0E1013] p-3">
              <div className="flex items-center justify-between">
                <span className="label-xs">{t.wallet.balance}</span>
                {w.balanceLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin text-slate-500" />
                ) : (
                  <span className="tabular text-sm font-semibold text-white">
                    {w.chainMeta.dummyBalance} {w.chainMeta.symbol}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                w.disconnect();
                setModalOpen(false);
              }}
              className="mt-2 w-full rounded-lg border border-[#222630] px-3 py-2 text-xs font-medium text-slate-400 transition-colors duration-200 hover:border-neg/30 hover:text-neg"
            >
              {t.wallet.disconnect}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
