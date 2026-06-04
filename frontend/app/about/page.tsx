import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowUpRight, Shield, Users, Store, ShieldCheck, Search, CalendarCheck,
  Wallet, MessageCircle, Star, Camera, MapPin, Box, Sparkles,
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
            { icon: Star, title: 'Review dua arah', desc: 'Vendor menilai klien, klien menilai vendor. Reputasi terbangun tiap transaksi.' },
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
              <div className="eyebrow text-amber-400 mb-3">Dana proteksi internal</div>
              <h2 className="headline text-4xl lg:text-5xl mb-6">Self-insured, bukan asuransi.</h2>
              <div className="card !bg-amber-400/5 !border-amber-400/30 p-4 mb-6 flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-ink-200 leading-relaxed">
                  <strong className="text-amber-400">Penting:</strong> ini bukan produk asuransi dan tidak
                  terikat regulasi asuransi. FindStudio mengelola sendiri dana cadangan internal
                  (<em>Platform Protection Fund</em>).
                </p>
              </div>
              <p className="text-ink-300 leading-relaxed">
                Saat vendor mendaftarkan alat, mereka bisa mengaktifkan Proteksi FindStudio. 10% dari nilai
                sewa masuk ke dana cadangan. Jika terjadi kerusakan, vendor mengajukan klaim dengan foto
                before/after dan estimasi servis — biaya perbaikan dicairkan dari dana, hingga senilai harga
                alat yang didaftarkan.
              </p>
            </div>

            <div className="card p-6 lg:p-8">
              <div className="eyebrow text-amber-400 mb-4">Alur dana — contoh sewa Rp 500.000</div>
              <ol className="space-y-4">
                {[
                  { t: 'Listing', d: 'Vendor aktifkan Proteksi (potongan 10%).' },
                  { t: 'Transaksi', d: 'Klien bayar Rp 510.000 (sewa + biaya layanan Rp 10.000).' },
                  { t: 'Payout', d: 'Vendor terima Rp 450.000; Rp 50.000 masuk Protection Fund.' },
                  { t: 'Klaim (bila rusak)', d: 'Dana perbaikan dicairkan dari fund, maks. senilai harga alat.' },
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

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-6 lg:px-10 pb-24">
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
