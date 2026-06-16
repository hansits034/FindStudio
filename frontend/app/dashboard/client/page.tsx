'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EquipmentCard from '@/components/EquipmentCard';
import { equipment } from '@/lib/mockData';
import {
  Search, Camera, Aperture, Lightbulb, Mic, Box, MapPin, Sparkles, Package,
  ShoppingBag, ClipboardList, MessageCircle, Heart, UserCircle2, Tag, ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  { key: 'camera', label: 'Kamera', icon: Camera },
  { key: 'lens', label: 'Lensa & Filter', icon: Aperture },
  { key: 'lighting', label: 'Lighting & Grip', icon: Lightbulb },
  { key: 'audio', label: 'Audio', icon: Mic },
  { key: 'gimbal', label: 'Stabilizer', icon: Box },
  { key: 'studio', label: 'Studio & Set', icon: MapPin },
  { key: 'accessory', label: 'Aksesoris', icon: Package },
  { key: 'service', label: 'Jasa Profesional', icon: Sparkles },
];

const QUICK_NAV = [
  { label: 'Eksplorasi', desc: 'Cari & sewa alat', icon: Search, href: '/dashboard/client', active: true },
  { label: 'Keranjang', desc: 'Lanjutkan sewa', icon: ShoppingBag, href: '/cart' },
  { label: 'Pesanan Saya', desc: 'Lacak sewamu', icon: ClipboardList, href: '/orders' },
  { label: 'Kotak Masuk', desc: 'Chat vendor', icon: MessageCircle, href: '/messages' },
  { label: 'Favorit', desc: 'Alat tersimpan', icon: Heart, href: '/wishlist' },
  { label: 'Akun Saya', desc: 'Profil & verifikasi', icon: UserCircle2, href: '/account' },
];

const RECOMMENDED = [equipment[0], equipment[12], equipment[16], equipment[26]];

export default function ClientExplorePage() {
  const [q, setQ] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/browse?q=${encodeURIComponent(q.trim())}` : '/browse');
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        {/* Sapaan + smart search */}
        <div className="mb-8">
          <div className="eyebrow text-amber-400 mb-2">Selamat datang kembali</div>
          <h1 className="headline text-4xl lg:text-5xl mb-6">
            Mau sewa apa <span className="italic text-amber-400 font-light">hari ini, Rakha?</span>
          </h1>

          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="field !pl-14 !py-4 !text-base w-full"
              placeholder='Coba ketik "lensa prime di Gubeng"…'
            />
            <button type="submit" className="btn-primary !absolute !right-2 !top-1/2 !-translate-y-1/2 !py-2.5">
              Cari
            </button>
          </form>
        </div>

        {/* Quick nav — 6 menu utama, besar & jelas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {QUICK_NAV.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              className={`card p-4 text-center transition lift ${m.active ? '!border-amber-400/60 !bg-amber-400/5' : ''}`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: m.active ? '#f9b17a' : 'rgba(249,177,122,0.12)', color: m.active ? '#2d3250' : '#f9b17a' }}
              >
                <m.icon className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium leading-tight">{m.label}</div>
              <div className="text-[0.65rem] text-ink-400 mt-0.5">{m.desc}</div>
            </Link>
          ))}
        </div>

        {/* Kategori cepat */}
        <section className="mb-12">
          <h2 className="font-display text-2xl mb-4">Cari berdasarkan kategori</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={`/browse?cat=${c.key}`}
                className="card p-4 flex flex-col items-center gap-2 text-center lift"
              >
                <c.icon className="w-6 h-6 text-amber-400" strokeWidth={1.5} />
                <span className="text-[0.7rem] leading-tight">{c.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Promo hari ini */}
        <section className="mb-12">
          <div
            className="card p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(249,177,122,0.1) 0%, transparent 60%)', borderColor: 'rgba(249,177,122,0.4)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#f9b17a', color: '#2d3250' }}>
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <div className="eyebrow text-amber-400 mb-1">Promo hari ini</div>
                <div className="font-display text-xl">Subsidi biaya layanan untuk sewa pertamamu.</div>
                <div className="text-sm text-ink-300 mt-0.5">Pakai kode <span className="text-amber-400 font-medium">KREATOR10</span> saat checkout.</div>
              </div>
            </div>
            <Link href="/browse" className="btn-primary shrink-0">
              Pakai sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Rekomendasi personal */}
        <section className="mb-4">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl">Direkomendasikan untukmu</h2>
              <p className="text-sm text-ink-400 mt-1">Tren & terdekat dari lokasimu di Surabaya.</p>
            </div>
            <Link href="/browse" className="text-xs text-amber-400 hover:underline shrink-0">Lihat semua →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RECOMMENDED.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
