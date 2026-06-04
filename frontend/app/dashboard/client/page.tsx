import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoleBanner from '@/components/RoleBanner';
import { myBookings, formatIDR } from '@/lib/mockData';
import {
  ClipboardList,
  Wallet,
  Heart,
  Bell,
  ChevronRight,
  Calendar,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function ClientDashboardPage() {
  const active = myBookings.filter((b) => ['ongoing', 'confirmed'].includes(b.status));
  const completed = myBookings.filter((b) => b.status === 'completed');

  return (
    <>
      <Navbar />
      <RoleBanner role="CLIENT" name="Rakha Pratama" />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-[260px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-2 lg:sticky lg:top-28 self-start">
            <div className="card p-5 mb-4" style={{ borderColor: 'rgba(249,177,122,0.5)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-amber-400 text-ink-900 font-display text-lg flex items-center justify-center">R</div>
                <div>
                  <div className="font-medium">Rakha Pratama</div>
                  <div className="text-xs text-amber-400">Kreator · Verified</div>
                </div>
              </div>
              <div className="text-xs text-ink-300 pt-3 border-t border-ink-700/40">
                Saldo wallet: <span className="text-amber-400 font-display text-base tabular">{formatIDR(425000)}</span>
              </div>
            </div>

            {[
              { icon: ClipboardList, label: 'Booking saya', active: true, count: active.length },
              { icon: Calendar, label: 'Jadwal' },
              { icon: Heart, label: 'Wishlist', count: 12 },
              { icon: Wallet, label: 'Wallet & deposit' },
              { icon: Bell, label: 'Notifikasi', count: 3 },
            ].map((m, i) => (
              <button
                key={i}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition ${
                  m.active ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30' : 'hover:bg-ink-700/40'
                }`}
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
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="eyebrow text-amber-400 mb-2">Dashboard Kreator</div>
                <h1 className="headline text-4xl lg:text-5xl">
                  Selamat sore, <span className="italic text-amber-400 font-light">Rakha.</span>
                </h1>
              </div>
              <Link href="/browse" className="btn-primary text-sm">
                <Sparkles className="w-4 h-4" /> Cari alat baru
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {[
                { l: 'Total project', v: '24', d: '+3 bulan ini', up: true },
                { l: 'Total disewa', v: formatIDR(18450000), d: '+12% MoM', up: true },
                { l: 'Booking aktif', v: '2', d: 'Sony A7IV + Studio' },
                { l: 'Reward poin', v: '1.240', d: 'Naik tier silver' },
              ].map((s, i) => (
                <div key={i} className="card p-5">
                  <div className="eyebrow text-ink-400 mb-2">{s.l}</div>
                  <div className="font-display text-2xl text-amber-400 tabular mb-2">{s.v}</div>
                  <div className="text-[0.65rem] text-ink-400 flex items-center gap-1">
                    {s.up && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                    {s.d}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Bookings */}
            <section className="mb-10">
              <div className="flex items-end justify-between mb-4">
                <h2 className="font-display text-2xl">Booking aktif</h2>
                <Link href="#" className="text-xs text-amber-400 hover:underline">Lihat semua →</Link>
              </div>
              <div className="space-y-3">
                {active.map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </div>
            </section>

            {/* Riwayat */}
            <section>
              <div className="flex items-end justify-between mb-4">
                <h2 className="font-display text-2xl">Riwayat</h2>
                <Link href="#" className="text-xs text-amber-400 hover:underline">Lihat semua →</Link>
              </div>
              <div className="space-y-3">
                {completed.map((b) => <BookingRow key={b.id} booking={b} />)}
                {myBookings.filter((b) => b.status === 'pending').map((b) => <BookingRow key={b.id} booking={b} />)}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function BookingRow({ booking: b }: { booking: typeof myBookings[number] }) {
  const statusMap: Record<string, { label: string; cls: string }> = {
    pending: { label: 'Menunggu konfirmasi', cls: 'bg-amber-400/10 text-amber-400 border-amber-400/30' },
    confirmed: { label: 'Terkonfirmasi', cls: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
    ongoing: { label: 'Sedang berlangsung', cls: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' },
    completed: { label: 'Selesai', cls: 'bg-ink-700/40 text-ink-300 border-ink-700/40' },
    returned: { label: 'Dikembalikan', cls: 'bg-ink-700/40 text-ink-300 border-ink-700/40' },
    claimed: { label: 'Diklaim', cls: 'bg-red-400/10 text-red-300 border-red-400/30' },
  };
  const s = statusMap[b.status];

  return (
    <div className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="relative w-full sm:w-28 h-28 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-ink-800">
        <Image src={b.itemImage} alt={b.itemName} fill className="object-cover" sizes="112px" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-medium leading-tight">{b.itemName}</h3>
          <span className={`text-[0.65rem] px-2.5 py-1 rounded-full border ${s.cls} shrink-0`}>{s.label}</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-400">
          <span>{b.vendorName}</span>
          <span className="tabular">{b.startDate} → {b.endDate}</span>
          <span className="tabular text-amber-400">{formatIDR(b.total)}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-ink-400 shrink-0 hidden sm:block" />
    </div>
  );
}
