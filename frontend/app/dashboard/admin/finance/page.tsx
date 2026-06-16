'use client';

import { useState } from 'react';
import { formatIDR } from '@/lib/mockData';
import { Lock, Unlock, CheckCircle2, Clock, Wallet, TrendingUp, Building2 } from 'lucide-react';

const ESCROW = [
  { id: 'es1', client: 'Maya R.', vendor: 'Aperture Rental Co.', amount: 1500000, status: 'locked', note: 'Booking aktif, belum dikonfirmasi selesai' },
  { id: 'es2', client: 'Galih S.', vendor: 'Roll House Studio', amount: 1800000, status: 'locked', note: 'Studio sedang dipakai hari ini' },
  { id: 'es3', client: 'Tania W.', vendor: 'Skyborne Aerials', amount: 2812500, status: 'released', note: 'Selesai 12 Apr, dana sudah dicairkan' },
  { id: 'es4', client: 'Rakha P.', vendor: 'Tone Collective', amount: 2500000, status: 'locked', note: 'Menunggu hasil project (color grading)' },
];

const PAYOUTS = [
  { id: 'po1', vendor: 'Aperture Rental Co.', amount: 4200000, bank: 'BCA •••• 4821', requested: '1 jam lalu' },
  { id: 'po2', vendor: 'Soundscape Pro', amount: 1180000, bank: 'Mandiri •••• 9023', requested: '4 jam lalu' },
  { id: 'po3', vendor: 'Lumen Broadcast', amount: 6750000, bank: 'BNI •••• 1187', requested: 'Kemarin' },
];

export default function AdminFinancePage() {
  const [payouts, setPayouts] = useState(PAYOUTS);

  function approve(id: string) {
    setPayouts((p) => p.filter((x) => x.id !== id));
  }

  const totalLocked = ESCROW.filter((e) => e.status === 'locked').reduce((s, e) => s + e.amount, 0);
  const clientFeeRevenue = 10000 * 412;
  const commissionRevenue = 10000 * 412;

  return (
    <div>
      <div className="mb-8">
        <div className="eyebrow text-emerald-400 mb-2">Log Keuangan</div>
        <h1 className="headline text-4xl">
          Escrow & <span className="italic text-emerald-400 font-light">akuntansi.</span>
        </h1>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        <div className="card p-5">
          <div className="eyebrow text-ink-400 mb-2">Dana Terkunci di Escrow</div>
          <div className="font-display text-2xl text-emerald-400 tabular">{formatIDR(totalLocked)}</div>
        </div>
        <div className="card p-5">
          <div className="eyebrow text-ink-400 mb-2">Net Profit Platform (bulan ini)</div>
          <div className="font-display text-2xl text-emerald-400 tabular">{formatIDR(clientFeeRevenue + commissionRevenue)}</div>
          <div className="text-[0.65rem] text-ink-400 mt-1">Biaya klien + komisi vendor</div>
        </div>
        <div className="card p-5">
          <div className="eyebrow text-ink-400 mb-2">Payout Menunggu Persetujuan</div>
          <div className="font-display text-2xl text-amber-400 tabular">{payouts.length}</div>
        </div>
      </div>

      {/* Escrow tracker */}
      <section className="card overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-ink-700/40">
          <h3 className="font-display text-xl">Pemantauan Rekening Bersama</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="text-xs text-ink-400 border-b border-ink-700/40">
            <tr>
              <th className="text-left px-6 py-3 font-normal">Klien → Vendor</th>
              <th className="text-left px-3 py-3 font-normal">Jumlah</th>
              <th className="text-left px-3 py-3 font-normal">Status</th>
              <th className="text-left px-3 py-3 font-normal">Catatan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700/30">
            {ESCROW.map((e) => (
              <tr key={e.id} className="hover:bg-ink-700/20 transition">
                <td className="px-6 py-3">
                  <div className="font-medium">{e.client} → {e.vendor}</div>
                </td>
                <td className="px-3 py-3 tabular text-ink-300">{formatIDR(e.amount)}</td>
                <td className="px-3 py-3">
                  {e.status === 'locked' ? (
                    <span className="flex items-center gap-1.5 text-amber-400 text-xs"><Lock className="w-3.5 h-3.5" /> Terkunci</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs"><Unlock className="w-3.5 h-3.5" /> Dicairkan</span>
                  )}
                </td>
                <td className="px-3 py-3 text-ink-400 text-xs">{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>

      {/* Payout approval */}
      <section className="card overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between">
          <h3 className="font-display text-xl">Persetujuan Tarik Dana</h3>
          <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
            {payouts.length} menunggu
          </span>
        </div>
        {payouts.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-ink-400">Tidak ada permintaan payout yang menunggu.</div>
        ) : (
          <ul className="divide-y divide-ink-700/30">
            {payouts.map((p) => (
              <li key={p.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{p.vendor}</div>
                    <div className="text-[0.65rem] text-ink-400">{p.bank} · diajukan {p.requested}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="tabular text-emerald-400 font-medium">{formatIDR(p.amount)}</div>
                  <button
                    onClick={() => approve(p.id)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cairkan
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Commission accounting */}
      <section className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Wallet className="w-4 h-4 text-emerald-400" />
          <h3 className="font-display text-xl">Akuntansi Komisi</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-ink-700/30">
            <span className="text-ink-300">Biaya klien (Rp 10.000 × 412 transaksi)</span>
            <span className="tabular">{formatIDR(clientFeeRevenue)}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-ink-700/30">
            <span className="text-ink-300">Komisi vendor (Rp 10.000 × 412 transaksi)</span>
            <span className="tabular">{formatIDR(commissionRevenue)}</span>
          </div>
          <div className="flex items-center justify-between py-2 sm:col-span-2 pt-1">
            <span className="font-medium flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Total net profit platform</span>
            <span className="tabular text-emerald-400 font-display text-lg">{formatIDR(clientFeeRevenue + commissionRevenue)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
