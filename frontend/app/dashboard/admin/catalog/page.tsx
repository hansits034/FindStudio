'use client';

import { useState } from 'react';
import Image from 'next/image';
import { equipment, getVendor, formatIDR } from '@/lib/mockData';
import { CheckCircle2, XCircle, Eye, ShieldCheck, ShieldOff, Search } from 'lucide-react';

const PENDING_LISTINGS = [
  { id: 'pl1', name: 'Canon C70 Cinema Body', vendor: 'Aperture Rental Co.', category: 'Kamera', price: 900000, submitted: '32 menit lalu', img: equipment[0].image },
  { id: 'pl2', name: 'Aputure Storm 1000x', vendor: 'Lumen Broadcast', category: 'Lighting & Grip', price: 550000, submitted: '3 jam lalu', img: equipment[17].image },
  { id: 'pl3', name: 'DJI Avata 2 FPV Combo', vendor: 'Skyborne Aerials', category: 'Aksesoris & Properti', price: 420000, submitted: 'Kemarin', img: equipment[12].image },
];

export default function AdminCatalogPage() {
  const [pending, setPending] = useState(PENDING_LISTINGS);
  const protectedItems = equipment.filter((e) => e.protection).slice(0, 8);

  function decide(id: string) {
    setPending((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="mb-8">
        <div className="eyebrow text-emerald-400 mb-2">Moderasi Katalog</div>
        <h1 className="headline text-4xl">
          Kontrol <span className="italic text-emerald-400 font-light">aset & listing.</span>
        </h1>
      </div>

      {/* Listing approval queue */}
      <section className="card overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between">
          <h3 className="font-display text-xl">Persetujuan Listing Baru</h3>
          <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
            {pending.length} menunggu
          </span>
        </div>

        {pending.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-ink-400">Tidak ada listing baru yang menunggu persetujuan.</div>
        ) : (
          <ul className="divide-y divide-ink-700/30">
            {pending.map((p) => (
              <li key={p.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                    <Image src={p.img} alt="" fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-[0.65rem] text-ink-400">{p.vendor} · {p.category} · {formatIDR(p.price)}/hari · {p.submitted}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-ghost !py-1.5 !px-3 text-xs">
                    <Eye className="w-3.5 h-3.5" /> Tinjau Detail
                  </button>
                  <button
                    onClick={() => decide(p.id)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Setujui
                  </button>
                  <button
                    onClick={() => decide(p.id)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-400/10 text-red-300 border border-red-400/30 hover:bg-red-400/20"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Tolak
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Protection log */}
      <section className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-display text-xl">Manajemen Log Perlindungan</h3>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input className="field !pl-9 !py-2 text-sm !w-56" placeholder="Cari aset…" />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="text-xs text-ink-400 border-b border-ink-700/40">
            <tr>
              <th className="text-left px-6 py-3 font-normal">Aset</th>
              <th className="text-left px-3 py-3 font-normal">Vendor</th>
              <th className="text-left px-3 py-3 font-normal">Status Proteksi</th>
              <th className="text-left px-3 py-3 font-normal">Kontribusi Komisi (10%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700/30">
            {protectedItems.map((e) => (
              <tr key={e.id} className="hover:bg-ink-700/20 transition">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden">
                      <Image src={e.image} alt="" fill className="object-cover" sizes="36px" />
                    </div>
                    <div className="font-medium">{e.name}</div>
                  </div>
                </td>
                <td className="px-3 py-3 text-ink-300">{getVendor(e.vendorId)?.name}</td>
                <td className="px-3 py-3">
                  <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" /> Aktif
                  </span>
                </td>
                <td className="px-3 py-3 tabular text-ink-300">{formatIDR(Math.round(e.pricePerDay * 0.1))}/hari</td>
              </tr>
            ))}
            {equipment.filter((e) => !e.protection).slice(0, 2).map((e) => (
              <tr key={e.id} className="hover:bg-ink-700/20 transition">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden">
                      <Image src={e.image} alt="" fill className="object-cover" sizes="36px" />
                    </div>
                    <div className="font-medium">{e.name}</div>
                  </div>
                </td>
                <td className="px-3 py-3 text-ink-300">{getVendor(e.vendorId)?.name}</td>
                <td className="px-3 py-3">
                  <span className="flex items-center gap-1.5 text-ink-500 text-xs">
                    <ShieldOff className="w-3.5 h-3.5" /> Tidak aktif
                  </span>
                </td>
                <td className="px-3 py-3 text-ink-500">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
