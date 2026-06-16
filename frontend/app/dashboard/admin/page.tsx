import Link from 'next/link';
import { formatIDR } from '@/lib/mockData';
import {
  TrendingUp, AlertTriangle, ShieldCheck, Wallet, Clock,
  Users, Boxes, ShieldAlert, Gift, ArrowRight, ScrollText,
} from 'lucide-react';

const SECTION_LINKS = [
  { icon: Users,       label: 'Pengguna & KYC',    desc: 'Antrean verifikasi KTP, database kreator & vendor', href: '/dashboard/admin/users' },
  { icon: Boxes,       label: 'Moderasi Katalog',  desc: 'Persetujuan listing baru & log Proteksi',            href: '/dashboard/admin/catalog' },
  { icon: Wallet,      label: 'Keuangan & Escrow', desc: 'Rekening bersama, payout, & akuntansi komisi',       href: '/dashboard/admin/finance' },
  { icon: ShieldAlert, label: 'Resolusi & Klaim',  desc: 'Tiket sengketa & klaim Proteksi alat',                href: '/dashboard/admin/disputes' },
  { icon: Gift,        label: 'Loyalitas & Promo', desc: 'Katalog hadiah poin & voucher otomatis',              href: '/dashboard/admin/promo' },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="eyebrow text-emerald-400 mb-2">Admin Command Center</div>
        <h1 className="headline text-4xl lg:text-5xl">
          Kesehatan <span className="italic text-emerald-400 font-light">ekosistem.</span>
        </h1>
      </div>

      {/* KPI */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <Stat label="GMV bulan ini" value={formatIDR(840250000)} delta="+24.3% MoM" up />
        <Stat label="Active Escrow Pool" value={formatIDR(126400000)} delta="38 transaksi terkunci" />
        <Stat label="Protection Fund Balance" value={formatIDR(74250000)} delta="Reserve 99.2%" up />
        <Stat label="Antrean Tertunda" value="26" delta="17 KTP · 6 listing · 3 klaim" warn />
      </div>

      {/* Quick links to sub-sections */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {SECTION_LINKS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="card p-5 hover:border-emerald-400/40 transition group"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-emerald-400/10 text-emerald-400">
              <s.icon className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div className="font-medium text-sm mb-1 flex items-center gap-1.5">
              {s.label}
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-emerald-400" />
            </div>
            <div className="text-[0.7rem] text-ink-400 leading-snug">{s.desc}</div>
          </Link>
        ))}
      </div>

      {/* Activity feed + fraud alerts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <section className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl">Aliran transaksi real-time</h3>
            <div className="flex items-center gap-2 text-[0.65rem] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-shimmer" />
              Live · 84 transaksi/jam
            </div>
          </div>
          <ul className="divide-y divide-ink-700/30">
            {[
              { type: 'Booking', who: 'Maya R. → Aperture', item: 'Sony A7 IV', amount: 1500000, status: 'paid' },
              { type: 'Payout', who: 'Aperture Rental', item: 'Settlement #2451', amount: 4200000, status: 'released' },
              { type: 'Claim', who: 'Skyborne Aerials', item: 'Mavic 3 propeller', amount: 385000, status: 'processing' },
              { type: 'Booking', who: 'Galih S. → Roll House', item: 'Studio Cyc Day', amount: 1800000, status: 'paid' },
              { type: 'Refund', who: 'Tania W.', item: 'Deposit Canon RF', amount: 2500000, status: 'released' },
            ].map((t, i) => (
              <li key={i} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <TypePill type={t.type} />
                  <div>
                    <div className="text-sm">{t.who}</div>
                    <div className="text-[0.65rem] text-ink-400">{t.item}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="tabular text-emerald-400">{formatIDR(t.amount)}</div>
                  <div className="text-[0.65rem] text-ink-400 capitalize">{t.status}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="font-display text-xl">Fraud alerts</h3>
          </div>
          <div className="space-y-3">
            {[
              { risk: 'high', user: 'user_8392', reason: 'Akun baru, transaksi >Rp10M' },
              { risk: 'med', user: 'user_1024', reason: 'IP berubah 4× dalam 1 jam' },
              { risk: 'med', user: 'user_4521', reason: 'Pola sewa-balikkan-sewa' },
            ].map((a, i) => (
              <div key={i} className="card !p-3.5 !bg-red-400/5 !border-red-400/20">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[0.65rem] px-2 py-0.5 rounded-full ${
                    a.risk === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {a.risk === 'high' ? 'HIGH RISK' : 'MED RISK'}
                  </span>
                  <span className="text-[0.65rem] text-ink-400 tabular">{a.user}</span>
                </div>
                <p className="text-xs text-ink-200 mb-2">{a.reason}</p>
                <div className="flex gap-1.5">
                  <button className="text-[0.65rem] flex-1 py-1 rounded-full border border-ink-700/40 hover:border-emerald-400/60">Tinjau</button>
                  <button className="text-[0.65rem] flex-1 py-1 rounded-full bg-red-500/10 text-red-300 hover:bg-red-500/20">Block</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Audit log (mocked) */}
      <section className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <ScrollText className="w-4 h-4 text-emerald-400" />
          <h3 className="font-display text-xl">Log Aktivitas Admin</h3>
        </div>
        <ul className="divide-y divide-ink-700/30 text-sm">
          {[
            { actor: 'Admin FindStudio', action: 'Approve KTP', target: 'vendor_2451 (Roll House Studio)', time: '14 menit lalu' },
            { actor: 'Admin FindStudio', action: 'Cairkan Klaim Proteksi', target: 'Rp 385.000 → Skyborne Aerials', time: '1 jam lalu' },
            { actor: 'Admin FindStudio', action: 'Reject Listing', target: 'Gimbal Zhiyun Crane 4 (foto tidak jelas)', time: '3 jam lalu' },
            { actor: 'Admin FindStudio', action: 'Suspend User', target: 'user_8392 (transaksi mencurigakan)', time: 'Kemarin' },
          ].map((l, i) => (
            <li key={i} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-ink-500 shrink-0" />
                <div>
                  <span className="text-ink-200">{l.actor}</span>{' '}
                  <span className="text-emerald-400">{l.action}</span>{' '}
                  <span className="text-ink-400">— {l.target}</span>
                </div>
              </div>
              <span className="text-[0.65rem] text-ink-500 shrink-0 tabular">{l.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value, delta, up, warn }: { label: string; value: string; delta: string; up?: boolean; warn?: boolean }) {
  return (
    <div className="card p-5">
      <div className="eyebrow text-ink-400 mb-2">{label}</div>
      <div className="font-display text-2xl text-emerald-400 tabular mb-2">{value}</div>
      <div className="text-[0.65rem] text-ink-400 flex items-center gap-1">
        {up && <TrendingUp className="w-3 h-3 text-emerald-400" />}
        {warn && <AlertTriangle className="w-3 h-3 text-amber-400" />}
        {delta}
      </div>
    </div>
  );
}

function TypePill({ type }: { type: string }) {
  const map: Record<string, string> = {
    Booking: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
    Payout: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
    Claim: 'bg-red-400/15 text-red-300 border-red-400/30',
    Refund: 'bg-ink-700/40 text-ink-300 border-ink-700/40',
  };
  return (
    <span className={`text-[0.65rem] px-2 py-0.5 rounded-full border ${map[type]}`}>
      {type}
    </span>
  );
}
