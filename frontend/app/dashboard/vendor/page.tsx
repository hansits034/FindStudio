import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoleBanner from '@/components/RoleBanner';
import { equipment, formatIDR } from '@/lib/mockData';
import {
  LayoutGrid,
  Boxes,
  Wallet,
  BarChart3,
  Shield,
  Bell,
  TrendingUp,
  TrendingDown,
  Plus,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function VendorDashboardPage() {
  return (
    <>
      <Navbar />
      <RoleBanner role="VENDOR" name="Aperture Rental Co." />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-[260px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-2 lg:sticky lg:top-28 self-start">
            <div className="card p-5 mb-4" style={{ borderColor: 'rgba(103,111,157,0.5)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2" style={{ '--tw-ring-color': '#676f9d' } as React.CSSProperties}>
                  <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120" alt="" fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <div className="font-medium">Aperture Rental</div>
                  <div className="text-xs flex items-center gap-1">
                    <Shield className="w-3 h-3" style={{ color: '#8b91b8' }} />
                    <span style={{ color: '#8b91b8' }}>Vendor · Biometric</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-ink-300 pt-3 border-t border-ink-700/40">
                Pending payout: <span className="font-display text-base tabular" style={{ color: '#8b91b8' }}>{formatIDR(2845000)}</span>
              </div>
            </div>

            {[
              { icon: LayoutGrid, label: 'Overview', active: true },
              { icon: Boxes, label: 'Inventaris', count: equipment.length },
              { icon: BarChart3, label: 'Analitik' },
              { icon: Wallet, label: 'Wallet & payout' },
              { icon: Shield, label: 'Klaim proteksi', count: 1 },
              { icon: Bell, label: 'Notifikasi', count: 5 },
            ].map((m, i) => (
              <button
                key={i}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition hover:bg-ink-700/40"
                style={m.active ? { background: 'rgba(103,111,157,0.18)', color: '#b1b6d1', border: '1px solid rgba(103,111,157,0.45)' } : undefined}
              >
                <span className="flex items-center gap-3">
                  <m.icon className="w-4 h-4" strokeWidth={1.5} />
                  {m.label}
                </span>
                {m.count !== undefined && (
                  <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-ink-700/50 tabular">{m.count}</span>
                )}
              </button>
            ))}
          </aside>

          <div>
            <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
              <div>
                <div className="eyebrow mb-2" style={{ color: '#8b91b8' }}>Dashboard Vendor</div>
                <h1 className="headline text-4xl lg:text-5xl">
                  Selamat datang, <span className="italic font-light" style={{ color: '#8b91b8' }}>Aperture.</span>
                </h1>
              </div>
              <Link href="#" className="text-sm inline-flex items-center gap-2 py-3 px-5 rounded-full font-medium" style={{ background: '#676f9d', color: '#fff' }}>
                <Plus className="w-4 h-4" /> Tambah alat
              </Link>
            </div>

            {/* KPI */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              <KPI label="Pendapatan bulan ini" value={formatIDR(12480000)} delta="+18%" up />
              <KPI label="Penyewaan aktif" value="8" delta="+2 hari ini" up />
              <KPI label="Rata-rata rating" value="4.96" delta="184 ulasan" />
              <KPI label="Damage rate" value="0.8%" delta="-0.3% MoM" up />
            </div>

            {/* Earnings chart placeholder */}
            <section className="card p-6 mb-10">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="eyebrow text-ink-400 mb-1">Pendapatan 30 hari</div>
                  <div className="font-display text-3xl text-amber-400 tabular">{formatIDR(12480000)}</div>
                </div>
                <div className="flex gap-2">
                  {['7H', '30H', '90H', '1T'].map((t, i) => (
                    <button key={t} className={`text-xs px-3 py-1.5 rounded-full ${i === 1 ? 'bg-amber-400 text-ink-900' : 'border border-ink-700/40 hover:border-amber-400/40'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <ChartMock />
            </section>

            <div className="grid lg:grid-cols-2 gap-6 mb-10">
              {/* Recent rentals */}
              <section className="card p-6">
                <h3 className="font-display text-xl mb-5">Penyewaan terbaru</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Sony A7 IV', client: 'Maya R.', status: 'ongoing', total: 1500000 },
                    { name: 'Canon RF 24-70', client: 'Galih S.', status: 'returned', total: 1050000 },
                    { name: 'DJI RS 3 Pro', client: 'Tania W.', status: 'confirmed', total: 750000 },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-ink-700/30 last:border-0">
                      <div>
                        <div className="text-sm font-medium">{r.name}</div>
                        <div className="text-[0.65rem] text-ink-400">oleh {r.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="tabular text-sm text-amber-400">{formatIDR(r.total)}</div>
                        <div className="text-[0.65rem] text-ink-400 capitalize">{r.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Top-performing */}
              <section className="card p-6">
                <h3 className="font-display text-xl mb-5">Alat terpopuler bulan ini</h3>
                <div className="space-y-3">
                  {equipment.slice(0, 3).map((e, i) => (
                    <div key={e.id} className="flex items-center gap-3">
                      <span className="font-display text-2xl text-amber-400/40 tabular w-6">{i + 1}</span>
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-ink-800">
                        <Image src={e.image} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium leading-tight">{e.name}</div>
                        <div className="text-[0.65rem] text-ink-400 tabular">{Math.floor(Math.random() * 14) + 6} kali disewa</div>
                      </div>
                      <div className="text-xs text-amber-400 tabular">{formatIDR(e.pricePerDay * 8)}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Protection claim & KYC */}
            <div className="grid lg:grid-cols-3 gap-4 mb-10">
              <div className="card p-5 lg:col-span-2">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-display text-lg">Klaim Proteksi aktif</h3>
                    <p className="text-xs text-ink-400">DJI Mavic 3, baling-baling retak</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <Step done label="Klaim diajukan" date="24 Mei 2026" />
                  <Step done label="Foto before/after diverifikasi" date="24 Mei 2026" />
                  <Step current label="Estimasi servis ditinjau" date="Sedang diproses…" />
                  <Step label="Dana dicairkan" date="Estimasi: 26 Mei" />
                </div>
                <div className="mt-4 pt-4 border-t border-ink-700/40 flex items-center justify-between">
                  <span className="text-xs text-ink-400">Nilai klaim diajukan</span>
                  <span className="font-display text-lg text-amber-400 tabular">{formatIDR(385000)}</span>
                </div>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <h3 className="font-medium text-sm">Verifikasi KYC</h3>
                </div>
                <div className="space-y-2 mb-3">
                  <KycRow done label="Email" />
                  <KycRow done label="No. Telepon" />
                  <KycRow done label="KTP" />
                  <KycRow done label="Biometrik" />
                  <KycRow label="NPWP" />
                </div>
                <button className="btn-ghost w-full !py-2 text-xs justify-center">Lengkapi NPWP</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function KPI({ label, value, delta, up }: { label: string; value: string; delta: string; up?: boolean }) {
  return (
    <div className="card p-5">
      <div className="eyebrow text-ink-400 mb-2">{label}</div>
      <div className="font-display text-2xl text-amber-400 tabular mb-2">{value}</div>
      <div className="text-[0.65rem] text-ink-400 flex items-center gap-1">
        {up ? (
          <TrendingUp className="w-3 h-3 text-emerald-400" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-400" />
        )}
        {delta}
      </div>
    </div>
  );
}

function Step({ done, current, label, date }: { done?: boolean; current?: boolean; label: string; date: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      {done ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : current ? (
        <Clock className="w-4 h-4 text-amber-400 animate-shimmer shrink-0" />
      ) : (
        <div className="w-4 h-4 rounded-full border border-ink-700/40 shrink-0" />
      )}
      <span className={`flex-1 text-xs ${done || current ? 'text-ink-200' : 'text-ink-400'}`}>{label}</span>
      <span className="text-[0.65rem] text-ink-400 tabular">{date}</span>
    </div>
  );
}

function KycRow({ done, label }: { done?: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className={done ? 'text-ink-200' : 'text-ink-400'}>{label}</span>
      {done ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      ) : (
        <span className="text-amber-400 text-[0.65rem]">Perlu upload</span>
      )}
    </div>
  );
}

function ChartMock() {
  const heights = [40, 65, 45, 80, 55, 90, 70, 95, 60, 88, 75, 92, 68, 100, 80, 110, 95, 120, 105, 130, 115, 140, 128, 155, 142, 170, 158, 185, 175, 200];
  const max = Math.max(...heights);
  return (
    <div className="h-48 flex items-end gap-1">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-amber-400/40 to-amber-400 transition hover:from-amber-400 hover:to-amber-300"
          style={{ height: `${(h / max) * 100}%` }}
        />
      ))}
    </div>
  );
}
