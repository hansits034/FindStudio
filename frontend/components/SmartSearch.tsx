'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, MapPin, Loader2, X, Brain } from 'lucide-react';
import { parseQuery, toQueryString, nearestArea } from '@/lib/search';

const EXAMPLES = [
  'kamera mirrorless di Gubeng di bawah 600rb',
  'lighting LED rating 4.8 terdekat',
  'studio cyclorama untuk product shoot',
  'jasa color grading bagus budget 3 juta',
  'drone untuk aerial outdoor di Rungkut',
  'kamera kurang dari 900rb cocok untuk foto landscape',
];

export default function SmartSearch({
  variant = 'hero',
  initialValue = '',
  placeholder,
}: {
  variant?: 'hero' | 'compact';
  initialValue?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [locating, setLocating] = useState(false);
  const [nearLabel, setNearLabel] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);

  const parsed = useMemo(() => parseQuery(value), [value]);
  const hasIntent = parsed.summary.length > 0;
  const isHero = variant === 'hero';

  async function submit(q?: string) {
    const text = (q ?? value).trim();
    if (!text && !nearLabel) { router.push('/browse'); return; }

    setThinking(true);
    // Simulate AI processing — proportional to query length
    await new Promise((r) => setTimeout(r, Math.min(300 + text.length * 8, 900)));

    const p = parseQuery(text);
    if (nearLabel && !p.location) p.near = true;
    setThinking(false);
    router.push(`/browse?${toQueryString(p)}`);
  }

  function detectLocation() {
    if (!('geolocation' in navigator)) {
      setNearLabel('Gubeng');
      setValue((v) => (v ? `${v} terdekat` : 'terdekat'));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
        setNearLabel(area);
        setLocating(false);
      },
      () => { setNearLabel('Gubeng'); setLocating(false); },
      { timeout: 8000 },
    );
  }

  return (
    <div className={isHero ? 'w-full' : 'w-full'}>
      <form
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        className={`relative flex items-center gap-2 ${isHero ? 'card p-2 pl-4' : ''}`}
      >
        {thinking
          ? <Brain className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
          : <Sparkles className={`w-4 h-4 shrink-0 ${isHero ? 'text-amber-400' : 'text-ink-400'}`} />
        }
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
          placeholder={placeholder ?? 'Deskripsikan kebutuhanmu, "kamera kurang dari 900rb untuk landscape"'}
          className={`flex-1 bg-transparent outline-none text-sm ${isHero ? 'py-2' : 'field !pl-3'}`}
          aria-label="Pencarian AI"
          disabled={thinking}
        />

        {value && !thinking && (
          <button type="button" onClick={() => setValue('')} className="text-ink-400 hover:text-amber-400">
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={detectLocation}
          disabled={thinking}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs border border-ink-700/40 hover:border-amber-400/60 transition shrink-0 disabled:opacity-50"
          title="Cari berdasarkan lokasi terdekat"
        >
          {locating
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <MapPin className="w-3.5 h-3.5 text-amber-400" />}
          {nearLabel ? `Terdekat: ${nearLabel}` : 'Terdekat'}
        </button>

        <button
          type="submit"
          disabled={thinking}
          className="btn-primary !py-2.5 !px-5 text-sm shrink-0 disabled:opacity-70"
        >
          {thinking
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Search className="w-4 h-4" />}
          <span className="hidden sm:inline">{thinking ? 'Menganalisis…' : 'Cari'}</span>
        </button>
      </form>

      {/* AI thinking indicator */}
      {thinking && (
        <div className="flex items-center gap-2 mt-3 px-1">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-amber-400/70">AI sedang menganalisis permintaanmu…</span>
        </div>
      )}

      {/* AI analysis chips */}
      {hasIntent && !thinking && (
        <div className="mt-3 px-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 eyebrow text-amber-400/70 mr-1">
              <Brain className="w-3 h-3" />
              AI memahami:
            </span>
            {parsed.useCaseLabel && (
              <span className="pill !bg-amber-400/15 !border-amber-400/40 !text-amber-300 !text-[0.65rem] !py-1">
                🎯 {parsed.useCaseLabel}
              </span>
            )}
            {parsed.summary
              .filter((s) => !s.startsWith('Cocok untuk'))
              .map((s, i) => (
                <span key={i} className="pill !text-[0.65rem] !py-1">{s}</span>
              ))}
          </div>
        </div>
      )}

      {/* Example prompts */}
      {isHero && !value && !thinking && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="eyebrow text-ink-400">Coba:</span>
          {EXAMPLES.slice(0, 3).map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => { setValue(ex); submit(ex); }}
              className="text-xs text-ink-300 hover:text-amber-400 underline underline-offset-2 decoration-ink-700 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
