import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { equipment, formatIDR, getVendor } from '@/lib/mockData';

export function generateStaticParams() {
  return equipment.map((e) => ({ id: e.slug }));
}
import {
  Star,
  Shield,
  Box,
  MapPin,
  Calendar,
  Truck,
  CreditCard,
  ArrowRight,
  Check,
  Clock,
  MessageCircle,
} from 'lucide-react';

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const item = equipment.find((e) => e.slug === params.id || e.id === params.id);
  if (!item) return notFound();
  const vendor = getVendor(item.vendorId);

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-ink-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Beranda</Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-amber-400">Katalog</Link>
          <span>/</span>
          <span className="text-ink-300">{item.name}</span>
        </div>

        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-10 lg:gap-16">
          {/* GALLERY */}
          <div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden card mb-3">
              <Image src={item.gallery[0]} alt={item.name} fill className="object-cover" priority sizes="60vw" />
              {item.has3d && (
                <button className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-400 text-ink-900 text-sm font-medium shadow-lg">
                  <Box className="w-4 h-4" />
                  Lihat 3D
                </button>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                {item.protection && (
                  <span className="pill">
                    <Shield className="w-3 h-3" /> Proteksi aktif
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {item.gallery.slice(0, 3).map((g, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden card cursor-pointer lift">
                  <Image src={g} alt="" fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          </div>

          {/* INFO + BOOK */}
          <div>
            <div className="eyebrow text-amber-400 mb-2">{item.brand}</div>
            <h1 className="headline text-4xl lg:text-5xl mb-4">{item.name}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-ink-300 mb-6">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white font-medium tabular">{item.rating}</span>
                <span className="text-ink-400">({item.reviewCount} ulasan)</span>
              </span>
              <span className="text-ink-700">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </span>
            </div>

            <p className="text-ink-300 leading-relaxed mb-8">{item.description}</p>

            {/* Price card */}
            <div className="card p-6 mb-6 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-400/10 blur-3xl rounded-full" />
              <div className="flex items-baseline justify-between mb-6 relative">
                <div>
                  <div className="font-display text-4xl text-amber-400 tabular">
                    {formatIDR(item.pricePerDay)}
                  </div>
                  <div className="eyebrow text-ink-400 mt-1">per hari</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-ink-400">Deposit</div>
                  <div className="text-sm tabular">{formatIDR(item.deposit)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 relative">
                <div>
                  <label className="eyebrow text-ink-400 block mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Mulai
                  </label>
                  <input type="date" className="field !py-2.5 text-sm" defaultValue="2026-05-28" />
                </div>
                <div>
                  <label className="eyebrow text-ink-400 block mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Selesai
                  </label>
                  <input type="date" className="field !py-2.5 text-sm" defaultValue="2026-05-30" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-5 relative">
                <button className="btn-ghost !py-2.5 justify-center text-xs">
                  <Truck className="w-3.5 h-3.5" /> Diantar
                </button>
                <button className="btn-ghost !py-2.5 justify-center text-xs border-amber-400/60 text-amber-400">
                  <MapPin className="w-3.5 h-3.5" /> Ambil sendiri
                </button>
              </div>

              <div className="space-y-2 text-sm py-4 border-t border-ink-700/40 mb-4 relative">
                <div className="flex justify-between">
                  <span className="text-ink-300">Subtotal sewa (2 hari)</span>
                  <span className="tabular">{formatIDR(item.pricePerDay * 2)}</span>
                </div>
                <div className="flex justify-between text-ink-400">
                  <span>Biaya layanan</span>
                  <span className="tabular">{formatIDR(50000)}</span>
                </div>
                <div className="flex justify-between text-amber-400/90">
                  <span>Proteksi FindStudio</span>
                  <span className="tabular">Aktif</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-5 relative">
                <span>Total bayar</span>
                <span className="font-display text-3xl text-amber-400 tabular">
                  {formatIDR(item.pricePerDay * 2 + 50000)}
                </span>
              </div>

              <div className="flex gap-2 relative">
                <Link href="/cart" className="btn-ghost flex-1 justify-center">
                  <span className="hidden sm:inline">+ Keranjang</span>
                  <span className="sm:hidden">+ Cart</span>
                </Link>
                <Link href="/checkout" className="btn-primary flex-[2] justify-center">
                  Sewa sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-400">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pembayaran via escrow, dana ditahan hingga alat dikembalikan</span>
              </div>
            </div>

            {/* Vendor card */}
            {vendor && (
              <div className="card p-5 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{vendor.name}</h3>
                    <span className="pill !text-[0.6rem] !py-0.5">
                      <Shield className="w-2.5 h-2.5" />
                      {vendor.verified}
                    </span>
                  </div>
                  <div className="text-xs text-ink-400 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Respon {vendor.responseTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="tabular">{vendor.rating}</span>
                    </span>
                  </div>
                </div>
                <Link href={`/messages?v=${vendor.id}`} className="btn-ghost !py-2 !px-3 text-xs">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SPECS + AVAILABILITY ----------------------------------------------- */}
        <div className="grid lg:grid-cols-12 gap-10 mt-20 lg:mt-28">
          <div className="lg:col-span-7">
            <div className="eyebrow text-amber-400 mb-3">Spesifikasi</div>
            <h2 className="headline text-4xl mb-8">Detail teknis</h2>
            <dl className="grid sm:grid-cols-2 gap-px bg-ink-700/40 rounded-2xl overflow-hidden">
              {item.specs.map((s, i) => (
                <div key={i} className="bg-ink-900 p-5">
                  <dt className="eyebrow text-ink-400 mb-1.5">{s.label}</dt>
                  <dd className="text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="font-display text-2xl mt-10 mb-4">Termasuk dalam paket</h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {['2× baterai original', 'Strap & tutup lensa', 'Memory CFexpress 80GB', 'Tas tahan air', 'Charger original', 'Buku petunjuk'].map((x) => (
                <li key={x} className="flex items-center gap-2 text-sm text-ink-200">
                  <Check className="w-4 h-4 text-amber-400" />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="eyebrow text-amber-400 mb-3">Ketersediaan</div>
            <h2 className="headline text-4xl mb-8">Mei - Juni 2026</h2>
            <CalendarMini bookedDates={item.bookedDates} />
            <div className="mt-4 flex items-center gap-4 text-xs text-ink-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> Tersedia
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-ink-700" /> Terbooking
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function CalendarMini({ bookedDates }: { bookedDates: string[] }) {
  const year = 2026;
  const month = 5; // June (0-indexed-style + 1)
  const monthName = new Date(year, month - 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <button className="text-ink-400 hover:text-amber-400 transition">‹</button>
        <div className="font-display capitalize">{monthName}</div>
        <button className="text-ink-400 hover:text-amber-400 transition">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => (
          <div key={i} className="text-center text-[0.65rem] text-ink-400 eyebrow">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const booked = bookedDates.includes(dateStr);
          return (
            <button
              key={i}
              disabled={booked}
              className={`aspect-square rounded text-xs tabular transition ${
                booked
                  ? 'bg-ink-700/40 text-ink-500 cursor-not-allowed'
                  : 'bg-amber-400/15 text-amber-300 hover:bg-amber-400 hover:text-ink-900'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
