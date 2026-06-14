'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/lib/mockData';
import { SURABAYA_AREAS, SERVICE_DETAIL } from '@/lib/search';
import { MapPin, Calendar, Sliders } from 'lucide-react';

export default function FilterSidebar({ activeCategory = 'all' }: { activeCategory?: string }) {
  const router = useRouter();
  const [cat, setCat] = useState(activeCategory);
  const [area, setArea] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);

  const groups = SERVICE_DETAIL[cat] ?? [];

  function handleCatChange(newCat: string) {
    setCat(newCat);
    setSelectedSpecs([]);
  }

  function toggleSpec(spec: string) {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  }

  function apply() {
    const sp = new URLSearchParams();
    if (cat && cat !== 'all') sp.set('cat', cat);
    if (area) sp.set('loc', area);
    if (maxPrice < 2000000) sp.set('max', String(maxPrice));
    if (selectedSpecs.length > 0) sp.set('specs', selectedSpecs.join(','));
    router.push(`/browse${sp.toString() ? `?${sp.toString()}` : ''}`);
  }

  return (
    <aside className="lg:sticky lg:top-28 self-start">
      <div className="card p-5 flex flex-col max-h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-lg">Filter</h3>
          </div>
          {selectedSpecs.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedSpecs([])}
              className="text-[0.65rem] text-ink-400 hover:text-amber-400 transition"
            >
              Reset spesifikasi ({selectedSpecs.length})
            </button>
          )}
        </div>

        <div className="space-y-5 overflow-y-auto flex-1 pr-1 pb-2">
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
                      onChange={() => handleCatChange(c.key)}
                    />
                    <span className="group-hover:text-amber-400 transition">{c.label}</span>
                  </span>
                  <span className="text-ink-400 tabular text-xs">{c.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Spesifikasi sesuai kategori */}
          {groups.map((group, gi) => (
            <div key={gi}>
              <label className="eyebrow text-ink-400 block mb-2">{group.label}</label>
              <div className="flex flex-wrap gap-1.5">
                {group.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleSpec(opt)}
                    className={`text-[0.7rem] px-2.5 py-1 rounded-full border transition ${
                      selectedSpecs.includes(opt)
                        ? 'bg-amber-400 text-ink-900 border-amber-400'
                        : 'border-ink-700/40 hover:border-amber-400/60 hover:text-amber-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {groups.length > 0 && <div className="divider" />}

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
        </div>

        <div className="pt-4 border-t border-ink-700/30 shrink-0 mt-2">
          <button onClick={apply} className="btn-primary w-full justify-center">Terapkan Filter</button>
        </div>
      </div>
    </aside>
  );
}
