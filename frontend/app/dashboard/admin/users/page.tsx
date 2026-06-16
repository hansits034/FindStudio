'use client';

import { useState } from 'react';
import Image from 'next/image';
import { vendors, formatIDR } from '@/lib/mockData';
import {
  Search, Filter, CheckCircle2, XCircle, Clock, Eye,
  Star, Ban, ShieldCheck, X,
} from 'lucide-react';

const KYC_QUEUE = [
  { id: 'kyc1', name: 'Galih Saputra', role: 'Kreator', ktpNo: '3578••••0421', submitted: '14 menit lalu', avatar: vendors[0].avatar },
  { id: 'kyc2', name: 'Roll House Studio', role: 'Vendor', ktpNo: '3578••••8832', submitted: '2 jam lalu', avatar: vendors[1].avatar },
  { id: 'kyc3', name: 'Tania Wijaya', role: 'Kreator', ktpNo: '3578••••1190', submitted: '5 jam lalu', avatar: vendors[3].avatar },
  { id: 'kyc4', name: 'Soundscape Pro', role: 'Vendor', ktpNo: '3578••••7765', submitted: 'Kemarin', avatar: vendors[4].avatar },
];

const USERS = [
  { id: 'u1', name: 'Maya Rahmasari', role: 'Kreator', city: 'Surabaya', transactions: 18, totalSpend: 14200000, rating: 4.9, points: 320, status: 'active' },
  { id: 'u2', name: 'Galih Saputra', role: 'Kreator', city: 'Surabaya', transactions: 6, totalSpend: 3850000, rating: 4.7, points: 95, status: 'active' },
  { id: 'u3', name: 'Tania Wijaya', role: 'Kreator', city: 'Sidoarjo', transactions: 11, totalSpend: 8100000, rating: 4.85, points: 180, status: 'active' },
  { id: 'u4', name: 'user_8392', role: 'Kreator', city: 'Unknown', transactions: 1, totalSpend: 10500000, rating: 0, points: 0, status: 'flagged' },
];

export default function AdminUsersPage() {
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [queue, setQueue] = useState(KYC_QUEUE);

  function decide(id: string) {
    setQueue((q) => q.filter((k) => k.id !== id));
    setReviewing(null);
  }

  return (
    <div>
      <div className="mb-8">
        <div className="eyebrow text-emerald-400 mb-2">Manajemen Pengguna</div>
        <h1 className="headline text-4xl">
          Pengguna & <span className="italic text-emerald-400 font-light">verifikasi.</span>
        </h1>
      </div>

      {/* KYC Queue */}
      <section className="card overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between">
          <h3 className="font-display text-xl">Antrean Verifikasi KTP</h3>
          <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
            {queue.length} menunggu
          </span>
        </div>

        {queue.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-ink-400">Tidak ada antrean KYC. Semua sudah diverifikasi.</div>
        ) : (
          <ul className="divide-y divide-ink-700/30">
            {queue.map((k) => (
              <li key={k.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Image src={k.avatar} alt="" fill className="object-cover" sizes="36px" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{k.name}</div>
                    <div className="text-[0.65rem] text-ink-400">{k.role} · KTP {k.ktpNo} · {k.submitted}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setReviewing(k.id)} className="btn-ghost !py-1.5 !px-3 text-xs">
                    <Eye className="w-3.5 h-3.5" /> Lihat KTP
                  </button>
                  <button
                    onClick={() => decide(k.id)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => decide(k.id)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-400/10 text-red-300 border border-red-400/30 hover:bg-red-400/20"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* User database */}
      <section className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-display text-xl">Database Kreator & Vendor</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input className="field !pl-9 !py-2 text-sm !w-56" placeholder="Cari pengguna…" />
            </div>
            <button className="btn-ghost !py-2 !px-3 text-xs">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead className="text-xs text-ink-400 border-b border-ink-700/40">
            <tr>
              <th className="text-left px-6 py-3 font-normal">Pengguna</th>
              <th className="text-left px-3 py-3 font-normal">Transaksi</th>
              <th className="text-left px-3 py-3 font-normal">Total Belanja</th>
              <th className="text-left px-3 py-3 font-normal">Rating</th>
              <th className="text-left px-3 py-3 font-normal">Poin</th>
              <th className="text-right px-6 py-3 font-normal">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-700/30">
            {USERS.map((u) => (
              <tr key={u.id} className="hover:bg-ink-700/20 transition">
                <td className="px-6 py-3">
                  <div className="font-medium">{u.name}</div>
                  <div className="text-[0.65rem] text-ink-400">{u.role} · {u.city}</div>
                </td>
                <td className="px-3 py-3 tabular text-ink-300">{u.transactions}</td>
                <td className="px-3 py-3 tabular text-ink-300">{formatIDR(u.totalSpend)}</td>
                <td className="px-3 py-3">
                  {u.rating > 0 ? (
                    <span className="flex items-center gap-1 tabular"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {u.rating}</span>
                  ) : (
                    <span className="text-ink-500">—</span>
                  )}
                </td>
                <td className="px-3 py-3 tabular text-ink-300">{u.points}</td>
                <td className="px-6 py-3 text-right">
                  {u.status === 'flagged' ? (
                    <span className="text-[0.65rem] px-2 py-1 rounded-full bg-red-400/10 text-red-300 border border-red-400/30 mr-2">Flagged</span>
                  ) : null}
                  <button className="btn-ghost !py-1.5 !px-3 text-xs inline-flex">
                    <Ban className="w-3.5 h-3.5" /> Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>

      {/* KTP preview modal (mock) */}
      {reviewing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6" onClick={() => setReviewing(null)}>
          <div className="card p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="font-display text-lg">Pratinjau KTP</h4>
              </div>
              <button onClick={() => setReviewing(null)}><X className="w-4 h-4 text-ink-400" /></button>
            </div>
            <div className="aspect-[16/10] rounded-xl bg-ink-700/40 flex items-center justify-center text-ink-500 text-xs mb-4">
              [Dokumen KTP terenkripsi]
            </div>
            <div className="flex gap-2">
              <button onClick={() => decide(reviewing)} className="flex-1 py-2 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 text-sm">Approve</button>
              <button onClick={() => decide(reviewing)} className="flex-1 py-2 rounded-full bg-red-400/10 text-red-300 border border-red-400/30 text-sm">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
