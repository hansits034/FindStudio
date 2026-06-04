import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { studios, formatIDR, getVendor } from '@/lib/mockData';

export function generateStaticParams() {
  return studios.map((s) => ({ id: s.slug }));
}
import { Star, MapPin, Users, Square, Calendar, ArrowRight, MessageCircle, Wifi } from 'lucide-react';

export default function StudioDetailPage({ params }: { params: { id: string } }) {
  const s = studios.find((x) => x.slug === params.id || x.id === params.id);
  if (!s) return notFound();
  const v = getVendor(s.vendorId);

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-center gap-2 text-xs text-ink-400 mb-8">
          <Link href="/" className="hover:text-amber-400">Beranda</Link>
          <span>/</span>
          <Link href="/browse?cat=studio" className="hover:text-amber-400">Studio</Link>
          <span>/</span>
          <span className="text-ink-300">{s.name}</span>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-12 h-[480px]">
          <div className="col-span-4 lg:col-span-2 row-span-2 relative rounded-2xl overflow-hidden">
            <Image src={s.cover} alt={s.name} fill className="object-cover" priority sizes="50vw" />
          </div>
          {s.gallery.slice(0, 4).map((g, i) => (
            <div key={i} className="hidden lg:block relative rounded-2xl overflow-hidden">
              <Image src={g} alt="" fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-12">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="eyebrow text-amber-400 mb-2">Studio</div>
                <h1 className="headline text-4xl lg:text-5xl">{s.name}</h1>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium tabular">{s.rating}</span>
                </div>
                <div className="text-xs text-ink-400">{s.reviewCount} ulasan</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-ink-300 mb-8 mt-4">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{s.location}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{s.capacity} pax</span>
              <span className="flex items-center gap-1.5"><Square className="w-4 h-4" />{s.area}</span>
            </div>

            <h3 className="font-display text-2xl mb-4">Fasilitas</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-12">
              {s.amenities.map((a) => (
                <div key={a} className="card p-4 flex items-center gap-3 text-sm">
                  <Wifi className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.5} />
                  {a}
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl mb-4">Tentang Studio</h3>
            <p className="text-ink-300 leading-relaxed">
              Studio ini didesain untuk produksi sinematik dan komersial. Cyclorama mulus, ceiling
              4.5m, dan grip lengkap memungkinkan setup lighting kompleks. Akses loading dock,
              tempat parkir 4 mobil, dan ruang make-up tersedia di lokasi yang sama.
            </p>
          </div>

          <div>
            <div className="lg:sticky lg:top-28">
              <div className="card p-6 mb-4">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <div className="font-display text-3xl text-amber-400 tabular">
                      {formatIDR(s.pricePerHour)}
                    </div>
                    <div className="eyebrow text-ink-400">per jam</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-ink-400">Paket 1 hari</div>
                    <div className="text-sm tabular">{formatIDR(s.pricePerDay)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="eyebrow text-ink-400 block mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Tanggal
                    </label>
                    <input type="date" className="field !py-2.5 text-sm" defaultValue="2026-06-02" />
                  </div>
                  <div>
                    <label className="eyebrow text-ink-400 block mb-1.5">Durasi</label>
                    <select className="field !py-2.5 text-sm">
                      <option>4 jam</option>
                      <option>8 jam (full day)</option>
                      <option>2 hari</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  <input className="field !py-2.5 text-sm" placeholder="Mulai 09:00" />
                  <input className="field !py-2.5 text-sm" placeholder="Selesai 13:00" />
                </div>

                <Link href="/checkout" className="btn-primary w-full justify-center mb-2">
                  Booking sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/cart" className="btn-ghost w-full justify-center">+ Keranjang</Link>
              </div>

              {v && (
                <div className="card p-4 flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden">
                    <Image src={v.avatar} alt={v.name} fill className="object-cover" sizes="44px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{v.name}</div>
                    <div className="text-xs text-ink-400">Respon {v.responseTime}</div>
                  </div>
                  <button className="btn-ghost !py-2 !px-3 text-xs">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
