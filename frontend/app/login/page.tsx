'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Mail, Lock, AlertCircle, Loader2, Camera, Store, ShieldCheck } from 'lucide-react';
import { login, setSession } from '@/lib/api';

type RoleKey = 'client' | 'vendor' | 'admin';

const ROLES: Record<RoleKey, {
  label: string; sub: string; email: string; password: string;
  Icon: React.ElementType;
  color: string; border: string; bg: string; glow: string;
}> = {
  client: {
    label: 'Kreator / Klien',
    sub: 'Sewa alat, booking studio, & cari jasa profesional',
    email: 'rakha@kreator.com',
    password: 'password123',
    Icon: Camera,
    color: '#f9b17a',
    border: 'rgba(249,177,122,0.55)',
    bg: 'rgba(249,177,122,0.09)',
    glow: '0 0 28px rgba(249,177,122,0.18)',
  },
  vendor: {
    label: 'Vendor / Provider',
    sub: 'Kelola aset, terima pesanan & cairkan pendapatan',
    email: 'aperture@vendor.com',
    password: 'password123',
    Icon: Store,
    color: '#818cf8',
    border: 'rgba(129,140,248,0.55)',
    bg: 'rgba(99,102,241,0.09)',
    glow: '0 0 28px rgba(99,102,241,0.2)',
  },
  admin: {
    label: 'Admin',
    sub: 'Kelola ekosistem, verifikasi KYC & transaksi platform',
    email: 'admin@findstudio.id',
    password: 'admin123',
    Icon: ShieldCheck,
    color: '#34d399',
    border: 'rgba(52,211,153,0.55)',
    bg: 'rgba(52,211,153,0.09)',
    glow: '0 0 28px rgba(52,211,153,0.2)',
  },
};

