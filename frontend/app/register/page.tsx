'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Camera, Store, ArrowRight, Mail, Lock, User, Phone, Check, AlertCircle, Loader2 } from 'lucide-react';
import { register as apiRegister } from '@/lib/api';

type Role = 'client' | 'vendor';

const SURABAYA_AREAS = ['Gubeng', 'Manyar', 'Sukolilo', 'Rungkut', 'Wonokromo', 'Tegalsari', 'Darmo', 'Mulyorejo', 'Wiyung'];

function RegisterInner() {
  const router = useRouter();
  const params = useSearchParams();
  // "Jadi Vendor" mengarah ke /register?role=vendor → langsung mode vendor, tanpa toggle.
  const forcedVendor = params.get('role') === 'vendor';

  const [role, setRole] = useState<Role>(forcedVendor ? 'vendor' : 'client');
  const isVendor = role === 'vendor';
  // Sistem warna: vendor = indigo, kreator/customer = amber.
  const accent = isVendor ? 'ink-500' : 'amber-400';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [area, setArea] = useState('Gubeng');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) return setError('Password minimal 8 karakter.');
    if (password !== confirm) return setError('Konfirmasi password tidak cocok.');
    if (!agreed) return setError('Anda harus menyetujui Syarat & Ketentuan.');

    setLoading(true);
    try {
      await apiRegister({
        email,
        password,
        fullName,
        phone: phone || undefined,
        role: isVendor ? 'VENDOR' : 'CLIENT',
        ...(isVendor ? { businessName: fullName, city: `Surabaya, ${area}` } : { city: `Surabaya, ${area}` }),
      });
      router.push(isVendor ? '/dashboard/vendor' : '/dashboard/client');
    } catch (err: any) {
      setError(err.message || 'Pendaftaran gagal, coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink-900">
      <header className="px-8 lg:px-14 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="FindStudio" width={40} height={40} className="object-contain" priority />
          <span className="font-display text-xl">FindStudio</span>
        </Link>
        <div className="text-sm text-ink-300">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-amber-400 hover:underline">Masuk</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-16">
        <div className={`eyebrow mb-3 ${isVendor ? 'text-ink-400' : 'text-amber-400'}`}>
          {forcedVendor ? 'Pendaftaran Vendor' : 'Buat akun baru'}
        </div>
        <h1 className="headline text-5xl lg:text-7xl mb-3">
          {forcedVendor ? (
            <>
              Daftar sebagai
              <br />
              <span className="italic font-light" style={{ color: '#8b91b8' }}>Vendor.</span>
            </>
          ) : (
            <>
              Bergabung dengan
              <br />
              <span className="italic text-amber-400 font-light">FindStudio.</span>
            </>
          )}
        </h1>
        <p className="text-ink-300 mb-10 max-w-xl">
          {forcedVendor
            ? 'Daftarkan kamera, drone, lighting, studio, atau jasa Anda, mulai hasilkan dari aset yang menganggur di Surabaya.'
            : 'Mulai sebagai kreator yang menyewa, atau vendor yang menghasilkan dari aset Anda.'}
        </p>

        {/* Role selector — hanya muncul kalau tidak dipaksa vendor */}
        {!forcedVendor && (
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <RoleCard
              active={role === 'client'}
              variant="client"
              onClick={() => setRole('client')}
              icon={<Camera className="w-6 h-6" />}
              title="Saya Kreator"
              desc="Saya butuh sewa alat, studio, atau jasa editor."
              badges={['Booking multi-vendor', 'Escrow payment', 'Rekomendasi cerdas']}
            />
            <RoleCard
              active={role === 'vendor'}
              variant="vendor"
              onClick={() => setRole('vendor')}
              icon={<Store className="w-6 h-6" />}
              title="Saya Vendor"
              desc="Saya punya alat, studio, atau jasa untuk disewakan."
              badges={['Wallet & payout', 'Dashboard analitik', 'Proteksi internal']}
            />
          </div>
        )}

        {forcedVendor && (
          <div className="mb-8 text-sm text-ink-400">
            Mau menyewa, bukan menyewakan?{' '}
            <Link href="/register" className="text-amber-400 hover:underline">Daftar sebagai kreator</Link>
          </div>
        )}

        {error && (
          <div className="card !bg-red-400/10 !border-red-400/30 p-3 mb-5 flex items-start gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="text-red-200">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
                <User className="w-3 h-3" /> {isVendor ? 'Nama Bisnis' : 'Nama Lengkap'}
              </label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="field"
                placeholder={isVendor ? 'Nama bisnis / pemilik' : 'Sesuai KTP'}
              />
            </div>
            <div>
              <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
                <Phone className="w-3 h-3" /> No. WhatsApp
              </label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="field" placeholder="08123456789" />
            </div>
          </div>

          <div>
            <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
              <Mail className="w-3 h-3" /> Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
              placeholder={isVendor ? 'email@bisnis.com' : 'email@kreator.com'}
            />
          </div>

          <div>
            <label className="eyebrow text-ink-400 block mb-2">Area di Surabaya</label>
            <select className="field !py-2.5" value={area} onChange={(e) => setArea(e.target.value)}>
              {SURABAYA_AREAS.map((a) => (
                <option key={a} value={a}>Surabaya, {a}</option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field"
                placeholder="Min. 8 karakter"
              />
            </div>
            <div>
              <label className="eyebrow text-ink-400 block mb-2 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Konfirmasi Password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="field"
              />
            </div>
          </div>

          {isVendor && (
            <div className="card !bg-ink-500/10 !border-ink-500/40 p-5 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-4 h-4" style={{ color: '#8b91b8' }} />
                <span className="eyebrow" style={{ color: '#8b91b8' }}>Verifikasi vendor (langkah berikutnya)</span>
              </div>
              <p className="text-xs text-ink-300 leading-relaxed">
                Setelah daftar, Anda akan diminta upload KTP dan menjalani verifikasi biometrik
                untuk melindungi alat Anda dari penyalahgunaan.
              </p>
            </div>
          )}

          <label className="flex items-start gap-2 text-xs text-ink-300 pt-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 accent-amber-400"
            />
            <span>
              Saya menyetujui <Link href="#" className="text-amber-400 hover:underline">Syarat & Ketentuan</Link> dan{' '}
              <Link href="#" className="text-amber-400 hover:underline">Kebijakan Privasi</Link> FindStudio.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-base mt-3 disabled:opacity-60"
            style={isVendor ? { background: '#676f9d', color: '#ffffff' } : undefined}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Memproses…
              </>
            ) : (
              <>
                Buat Akun {isVendor ? 'Vendor' : 'Kreator'} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink-900" />}>
      <RegisterInner />
    </Suspense>
  );
}

function RoleCard({ active, onClick, icon, title, desc, badges, variant }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string; badges: string[]; variant: 'client' | 'vendor'; }) {
  const isVendor = variant === 'vendor';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`card p-6 text-left transition relative ${
        active
          ? isVendor
            ? 'border-ink-500 bg-ink-500/10'
            : 'border-amber-400 bg-amber-400/5'
          : 'hover:border-amber-400/40'
      }`}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={
          active
            ? { background: isVendor ? '#676f9d' : '#f9b17a', color: isVendor ? '#fff' : '#2d3250' }
            : { background: 'rgba(103,111,157,0.25)', color: isVendor ? '#8b91b8' : '#f9b17a' }
        }
      >
        {icon}
      </div>
      <h3 className="font-display text-xl mb-1.5">{title}</h3>
      <p className="text-sm text-ink-300 mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {badges.map((b) => (
          <span key={b} className="text-[0.65rem] px-2 py-1 rounded-full bg-ink-700/40 border border-ink-700/40">
            {b}
          </span>
        ))}
      </div>
      {active && (
        <div
          className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: isVendor ? '#676f9d' : '#f9b17a' }}
        >
          <Check className="w-3.5 h-3.5" style={{ color: isVendor ? '#fff' : '#2d3250' }} />
        </div>
      )}
    </button>
  );
}
