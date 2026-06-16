'use client';

import { useState } from 'react';
import Image from 'next/image';
import { equipment, formatIDR } from '@/lib/mockData';
import { Plus, Search, Shield, Edit2, Trash2, ToggleLeft, ToggleRight, Camera, Mic, Lightbulb, Box } from 'lucide-react';

const VC = '#818cf8';
const STATUSES = ['Semua', 'Tersedia', 'Sedang Disewa', 'Diperbaiki'] as const;

type AssetStatus = 'Tersedia' | 'Sedang Disewa' | 'Diperbaiki';

const ASSET_META: Record<string, { status: AssetStatus; protected: boolean; rentCount: number }> = {
  e1:  { status: 'Sedang Disewa', protected: true,  rentCount: 22 },
  e2:  { status: 'Tersedia',      protected: true,  rentCount: 14 },
  e3:  { status: 'Tersedia',      protected: false, rentCount: 8  },
  e4:  { status: 'Sedang Disewa', protected: true,  rentCount: 18 },
  e5:  { status: 'Diperbaiki',    protected: true,  rentCount: 11 },
  e6:  { status: 'Tersedia',      protected: false, rentCount: 5  },
};

const STATUS_STYLE: Record<AssetStatus, { bg: string; text: string; dot: string }> = {
  'Tersedia':      { bg: 'rgba(52,211,153,0.12)',  text: '#34d399', dot: '#34d399' },
  'Sedang Disewa': { bg: 'rgba(129,140,248,0.12)', text: '#818cf8', dot: VC },
  'Diperbaiki':    { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24', dot: '#fbbf24' },
};

export default function CatalogPage() {
  const [filter, setFilter] = useState<typeof STATUSES[number]>('Semua');
  const [search, setSearch] = useState('');
  const [protectedMap, setProtectedMap] = useState<Record<string, boolean>>(
    Object.fromEntries(Object.entries(ASSET_META).map(([k, v]) => [k, v.protected]))
  );

  const items = equipment.slice(0, 6).filter((e) => {
    const meta = ASSET_META[e.id] ?? { status: 'Tersedia', protected: false, rentCount: 0 };
    const matchFilter = filter === 'Semua' || meta.status === filter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="eyebrow mb-1.5" style={{ color: VC }}>Katalog Aset</div>
          <h1 className="headline text-4xl lg:text-5xl">Kelola <span className="italic font-light" style={{ color: VC }}>Etalasemu.</span></h1>
          <p className="text-ink-300 text-sm mt-1.5">{equipment.length} aset terdaftar · 2 sedang disewa · 1 diperbaiki</p>
        </div>
        <button
          className="text-sm inline-flex items-center gap-2 py-2.5 px-5 rounded-full font-medium"
          style={{ background: VC, color: '#1a1c2e' }}
        >
          <Plus className="w-4 h-4" /> Tambah Aset Baru
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
          <input
            className="field !pl-9 !py-2 text-sm w-full"
            placeholder="Cari nama aset…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="text-xs px-3 py-1.5 rounded-full transition"
              style={filter === s
                ? { background: VC, color: '#1a1c2e', fontWeight: 600 }
                : { border: '1px solid rgba(103,111,157,0.4)', color: '#9399ba' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Asset grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
        {items.map((e) => {
          const meta = ASSET_META[e.id] ?? { status: 'Tersedia' as AssetStatus, protected: false, rentCount: 0 };
          const st = STATUS_STYLE[meta.status];
          const isProtected = protectedMap[e.id] ?? meta.protected;
          return (
            <div key={e.id} className="card p-0 overflow-hidden flex flex-col">
              <div className="relative h-40 bg-ink-800">
                <Image src={e.image} alt="" fill className="object-cover" sizes="400px" />
                <div className="absolute top-3 left-3">
                  <span className="text-[0.65rem] px-2 py-1 rounded-full font-medium" style={{ background: st.bg, color: st.text }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle" style={{ background: st.dot }} />
                    {meta.status}
                  </span>
                </div>
                {isProtected && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 text-[0.6rem] px-2 py-1 rounded-full bg-amber-400/20 text-amber-400">
                      <Shield className="w-3 h-3" /> Proteksi
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-ink-400 mb-0.5 capitalize">{e.category}</div>
                <div className="font-medium text-sm mb-1 leading-tight">{e.name}</div>
                <div className="text-amber-400 font-display text-base tabular mb-3">{formatIDR(e.pricePerDay)}<span className="text-ink-400 text-xs font-sans">/hari</span></div>

                <div className="flex items-center justify-between text-xs text-ink-400 mb-4">
                  <span>{meta.rentCount}× disewa</span>
                  <span>★ {(4.6 + (meta.rentCount % 5) * 0.07).toFixed(2)}</span>
                </div>

                {/* Protection toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg mb-3" style={{ background: 'rgba(249,177,122,0.06)', border: '1px solid rgba(249,177,122,0.15)' }}>
                  <div>
                    <div className="text-xs font-medium text-amber-400">Proteksi FindStudio</div>
                    <div className="text-[0.6rem] text-ink-400">Dipotong 10% per sewa</div>
                  </div>
                  <button
                    onClick={() => setProtectedMap((prev) => ({ ...prev, [e.id]: !prev[e.id] }))}
                    className="transition"
                    aria-label="Toggle protection"
                  >
                    {isProtected
                      ? <ToggleRight className="w-7 h-7 text-amber-400" />
                      : <ToggleLeft className="w-7 h-7 text-ink-500" />}
                  </button>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg border transition hover:bg-ink-700/30" style={{ borderColor: 'rgba(129,140,248,0.35)', color: VC }}>
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button className="flex items-center justify-center gap-1 text-xs py-2 px-3 rounded-lg border border-red-400/25 text-red-400/70 hover:bg-red-400/5 transition">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add new asset form */}
      <section className="card p-6 lg:p-8" style={{ borderColor: 'rgba(129,140,248,0.3)' }}>
        <div className="eyebrow mb-2" style={{ color: VC }}>Tambah Aset Baru</div>
        <h2 className="font-display text-2xl mb-6">Daftarkan alat, studio, atau jasa baru.</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Nama Aset</label>
            <input className="field text-sm" placeholder="Contoh: Sony A7 IV Body Only" />
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Kategori</label>
            <select className="field !py-2.5 text-sm">
              <option>Kamera</option><option>Lensa & Filter</option><option>Lighting & Grip</option>
              <option>Audio</option><option>Stabilizer & Support</option><option>Studio & Set</option>
              <option>Aksesoris & Properti</option><option>Jasa Profesional</option>
            </select>
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Harga Sewa / Hari (Rp)</label>
            <input className="field text-sm" placeholder="Contoh: 750000" />
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Kelengkapan</label>
            <input className="field text-sm" placeholder="Contoh: 2 baterai, 1 charger, tas" />
          </div>
        </div>
        <div className="mb-6">
          <label className="eyebrow text-ink-400 block mb-2">Foto Aset</label>
          <div className="border-2 border-dashed border-ink-700/50 rounded-xl p-8 text-center hover:border-[#818cf8]/40 transition cursor-pointer">
            <Camera className="w-8 h-8 text-ink-500 mx-auto mb-2" />
            <div className="text-sm text-ink-400">Klik atau drag foto di sini</div>
            <div className="text-xs text-ink-500 mt-1">JPG, PNG, maks 5MB per foto</div>
          </div>
        </div>
        <button className="text-sm inline-flex items-center gap-2 py-3 px-6 rounded-full font-medium" style={{ background: VC, color: '#1a1c2e' }}>
          <Plus className="w-4 h-4" /> Publikasikan Aset
        </button>
      </section>
    </>
  );
}
