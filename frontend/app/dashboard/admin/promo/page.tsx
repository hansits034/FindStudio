'use client';

import { useState } from 'react';
import { formatIDR } from '@/lib/mockData';
import { Gift, Cake, Plus, Trash2, Pencil, Ticket } from 'lucide-react';

const REWARDS = [
  { id: 'r1', name: 'Cetak Foto Gratis (A4)', points: 50, stock: 120 },
  { id: 'r2', name: 'Diskon Sewa 10%', points: 100, stock: 80 },
  { id: 'r3', name: 'Diskon Sewa 25%', points: 250, stock: 30 },
  { id: 'r4', name: 'Voucher Studio Gratis 1 Jam', points: 400, stock: 10 },
];

const BIRTHDAY_TODAY = [
  { id: 'b1', name: 'Tania Wijaya', email: 't.wijaya@email.com' },
  { id: 'b2', name: 'Galih Saputra', email: 'galih.s@email.com' },
];

export default function AdminPromoPage() {
  const [rewards, setRewards] = useState(REWARDS);

  function removeReward(id: string) {
    setRewards((r) => r.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="mb-8">
        <div className="eyebrow text-emerald-400 mb-2">Loyalitas & Promo</div>
        <h1 className="headline text-4xl">
          Hadiah & <span className="italic text-emerald-400 font-light">otomasi marketing.</span>
        </h1>
      </div>

      {/* Points reward catalog */}
      <section className="card overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between">
          <h3 className="font-display text-xl flex items-center gap-2">
            <Gift className="w-4 h-4 text-emerald-400" /> Katalog Hadiah Poin
          </h3>
          <button className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/20">
            <Plus className="w-3.5 h-3.5" /> Tambah Hadiah
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="text-xs text-ink-400 border-b border-ink-700/40">
            <tr>
              <th className="text-left px-6 py-3 font-normal">Hadiah</th>
              <th className="text-left px-3 py-3 font-normal">Poin Dibutuhkan</th>
              <th className="text-left px-3 py-3 font-normal">Stok</th>
              <th className="text-right px-6 py-3 font-normal">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700/30">
            {rewards.map((r) => (
              <tr key={r.id} className="hover:bg-ink-700/20 transition">
                <td className="px-6 py-3 font-medium">{r.name}</td>
                <td className="px-3 py-3 tabular text-emerald-400">{r.points} pts</td>
                <td className="px-3 py-3 tabular text-ink-300">{r.stock}</td>
                <td className="px-6 py-3 text-right">
                  <div className="inline-flex gap-1.5">
                    <button className="btn-ghost !py-1.5 !px-2.5 text-xs"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => removeReward(r.id)} className="text-xs px-2.5 py-1.5 rounded-full bg-red-400/10 text-red-300 border border-red-400/30 hover:bg-red-400/20">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Voucher & birthday promo */}
      <section className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Cake className="w-4 h-4 text-emerald-400" />
          <h3 className="font-display text-xl">Voucher Ulang Tahun Otomatis</h3>
        </div>
        <p className="text-sm text-ink-300 mb-5">
          Sistem otomatis mengunci voucher diskon <span className="text-emerald-400 font-medium">25%</span> untuk pengguna yang berulang tahun hari ini. Berlaku 24 jam.
        </p>

        {BIRTHDAY_TODAY.length === 0 ? (
          <div className="text-sm text-ink-400">Tidak ada pengguna yang berulang tahun hari ini.</div>
        ) : (
          <ul className="space-y-2">
            {BIRTHDAY_TODAY.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-400/5 border border-emerald-400/20">
                <div>
                  <div className="text-sm font-medium">{b.name}</div>
                  <div className="text-[0.65rem] text-ink-400">{b.email}</div>
                </div>
                <span className="text-[0.65rem] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                  <Ticket className="w-3.5 h-3.5" /> Voucher 25% terkirim
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
