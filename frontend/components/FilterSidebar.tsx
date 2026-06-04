'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/mockData';
import { SURABAYA_AREAS, SERVICE_DETAIL } from '@/lib/search';
import { MapPin, Calendar, Sliders, Star } from 'lucide-react';

export default function FilterSidebar({ activeCategory = 'all' }: { activeCategory?: string }) {
  const router = useRouter();
  const [cat, setCat] = useState(activeCategory);
  const [area, setArea] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [rating, setRating] = useState<number | null>(null);

  const detail = SERVICE_DETAIL[cat as keyof typeof SERVICE_DETAIL];

  function apply() {
    const sp = new URLSearchParams();
    if (cat && cat !== 'all') sp.set('cat', cat);
    if (area) sp.set('loc', area);
    if (maxPrice < 2000000) sp.set('max', String(maxPrice));
    if (rating) sp.set('rating', String(rating));
    router.push(`/browse${sp.toString() ? `?${sp.toString()}` : ''}`);
  }

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 self-start">
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h3 className="font-display text-lg">Filter</h3>
        </div>

        <div className="space-y-5">
          {/* Jenis layanan / kategori */}
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Jenis Layanan</label>
            <div className="flex flex-col gap-1.5">
              {categories.map((c) => (
                <label key={c.key} className="flex items-center justify-between text-sm cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cat"
                      className="accent-amber-400"
                      checked={cat === c.key}
                      onChange={() => setCat(c.key)}
                    />
                    <span className="group-hover:text-amber-400 transition">{c.label}</span>
                  </span>
                  <span className="text-ink-400 tabular text-xs">{c.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Detail sesuai kategori */}
          {detail && (
            <div>
              <label className="eyebrow text-ink-400 block mb-2">{detail.label}</label>
              <div className="flex flex-wrap gap-1.5">
                {detail.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="text-[0.7rem] px-2.5 py-1 rounded-full border border-ink-700/40 hover:border-amber-400/60 hover:text-amber-400 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="divider" />

          {/* Lokasi (Surabaya) */}
          <div>
            <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Area Surabaya
            </label>
            <select className="field !py-2 text-sm" value={area} onChange={(e) => setArea(e.target.value)}>
              <option value="">Semua area</option>
              {SURABAYA_AREAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Tanggal */}
          <div>
            <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Tanggal Sewa
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="field !py-2 text-sm" />
              <input type="date" className="field !py-2 text-sm" />
            </div>
          </div>

          {/* Harga */}
          <div>
            <label className="eyebrow text-ink-400 block mb-3">Harga maksimum</label>
            <div className="flex items-center justify-between text-xs text-ink-300 tabular mb-2">
              <span>Rp 50K</span>
              <span className="text-amber-400">Rp {(maxPrice / 1000).toFixed(0)}K</span>
            </div>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Rating minimal</label>
            <div className="flex gap-1.5">
              {[4.0, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRating(rating === r ? null : r)}
                  className={`flex-1 py-2 text-xs rounded-full border transition tabular inline-flex items-center justify-center gap-1 ${
                    rating === r
                      ? 'bg-amber-400 text-ink-900 border-amber-400'
                      : 'border-ink-700/40 hover:border-amber-400/60 hover:text-amber-400'
                  }`}
                >
                  <Star className="w-3 h-3" /> {r}+
                </button>
              ))}
            </div>
          </div>

          <button onClick={apply} className="btn-primary w-full justify-center">Terapkan Filter</button>
        </div>
      </div>
    </aside>
  );
}
