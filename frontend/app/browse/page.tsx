'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EquipmentCard from '@/components/EquipmentCard';
import StudioCard from '@/components/StudioCard';
import ServiceCard from '@/components/ServiceCard';
import SmartSearch from '@/components/SmartSearch';
import FilterSidebar from '@/components/FilterSidebar';
import { equipment, studios, services, categories, categoryLabel } from '@/lib/mockData';
import { areaOf, AREA_COORDS, distanceKm, type SurabayaArea } from '@/lib/search';
import { ArrowUpDown, Grid3x3, MapPin } from 'lucide-react';

function matchesText(haystack: string, q: string) {
  return haystack.toLowerCase().includes(q.toLowerCase());
}

function BrowseInner() {
  const params = useSearchParams();
  const cat = params.get('cat') ?? 'all';
  const q = params.get('q') ?? '';
  const loc = (params.get('loc') as SurabayaArea | null) ?? undefined;
  const near = params.get('near') === '1';
  const maxPrice = params.get('max') ? Number(params.get('max')) : undefined;
  const minPrice = params.get('min') ? Number(params.get('min')) : undefined;
  const minRating = params.get('rating') ? Number(params.get('rating')) : undefined;

  // Origin untuk hitung jarak (kalau "terdekat" tanpa area spesifik → pusat Gubeng)
  const origin = loc ? AREA_COORDS[loc] : near ? AREA_COORDS['Gubeng'] : undefined;

  const chips = [{ key: 'all', label: 'Semua' }, ...categories];

  // Filter summary chips
  const activeFilters: string[] = [];
  if (cat !== 'all') activeFilters.push(categoryLabel(cat));
  if (loc) activeFilters.push(`Area ${loc}`);
  if (near && !loc) activeFilters.push('Lokasi terdekat');
  if (maxPrice) activeFilters.push(`≤ Rp${maxPrice.toLocaleString('id-ID')}`);
  if (minPrice) activeFilters.push(`≥ Rp${minPrice.toLocaleString('id-ID')}`);
  if (minRating) activeFilters.push(`Rating ≥ ${minRating}`);

  const filteredEquipment = useMemo(() => {
    let list = equipment;
    if (cat !== 'all' && cat !== 'studio' && cat !== 'service') {
      list = list.filter((e) => e.category === cat);
    }
    if (loc) list = list.filter((e) => areaOf(e.location) === loc);
    if (maxPrice) list = list.filter((e) => e.pricePerDay <= maxPrice);
    if (minPrice) list = list.filter((e) => e.pricePerDay >= minPrice);
    if (minRating) list = list.filter((e) => e.rating >= minRating);
    if (q) list = list.filter((e) => matchesText(e.name, q) || matchesText(e.brand, q) || matchesText(e.location, q) || matchesText(e.category, q));

    if (origin) {
      list = [...list].sort((a, b) => {
        const da = AREA_COORDS[areaOf(a.location) ?? 'Gubeng'];
        const db = AREA_COORDS[areaOf(b.location) ?? 'Gubeng'];
        return distanceKm(origin, da) - distanceKm(origin, db);
      });
    }
    return list;
  }, [cat, loc, near, maxPrice, minPrice, minRating, q, origin]);

  const filteredStudios = useMemo(() => {
    let list = studios;
    if (loc) list = list.filter((s) => areaOf(s.location) === loc);
    if (maxPrice) list = list.filter((s) => s.pricePerHour <= maxPrice);
    if (minRating) list = list.filter((s) => s.rating >= minRating);
    if (q) list = list.filter((s) => matchesText(s.name, q) || matchesText(s.location, q));
    return list;
  }, [loc, maxPrice, minRating, q]);

  const filteredServices = useMemo(() => {
    let list = services;
    if (maxPrice) list = list.filter((s) => s.pricePerProject <= maxPrice);
    if (minRating) list = list.filter((s) => s.rating >= minRating);
    if (q) list = list.filter((s) => matchesText(s.name, q) || matchesText(s.description, q));
    return list;
  }, [maxPrice, minRating, q]);

  const showStudios = cat === 'all' || cat === 'studio';
  const showServices = cat === 'all' || cat === 'service';
  const showEquipment = !(cat === 'studio' || cat === 'service');

  const totalCount =
    (showEquipment ? filteredEquipment.length : 0) +
    (cat === 'studio' ? filteredStudios.length : 0) +
    (cat === 'service' ? filteredServices.length : 0) +
    (cat === 'all' ? Math.min(filteredStudios.length, 3) + Math.min(filteredServices.length, 3) : 0);

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="mb-8">
          <div className="eyebrow text-amber-400 mb-3">
            Katalog Surabaya {cat !== 'all' ? `/ ${categoryLabel(cat)}` : ''}
          </div>
          <h1 className="headline text-5xl lg:text-7xl mb-6">
            Temukan di <span className="italic text-amber-400 font-light">Surabaya.</span>
          </h1>

          {/* Smart search */}
          <div className="max-w-3xl">
            <SmartSearch variant="hero" initialValue={q} />
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-5">
              <span className="eyebrow text-ink-400 mr-1">Filter aktif:</span>
              {activeFilters.map((f, i) => (
                <span key={i} className="pill !text-[0.65rem] !py-1">{f}</span>
              ))}
              <a href="/browse" className="text-xs text-ink-400 hover:text-amber-400 ml-1 underline underline-offset-2">reset</a>
            </div>
          )}

          {/* Category chips */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 -mx-1 px-1">
            {chips.map((c) => {
              const active = c.key === cat;
              const count =
                c.key === 'all'
                  ? equipment.length + studios.length + services.length
                  : c.key === 'studio'
                    ? studios.length
                    : c.key === 'service'
                      ? services.length
                      : equipment.filter((e) => e.category === c.key).length;
              return (
                <a
                  key={c.key}
                  href={`/browse${c.key === 'all' ? '' : `?cat=${c.key}`}`}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition border ${
                    active
                      ? 'bg-amber-400 text-ink-900 border-amber-400 font-medium'
                      : 'border-ink-700/40 hover:border-amber-400/60 text-ink-200'
                  }`}
                >
                  {c.label}
                  <span className={`text-[0.65rem] tabular ${active ? 'text-ink-900/60' : 'text-ink-400'}`}>
                    {count}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-8">
          <FilterSidebar activeCategory={cat} />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="text-sm text-ink-300">
                Menampilkan <span className="text-white tabular">{totalCount}</span> hasil
                {(loc || near) && (
                  <span className="text-ink-400"> · diurutkan dari yang <span className="text-amber-400">terdekat</span></span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost !py-2 !px-3.5 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  {loc || near ? 'Terdekat' : 'Paling sesuai'}
                </button>
                <div className="flex border border-ink-700/40 rounded-full overflow-hidden">
                  <button className="px-3 py-2 bg-amber-400 text-ink-900">
                    <Grid3x3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {cat === 'studio' && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredStudios.map((s) => <StudioCard key={s.id} item={s} />)}
              </div>
            )}

            {cat === 'service' && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredServices.map((s) => <ServiceCard key={s.id} item={s} />)}
              </div>
            )}

            {showEquipment && filteredEquipment.length > 0 && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredEquipment.map((item) => <EquipmentCard key={item.id} item={item} />)}
              </div>
            )}

            {cat === 'all' && filteredStudios.length > 0 && (
              <>
                <div className="mt-16 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <div>
                    <h2 className="font-display text-3xl">Studio di Surabaya</h2>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredStudios.slice(0, 3).map((s) => <StudioCard key={s.id} item={s} />)}
                </div>
              </>
            )}

            {cat === 'all' && filteredServices.length > 0 && (
              <>
                <div className="mt-16 mb-6">
                  <h2 className="font-display text-3xl mb-2">Jasa profesional</h2>
                  <p className="text-sm text-ink-400">Editor, colorist, sound engineer bersertifikat.</p>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredServices.slice(0, 3).map((s) => <ServiceCard key={s.id} item={s} />)}
                </div>
              </>
            )}

            {totalCount === 0 && (
              <div className="card p-12 text-center">
                <div className="eyebrow text-ink-400 mb-2">Tidak ada hasil</div>
                <p className="text-ink-300 mb-4">
                  Tidak ada yang cocok dengan filter saat ini. Coba longgarkan harga, rating, atau area.
                </p>
                <a href="/browse" className="btn-ghost text-sm inline-flex">Reset semua filter</a>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-900" />}>
      <BrowseInner />
    </Suspense>
  );
}
