import { useLang } from '@/i18n/LanguageContext';
import { LANGUAGES } from '@/i18n/translations';

export function LanguageSelector() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-label={l.name}
            title={l.name}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm transition-all duration-200 gpu ${
              active
                ? 'bg-base-700 ring-1 ring-gold/40 scale-105'
                : 'opacity-50 hover:opacity-90'
            }`}
          >
            {l.flag}
          </button>
        );
      })}
    </div>
  );
}
