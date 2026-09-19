import { useMemo, useState } from 'react';
import { Calculator, Fuel, Zap, Info } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

type TxType = 'transfer' | 'swap' | 'contract';
type Speed = 'low' | 'average' | 'instant';

const TX_GAS: Record<TxType, number> = { transfer: 21_000, swap: 150_000, contract: 200_000 };
const SPEED_GWEI: Record<Speed, number> = { low: 1, average: 3, instant: 5 };
const BNB_FALLBACK = 600;

function fmtUsd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 4 });
}
function fmtBnb(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 });
}

export function GasCalculator({ bnbUsd }: { bnbUsd?: number }) {
  const { t } = useLang();
  const [txType, setTxType] = useState<TxType>('transfer');
  const [speed, setSpeed] = useState<Speed>('average');
  const [customGasPrice, setCustomGasPrice] = useState('');
  const [customGasLimit, setCustomGasLimit] = useState('');

  const priceUsd = bnbUsd ?? BNB_FALLBACK;

  const txLabels: Record<TxType, string> = { transfer: t.gas.txTransfer, swap: t.gas.txSwap, contract: t.gas.txContract };
  const speedLabels: Record<Speed, string> = { low: t.gas.speedLow, average: t.gas.speedAverage, instant: t.gas.speedInstant };
  const speedDesc: Record<Speed, string> = { low: t.gas.speedLowDesc, average: t.gas.speedAverageDesc, instant: t.gas.speedInstantDesc };

  const gasLimit = useMemo(() => {
    const v = parseInt(customGasLimit, 10);
    return Number.isFinite(v) && v > 0 ? v : TX_GAS[txType];
  }, [customGasLimit, txType]);

  const gasPriceGwei = useMemo(() => {
    const v = parseFloat(customGasPrice);
    return Number.isFinite(v) && v > 0 ? v : SPEED_GWEI[speed];
  }, [customGasPrice, speed]);

  const gasFeeBnb = useMemo(() => (gasLimit * gasPriceGwei) / 1e9, [gasLimit, gasPriceGwei]);
  const gasFeeUsd = useMemo(() => gasFeeBnb * priceUsd, [gasFeeBnb, priceUsd]);

  return (
    <section id="gas">
      <div className="mb-3 flex items-center gap-2">
        <Fuel className="h-3.5 w-3.5 text-gold" />
        <span className="label-xs text-gold">{t.gas.badge}</span>
      </div>
      <h2 className="font-display text-lg font-bold text-white sm:text-xl">{t.gas.title}</h2>
      <p className="mb-4 text-xs text-slate-500">{t.gas.subtitle}</p>

      <div className="panel gpu overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="space-y-4 border-b border-[#222630] p-3 sm:p-4 lg:border-b-0 lg:border-r">
            <div>
              <span className="label-xs mb-1.5 block">{t.gas.txType}</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(txLabels) as TxType[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { setTxType(key); setCustomGasLimit(''); }}
                    className={`rounded-lg border px-1.5 py-2 text-[0.7rem] font-semibold transition-all duration-200 ${
                      txType === key
                        ? 'border-gold/30 bg-gold/10 text-gold'
                        : 'border-[#222630] bg-[#0E1013] text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {txLabels[key]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label-xs mb-1.5 block">{t.gas.speed}</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(speedLabels) as Speed[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setSpeed(s); setCustomGasPrice(''); }}
                    className={`flex flex-col items-center gap-0.5 rounded-lg border px-1.5 py-2 transition-all duration-200 ${
                      speed === s && !customGasPrice
                        ? 'border-gold/30 bg-gold/10 text-gold'
                        : 'border-[#222630] bg-[#0E1013] text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-[0.7rem] font-semibold">{speedLabels[s]}</span>
                    <span className="text-[0.6rem] text-slate-600">{speedDesc[s]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="gp" className="label-xs mb-1.5 block">{t.gas.gasPriceLabel}</label>
              <div className="relative">
                <input id="gp" type="number" inputMode="decimal" min="0" step="0.1"
                  value={customGasPrice} onChange={(e) => setCustomGasPrice(e.target.value)}
                  placeholder={SPEED_GWEI[speed].toString()} className="input-field pr-12" />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600">Gwei</span>
              </div>
            </div>

            <div>
              <label htmlFor="gl" className="label-xs mb-1.5 block">{t.gas.gasLimitLabel}</label>
              <input id="gl" type="number" inputMode="numeric" min="0" step="1000"
                value={customGasLimit} onChange={(e) => setCustomGasLimit(e.target.value)}
                placeholder={TX_GAS[txType].toLocaleString('en-US')} className="input-field" />
            </div>

            <p className="flex items-start gap-1.5 rounded-lg bg-[#0E1013] p-2.5 text-[0.65rem] text-slate-600">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              {t.gas.estimateNote}
            </p>
          </div>

          {/* Result */}
          <div className="bg-[#0E1013]/50 p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-1.5">
              <Calculator className="h-3.5 w-3.5 text-slate-500" />
              <span className="label-xs">{t.gas.estimatedCost}</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[0.65rem] text-slate-500">{t.gas.networkFee}</p>
                <p className="tabular text-2xl font-bold text-white sm:text-3xl">
                  {fmtBnb(gasFeeBnb)} <span className="text-base font-semibold text-gold">BNB</span>
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#222630] bg-[#13151A] p-2.5">
                <Zap className="h-3.5 w-3.5 text-gold" />
                <div className="flex-1">
                  <p className="text-[0.6rem] uppercase tracking-wider text-slate-600">{t.gas.usdEquivalent}</p>
                  <p className="tabular text-base font-bold text-gold">{fmtUsd(gasFeeUsd)}</p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-2 text-[0.65rem]">
                {[
                  { label: t.gas.gasLimit, value: gasLimit.toLocaleString('en-US') },
                  { label: t.gas.gasPrice, value: `${gasPriceGwei} Gwei` },
                  { label: t.gas.bnbPrice, value: `$${priceUsd.toFixed(2)}` },
                  { label: t.gas.network, value: 'BSC · BEP-20' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-[#13151A] p-2">
                    <dt className="text-slate-600">{item.label}</dt>
                    <dd className="tabular font-semibold text-slate-300">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
