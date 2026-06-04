'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, MapPin, Loader2, X } from 'lucide-react';
import { parseQuery, toQueryString, nearestArea } from '@/lib/search';

const EXAMPLES = [
  'kamera mirrorless di Gubeng di bawah 600rb',
  'lighting LED rating 4.8 terdekat',
  'studio cyclorama untuk product shoot',
  'jasa color grading bagus budget 3 juta',
  'drone untuk aerial outdoor di Rungkut',
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

  const parsed = useMemo(() => parseQuery(value), [value]);
  const hasIntent = parsed.summary.length > 0;

  function submit(q?: string) {
    const text = q ?? value;
    if (!text.trim() && !nearLabel) {
      router.push('/browse');
      return;
    }
    const p = parseQuery(text);
    if (nearLabel && !p.location) {
      p.near = true;
    }
    router.push(`/browse?${toQueryString(p)}`);
  }

  function detectLocation() {
    if (!('geolocation' in navigator)) {
      // fallback
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
      () => {
        // izin ditolak → fallback ke pusat Surabaya
        setNearLabel('Gubeng');
        setLocating(false);
      },
      { timeout: 8000 },
    );
  }

  const isHero = variant === 'hero';

  return (
    <div className={isHero ? 'w-full' : 'w-full'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={`relative flex items-center gap-2 ${isHero ? 'card p-2 pl-4' : ''}`}
      >
        <Sparkles className={`w-4 h-4 shrink-0 ${isHero ? 'text-amber-400' : 'text-ink-400'}`} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? 'Cari pakai bahasa biasa — "kamera di Gubeng di bawah 600rb rating 4.8"'}
          className={`flex-1 bg-transparent outline-none text-sm ${isHero ? 'py-2' : 'field !pl-3'}`}
          aria-label="Pencarian cerdas"
        />

        {value && (
          <button type="button" onClick={() => setValue('')} className="text-ink-400 hover:text-amber-400">
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={detectLocation}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs border border-ink-700/40 hover:border-amber-400/60 transition shrink-0"
          title="Cari berdasarkan lokasi terdekat"
        >
          {locating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5 text-amber-400" />}
          {nearLabel ? `Terdekat: ${nearLabel}` : 'Terdekat'}
        </button>

        <button type="submit" className="btn-primary !py-2.5 !px-5 text-sm shrink-0">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Cari</span>
        </button>
      </form>

      {/* Intent chips — hasil "pembedahan" kalimat */}
      {hasIntent && (
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          <span className="eyebrow text-ink-400 mr-1">AI membaca:</span>
          {parsed.summary.map((s, i) => (
            <span key={i} className="pill !text-[0.65rem] !py-1">
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Example prompts */}
      {isHero && !value && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="eyebrow text-ink-400">Coba:</span>
          {EXAMPLES.slice(0, 3).map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setValue(ex);
                submit(ex);
              }}
              className="text-xs text-ink-300 hover:text-amber-400 underline underline-offset-2 decoration-ink-700"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
