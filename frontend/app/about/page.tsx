import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowUpRight, Shield, Users, Store, ShieldCheck, Search, CalendarCheck,
  MessageCircle, Camera, Box, Sparkles, Hash,
} from 'lucide-react';

export const metadata = {
  title: 'Tentang FindStudio — Ekosistem Kreator Surabaya',
  description: 'Apa itu FindStudio: platform terpadu sewa alat, studio, dan jasa profesional untuk kreator di Surabaya.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden mesh">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-20">
          <div className="eyebrow text-amber-400 mb-4">Tentang FindStudio</div>
          <blockquote className="flex items-center gap-3 mb-6">
            <span className="w-1 h-7 bg-amber-400/70 rounded-full shrink-0" />
            <span className="font-display italic text-amber-400 text-xl lg:text-2xl">
              "One Platform for Every Creative"
            </span>
          </blockquote>
          <h1 className="headline text-5xl lg:text-8xl mb-8">
            Satu platform untuk
            <br />
            <span className="italic text-amber-400 font-light">seluruh produksi Anda.</span>
          </h1>
          <p className="text-lg lg:text-2xl text-ink-300 max-w-3xl leading-relaxed">
            FindStudio adalah ekosistem terpadu bagi kreator konten, fotografer, videografer, dan
            sinematografer di <strong className="text-white">Surabaya</strong>. Sewa kamera, lensa,
            drone, dan lighting; pesan studio untuk produksi atau livestream; dan pakai jasa
            profesional seperti editor dan colorist — semuanya di satu tempat.
          </p>
        </div>
      </section>

      {/* MISI / MASALAH */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="eyebrow text-amber-400 mb-3">Kenapa ada</div>
            <h2 className="headline text-4xl lg:text-5xl mb-6">Ekosistem yang sebelumnya terpisah-pisah.</h2>
          </div>
          <div className="space-y-5 text-ink-300 leading-relaxed">
            <p>
              Selama ini kreator harus menghubungi banyak rental berbeda untuk satu shoot: satu tempat
              untuk kamera, tempat lain untuk lighting, lalu mencari studio dan editor secara terpisah.
              Prosesnya lambat, harga tidak transparan, dan kepercayaan sulit dibangun.
            </p>
            <p>
              FindStudio menyatukan semuanya dalam satu platform. Kami tidak sekadar menambah listing —
              kami memperkuat <strong className="text-white">kepercayaan</strong> antara penyewa dan
              penyedia lewat verifikasi, escrow, dan dana proteksi internal, agar ekosistemnya aktif dan
              mudah diakses.
            </p>
          </div>
        </div>
      </section>

      {/* TIGA PERAN */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-12">
        <div className="eyebrow text-amber-400 mb-3">Tiga peran</div>
        <h2 className="headline text-4xl lg:text-5xl mb-10">Dibuat untuk semua sisi.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Camera, color: '#f9b17a', title: 'Klien / Kreator', desc: 'Cari & sewa alat, pesan studio, dan gunakan jasa profesional. Booking multi-vendor dalam satu checkout.' },
            { icon: Store, color: '#676f9d', title: 'Vendor / Penyedia', desc: 'Daftarkan alat, studio, atau jasa. Kelola inventaris, harga dinamis, wallet & payout, lewat dashboard analitik.' },
            { icon: ShieldCheck, color: '#f9b17a', title: 'Admin', desc: 'Pantau kesehatan ekosistem: verifikasi KYC, transaksi, dana proteksi, dan deteksi fraud.' },
          ].map((r, i) => (
            <div key={i} className="card p-6">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `${r.color}22`, color: r.color }}>
                <r.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl mb-2">{r.title}</h3>
              <p className="text-sm text-ink-300 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 card !bg-ink-500/5 !border-ink-500/30 p-4 flex items-center gap-3 text-sm text-ink-300">
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#8b91b8' }} />
          <span>
            Petunjuk warna: aksen <span style={{ color: '#f9b17a' }}>amber</span> menandai pengalaman
            <span style={{ color: '#f9b17a' }}> kreator/klien</span>, sedangkan
            <span style={{ color: '#8b91b8' }}> indigo</span> menandai area
            <span style={{ color: '#8b91b8' }}> vendor</span>.
          </span>
        </div>
      </section>

      {/* FITUR INTI */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-24">
        <div className="eyebrow text-amber-400 mb-3">Fitur inti</div>
        <h2 className="headline text-4xl lg:text-5xl mb-10">Yang membuatnya berjalan.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Search, title: 'Pencarian cerdas', desc: 'Ketik kebutuhan dengan bahasa biasa — sistem membedah lokasi, harga, jenis layanan, dan rating.' },
            { icon: CalendarCheck, title: 'Booking & kalender', desc: 'Ketersediaan real-time lintas vendor dengan deteksi konflik double-booking.' },
            { icon: Box, title: 'Checkout multi-vendor', desc: 'Sewa kamera dari Vendor A dan studio dari Vendor B dalam satu transaksi.' },
            { icon: Shield, title: 'Pembayaran escrow', desc: 'Dana ditahan platform sampai alat dikembalikan / jasa selesai — aman dua arah.' },
            { icon: MessageCircle, title: 'Chat real-time', desc: 'Diskusi teknis & negosiasi langsung antara klien dan vendor di dalam platform.' },
          ].map((f, i) => (
            <div key={i} className="card p-6 lift">
              <f.icon className="w-6 h-6 text-amber-400 mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-ink-300 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROTECTION FUND DETAIL */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="eyebrow text-amber-400 mb-3">Proteksi Alat</div>
              <h2 className="headline text-4xl lg:text-5xl mb-6">
                Sewa tenang,
                <br />
                <span className="italic text-amber-400 font-light">alat terlindungi.</span>
              </h2>
              <div className="card !bg-amber-400/5 !border-amber-400/40 p-4 mb-6 flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-ink-200 leading-relaxed">
                  <strong className="text-amber-400">Biaya kecil, perlindungan besar.</strong>{' '}
                  Tambahkan Proteksi Alat di halaman checkout — hanya 5% dari nilai sewa. Jika
                  alat rusak selama masa sewa, biaya perbaikan ditanggung. Tidak perlu negosiasi,
                  tidak perlu ribut.
                </p>
              </div>
              <p className="text-ink-300 leading-relaxed mb-4">
                Saat klien menyewa, mereka bisa memilih{' '}
                <em>&ldquo;Tambahkan Proteksi Alat&rdquo;</em> di halaman checkout — biaya 5% dari
                nilai sewa ditambahkan ke total pembayaran. Jika terjadi kerusakan selama masa
                penyewaan, vendor mengajukan klaim di dashboard FindStudio, upload foto kondisi alat.
                Tim kami memverifikasi dan memastikan biaya perbaikan ditanggung dalam waktu kurang
                dari 4 jam, maksimal senilai harga alat saat didaftarkan.
              </p>
              <p className="text-xs text-ink-400/60 italic leading-relaxed">
                Proteksi FindStudio adalah program proteksi alat berbasis mitra layanan internal
                platform, bukan merupakan produk asuransi dari lembaga keuangan.
              </p>
            </div>

            <div className="card p-6 lg:p-8">
              <div className="eyebrow text-amber-400 mb-4">Alur Proteksi Alat</div>
              <ol className="space-y-4">
                {[
                  { t: 'Checkout', d: 'Klien pilih "Tambahkan Proteksi Alat" — 5% dari nilai sewa ditambahkan ke total.' },
                  { t: 'Sewa berjalan', d: 'Alat disewa normal. Klien dan vendor bebas transaksi tanpa khawatir.' },
                  { t: 'Klaim (jika rusak)', d: 'Vendor tekan Klaim di dashboard → upload foto kondisi alat sebelum & sesudah.' },
                  { t: 'Verifikasi & Selesai', d: 'Tim FindStudio memverifikasi dan menanggung biaya perbaikan < 4 jam.' },
                ].map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="font-display text-2xl text-amber-400/50 tabular leading-none w-8 shrink-0">{i + 1}</div>
                    <div>
                      <div className="font-medium">{s.t}</div>
                      <div className="text-sm text-ink-300">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* DISCORD COMMUNITY */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-12 pb-0">
        <div
          className="card p-10 lg:p-14 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(88,101,242,0.08) 0%, transparent 55%)' }}
        >
          <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full blur-[80px]" style={{ background: 'rgba(88,101,242,0.08)' }} />
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-amber-400/5 rounded-full blur-[80px]" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Kiri */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#5865F2' }}>
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.037.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-display text-lg leading-tight">FindStudio Community</div>
                  <div className="eyebrow text-ink-400 mt-0.5">Discord · Gratis · Selalu aktif</div>
                </div>
              </div>

              <h2 className="headline text-4xl lg:text-5xl mb-4">
                Jangan berkarya
                <br />
                <span className="italic text-amber-400 font-light">sendirian.</span>
              </h2>
              <p className="text-ink-300 leading-relaxed mb-6 text-sm lg:text-base">
                Discord FindStudio bukan sekadar grup — ini ekosistem hidup tempat kreator dan
                vendor Surabaya terhubung nyata. Berbagi tips shoot, cari tim kolaborasi, dapat
                info promo eksklusif, dan diskusi bisnis bareng yang lain.
              </p>

              <div className="space-y-2 mb-7">
                {[
                  { ch: '#lounge-kreator', desc: 'Share karya & minta feedback komunitas' },
                  { ch: '#cari-tim-shoot', desc: 'Cari DP, editor, MUA untuk kolaborasi' },
                  { ch: '#info-promo',     desc: 'Kode promo eksklusif & alat baru' },
                  { ch: '#vendor-lounge',  desc: 'Tips listing, pricing & cerita sukses' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm">
                    <Hash className="w-3.5 h-3.5 text-ink-500 shrink-0" />
                    <span className="font-mono" style={{ color: '#8b91b8' }}>{c.ch}</span>
                    <span className="text-ink-400 hidden sm:inline text-xs">— {c.desc}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://discord.gg/findstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-5 rounded-full font-medium text-sm text-white transition hover:opacity-90"
                  style={{ background: '#5865F2' }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.037.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Gabung Sekarang — Gratis
                </a>
                <span className="text-xs text-ink-400">1.200+ member · Langsung aktif</span>
              </div>
            </div>

            {/* Kanan — stats + chat simulasi */}
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

              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-shimmer" />
                  <span className="eyebrow text-emerald-400 text-[0.65rem]">Live di #lounge-kreator</span>
                </div>
                <div className="space-y-3.5">
                  {[
                    { user: 'dimas_shoot',   color: '#f9b17a', msg: 'Ada yang punya gimbal RS3 untuk disewa weekend ini? 🙏' },
                    { user: 'rina.creative', color: '#a78bfa', msg: 'Coba pake kode FSRP123 kak, diskon 15% booking pertama 🎉' },
                    { user: 'vendor_lumen',  color: '#34d399', msg: 'Aputure 600X Pro baru tersedia! Cek di FindStudio ✨' },
                    { user: 'dimas_shoot',   color: '#f9b17a', msg: 'Mantap! Langsung booking sekarang 🔥' },
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
                  <div className="text-sm font-medium">Untuk kreator &amp; vendor</div>
                  <div className="text-xs text-ink-400">Channel terpisah sesuai peranmu di platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 pb-24 pt-12">
        <div className="card p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-400/10 blur-[100px] rounded-full" />
          <h2 className="headline text-4xl lg:text-6xl mb-4 relative">Bergabung dengan ekosistemnya.</h2>
          <p className="text-ink-300 max-w-xl mx-auto mb-8 relative">
            Mulai menyewa sebagai kreator, atau hasilkan dari aset Anda sebagai vendor.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative">
            <Link href="/browse" className="btn-primary">Jelajahi katalog <ArrowUpRight className="w-4 h-4" /></Link>
            <Link href="/register?role=vendor" className="btn-ghost" style={{ borderColor: '#676f9d' }}>Jadi vendor</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
