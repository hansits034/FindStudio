'use client';

import { useState } from 'react';
import { Camera, MapPin, Building2, CreditCard, FileText, Save, CheckCircle2 } from 'lucide-react';

const VC = '#818cf8';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="eyebrow mb-1.5" style={{ color: VC }}>Pengaturan Toko</div>
          <h1 className="headline text-4xl lg:text-5xl">
            Kelola <span className="italic font-light" style={{ color: VC }}>Profil Toko.</span>
          </h1>
          <p className="text-sm text-ink-300 mt-1.5">Informasi ini ditampilkan di halaman etalase publikmu.</p>
        </div>
        <button
          onClick={handleSave}
          className="text-sm inline-flex items-center gap-2 py-2.5 px-5 rounded-full font-medium transition"
          style={{ background: VC, color: '#1a1c2e' }}
        >
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Tersimpan!</> : <><Save className="w-4 h-4" /> Simpan Perubahan</>}
        </button>
      </div>

      {/* ── PROFIL TOKO ─────────────────────────────────── */}
      <section className="card p-6 lg:p-8 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5" style={{ color: VC }} />
          <h2 className="font-display text-xl">Profil Toko</h2>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-ink-800 flex items-center justify-center border border-ink-700/40">
            <span className="font-display text-3xl" style={{ color: VC }}>A</span>
          </div>
          <div>
            <button className="text-xs px-4 py-2 rounded-full border mb-1 block" style={{ borderColor: 'rgba(129,140,248,0.4)', color: VC }}>
              <Camera className="inline w-3 h-3 mr-1" /> Upload Logo
            </button>
            <div className="text-[0.65rem] text-ink-500">PNG/JPG, maks 2MB. Disarankan 400×400px.</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Nama Toko</label>
            <input className="field text-sm" defaultValue="Aperture Rental Co." />
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Kategori Layanan Utama</label>
            <select className="field !py-2.5 text-sm">
              <option>Kamera & Lensa</option>
              <option>Lighting & Grip</option>
              <option>Audio</option>
              <option>Studio & Set</option>
              <option>Jasa Profesional</option>
              <option>Multi-kategori</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="eyebrow text-ink-400 block mb-2">Deskripsi Toko</label>
          <textarea
            className="field text-sm !py-3 resize-none h-28"
            defaultValue="Aperture Rental adalah penyedia alat foto & video profesional di Surabaya sejak 2019. Kami spesialis kamera mirrorless Sony & Canon, lensa prime/zoom, serta lighting Aputure. Seluruh alat dalam kondisi prima dan tersedia lengkap dengan kelengkapan aslinya."
          />
          <div className="text-[0.65rem] text-ink-500 mt-1">Maks. 300 karakter. Tampil di halaman etalase publikmu.</div>
        </div>

        <div>
          <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> Alamat Lengkap
          </label>
          <input className="field text-sm mb-2" defaultValue="Jl. Raya Manyar No. 45, Surabaya Timur, Jawa Timur 60285" />
          <div className="text-[0.65rem] text-ink-500">Digunakan untuk menampilkan lokasi kepada kreator yang ingin pickup alat.</div>
        </div>
      </section>

      {/* ── REKENING BANK ───────────────────────────────── */}
      <section className="card p-6 lg:p-8 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="w-5 h-5" style={{ color: VC }} />
          <h2 className="font-display text-xl">Rekening Pencairan Dana</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Bank</label>
            <select className="field !py-2.5 text-sm">
              <option>BCA</option><option>Mandiri</option><option>BNI</option><option>BRI</option>
              <option>GoPay</option><option>OVO</option><option>DANA</option>
            </select>
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Nomor Rekening</label>
            <input className="field text-sm" defaultValue="0888-4521-3345" />
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Nama Pemilik Rekening</label>
            <input className="field text-sm" defaultValue="Rizky Mahendra" />
          </div>
        </div>
        <div className="p-3 rounded-xl text-xs flex items-start gap-2" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span className="text-ink-300">Rekening telah diverifikasi. Payout diproses setiap hari kerja pukul 14:00 WIB.</span>
        </div>
      </section>

      {/* ── SYARAT & KETENTUAN TOKO ─────────────────────── */}
      <section className="card p-6 lg:p-8 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5" style={{ color: VC }} />
          <h2 className="font-display text-xl">Syarat & Ketentuan Toko</h2>
        </div>
        <p className="text-sm text-ink-400 mb-5">Aturan khusus tokomu yang akan ditampilkan sebelum kreator melakukan checkout.</p>
        <textarea
          className="field text-sm !py-4 resize-none h-44 leading-relaxed"
          defaultValue={`1. Keterlambatan pengembalian lebih dari 3 jam dihitung 1 hari sewa tambahan.
2. Penyewa wajib membuktikan identitas (KTP) saat pickup alat.
3. Alat yang dikembalikan dalam kondisi kotor dikenakan biaya kebersihan Rp 50.000.
4. Kerusakan yang terbukti akibat kelalaian penyewa menjadi tanggung jawab penyewa sepenuhnya (di luar cakupan Proteksi FindStudio).
5. Pembatalan pesanan yang sudah dikonfirmasi kurang dari 24 jam sebelum pickup tidak dapat direfund.`}
        />
      </section>

      {/* ── VERIFIKASI KYC ──────────────────────────────── */}
      <section className="card p-6 lg:p-8">
        <h2 className="font-display text-xl mb-5">Status Verifikasi Akun</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Email Terverifikasi',   done: true  },
            { label: 'No. WhatsApp',          done: true  },
            { label: 'KTP / Identitas',       done: true  },
            { label: 'Verifikasi Biometrik',  done: true  },
            { label: 'NPWP',                  done: false },
            { label: 'Rekening Bank',         done: true  },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(103,111,157,0.08)' }}>
              <span className="text-sm">{item.label}</span>
              {item.done
                ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                : <button className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'rgba(249,177,122,0.15)', color: '#f9b17a' }}>Upload</button>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
