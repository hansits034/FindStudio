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
  Aperture,
  Plane,
  Lightbulb,
  Mic,
  Box,
  MapPin,
  Sparkles,
  Shield,
  Wallet,
  Clock,
  TrendingUp,
  MessageCircle,
  CalendarCheck,
  Hash,
  Users,
} from 'lucide-react';
import { equipment, studios, services } from '@/lib/mockData';

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
          <p className="font-display italic text-amber-400/40 text-2xl lg:text-3xl mb-8 lg:mb-12 animate-fade-in select-none">
            "One Platform for Every Creative"
          </p>
          <div className="flex items-center gap-3 mb-10 animate-fade-in">
            <span className="dot animate-shimmer" />
            <span className="eyebrow text-ink-300">
              Ekosistem kreator Surabaya, alat, studio & jasa profesional
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
                kamera, drone, lighting, studio, dan jasa profesional se-Surabaya dalam satu platform,
                lengkap dengan dana proteksi internal dan pembayaran escrow.
              </p>

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
            <div className="eyebrow text-amber-400 mb-3">01. Katalog</div>
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
          {[
            { icon: Camera,    title: 'Kamera',        desc: 'Mirrorless, cinema, hybrid.',  cat: 'camera'   },
            { icon: Aperture,  title: 'Lensa',         desc: 'Prime, zoom, cine set.',        cat: 'lens'     },
            { icon: Plane,     title: 'Drone',         desc: 'Mavic, Inspire, FPV custom.',  cat: 'drone'    },
            { icon: Lightbulb, title: 'Lighting',      desc: 'LED, strobe, RGB modifier.',   cat: 'lighting' },
            { icon: Mic,       title: 'Audio',         desc: 'Wireless mic, recorder, mixer.',cat: 'audio'   },
            { icon: Box,       title: 'Gimbal & Rig',  desc: 'Stabilizer, cage, heavy-duty.',cat: 'gimbal'   },
            { icon: MapPin,    title: 'Studio',        desc: 'Cyc, daylight, livestream.',   cat: 'studio'   },
            { icon: Sparkles,  title: 'Jasa Profesional', desc: 'Fotografer, videografer, editor.', cat: 'service' },
          ].map((c, i) => (
            <Link key={i} href={`/browse?cat=${c.cat}`} className="card p-5 lg:p-7 lift group relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-20 transition-opacity">
                <c.icon className="w-32 h-32 text-amber-400" strokeWidth={0.5} />
              </div>
              <c.icon className="w-6 h-6 text-amber-400 mb-6" strokeWidth={1.4} />
              <h3 className="font-display text-xl mb-1.5 group-hover:text-amber-400 transition leading-tight">{c.title}</h3>
              <p className="text-xs text-ink-300 mb-5 leading-relaxed">{c.desc}</p>
              <div className="flex items-center justify-between border-t border-ink-700/40 pt-3.5">
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
            <div className="eyebrow text-amber-400 mb-3">02. Sedang tren</div>
            <h2 className="headline text-5xl lg:text-7xl">
              Yang sedang
              <br />
              <span className="italic text-amber-400 font-light">paling diminati.</span>
            </h2>
            <p className="text-ink-300 mt-4 max-w-lg">Dari kamera, studio, sampai jasa, lintas kategori, semua di Surabaya.</p>
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
              <div className="eyebrow text-amber-400 mb-3">03. Dana proteksi internal</div>
              <h2 className="headline text-5xl lg:text-7xl mb-6">
                Sewa tenang.
                <br />
                <span className="italic text-amber-400 font-light">Tanpa cemas.</span>
              </h2>

              {/* Proteksi Alat */}
              <div className="card !bg-amber-400/5 !border-amber-400/40 p-4 mb-6 flex items-start gap-3 max-w-xl">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-ink-200 leading-relaxed">
                  <strong className="text-amber-400">Proteksi melekat di alat, bukan di kamu.</strong>{' '}
                  Alat bertanda <span className="pill !text-[0.65rem] !py-0.5 !px-2 inline align-middle"><Shield className="w-3 h-3 inline -mt-0.5" /> Proteksi</span>{' '}
                  sudah dilindungi Dana Proteksi FindStudio karena vendornya sendiri yang
                  mengaktifkannya. Kamu cukup bayar harga sewa + biaya layanan, tidak ada opsi
                  tambahan dan tidak ada biaya tersembunyi di checkout.
                </p>
              </div>

              <p className="text-lg text-ink-300 max-w-xl mb-4 leading-relaxed">
                Jika alat bertanda Proteksi mengalami kerusakan selama masa sewa, vendor mengajukan
                klaim di dashboard, upload foto kondisi alat sebelum & sesudah. Tim FindStudio
                memverifikasi dan memastikan biaya perbaikan ditanggung dalam kurang dari 4 jam,
                maksimal senilai harga alat yang terdaftar, tanpa drama, tanpa saling lempar tanggung
                jawab.
              </p>

              <p className="text-xs text-ink-400/60 italic max-w-xl mb-8 leading-relaxed">
                Proteksi FindStudio adalah program proteksi alat internal platform, bukan merupakan
                produk asuransi dari lembaga keuangan.
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
                    <div className="eyebrow text-amber-400">Contoh checkout</div>
                    <div className="font-display text-2xl mt-1">Sony A7 IV, 1 hari sewa</div>
                  </div>
                  <span className="pill"><Shield className="w-3 h-3" /> Proteksi aktif</span>
                </div>
                <div className="space-y-3 text-sm relative">
                  <Row label="Harga sewa per hari" value="Rp 500.000" />
                  <Row label="Biaya layanan platform" value="Rp 25.000" muted />
                  <div className="divider my-2" />
                  <Row label="Total yang dibayar klien" value="Rp 525.000" bold />
                  <Row label="Vendor menerima" value="Rp 475.000" bold accent />
                </div>
                <div className="mt-6 pt-6 border-t border-ink-700/40 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-amber-400 shrink-0" strokeWidth={1.5} />
                  <p className="text-xs text-ink-300 leading-relaxed">
                    Alat ini bertanda Proteksi, jika rusak saat disewa, vendor tekan{' '}
                    <span className="text-amber-400">Klaim Proteksi</span>, biaya perbaikan
                    ditanggung platform tanpa dispute.
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
            <div className="eyebrow text-amber-400 mb-3">04. Cara kerja</div>
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
            { n: '01', title: 'Cari & saring', desc: 'Pencarian bahasa biasa: lokasi, harga, jenis layanan, rating, langsung dibedah.' },
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
              <div className="eyebrow text-amber-400 mb-3">05. Pencarian cerdas</div>
              <h2 className="headline text-5xl lg:text-6xl mb-6">
                Ketik niat,
                <br />
                <span className="italic text-amber-400 font-light">bukan kata kunci.</span>
              </h2>
              <p className="text-ink-300 leading-relaxed mb-6">
                Jelaskan kebutuhan Anda dengan bahasa biasa, sistem membedah kalimat menjadi
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
                  <span className="eyebrow text-amber-400">Coba sekarang, langsung jalan</span>
                </div>
                <SmartSearch variant="hero" placeholder="Tulis kebutuhanmu, mis. 'lighting LED untuk wedding di Manyar rating 4.5'…" />
                <p className="text-xs text-ink-400 mt-4 leading-relaxed">
                  Catatan jujur: ini parser berbasis aturan (rule-based), belum model NLP penuh,
                  tapi sudah bisa mengenali lokasi, harga, jenis layanan, dan rating dari kalimatmu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AFFILIATE (06) ------------------------------------------------------ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow text-amber-400 mb-3">06. Program Afiliasi</div>
          <h2 className="headline text-5xl lg:text-7xl mb-6">
            Bagikan kode,
            <br />
            <span className="italic text-amber-400 font-light">dapat reward.</span>
          </h2>
          <p className="text-lg text-ink-300 max-w-xl mx-auto mb-12 leading-relaxed">
            Daftar sebagai afiliasi, bagikan kode unikmu ke siapapun, kreator, teman, atau followers.
            Setiap booking yang terjadi lewat kodemu memberikan reward langsung ke wallet-mu.
          </p>

          <div className="card p-8 lg:p-10 relative overflow-hidden max-w-sm mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent" />
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-400/10 blur-3xl rounded-full" />
            <div className="eyebrow text-ink-400 mb-3 relative">Kode afiliasimu</div>
            <div className="font-mono text-5xl lg:text-6xl text-amber-400 tracking-[0.18em] mb-4 relative select-all">
              FSRP123
            </div>
            <div className="text-xs text-ink-400 relative">
              Kode unik, tiap pengguna baru yang pakai kodemu langsung terhubung denganmu
            </div>
          </div>

          <Link href="/register" className="btn-primary">
            Daftar & Dapatkan Kodemu
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* DISCORD COMMUNITY (08) ---------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        <div className="card p-10 lg:p-14 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(88,101,242,0.07) 0%, transparent 55%)' }}>
          <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full blur-[100px]" style={{ background: 'rgba(88,101,242,0.07)' }} />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-400/5 rounded-full blur-[100px]" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Kiri — copy + CTA */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: '#5865F2' }}>
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.037.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-display text-xl leading-tight">FindStudio Community</div>
                  <div className="eyebrow text-ink-400 mt-0.5">Server Discord resmi · Gratis</div>
                </div>
              </div>

              <div className="eyebrow text-amber-400 mb-3">07. Komunitas</div>
              <h2 className="headline text-4xl lg:text-6xl mb-5">
                Jangan berkarya
                <br />
                <span className="italic text-amber-400 font-light">sendirian.</span>
              </h2>
              <p className="text-ink-300 leading-relaxed mb-8 max-w-lg">
                Discord FindStudio adalah tempat kreator dan vendor Surabaya terhubung nyata:
                berbagi tips shoot, cari tim kolaborasi, dapat info promo eksklusif, dan diskusi
                bisnis bersama. Komunitas yang aktif, bukan sekadar grup kosong.
              </p>

              <div className="space-y-2.5 mb-8">
                {[
                  { ch: '#lounge-kreator', desc: 'Ngobrol bebas, share hasil karya, minta feedback' },
                  { ch: '#cari-tim-shoot', desc: 'Cari DP, kameraman, editor, MUA untuk kolaborasi' },
                  { ch: '#info-promo',     desc: 'Notifikasi diskon, kode promo & alat baru dari vendor' },
                  { ch: '#vendor-lounge',  desc: 'Khusus vendor: tips listing, pricing & cerita sukses' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <Hash className="w-3.5 h-3.5 text-ink-500 shrink-0" />
                    <span className="font-mono text-sm" style={{ color: '#8b91b8' }}>{c.ch}</span>
                    <span className="text-ink-400 hidden sm:inline text-xs">- {c.desc}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://discord.gg/findstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-full font-medium text-sm text-white transition hover:opacity-90 active:scale-95"
                  style={{ background: '#5865F2' }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.037.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Gabung Discord Sekarang
                </a>
                <span className="text-sm text-ink-400">Gratis · Langsung aktif</span>
              </div>
            </div>

            {/* Kanan — stats + simulasi chat */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: '1.2K+', l: 'Member aktif' },
                  { k: '340+', l: 'Vendor join' },
                  { k: '24/7', l: 'Selalu ramai' },
                ].map((s, i) => (
                  <div key={i} className="card p-4 text-center">
                    <div className="font-display text-2xl text-amber-400 tabular">{s.k}</div>
                    <div className="text-xs text-ink-400 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Simulasi Discord chat */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-shimmer" />
                  <span className="eyebrow text-emerald-400 text-[0.65rem]">Live di #lounge-kreator</span>
                </div>
                <div className="space-y-3.5">
                  {[
                    { user: 'dimas_shoot',  color: '#f9b17a', msg: 'Ada yang punya gimbal RS3 untuk disewa weekend ini? 🙏' },
                    { user: 'rina.creative', color: '#a78bfa', msg: 'Coba pake kode FSRP123 kak, diskon 15% booking pertama 🎉' },
                    { user: 'vendor_lumen', color: '#34d399', msg: 'Aputure 600X Pro baru tersedia! Cek di FindStudio ✨' },
                    { user: 'dimas_shoot',  color: '#f9b17a', msg: 'Mantap! Langsung booking sekarang 🔥' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold shrink-0 text-ink-900"
                        style={{ background: m.color }}
                      >
                        {m.user[0].toUpperCase()}
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-medium" style={{ color: m.color }}>{m.user}</span>
                        <p className="text-xs text-ink-300 mt-0.5 leading-snug">{m.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-sm font-medium">Tersedia untuk kreator &amp; vendor</div>
                  <div className="text-xs text-ink-400">Dua channel terpisah berdasarkan peranmu di platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA ----------------------------------------------------------------- */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-24">
        <div className="grid md:grid-cols-2 gap-5">

          {/* Vendor CTA */}
          <div className="card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-72 h-72 bg-ink-500/20 blur-[80px] rounded-full" />
            <div className="relative">
              <div className="eyebrow text-ink-400 mb-3">Untuk Vendor & Provider</div>
              <h2 className="headline text-4xl lg:text-5xl mb-4">
                Ubah Aset Nganggur
                <br />
                <span className="italic font-light" style={{ color: '#8b91b8' }}>Jadi Passive Income.</span>
              </h2>
              <p className="text-ink-300 text-sm leading-relaxed mb-8 max-w-sm">
                Daftarkan studio, alat, dan jasamu. Jangkau ribuan kreator dengan sistem
                transaksi yang dijamin aman. Mulai bermitra dengan FindStudio!
              </p>
              <Link
                href="/register?role=vendor"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full border text-sm transition hover:border-amber-400/60 hover:text-amber-400"
                style={{ borderColor: '#676f9d', color: '#8b91b8' }}
              >
                Daftarkan Asetmu
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Creator CTA */}
          <div className="card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-72 h-72 bg-amber-400/10 blur-[80px] rounded-full" />
            <div className="relative">
              <div className="eyebrow text-amber-400 mb-3">Untuk Kreator & Content Creator</div>
              <h2 className="headline text-4xl lg:text-5xl mb-4">
                Gak Harus Punya
                <br />
                <span className="italic text-amber-400 font-light">Alat Mahal.</span>
              </h2>
              <p className="text-ink-300 text-sm leading-relaxed mb-8 max-w-sm">
                Sewa kamera, booking studio, sampai cari editor, semuanya bisa dalam satu
                platform. Wujudkan idemu bersama FindStudio!
              </p>
              <Link href="/register?role=client" className="btn-primary text-sm">
                Mulai Berkarya
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
        <div className="text-center mt-5">
          <Link href="/browse" className="text-sm text-ink-400 hover:text-amber-400 transition">
            atau jelajahi tanpa daftar →
          </Link>
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
