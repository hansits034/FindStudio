'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { myBookings, formatIDR, type Booking } from '@/lib/mockData';
import { CalendarCheck, MessageCircle, MapPin, XCircle, Star, QrCode, Navigation } from 'lucide-react';

const STATUS: Record<Booking['status'], { label: string; cls: string }> = {
  pending: { label: 'Menunggu konfirmasi', cls: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  confirmed: { label: 'Terkonfirmasi', cls: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
  ongoing: { label: 'Sedang berlangsung', cls: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' },
  returned: { label: 'Dikembalikan', cls: 'bg-ink-700/40 text-ink-300 border-ink-700/40' },
  completed: { label: 'Selesai', cls: 'bg-ink-700/40 text-ink-300 border-ink-700/40' },
  claimed: { label: 'Klaim proteksi', cls: 'bg-red-400/10 text-red-300 border-red-400/30' },
  cancelled: { label: 'Dibatalkan', cls: 'bg-ink-700/30 text-ink-400 border-ink-700/40' },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

const TABS = [
  { key: 'active', label: 'Mendatang / Aktif' },
  { key: 'done', label: 'Selesai' },
  { key: 'cancelled', label: 'Dibatalkan' },
] as const;

export default function OrdersPage() {
  const [tab, setTab] = useState<typeof TABS[number]['key']>('active');

  const active = myBookings
    .filter((b) => ['pending', 'confirmed', 'ongoing'].includes(b.status))
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
  const done = myBookings.filter((b) => ['completed', 'returned'].includes(b.status));
  const cancelled = myBookings.filter((b) => ['cancelled', 'claimed'].includes(b.status));

  const list = tab === 'active' ? active : tab === 'done' ? done : cancelled;

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-2 text-xs text-ink-400 mb-6">
          <Link href="/" className="hover:text-amber-400">Beranda</Link>
          <span>/</span>
          <span className="text-ink-300">Pesanan Saya</span>
        </div>

        <div className="mb-8">
          <div className="eyebrow text-amber-400 mb-2">Pesanan Saya</div>
          <h1 className="headline text-5xl lg:text-6xl">
            Lacak <span className="italic text-amber-400 font-light">sewamu.</span>
          </h1>
        </div>

        {/* Tabs — besar & jelas, mudah dipencet */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-sm px-5 py-2.5 rounded-full font-medium border transition ${
                tab === t.key ? 'bg-amber-400 text-ink-900 border-amber-400' : 'border-ink-700/40 text-ink-300 hover:border-amber-400/40'
              }`}
            >
              {t.label}
              <span className="ml-2 text-[0.65rem] tabular opacity-70">
                {(t.key === 'active' ? active : t.key === 'done' ? done : cancelled).length}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3 max-w-3xl">
          {list.map((b) => (
            <OrderRow key={b.id} b={b} tab={tab} />
          ))}
          {list.length === 0 && (
            <div className="card p-10 text-center text-ink-300 text-sm">Tidak ada pesanan di kategori ini.</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function OrderRow({ b, tab }: { b: Booking; tab: string }) {
  const s = STATUS[b.status];
  return (
    <div className="card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-full sm:w-28 h-28 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-ink-800">
          <Image src={b.itemImage} alt={b.itemName} fill className="object-cover" sizes="112px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-medium leading-tight">{b.itemName}</h3>
            <span className={`text-[0.65rem] px-2.5 py-1 rounded-full border ${s.cls} shrink-0`}>{s.label}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-400 mb-1">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{b.vendorName}</span>
            <span className="flex items-center gap-1 tabular"><CalendarCheck className="w-3 h-3" />{fmtDate(b.startDate)}{b.endDate !== b.startDate ? ` → ${fmtDate(b.endDate)}` : ''}</span>
            <span className="tabular text-amber-400">{formatIDR(b.total)}</span>
          </div>
          {b.bookingCode && <div className="text-[0.65rem] text-ink-500">Kode booking: <span className="tabular text-ink-300">{b.bookingCode}</span></div>}
        </div>
      </div>

      {/* Aksi sesuai status — dibuat sangat jelas untuk pengguna non-teknis */}
      <div className="mt-4 pt-4 border-t border-ink-700/30 flex flex-wrap items-center gap-2">
        {tab === 'active' && (
          <>
            <button className="text-xs inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-amber-400/40 text-amber-400 hover:bg-amber-400/10 transition">
              <Navigation className="w-3.5 h-3.5" /> Buka Maps ke Vendor
            </button>
            <button className="text-xs inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-ink-700/40 text-ink-300 hover:border-amber-400/40 transition">
              <QrCode className="w-3.5 h-3.5" /> Tampilkan QR / Kode Booking
            </button>
            <Link href="/messages" className="text-xs inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-ink-700/40 text-ink-300 hover:border-amber-400/40 transition">
              <MessageCircle className="w-3.5 h-3.5" /> Chat vendor
            </Link>
          </>
        )}
        {tab === 'done' && (
          b.reviewed ? (
            <span className="text-xs inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-ink-700/30 text-ink-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Ulasan terkirim
            </span>
          ) : (
            <button className="text-xs inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium bg-amber-400 text-ink-900 hover:scale-[1.02] transition">
              <Star className="w-3.5 h-3.5" /> Beri Ulasan & Rating
            </button>
          )
        )}
        {tab === 'cancelled' && (
          <span className="text-xs inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-ink-700/30 text-ink-400">
            <XCircle className="w-3.5 h-3.5" /> {b.status === 'claimed' ? 'Diproses sebagai klaim proteksi' : 'Dana telah direfund'}
          </span>
        )}
      </div>
    </div>
  );
}
