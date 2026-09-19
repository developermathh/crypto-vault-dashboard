import { useEffect, useState } from 'react';
import { Zap, Copy, Check, ExternalLink } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const USDT_ADDRESS = '0x2D4E87686c4b2D1b53C95084616E6c4498575951';
const SHORT = `${USDT_ADDRESS.slice(0, 10)}…${USDT_ADDRESS.slice(-8)}`;

export function Donations() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyAddress() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(USDT_ADDRESS);
      } else {
        const el = document.createElement('textarea');
        el.value = USDT_ADDRESS;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
    } catch {
      setUnsupported(true);
      setTimeout(() => setUnsupported(false), 2600);
    }
  }

  return (
    <section id="donaciones">
      <div className="mb-3 flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-pos" />
        <span className="label-xs text-pos">{t.support.badge}</span>
      </div>
      <h2 className="font-display text-lg font-bold text-white sm:text-xl">{t.support.title}</h2>
      <p className="mb-4 max-w-2xl text-xs text-slate-500">{t.support.description}</p>

      <div className="panel gpu overflow-hidden">
        <div className="grid gap-4 p-3 sm:p-4 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-pos/20 bg-pos/5">
                <span className="font-display text-sm font-bold text-pos">₮</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.support.usdtBep20}</p>
                <p className="text-[0.65rem] text-slate-500">{t.support.tether}</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="label-xs mb-1 block">{t.support.walletLabel}</span>
              <code className="block select-all break-all rounded-lg border border-[#222630] bg-[#0E1013] px-3 py-2.5 font-mono text-[0.7rem] text-slate-300 sm:text-xs">
                {USDT_ADDRESS}
              </code>
              <p className="mt-1.5 font-mono text-[0.65rem] text-slate-600 sm:hidden">{SHORT}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyAddress}
                className={copied ? 'btn-sm bg-pos/10 text-pos border border-pos/30' : 'btn-gold'}
              >
                {copied ? <><Check className="h-3.5 w-3.5" /> {t.support.copied}</> : <><Copy className="h-3.5 w-3.5" /> {t.support.copyBtn}</>}
              </button>
              <a href={`https://bscscan.com/address/${USDT_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <ExternalLink className="h-3.5 w-3.5" /> {t.support.viewBscScan}
              </a>
            </div>

            {unsupported && <p className="mt-2 text-[0.65rem] text-gold">{t.support.copyError}</p>}
          </div>

          <aside className="rounded-lg border border-[#222630] bg-[#0E1013] p-3">
            <h3 className="text-xs font-semibold text-slate-300">{t.support.beforeSending}</h3>
            <ul className="mt-2 space-y-2 text-[0.7rem] text-slate-500">
              {[t.support.check1, t.support.check2, t.support.check3].map((item, i) => (
                <li key={i} className="flex gap-1.5">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-pos" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
