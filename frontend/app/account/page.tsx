'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ShieldCheck, Upload, CheckCircle2, Copy, Gift, Wallet, Plus, HelpCircle,
  ChevronDown, Lock, PackageCheck, UserCircle2,
} from 'lucide-react';

const REFERRAL_CODE = 'KREATOR-SBY123';

const FAQ = [
  {
    q: 'Apa itu sistem Escrow di FindStudio?',
    a: 'Uang yang kamu bayar saat checkout tidak langsung masuk ke vendor. FindStudio menahan dana tersebut (escrow) sampai kamu konfirmasi alat sudah diterima dalam kondisi baik. Ini melindungi kamu dari penipuan dan melindungi vendor dari pembatalan sepihak.',
  },
  {
    q: 'Bagaimana prosedur pengembalian alat?',
    a: 'Kembalikan alat ke vendor sesuai jam yang tertera di halaman Pesanan Saya, dalam kondisi sama seperti saat diterima. Vendor akan memeriksa alat lalu mengonfirmasi pengembalian — setelah itu deposit kamu otomatis dicairkan.',
  },
  {
    q: 'Kenapa saya harus verifikasi KTP & selfie?',
    a: 'Ini adalah lapisan keamanan pertama platform untuk memastikan setiap penyewa adalah individu asli, sehingga vendor merasa aman menyewakan alatnya dan transaksi escrow berjalan lancar.',
  },
];

export default function AccountPage() {
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function copyCode() {
    navigator.clipboard.writeText(REFERRAL_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center">
            <UserCircle2 className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <div className="eyebrow text-amber-400 mb-1">Akun & Profil</div>
            <h1 className="headline text-4xl lg:text-5xl">Pengaturanmu.</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* KYC Verification */}
          <section className="card p-6">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-xl">Status Verifikasi (KYC)</h2>
            </div>
            <p className="text-xs text-ink-300 mb-5">
              Lapisan keamanan pertama FindStudio. Unggah KTP & selfie agar kamu bisa checkout dan menyewa alat.
            </p>

            {verified ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-400/10 text-emerald-300 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Akunmu sudah terverifikasi — kamu bisa checkout dengan bebas.
              </div>
            ) : (
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between gap-3 px-4 py-4 rounded-xl border border-dashed border-ink-700/50 hover:border-amber-400/50 transition text-sm">
                  <span className="flex items-center gap-3"><Upload className="w-4 h-4 text-amber-400" /> Unggah foto KTP</span>
                  <span className="text-ink-400">JPG/PNG</span>
                </button>
                <button className="w-full flex items-center justify-between gap-3 px-4 py-4 rounded-xl border border-dashed border-ink-700/50 hover:border-amber-400/50 transition text-sm">
                  <span className="flex items-center gap-3"><Upload className="w-4 h-4 text-amber-400" /> Unggah foto selfie</span>
                  <span className="text-ink-400">JPG/PNG</span>
                </button>
                <button onClick={() => setVerified(true)} className="btn-primary w-full justify-center mt-2">
                  <Lock className="w-4 h-4" /> Kirim untuk Verifikasi
                </button>
                <p className="text-[0.65rem] text-ink-500 text-center">Tanpa verifikasi ini, tombol "Bayar via Escrow" di keranjang tidak akan aktif.</p>
              </div>
            )}
          </section>

          {/* Affiliate */}
          <section className="card p-6">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-xl">Program Afiliasi</h2>
            </div>
            <p className="text-xs text-ink-300 mb-5">Bagikan kodemu, dapatkan bonus saat temanmu menyewa lewat FindStudio.</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 px-4 py-3 rounded-xl bg-ink-800 border border-ink-700/40 font-display text-amber-400 tracking-wide text-center">
                {REFERRAL_CODE}
              </div>
              <button onClick={copyCode} className="btn-ghost !px-4 !py-3 shrink-0">
                <Copy className="w-4 h-4" /> {copied ? 'Disalin!' : 'Salin'}
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-amber-400/5 border border-amber-400/20">
              <span className="text-sm text-ink-300">Total bonus terkumpul</span>
              <span className="font-display text-xl text-amber-400 tabular">Rp 150.000</span>
            </div>
          </section>

          {/* Payment methods */}
          <section className="card p-6">
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-xl">Metode Pembayaran</h2>
            </div>
            <p className="text-xs text-ink-300 mb-5">Kelola dompet digital & rekening virtual yang tersimpan.</p>

            <ul className="space-y-2 mb-3">
              <li className="flex items-center justify-between px-4 py-3 rounded-xl border border-ink-700/40">
                <span className="text-sm">GoPay •••• terhubung</span>
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300">Utama</span>
              </li>
              <li className="flex items-center justify-between px-4 py-3 rounded-xl border border-ink-700/40">
                <span className="text-sm">VA BCA •••• 4821</span>
                <span className="text-[0.65rem] text-ink-400">Cadangan</span>
              </li>
            </ul>
            <button className="btn-ghost w-full justify-center text-sm">
              <Plus className="w-4 h-4" /> Tambah Metode Pembayaran
            </button>
          </section>

          {/* Help center */}
          <section className="card p-6">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-xl">Pusat Bantuan</h2>
            </div>
            <p className="text-xs text-ink-300 mb-5">Pahami sistem Escrow & prosedur pengembalian alat sebelum menyewa.</p>

            <div className="space-y-2">
              {FAQ.map((f, i) => (
                <div key={f.q} className="border border-ink-700/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-ink-700/30 transition"
                  >
                    <span className="flex items-center gap-2"><PackageCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />{f.q}</span>
                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <p className="px-4 pb-3.5 text-xs text-ink-300 leading-relaxed">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
