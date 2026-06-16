import Link from 'next/link';
import Image from 'next/image';
import { equipment, formatIDR } from '@/lib/mockData';
import {
  Plus, Store, PackageOpen, CalendarDays, Star, Shield, AlertCircle,
  CheckCircle2, Clock, Check, X, TrendingUp, TrendingDown,
  MessageCircle, Settings, ArrowRight, Boxes, Wallet,
} from 'lucide-react';

const VC = '#818cf8';
const VBORDER = 'rgba(129,140,248,0.4)';

const TODAY_PICKUPS = [
  { order: 'ORD-091', client: 'Dimas P.',  item: 'Sony A7 IV + Lensa 24-70', time: '10:00', avatar: 'D' },
  { order: 'ORD-092', client: 'Rina C.',   item: 'Aputure 600X Pro',          time: '13:00', avatar: 'R' },
];
const TODAY_RETURNS = [
  { order: 'ORD-085', client: 'Maya R.',  item: 'Sony A7 IV',   time: '17:00', avatar: 'M' },
  { order: 'ORD-083', client: 'Tania W.', item: 'DJI RS 3 Pro', time: '12:00', avatar: 'T' },
];
const PENDING_ORDERS = [
  { id: 'ORD-091', client: 'Dimas P.', avatar: 'D', item: 'Sony A7 IV + Lensa 24-70', days: 3, start: '19 Jun', total: 1500000 },
  { id: 'ORD-092', client: 'Rina C.',  avatar: 'R', item: 'Aputure 600X Pro',          days: 2, start: '20 Jun', total: 840000 },
];
const ACTIVE_RENTALS = [
  { name: 'Canon RF 24-70', client: 'Galih S.', status: 'Berlangsung',   statusColor: '#34d399', total: 1050000 },
  { name: 'DJI RS 3 Pro',   client: 'Tania W.', status: 'Terkonfirmasi', statusColor: VC,        total: 750000 },
  { name: 'Rode NTG5',      client: 'Bara I.',   status: 'Selesai',       statusColor: '#9399ba', total: 480000 },
];
const SECTION_LINKS = [
  { icon: Boxes,         label: 'Katalog Aset',     desc: '35 aset terdaftar',          href: '/dashboard/vendor/catalog',  color: VC },
  { icon: CalendarDays,  label: 'Jadwal & Pesanan', desc: '2 pesanan menunggu',          href: '/dashboard/vendor/orders',   color: '#34d399' },
  { icon: MessageCircle, label: 'Pesan Klien',      desc: '3 pesan belum dibaca',        href: '/dashboard/vendor/messages', color: '#f9b17a' },
  { icon: Shield,        label: 'Pusat Klaim',      desc: '1 klaim aktif diproses',      href: '/dashboard/vendor/claims',   color: '#f87171' },
  { icon: Wallet,        label: 'Keuangan & Wallet', desc: 'Saldo Rp 2.845.000 siap tarik', href: '/dashboard/vendor/finance', color: '#34d399' },
  { icon: Settings,      label: 'Pengaturan Toko',  desc: 'NPWP belum dilengkapi',       href: '/dashboard/vendor/settings', color: '#9399ba' },
];

