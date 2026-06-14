'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { myBookings, formatIDR, type Booking } from '@/lib/mockData';
import { CalendarCheck, MessageCircle, MapPin, Clock, ChevronRight, CalendarDays } from 'lucide-react';

const STATUS: Record<Booking['status'], { label: string; cls: string }> = {
  pending: { label: 'Menunggu konfirmasi', cls: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  confirmed: { label: 'Terkonfirmasi', cls: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
  ongoing: { label: 'Sedang berlangsung', cls: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' },
  returned: { label: 'Dikembalikan', cls: 'bg-ink-700/40 text-ink-300 border-ink-700/40' },
  completed: { label: 'Selesai', cls: 'bg-ink-700/40 text-ink-300 border-ink-700/40' },
  claimed: { label: 'Klaim proteksi', cls: 'bg-red-400/10 text-red-300 border-red-400/30' },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function OrdersPage() {
  const upcoming = myBookings
    .filter((b) => ['pending', 'confirmed', 'ongoing'].includes(b.status))
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  const past = myBookings.filter((b) => ['completed', 'returned', 'claimed'].includes(b.status));

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-2 text-xs text-ink-400 mb-6">
          <Link href="/" className="hover:text-amber-400">Beranda</Link>
          <span>/</span>
          <span className="text-ink-300">Pesanan & Jadwal</span>
        </div>

        <div className="mb-10">
          <div className="eyebrow text-amber-400 mb-2">Pemesanan & Penjadwalan</div>
          <h1 className="headline text-5xl lg:text-6xl">
            Pesanan <span className="italic text-amber-400 font-light">& jadwal Anda.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr,360px] gap-10">
          {/* Daftar pesanan */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarCheck className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-2xl">Akan datang</h2>
            </div>
            <div className="space-y-3 mb-12">
              {upcoming.map((b) => <OrderRow key={b.id} b={b} />)}
              {upcoming.length === 0 && (
                <div className="card p-8 text-center text-ink-300 text-sm">Belum ada pesanan aktif.</div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-ink-400" />
              <h2 className="font-display text-2xl">Riwayat</h2>
            </div>
            <div className="space-y-3">
              {past.map((b) => <OrderRow key={b.id} b={b} />)}
            </div>
          </div>

          {/* Jadwal timeline */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <CalendarDays className="w-5 h-5 text-amber-400" />
                <h3 className="font-display text-xl">Lini masa jadwal</h3>
              </div>
              <div className="relative pl-5">
                <div className="absolute left-1.5 top-1 bottom-1 w-px bg-ink-700/50" />
                {upcoming.map((b) => (
                  <div key={b.id} className="relative mb-6 last:mb-0">
                    <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-ink-900" />
                    <div className="text-xs text-amber-400 tabular mb-1">{fmtDate(b.startDate)}{b.endDate !== b.startDate ? ` - ${fmtDate(b.endDate)}` : ''}</div>
                    <div className="text-sm font-medium leading-tight">{b.itemName}</div>
                    <div className="text-xs text-ink-400">{b.vendorName}</div>
                    <Link href="/messages" className="inline-flex items-center gap-1 text-xs text-ink-300 hover:text-amber-400 mt-1.5">
                      <MessageCircle className="w-3 h-3" /> Chat vendor
                    </Link>
                  </div>
                ))}
                {upcoming.length === 0 && <div className="text-sm text-ink-400">Tidak ada jadwal mendatang.</div>}
              </div>
            </div>

            <div className="card p-5 mt-4 !bg-amber-400/5 !border-amber-400/30">
              <p className="text-xs text-ink-300 leading-relaxed">
                Butuh ubah jadwal atau diskusi teknis? Hubungi vendor lewat
                <Link href="/messages" className="text-amber-400 hover:underline"> Chat</Link> sebelum tanggal sewa.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function OrderRow({ b }: { b: Booking }) {
  const s = STATUS[b.status];
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
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-400 mb-2">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{b.vendorName}</span>
          <span className="flex items-center gap-1 tabular"><CalendarDays className="w-3 h-3" />{fmtDate(b.startDate)}{b.endDate !== b.startDate ? ` → ${fmtDate(b.endDate)}` : ''}</span>
          <span className="tabular text-amber-400">{formatIDR(b.total)}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/messages" className="inline-flex items-center gap-1 text-xs text-ink-300 hover:text-amber-400">
            <MessageCircle className="w-3.5 h-3.5" /> Chat vendor
          </Link>
          <span className="text-ink-700">·</span>
          <button className="text-xs text-ink-300 hover:text-amber-400">Lihat detail</button>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-ink-400 shrink-0 hidden sm:block" />
    </div>
  );
}