const ROLE_LABEL: Record<RoleKey, string> = {
  client: 'Kreator',
  vendor: 'Vendor',
  admin: 'Admin',
};

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);
  const [inputFocus, setInputFocus] = useState<'email' | 'password' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function pickRole(key: RoleKey) {
    const r = ROLES[key];
    setSelectedRole(key);
    setEmail(r.email);
    setPassword(r.password);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = await login(email, password);
      setSession(payload);
      const role = payload.user.role;
      if (role === 'VENDOR') router.push('/dashboard/vendor');
      else if (role === 'ADMIN') router.push('/dashboard/admin');
      else router.push('/dashboard/client');
    } catch (err: any) {
      setError(err.message || 'Login gagal, pastikan backend berjalan di :4000');
    } finally {
      setLoading(false);
    }
  }

  const activeRole = selectedRole ? ROLES[selectedRole] : null;

  function fieldBorderStyle(name: 'email' | 'password') {
    if (!activeRole || inputFocus !== name) return {};
    return {
      borderColor: activeRole.color,
      background: `${activeRole.color}0f`,
    };
  }

  function labelColorStyle(name: 'email' | 'password') {
    if (!activeRole || inputFocus !== name) return {};
    return { color: activeRole.color };
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col justify-between p-8 lg:p-14 bg-ink-900 relative">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="FindStudio" width={40} height={40} className="object-contain" priority />
          <span className="font-display text-xl">FindStudio</span>
        </Link>

        <div className="max-w-md mx-auto w-full">
          <div className="eyebrow text-amber-400 mb-3">Selamat datang kembali</div>
          <h1 className="headline text-4xl lg:text-5xl mb-2">
            Lanjutkan <span className="italic text-amber-400 font-light">karyamu.</span>
          </h1>
          <p className="text-ink-300 text-sm mb-8">Pilih peranmu, lalu masuk ke platform.</p>

          {/* Main role cards — Kreator & Vendor */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {(['client', 'vendor'] as RoleKey[]).map((key) => {
              const r = ROLES[key];
              const active = selectedRole === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => pickRole(key)}
                  className="relative p-4 rounded-2xl border text-left transition-all duration-200 focus:outline-none"
                  style={{
                    background: active ? r.bg : 'rgba(66,71,105,0.25)',
                    borderColor: active ? r.border : 'rgba(103,111,157,0.2)',
                    boxShadow: active ? r.glow : 'none',
                  }}
                >
                  {active && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full" style={{ background: r.color }} />
                  )}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${r.color}22`, color: r.color }}>
                    <r.Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="font-medium text-sm mb-1 transition-colors" style={{ color: active ? r.color : '#e2e5f1' }}>
                    {r.label}
                  </div>
                  <div className="text-[0.7rem] text-ink-400 leading-snug">{r.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Admin tertiary card */}
          {(() => {
            const r = ROLES.admin;
            const active = selectedRole === 'admin';
            return (
              <button
                type="button"
                onClick={() => pickRole('admin')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 focus:outline-none mb-7"
                style={{
                  background: active ? r.bg : 'rgba(66,71,105,0.15)',
                  borderColor: active ? r.border : 'rgba(103,111,157,0.15)',
                  boxShadow: active ? r.glow : 'none',
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${r.color}20`, color: r.color }}>
                  <r.Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm transition-colors" style={{ color: active ? r.color : '#c8ccde' }}>
                    {r.label}
                  </div>
                  <div className="text-[0.65rem] text-ink-500 truncate">{r.sub}</div>
                </div>
                {active && (
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.color }} />
                )}
              </button>
            );
          })()}

          {error && (
            <div className="card !bg-red-400/10 !border-red-400/30 p-3 mb-5 flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-red-200">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="eyebrow block mb-2 flex items-center gap-1.5 transition-colors duration-200"
                style={{ color: activeRole && inputFocus === 'email' ? activeRole.color : '#9399ba' }}
              >
                <Mail className="w-3 h-3" /> Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSelectedRole(null); }}
                onFocus={() => setInputFocus('email')}
                onBlur={() => setInputFocus(null)}
                className="field transition-all duration-200"
                style={fieldBorderStyle('email')}
                placeholder="email@akun.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="eyebrow flex items-center gap-1.5 transition-colors duration-200"
                  style={{ color: activeRole && inputFocus === 'password' ? activeRole.color : '#9399ba' }}
                >
                  <Lock className="w-3 h-3" /> Password
                </label>
                <Link href="#" className="text-xs text-amber-400 hover:underline">
                  Lupa password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setInputFocus('password')}
                onBlur={() => setInputFocus(null)}
                className="field transition-all duration-200"
                style={fieldBorderStyle('password')}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-4 disabled:opacity-60 transition-all duration-200"
              style={activeRole ? { background: activeRole.color, boxShadow: activeRole.glow } : undefined}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Memproses…</>
              ) : activeRole ? (
                <>Masuk sebagai {ROLE_LABEL[selectedRole!]} <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Masuk <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full divider" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-ink-900 px-3 eyebrow text-ink-400">atau</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-ghost w-full justify-center text-sm"
              onClick={() => setError('Google OAuth belum diimplementasi di MVP.')}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0012 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Lanjutkan dengan Google
            </button>
          </form>

          <p className="text-sm text-ink-400 mt-8 text-center">
            Belum punya akun?{' '}
            <Link href="/register" className="text-amber-400 font-medium hover:underline">
              Daftar gratis
            </Link>
          </p>
        </div>

        <div className="text-xs text-ink-400">© 2026 FindStudio. All rights reserved.</div>
      </div>

      {/* Right — visual */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/95 via-ink-900/40 to-transparent" />

        {/* Role info overlay */}
        <div className="absolute top-14 left-14 right-14 flex gap-3">
        </div>

        <div className="absolute bottom-14 left-14 right-14 max-w-md">
          <div className="font-display text-amber-400 text-7xl leading-none mb-4">"</div>
          <blockquote className="font-display text-3xl leading-tight mb-6">
            Setelah pakai FindStudio, saya berhenti menelepon 5 rental untuk satu shoot.
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <div className="font-medium text-sm">Rakha Pratama</div>
              <div className="text-xs text-ink-300">Sinematografer freelance</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
