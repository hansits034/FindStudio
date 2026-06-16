import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowUpRight, Shield, Users, Store, ShieldCheck, Search, CalendarCheck,
  MessageCircle, Camera, Sparkles, Hash, Lock, UserCheck, BarChart3, Megaphone,
} from 'lucide-react';

export const metadata = {
  title: 'Tentang FindStudio, Ekosistem Kreator Surabaya',
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
            Menyatukan ekosistem kreatif,
            <br />
            <span className="italic text-amber-400 font-light">memutus rantai keribetan.</span>
          </h1>
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
              FindStudio menyatukan semuanya dalam satu platform. Kami tidak sekadar menambah listing,
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
            { icon: Camera, color: '#f9b17a', title: 'Klien / Kreator', desc: 'Cari & sewa alat, pesan studio, dan gunakan jasa profesional. Booking multi vendor dalam satu checkout.' },
            { icon: Store, color: '#818cf8', title: 'Vendor / Penyedia', desc: 'Daftarkan alat, studio, atau jasa. Kelola inventaris, harga dinamis, wallet & payout, lewat dashboard analitik.' },
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
          <Sparkles className="w-4 h-4 shrink-0" style={{ color: '#818cf8' }} />
          <span>Ekosistem yang terintegrasi untuk semua peran.</span>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-12">
        <div className="eyebrow text-amber-400 mb-3">Cara kerja</div>
        <h2 className="headline text-4xl lg:text-5xl mb-10">
          Satu Ekosistem.
          <br />
          <span className="italic text-amber-400 font-light">Dua Peran.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Bagi Kreator */}
          <div className="card p-6 lg:p-8">
            <div className="eyebrow mb-6" style={{ color: '#f9b17a' }}>Bagi Kreator</div>
            <ol className="space-y-6">
              {[
                { num: '01', t: 'Eksplorasi & Pilih', d: 'Temukan spesifikasi alat atau studio yang paling sesuai dengan kebutuhan syutingmu dari ratusan daftar katalog di Surabaya.' },
                { num: '02', t: 'Atur Pemesanan', d: 'Tentukan tanggal, gabungkan berbagai alat dari vendor yang berbeda ke dalam satu keranjang, dan selesaikan pembayaran.' },
                { num: '03', t: 'Produksi & Evaluasi', d: 'Ambil alatnya, jalankan produksimu dengan tenang, dan berikan ulasan jujur setelah selesai untuk membangun reputasi komunitas.' },
              ].map((s) => (
                <li key={s.num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-display text-base font-bold" style={{ background: '#f9b17a22', color: '#f9b17a' }}>
                    {s.num}
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">{s.t}</div>
                    <div className="text-sm text-ink-300 leading-relaxed">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Bagi Vendor */}
          <div className="card p-6 lg:p-8">
            <div className="eyebrow mb-6" style={{ color: '#818cf8' }}>Bagi Vendor</div>
            <ol className="space-y-6">
              {[
                { num: '01', t: 'Buka Etalase', d: 'Daftarkan aset menganggurmu (alat, studio, atau jasa), tentukan harga dinamis, dan atur ketersediaannya.' },
                { num: '02', t: 'Proses Pesanan', d: 'Terima notifikasi pesanan masuk, siapkan alat sesuai jadwal yang sudah terkonfirmasi, dan serahkan kepada kreator.' },
                { num: '03', t: 'Terima Pendapatan', d: 'Uang sewa akan otomatis diteruskan ke dompet digitalmu (wallet) setelah masa sewa selesai tanpa masalah.' },
              ].map((s) => (
                <li key={s.num} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-display text-base font-bold" style={{ background: '#818cf822', color: '#818cf8' }}>
                    {s.num}
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">{s.t}</div>
                    <div className="text-sm text-ink-300 leading-relaxed">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FITUR PREMIUM VENDOR */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-12">
        <div className="eyebrow mb-3" style={{ color: '#818cf8' }}>Fitur Premium Vendor</div>
        <h2 className="headline text-4xl lg:text-5xl mb-4">
          Skala bisnismu,
          <br />
          <span className="italic font-light" style={{ color: '#818cf8' }}>dari dalam platform.</span>
        </h2>
        <p className="text-ink-300 mb-10 max-w-2xl text-sm lg:text-base">
          Vendor yang berlangganan mendapatkan akses ke alat eksklusif yang membantu mengoptimalkan
          visibilitas dan memahami performa bisnis secara lebih dalam.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="card p-6 lg:p-8 lift" style={{ borderColor: 'rgba(129,140,248,0.3)', background: 'rgba(99,102,241,0.04)' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8' }}>
              <BarChart3 className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div className="eyebrow mb-2" style={{ color: '#818cf8' }}>Berlangganan bulanan</div>
            <h3 className="font-display text-xl mb-2">Dasbor Vendor Premium</h3>
            <p className="text-sm text-ink-300 leading-relaxed">
              Dasbor analitik tingkat lanjut khusus bagi provider yang membayar biaya langganan bulanan.
              Pantau konversi listing, tren permintaan per kategori, performa harga dinamis, dan laporan
              pendapatan mendalam — semua dalam satu tampilan yang bisa diexport.
            </p>
          </div>
          <div className="card p-6 lg:p-8 lift" style={{ borderColor: 'rgba(129,140,248,0.3)', background: 'rgba(99,102,241,0.04)' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8' }}>
              <Megaphone className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div className="eyebrow mb-2" style={{ color: '#818cf8' }}>Berbayar per penayangan</div>
            <h3 className="font-display text-xl mb-2">Iklan Digital Internal</h3>
            <p className="text-sm text-ink-300 leading-relaxed">
              Ruang iklan berbayar di dalam ekosistem FindStudio. Provider atau brand bisa mempromosikan
              aset atau jasanya agar muncul lebih menonjol di hasil pencarian, halaman kategori, maupun
              banner beranda — menjangkau kreator yang sedang aktif mencari.
            </p>
          </div>
        </div>
      </section>

      {/* INFRASTRUKTUR PLATFORM */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 py-24">
        <div className="eyebrow text-amber-400 mb-3">Infrastruktur Platform</div>
        <h2 className="headline text-4xl lg:text-5xl mb-10">
          Mesin di balik
          <br />
          <span className="italic text-amber-400 font-light">kelancaran produksimu.</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { icon: Search, title: 'Pencarian Cerdas (NLP)', desc: 'Ketik kebutuhanmu dengan kalimat biasa. Sistem kami otomatis membedah lokasi, batas harga, jenis layanan, dan rating dalam hitungan detik.' },
            { icon: Shield, title: 'Pembayaran Aman (Escrow)', desc: 'Sistem rekening bersama kami menahan dana secara otomatis hingga alat dikembalikan atau jasa selesai. Aman dari penipuan dua arah.' },
            { icon: CalendarCheck, title: 'Sinkronisasi Kalender Real-Time', desc: 'Sistem manajemen jadwal pintar yang mendeteksi dan mencegah bentrok (double-booking) secara otomatis di seluruh vendor.' },
            { icon: MessageCircle, title: 'Ruang Negosiasi Terpusat', desc: 'Fitur chat real-time langsung di dalam aplikasi. Diskusikan teknis alat atau briefing proyek tanpa perlu berpindah ke aplikasi pesan lain.' },
          ].map((f, i) => (
            <div key={i} className="card p-6 lg:p-8 lift">
              <f.icon className="w-6 h-6 text-amber-400 mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-ink-300 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PUSAT KEAMANAN & KEPERCAYAAN */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-24">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow text-amber-400 mb-3">Pusat Keamanan & Kepercayaan</div>
            <h2 className="headline text-4xl lg:text-6xl mb-4">
              Tiga pilar yang membuat
              <br />
              <span className="italic text-amber-400 font-light">setiap transaksi aman.</span>
            </h2>
            <p className="text-ink-300 leading-relaxed">
              Kami tahu menyewa alat mahal ke orang asing terasa berisiko. Berikut bagaimana
              FindStudio melindungi kedua belah pihak di setiap transaksi.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Pilar 1: Escrow */}
            <div className="card p-6 lg:p-8">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-amber-400/10 text-amber-400">
                <Lock className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="eyebrow text-amber-400 mb-2">Pilar 1</div>
              <h3 className="font-display text-2xl mb-3">Pembayaran Escrow</h3>
              <p className="text-sm text-ink-300 leading-relaxed">
                Uang klien ditahan dengan aman oleh sistem FindStudio (rekening bersama). Dana baru
                diteruskan ke vendor 1x24 jam setelah alat dikembalikan tanpa masalah atau jasa
                selesai dikerjakan, mencegah penipuan dari kedua belah pihak.
              </p>
            </div>

            {/* Pilar 2: Protection Fund */}
            <div className="card p-6 lg:p-8">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-amber-400/10 text-amber-400">
                <Shield className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="eyebrow text-amber-400 mb-2">Pilar 2</div>
              <h3 className="font-display text-2xl mb-3">Platform Protection Fund</h3>
              <p className="text-sm text-ink-300 leading-relaxed mb-3">
                Vendor menentukan apakah alatnya dilindungi Dana Proteksi, alat yang dilindungi
                diberi tanda <em>Proteksi</em> di listing-nya.
              </p>
              <p className="text-sm text-ink-300 leading-relaxed">
                Jika alat rusak, vendor cukup tekan <strong className="text-white">Klaim</strong>,
                unggah video bukti sebelum/sesudah dan nota estimasi servis. Dana perbaikan
                dicairkan dari kas internal kami dalam waktu &lt; 4 jam.
              </p>
            </div>

            {/* Pilar 3: KYC */}
            <div className="card p-6 lg:p-8">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-amber-400/10 text-amber-400">
                <UserCheck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="eyebrow text-amber-400 mb-2">Pilar 3</div>
              <h3 className="font-display text-2xl mb-3">Verifikasi Identitas (KYC)</h3>
              <p className="text-sm text-ink-300 leading-relaxed">
                Tidak sembarang orang bisa menyewa alat. Setiap pengguna wajib verifikasi
                KTP/identitas sah sebelum bisa melakukan checkout, sehingga aset vendor terhindar
                dari pencurian atau penyalahgunaan.
              </p>
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
              <div className="eyebrow text-amber-400 mb-3">Ekosistem Komunitas</div>
              <h2 className="headline text-4xl lg:text-5xl mb-4">
                Bukan sekadar aplikasi sewa,
                <br />
                <span className="italic text-amber-400 font-light">tapi tempat bertumbuh.</span>
              </h2>
              <p className="text-ink-300 leading-relaxed mb-6 text-sm lg:text-base">
                FindStudio berkomitmen membangun ruang diskusi kreatif untuk Surabaya lewat Discord
                FindStudio, tempat kreator pemula naik kelas dengan akses ke peralatan profesional,
                dan vendor lokal bertumbuh menjadi pengusaha mandiri.
              </p>

              <div className="space-y-2 mb-7">
                {[
                  { ch: 'lounge-kreator', desc: 'Share karya & minta feedback komunitas' },
                  { ch: 'cari-tim-shoot', desc: 'Cari DP, editor, MUA untuk kolaborasi' },
                  { ch: 'info-promo',     desc: 'Kode promo eksklusif & alat baru' },
                  { ch: 'vendor-lounge',  desc: 'Tips listing, pricing & cerita sukses' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm">
                    <Hash className="w-3.5 h-3.5 text-ink-500 shrink-0" />
                    <span className="font-mono" style={{ color: '#818cf8' }}>{c.ch}</span>
                    <span className="text-ink-400 hidden sm:inline text-xs">- {c.desc}</span>
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
                  Gabung Sekarang
                </a>
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
          <h2 className="headline text-4xl lg:text-6xl mb-4 relative">Infrastruktur yang siap, tinggal mulai.</h2>
          <p className="text-ink-300 max-w-xl mx-auto mb-8 relative">
            Mulai menyewa sebagai kreator, atau hasilkan dari aset Anda sebagai vendor.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative">
            <Link href="/browse" className="btn-primary">Eksplorasi Katalog Surabaya <ArrowUpRight className="w-4 h-4" /></Link>
            <Link href="/register?role=vendor" className="btn-ghost" style={{ borderColor: '#818cf8' }}>Mulai Hasilkan Profit, Daftarkan Aset</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
