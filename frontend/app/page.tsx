import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EquipmentCard from '@/components/EquipmentCard';
import StudioCard from '@/components/StudioCard';
import ServiceCard from '@/components/ServiceCard';
import SmartSearch from '@/components/SmartSearch';
import {
  ArrowUpRight,
  Camera,
  Sparkles,
  Shield,
  Wallet,
  Clock,
  Star,
  Box,
  TrendingUp,
  MapPin,
  MessageCircle,
  CalendarCheck,
} from 'lucide-react';
import { equipment, vendors, studios, services } from '@/lib/mockData';

export default function HomePage() {
  // Trending = campuran lintas kategori, bukan kamera saja
  const trendingEquipment = [equipment[0], equipment[12], equipment[16]]; // kamera, drone, lighting
  const trendingStudio = studios[0];
  const trendingService = services[0];

  return (
    <>
      <Navbar />

      {/* HERO ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden mesh">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-20 lg:pb-28 relative">
          <div className="flex items-center gap-3 mb-10 animate-fade-in">
            <span className="dot animate-shimmer" />
            <span className="eyebrow text-ink-300">
              Ekosistem kreator Surabaya — alat, studio & jasa profesional
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7 animate-fade-up">
              <h1 className="headline text-[clamp(3.5rem,9vw,9.5rem)] mb-8">
                Sewa alat,
                <br />
                <span className="italic text-amber-400 font-light">pesan studio,</span>
                <br />
                ciptakan
                <span className="relative inline-block ml-4">
                  <span className="relative z-10">cerita.</span>
                  <span className="absolute inset-x-0 bottom-2 h-3 bg-amber-400/40 -z-0" />
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-ink-300 max-w-xl mb-8 leading-relaxed">
                <strong className="text-white font-medium">FindStudio</strong> menyatukan rental
                kamera, drone, lighting, studio, dan jasa profesional se-Surabaya dalam satu platform —
                lengkap dengan dana proteksi internal dan pembayaran escrow.
              </p>

              {/* Smart search — bisa bahasa biasa */}
              <div className="max-w-xl mb-6">
                <SmartSearch variant="hero" />
              </div>

              <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
                {[
                  { k: '2.4K+', l: 'Alat terdaftar' },
                  { k: '180+', l: 'Vendor terverifikasi' },
                  { k: '99.2%', l: 'Tingkat kembali aman' },
                ].map((s, i) => (
                  <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                    <div className="font-display text-3xl text-amber-400 tabular">{s.k}</div>
                    <div className="text-xs text-ink-400 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image collage */}
            <div className="lg:col-span-5 relative h-[520px] lg:h-[600px] animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute top-0 right-0 w-[78%] h-[58%] rounded-2xl overflow-hidden glow">
                <Image
                  src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80"
                  alt="cinematographer"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              <div className="absolute bottom-0 left-0 w-[62%] h-[50%] rounded-2xl overflow-hidden glow">
                <Image
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80"
                  alt="camera"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              <div className="absolute top-[34%] left-[8%] card p-4 max-w-[200px] backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-shimmer" />
                  <span className="eyebrow text-emerald-400">Live booking</span>
                </div>
                <div className="text-sm leading-snug">
                  <span className="font-medium">Sony A7 IV</span> baru saja disewa kreator di Gubeng, Surabaya.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* brand marquee */}
        <div className="border-t border-ink-700/40">
          <div className="overflow-hidden marquee-mask">
            <div className="flex gap-12 animate-marquee py-5 whitespace-nowrap text-ink-400/70 text-sm uppercase tracking-widest">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-12">
                  <span>Sony</span><span>•</span><span>Canon</span><span>•</span><span>DJI</span><span>•</span>
                  <span>Aputure</span><span>•</span><span>Rode</span><span>•</span><span>Blackmagic</span><span>•</span>
                  <span>Profoto</span><span>•</span><span>Godox</span><span>•</span><span>Zhiyun</span><span>•</span>
                  <span>Nikon</span><span>•</span><span>Fujifilm</span><span>•</span><span>RED</span><span>•</span><span>ARRI</span><span>•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES (01) ----------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex items-end justify-between mb-12 lg:mb-16 gap-8">
          <div>
            <div className="eyebrow text-amber-400 mb-3">01 — Katalog</div>
            <h2 className="headline text-5xl lg:text-7xl max-w-2xl">
              Semua yang Anda butuhkan,
              <span className="italic text-amber-400 font-light"> satu rute.</span>
            </h2>
          </div>
          <Link href="/browse" className="hidden md:inline-flex btn-ghost text-sm">
            Lihat semua kategori
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {[
            { icon: Camera, title: 'Kamera & Lensa', desc: 'Mirrorless, cinema, prime lens.', cat: 'camera' },
            { icon: Sparkles, title: 'Drone & Aerial', desc: 'Mavic, Inspire, FPV custom.', cat: 'drone' },
            { icon: Box, title: 'Lighting & Grip', desc: 'LED, strobe, modifier, RGB.', cat: 'lighting' },
            { icon: MapPin, title: 'Studio & Ruang', desc: 'Cyc, daylight, livestream.', cat: 'studio' },
          ].map((c, i) => (
            <Link key={i} href={`/browse?cat=${c.cat}`} className="card p-6 lg:p-8 lift group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <c.icon className="w-40 h-40 text-amber-400" strokeWidth={0.5} />
              </div>
              <c.icon className="w-7 h-7 text-amber-400 mb-8" strokeWidth={1.4} />
              <h3 className="font-display text-2xl mb-2 group-hover:text-amber-400 transition">{c.title}</h3>
              <p className="text-sm text-ink-300 mb-6">{c.desc}</p>
              <div className="flex items-center justify-between border-t border-ink-700/40 pt-4">
                <span className="text-xs text-ink-400">Surabaya</span>
                <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING (02) — campuran semua kategori ----------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 lg:py-12">
        <div className="flex items-end justify-between mb-12 gap-8">
          <div>
            <div className="eyebrow text-amber-400 mb-3">02 — Sedang tren</div>
            <h2 className="headline text-5xl lg:text-7xl">
              Yang sedang
              <br />
              <span className="italic text-amber-400 font-light">paling diminati.</span>
            </h2>
            <p className="text-ink-300 mt-4 max-w-lg">Dari kamera, studio, sampai jasa — lintas kategori, semua di Surabaya.</p>
          </div>
          <Link href="/browse" className="hidden md:inline-flex btn-ghost text-sm">
            Lihat semua
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingEquipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
          <StudioCard item={trendingStudio} />
          <ServiceCard item={trendingService} />
          {[equipment[7], equipment[21]].map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* PROTECTION FUND (03) ------------------------------------------------ */}
      <section className="relative overflow-hidden mt-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="eyebrow text-amber-400 mb-3">03 — Dana proteksi internal</div>
              <h2 className="headline text-5xl lg:text-7xl mb-6">
                Sewa tenang.
                <br />
                <span className="italic text-amber-400 font-light">Tanpa cemas.</span>
              </h2>

              {/* Penegasan: bukan asuransi */}
              <div className="card !bg-amber-400/5 !border-amber-400/30 p-4 mb-6 flex items-start gap-3 max-w-xl">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-ink-200 leading-relaxed">
                  <strong className="text-amber-400">Ini bukan asuransi.</strong> FindStudio mengelola
                  sendiri <em>Platform Protection Fund</em> — dana cadangan internal, bukan produk asuransi
                  pihak ketiga dan tidak terikat regulasi asuransi.
                </p>
              </div>

              <p className="text-lg text-ink-300 max-w-xl mb-8 leading-relaxed">
                10% dari nilai sewa masuk ke dana cadangan. Jika ada kerusakan, vendor mengajukan klaim
                dan biaya perbaikan dicairkan langsung dari dana — tanpa pihak ketiga, tanpa drama.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { k: '< 4 jam', l: 'Rata-rata pencairan klaim', icon: Clock },
                  { k: '99.2%', l: 'Alat kembali tanpa klaim', icon: Shield },
                  { k: '100%', l: 'Dikelola internal', icon: Wallet },
                  { k: 'Realtime', l: 'Tracking status klaim', icon: TrendingUp },
                ].map((s, i) => (
                  <div key={i} className="card p-5">
                    <s.icon className="w-5 h-5 text-amber-400 mb-3" strokeWidth={1.5} />
                    <div className="font-display text-2xl mb-1">{s.k}</div>
                    <div className="text-xs text-ink-400">{s.l}</div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-ghost text-sm">
                Pelajari cara kerjanya
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Payout breakdown */}
            <div className="lg:col-span-6 lg:pl-8">
              <div className="card p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 blur-3xl rounded-full" />
                <div className="flex items-center justify-between mb-6 relative">
                  <div>
                    <div className="eyebrow text-amber-400">Contoh pencairan</div>
                    <div className="font-display text-2xl mt-1">Sony A7 IV — 1 hari sewa</div>
                  </div>
                  <span className="pill">Aktif</span>
                </div>
                <div className="space-y-3 text-sm relative">
                  <Row label="Harga sewa per hari" value="Rp 500.000" />
                  <Row label="Biaya layanan platform" value="Rp 10.000" muted />
                  <Row label="Dana proteksi (10%)" value="− Rp 50.000" highlight />
                  <div className="divider my-2" />
                  <Row label="Klien membayar" value="Rp 510.000" bold />
                  <Row label="Dicairkan ke wallet vendor" value="Rp 450.000" bold accent />
                  <Row label="Masuk ke Protection Fund" value="Rp 50.000" muted />
                </div>
                <div className="mt-6 pt-6 border-t border-ink-700/40 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-amber-400 shrink-0" strokeWidth={1.5} />
                  <p className="text-xs text-ink-300 leading-relaxed">
                    Jika alat rusak, vendor menekan <span className="text-amber-400">Klaim Proteksi</span> di
                    dashboard — dana perbaikan dicairkan hingga senilai harga alat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW (04) — ringkas + link ke /about ---------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex items-end justify-between mb-16 gap-8">
          <div>
            <div className="eyebrow text-amber-400 mb-3">04 — Cara kerja</div>
            <h2 className="headline text-5xl lg:text-7xl max-w-3xl">
              Empat langkah, satu
              <span className="italic text-amber-400 font-light"> ekosistem.</span>
            </h2>
          </div>
          <Link href="/about" className="hidden md:inline-flex btn-ghost text-sm">
            Apa itu FindStudio?
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-700/40 rounded-2xl overflow-hidden">
          {[
            { n: '01', title: 'Cari & saring', desc: 'Pencarian bahasa biasa: lokasi, harga, jenis layanan, rating — langsung dibedah.' },
            { n: '02', title: 'Pesan & jadwalkan', desc: 'Kalender real-time, deteksi konflik double-booking, chat langsung dengan vendor.' },
            { n: '03', title: 'Bayar via escrow', desc: 'Dana ditahan platform hingga alat dikembalikan / jasa selesai.' },
            { n: '04', title: 'Review dua arah', desc: 'Vendor & klien saling menilai. Reputasi terbangun tiap transaksi.' },
          ].map((step, i) => (
            <div key={i} className="bg-ink-900 p-8 lg:p-10 relative group hover:bg-ink-800/50 transition">
              <div className="font-display text-7xl text-amber-400/30 group-hover:text-amber-400/60 transition mb-6 leading-none">{step.n}</div>
              <h3 className="font-display text-2xl mb-3">{step.title}</h3>
              <p className="text-sm text-ink-300 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SMART SEARCH / CHATBOT (05) ----------------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="eyebrow text-amber-400 mb-3">05 — Pencarian cerdas</div>
              <h2 className="headline text-5xl lg:text-6xl mb-6">
                Ketik niat,
                <br />
                <span className="italic text-amber-400 font-light">bukan kata kunci.</span>
              </h2>
              <p className="text-ink-300 leading-relaxed mb-6">
                Jelaskan kebutuhan Anda dengan bahasa biasa — sistem membedah kalimat menjadi
                kategori, lokasi, budget, dan rating, lalu menyaring katalog Surabaya secara otomatis.
              </p>
              <ul className="space-y-2 text-sm text-ink-300">
                <li className="flex items-center gap-2"><span className="dot" /> "kamera mirrorless di Gubeng di bawah 600rb"</li>
                <li className="flex items-center gap-2"><span className="dot" /> "studio cyclorama rating 4.8 terdekat"</li>
                <li className="flex items-center gap-2"><span className="dot" /> "jasa color grading budget 3 juta"</li>
              </ul>
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <div className="card p-6 lg:p-8 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-shimmer" />
                  <span className="eyebrow text-amber-400">Coba sekarang — langsung jalan</span>
                </div>
                <SmartSearch variant="hero" placeholder="Tulis kebutuhanmu, mis. 'lighting LED untuk wedding di Manyar rating 4.5'…" />
                <p className="text-xs text-ink-400 mt-4 leading-relaxed">
                  Catatan jujur: ini parser berbasis aturan (rule-based), belum model NLP penuh —
                  tapi sudah bisa mengenali lokasi, harga, jenis layanan, dan rating dari kalimatmu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENDORS (06) -------------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex items-end justify-between mb-10 gap-8">
          <div>
            <div className="eyebrow text-amber-400 mb-3">06 — Vendor terverifikasi</div>
            <h2 className="headline text-5xl lg:text-7xl">
              Bertemu para
              <br />
              <span className="italic text-amber-400 font-light">pemilik alat Surabaya.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {vendors.slice(0, 4).map((v) => (
            <div key={v.id} className="card overflow-hidden lift group">
              <div className="aspect-[5/3] relative overflow-hidden">
                <Image src={v.cover} alt={v.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
              </div>
              <div className="p-5 -mt-10 relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-ink-900 mb-3 relative">
                  <Image src={v.avatar} alt={v.name} fill className="object-cover" sizes="56px" />
                </div>
                <h3 className="font-display text-lg leading-tight">{v.name}</h3>
                <div className="text-xs text-ink-400 mt-1 mb-3">{v.tagline}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-400" /><span className="text-ink-300">{v.location}</span></span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /><span className="tabular">{v.rating}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA ----------------------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-24">
        <div className="card p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-400/10 blur-[100px] rounded-full" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-ink-500/20 blur-[100px] rounded-full" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow text-amber-400 mb-3">Siap memulai?</div>
              <h2 className="headline text-5xl lg:text-7xl mb-4">
                Mulai shoot
                <br />
                <span className="italic text-amber-400 font-light">malam ini.</span>
              </h2>
              <p className="text-ink-300 max-w-md">
                Daftar gratis. Browse ribuan alat di Surabaya. Booking dalam hitungan menit —
                tanpa komitmen bulanan, tanpa biaya tersembunyi.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/register?role=client" className="btn-primary justify-center text-base">
                Buat akun kreator
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register?role=vendor"
                className="justify-center text-base inline-flex items-center gap-2 py-3.5 px-6 rounded-full border"
                style={{ borderColor: '#676f9d', color: '#8b91b8' }}
              >
                Daftarkan alat (vendor)
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/browse" className="text-sm text-center text-ink-300 hover:text-amber-400 transition mt-2">
                atau jelajahi tanpa daftar →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Row({ label, value, muted, bold, accent, highlight }: { label: string; value: string; muted?: boolean; bold?: boolean; accent?: boolean; highlight?: boolean; }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`${muted ? 'text-ink-400' : 'text-ink-200'} ${bold ? 'font-medium' : ''}`}>{label}</span>
      <span className={`tabular ${accent ? 'text-amber-400' : ''} ${highlight ? 'text-amber-400' : ''} ${bold ? 'font-display text-lg' : 'text-sm'} ${muted ? 'text-ink-400' : ''}`}>{value}</span>
    </div>
  );
}
