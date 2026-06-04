import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoleBanner from '@/components/RoleBanner';
import { formatIDR, vendors } from '@/lib/mockData';
import Image from 'next/image';
import {
  Activity,
  Users,
  Wallet,
  Shield,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <>
      <Navbar />
      <RoleBanner role="ADMIN" name="Admin FindStudio" />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-[260px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-2 lg:sticky lg:top-28 self-start">
            <div className="card p-5 mb-4 bg-amber-400/5 border-amber-400/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="eyebrow text-amber-400">Admin Console</span>
              </div>
              <p className="text-xs text-ink-300">Pemantauan ekosistem FindStudio.</p>
            </div>

            {[
              { icon: Activity, label: 'Overview', active: true },
              { icon: Users, label: 'Pengguna', count: 12480 },
              { icon: Wallet, label: 'Transaksi', count: 84 },
              { icon: Shield, label: 'Protection Fund' },
              { icon: AlertTriangle, label: 'Fraud Detection', count: 3 },
              { icon: CheckCircle2, label: 'Verifikasi KYC', count: 17 },
            ].map((m, i) => (
              <button key={i} className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition ${m.active ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30' : 'hover:bg-ink-700/40'}`}>
                <span className="flex items-center gap-3">
                  <m.icon className="w-4 h-4" strokeWidth={1.5} />
                  {m.label}
                </span>
                {m.count !== undefined && (
                  <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-ink-700/50 tabular">{m.count.toLocaleString()}</span>
                )}
              </button>
            ))}
          </aside>

          <div>
            <div className="mb-8">
              <div className="eyebrow text-amber-400 mb-2">Admin Dashboard</div>
              <h1 className="headline text-4xl lg:text-5xl">
                Kesehatan <span className="italic text-amber-400 font-light">ekosistem.</span>
              </h1>
            </div>

            {/* KPI */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              <Stat label="GMV bulan ini" value={formatIDR(840250000)} delta="+24.3% MoM" up />
              <Stat label="Pengguna aktif" value="12.480" delta="+312 minggu ini" up />
              <Stat label="Vendor terverifikasi" value="184" delta="+8 minggu ini" up />
              <Stat label="Protection Fund" value={formatIDR(74250000)} delta="Reserve 99.2%" />
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
                        <div className="tabular text-amber-400">{formatIDR(t.amount)}</div>
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
                    { risk: 'high', user: 'user_8392', reason: 'Akun baru, transaksi >Rp10M', },
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
                        <button className="text-[0.65rem] flex-1 py-1 rounded-full border border-ink-700/40 hover:border-amber-400/60">Tinjau</button>
                        <button className="text-[0.65rem] flex-1 py-1 rounded-full bg-red-500/10 text-red-300 hover:bg-red-500/20">Block</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* KYC Pending list */}
            <section className="card overflow-hidden mb-10">
              <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-display text-xl">Verifikasi vendor menunggu</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input className="field !pl-9 !py-2 text-sm !w-56" placeholder="Cari vendor…" />
                  </div>
                  <button className="btn-ghost !py-2 !px-3 text-xs">
                    <Filter className="w-3.5 h-3.5" /> Filter
                  </button>
                </div>
              </div>

              <table className="w-full text-sm">
                <thead className="text-xs text-ink-400 border-b border-ink-700/40">
                  <tr>
                    <th className="text-left px-6 py-3 font-normal">Vendor</th>
                    <th className="text-left px-3 py-3 font-normal">Kategori</th>
                    <th className="text-left px-3 py-3 font-normal">KTP</th>
                    <th className="text-left px-3 py-3 font-normal">Biometrik</th>
                    <th className="text-left px-3 py-3 font-normal">Diajukan</th>
                    <th className="text-right px-6 py-3 font-normal">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-700/30">
                  {vendors.map((v, i) => (
                    <tr key={v.id} className="hover:bg-ink-700/20 transition">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image src={v.avatar} alt="" fill className="object-cover" sizes="32px" />
                          </div>
                          <div>
                            <div className="font-medium">{v.name}</div>
                            <div className="text-[0.65rem] text-ink-400">{v.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-ink-300">Kamera & Lensa</td>
                      <td className="px-3 py-3">
                        {i === 0 ? <Clock className="w-4 h-4 text-amber-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </td>
                      <td className="px-3 py-3">
                        {i % 2 === 0 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      </td>
                      <td className="px-3 py-3 text-ink-400 text-xs tabular">
                        {['2 jam lalu', 'Kemarin', '3 hari lalu', '5 hari lalu'][i]}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button className="btn-ghost !py-1.5 !px-3 text-xs">
                          <Eye className="w-3.5 h-3.5" /> Tinjau
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value, delta, up }: { label: string; value: string; delta: string; up?: boolean }) {
  return (
    <div className="card p-5">
      <div className="eyebrow text-ink-400 mb-2">{label}</div>
      <div className="font-display text-2xl text-amber-400 tabular mb-2">{value}</div>
      <div className="text-[0.65rem] text-ink-400 flex items-center gap-1">
        {up && <TrendingUp className="w-3 h-3 text-emerald-400" />}
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