export default function VendorBerandaPage() {
  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="eyebrow mb-1.5" style={{ color: VC }}>Beranda · Senin, 16 Juni 2026</div>
          <h1 className="headline text-4xl lg:text-5xl">
            Selamat datang, <span className="italic font-light" style={{ color: VC }}>Aperture.</span>
          </h1>
          <p className="text-ink-300 text-sm mt-1.5">Hari ini ada {TODAY_PICKUPS.length} pickup & {TODAY_RETURNS.length} pengembalian terjadwal.</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Link
            href="/dashboard/vendor/catalog"
            className="btn-ghost text-sm !py-2 !px-4 flex items-center gap-2"
            style={{ borderColor: VBORDER, color: VC }}
          >
            <Store className="w-4 h-4" /> Etalase
          </Link>
          <Link
            href="/dashboard/vendor/catalog"
            className="text-sm inline-flex items-center gap-2 py-2 px-5 rounded-full font-medium"
            style={{ background: VC, color: '#1a1c2e' }}
          >
            <Plus className="w-4 h-4" /> Tambah Alat
          </Link>
        </div>
      </div>

      {/* ── KPI ────────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <KPI label="Pendapatan bulan ini"  value={formatIDR(12480000)} delta="+18% vs bulan lalu"    trend="up" />
        <KPI label="Pesanan aktif"          value="8"                    delta="+2 pesanan hari ini"   trend="up" />
        <KPI label="Rata-rata rating"        value="4.96 ★"              delta="dari 184 ulasan"        trend="neutral" />
        <KPI label="Tingkat kerusakan"       value="0.8%"                delta="−0.3% vs bulan lalu"   trend="down-good" />
      </div>

      {/* ── PESANAN TINDAKAN | JADWAL HARI INI ─────────────── */}
      <div className="grid lg:grid-cols-2 gap-5 mb-8">

        {/* Pesanan Perlu Tindakan */}
        <section className="card p-6" style={{ borderColor: VBORDER }}>
          <div className="flex items-center gap-2 mb-5">
            <PackageOpen className="w-5 h-5" style={{ color: VC }} />
            <h3 className="font-display text-xl">Pesanan Perlu Tindakan</h3>
            <span className="text-[0.65rem] px-2 py-0.5 rounded-full font-bold ml-1" style={{ background: VC, color: '#1a1c2e' }}>
              {PENDING_ORDERS.length}
            </span>
          </div>
          <div className="space-y-3">
            {PENDING_ORDERS.map((o) => (
              <div key={o.id} className="p-4 rounded-xl" style={{ background: 'rgba(129,140,248,0.06)', border: `1px solid ${VBORDER}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-ink-900" style={{ background: VC }}>
                    {o.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{o.item}</div>
                    <div className="text-[0.65rem] text-ink-400">{o.client} · {o.days} hari mulai {o.start}</div>
                  </div>
                  <div className="text-amber-400 text-sm tabular font-display shrink-0">{formatIDR(o.total)}</div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg border border-red-400/40 text-red-400 hover:bg-red-400/10 transition">
                    <X className="w-3 h-3" /> Tolak
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg font-medium transition" style={{ background: '#34d399', color: '#1a1c2e' }}>
                    <Check className="w-3 h-3" /> Terima
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/vendor/orders" className="flex items-center justify-center gap-1 text-xs mt-4 py-2 rounded-lg border border-ink-700/40 hover:border-[#818cf8]/30 transition text-ink-400">
            Lihat semua pesanan <ArrowRight className="w-3 h-3" />
          </Link>
        </section>

        {/* Jadwal Hari Ini */}
        <section className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-xl">Jadwal Hari Ini</h3>
            <span className="text-[0.65rem] text-ink-400 ml-1">16 Juni 2026</span>
          </div>

          <div className="mb-5">
            <div className="eyebrow text-ink-400 mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              Pickup klien ({TODAY_PICKUPS.length} alat)
            </div>
            <div className="space-y-2">
              {TODAY_PICKUPS.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.2)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-ink-900 bg-emerald-400">{p.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{p.item}</div>
                    <div className="text-[0.65rem] text-ink-400">{p.client} · {p.order}</div>
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 shrink-0">{p.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow text-ink-400 mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              Pengembalian ({TODAY_RETURNS.length} alat)
            </div>
            <div className="space-y-2">
              {TODAY_RETURNS.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(249,177,122,0.07)', border: '1px solid rgba(249,177,122,0.2)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-ink-900 bg-amber-400">{r.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.item}</div>
                    <div className="text-[0.65rem] text-ink-400">{r.client} · {r.order}</div>
                  </div>
                  <div className="text-xs font-semibold text-amber-400 shrink-0">≤ {r.time}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── EARNINGS CHART ─────────────────────────────────── */}
      <section className="card p-6 mb-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="eyebrow text-ink-400 mb-1">Pendapatan 30 hari</div>
            <div className="font-display text-3xl text-amber-400 tabular">{formatIDR(12480000)}</div>
          </div>
          <div className="flex gap-2">
            {['7H', '30H', '90H', '1T'].map((t, i) => (
              <button
                key={t}
                className="text-xs px-3 py-1.5 rounded-full transition"
                style={i === 1
                  ? { background: VC, color: '#1a1c2e', fontWeight: 600 }
                  : { border: '1px solid rgba(103,111,157,0.4)' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <ChartMock />
      </section>

      {/* ── PENYEWAAN AKTIF | ALAT TERPOPULER ──────────────── */}
      <div className="grid lg:grid-cols-2 gap-5 mb-8">
        <section className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl">Penyewaan Aktif</h3>
            <Link href="/dashboard/vendor/orders" className="text-xs text-ink-400 hover:text-ink-200 flex items-center gap-1 transition">
              Semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {ACTIVE_RENTALS.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-ink-700/30 last:border-0">
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-[0.65rem] text-ink-400">oleh {r.client}</div>
                </div>
                <div className="text-right">
                  <div className="tabular text-sm text-amber-400">{formatIDR(r.total)}</div>
                  <div className="text-[0.65rem] font-medium" style={{ color: r.statusColor }}>{r.status}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl">Alat Terpopuler</h3>
            <span className="eyebrow text-ink-400">bulan ini</span>
          </div>
          <div className="space-y-3">
            {equipment.slice(0, 3).map((e, i) => (
              <div key={e.id} className="flex items-center gap-3">
                <span className="font-display text-2xl text-amber-400/40 tabular w-6">{i + 1}</span>
                <div className="relative w-10 h-10 rounded-md overflow-hidden bg-ink-800 shrink-0">
                  <Image src={e.image} alt="" fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{e.name}</div>
                  <div className="text-[0.65rem] text-ink-400 flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 text-amber-400" />
                    {(4.8 + i * 0.05).toFixed(2)} · {14 - i * 3} disewa
                  </div>
                </div>
                <div className="text-xs text-amber-400 tabular">{formatIDR(e.pricePerDay * 8)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── KLAIM | KYC ────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-4 mb-10">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-lg">Klaim Proteksi Aktif</h3>
                <p className="text-xs text-ink-400">DJI Mavic 3 — baling-baling retak</p>
              </div>
            </div>
            <span className="text-[0.65rem] px-2 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">Diproses</span>
          </div>
          <div className="space-y-1.5">
            <Step done label="Klaim diajukan" date="24 Mei 2026" />
            <Step done label="Foto before/after diverifikasi" date="24 Mei 2026" />
            <Step current label="Estimasi servis ditinjau" date="Sedang diproses…" />
            <Step label="Dana dicairkan ke wallet" date="Estimasi: 26 Mei" />
          </div>
          <div className="mt-4 pt-4 border-t border-ink-700/40 flex items-center justify-between">
            <span className="text-xs text-ink-400">Nilai klaim</span>
            <span className="font-display text-lg text-amber-400 tabular">{formatIDR(385000)}</span>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h3 className="font-medium text-sm">Verifikasi KYC</h3>
          </div>
          <div className="space-y-2 mb-4">
            <KycRow done label="Email" />
            <KycRow done label="No. WhatsApp" />
            <KycRow done label="KTP / Identitas" />
            <KycRow done label="Verifikasi Biometrik" />
            <KycRow label="NPWP (opsional)" />
          </div>
          <button className="w-full text-xs py-2 rounded-full border font-medium" style={{ borderColor: VBORDER, color: VC }}>
            Lengkapi NPWP
          </button>
          <p className="text-[0.6rem] text-ink-500 mt-2 text-center">Diperlukan untuk payout &gt; Rp 5 juta/bln</p>
        </div>
      </div>

      {/* ── KELOLA TOKO (quick links) ───────────────────────── */}
      <div>
        <div className="eyebrow text-ink-400 mb-4">Kelola toko</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTION_LINKS.map((s, i) => (
            <Link key={i} href={s.href} className="card p-5 flex items-center gap-4 hover:border-[#818cf8]/30 transition group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.color}18`, color: s.color }}>
                <s.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-[0.65rem] text-ink-400">{s.desc}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-500 group-hover:text-ink-200 transition shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

type Trend = 'up' | 'down' | 'down-good' | 'neutral';

function KPI({ label, value, delta, trend }: { label: string; value: string; delta: string; trend: Trend }) {
  const icon =
    trend === 'up'        ? <TrendingUp  className="w-3 h-3 text-emerald-400" /> :
    trend === 'down'      ? <TrendingDown className="w-3 h-3 text-red-400" /> :
    trend === 'down-good' ? <TrendingDown className="w-3 h-3 text-emerald-400" /> :
                            <Star className="w-3 h-3 text-amber-400" />;
  return (
    <div className="card p-5">
      <div className="eyebrow text-ink-400 mb-2">{label}</div>
      <div className="font-display text-2xl text-amber-400 tabular mb-2">{value}</div>
      <div className="text-[0.65rem] text-ink-400 flex items-center gap-1">{icon}{delta}</div>
    </div>
  );
}

function Step({ done, current, label, date }: { done?: boolean; current?: boolean; label: string; date: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      {done    ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> :
       current ? <Clock className="w-4 h-4 text-amber-400 animate-shimmer shrink-0" /> :
                 <div className="w-4 h-4 rounded-full border border-ink-700/40 shrink-0" />}
      <span className={`flex-1 text-xs ${done || current ? 'text-ink-200' : 'text-ink-400'}`}>{label}</span>
      <span className="text-[0.65rem] text-ink-400 tabular">{date}</span>
    </div>
  );
}

function KycRow({ done, label }: { done?: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className={done ? 'text-ink-200' : 'text-ink-400'}>{label}</span>
      {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="text-amber-400 text-[0.65rem]">Perlu upload</span>}
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
          className="flex-1 rounded-t transition hover:opacity-80"
          style={{ height: `${(h / max) * 100}%`, background: 'linear-gradient(to top, rgba(129,140,248,0.35), #818cf8)' }}
        />
      ))}
    </div>
  );
}
