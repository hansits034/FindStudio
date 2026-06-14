'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, ShoppingBag, Menu, X, User, LogOut, LayoutDashboard,
  ChevronDown, Camera, Aperture, Plane, Lightbulb, Mic, Box, MapPin, Sparkles, MessageCircle, CalendarCheck,
} from 'lucide-react';
import { getUser, clearSession, type AuthUser } from '@/lib/api';

const EXPLORE = [
  { key: 'camera', label: 'Kamera', icon: Camera },
  { key: 'lens', label: 'Lensa', icon: Aperture },
  { key: 'drone', label: 'Drone', icon: Plane },
  { key: 'lighting', label: 'Lighting', icon: Lightbulb },
  { key: 'audio', label: 'Audio', icon: Mic },
  { key: 'gimbal', label: 'Gimbal & Rig', icon: Box },
  { key: 'studio', label: 'Studio', icon: MapPin },
  { key: 'service', label: 'Jasa Profesional', icon: Sparkles },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [explore, setExplore] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) setExplore(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function handleLogout() {
    clearSession();
    setUser(null);
    router.push('/');
  }

  const isVendor = user?.role === 'VENDOR';
  const dashHref = isVendor ? '/dashboard/vendor' : user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/client';
  // Sistem warna: vendor = indigo (#676f9d), customer/kreator = amber (#f9b17a)
  const roleColor = isVendor ? '#676f9d' : '#f9b17a';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-ink-900/70 border-b border-ink-700/40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <Image src="/logo.png" alt="FindStudio" width={44} height={44} className="object-contain" priority />
            <span className="absolute -inset-1 rounded-lg bg-amber-400/20 blur-md group-hover:blur-lg transition-all -z-10" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight">FindStudio</span>
            <span className="eyebrow text-ink-400 mt-0.5">est. 2026, Surabaya</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {/* Single Jelajahi dropdown */}
          <div ref={exploreRef} className="relative">
            <button
              onClick={() => setExplore((v) => !v)}
              className={`px-4 py-2 rounded-full transition inline-flex items-center gap-1.5 ${explore ? 'bg-ink-700/50 text-amber-400' : 'hover:bg-ink-700/50'}`}
            >
              Jelajahi
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${explore ? 'rotate-180' : ''}`} />
            </button>

            {explore && (
              <div className="absolute top-full left-0 mt-2 w-[360px] card p-3 grid grid-cols-2 gap-1 shadow-2xl">
                {EXPLORE.map((c) => (
                  <Link
                    key={c.key}
                    href={`/browse?cat=${c.key}`}
                    onClick={() => setExplore(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-ink-700/50 transition group"
                  >
                    <c.icon className="w-4 h-4 text-amber-400" strokeWidth={1.6} />
                    <span className="text-sm group-hover:text-amber-400 transition">{c.label}</span>
                  </Link>
                ))}
                <Link
                  href="/browse"
                  onClick={() => setExplore(false)}
                  className="col-span-2 mt-1 text-center text-xs text-ink-300 hover:text-amber-400 border-t border-ink-700/40 pt-2.5"
                >
                  Lihat semua katalog →
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="px-4 py-2 rounded-full hover:bg-ink-700/50 transition">
            Tentang
          </Link>
          {user && (
            <>
              <Link href="/orders" className="px-4 py-2 rounded-full hover:bg-ink-700/50 transition">
                Pesanan
              </Link>
              <Link href="/messages" className="px-4 py-2 rounded-full hover:bg-ink-700/50 transition">
                Chat
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/browse"
            aria-label="Search"
            className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-ink-700/50 transition"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-700/50 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
          </Link>
          {user ? (
            <>
              <Link
                href={dashHref}
                className="hidden md:inline-flex items-center gap-2 !py-2 !px-4 text-sm rounded-full border transition"
                style={{ borderColor: `${roleColor}66`, color: roleColor }}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden lg:inline">{isVendor ? 'Dashboard Vendor' : 'Dashboard'}</span>
              </Link>
              <button onClick={handleLogout} className="hidden md:inline-flex btn-ghost !py-2 !px-4 text-sm">
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:inline-flex btn-ghost !py-2 !px-4 text-sm">
                <User className="w-4 h-4" />
                Masuk
              </Link>
              <Link href="/register?role=vendor" className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm">
                Jadi Vendor
              </Link>
            </>
          )}

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-700/50"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-700/40 bg-ink-900/95">
          <div className="px-6 py-6 flex flex-col gap-1">
            <div className="eyebrow text-ink-400 mb-1">Jelajahi</div>
            <div className="grid grid-cols-2 gap-1 mb-3">
              {EXPLORE.map((c) => (
                <Link key={c.key} href={`/browse?cat=${c.key}`} onClick={() => setOpen(false)} className="flex items-center gap-2 py-2.5 text-sm">
                  <c.icon className="w-4 h-4 text-amber-400" /> {c.label}
                </Link>
              ))}
            </div>
            <Link href="/about" onClick={() => setOpen(false)} className="py-3 border-t border-ink-700/30">Tentang FindStudio</Link>
            {user && (
              <>
                <Link href="/orders" onClick={() => setOpen(false)} className="py-3 border-t border-ink-700/30 flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-amber-400" /> Pesanan & Jadwal</Link>
                <Link href="/messages" onClick={() => setOpen(false)} className="py-3 border-t border-ink-700/30 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-amber-400" /> Chat</Link>
              </>
            )}
            <div className="flex gap-3 mt-4">
              {user ? (
                <>
                  <Link href={dashHref} className="btn-ghost flex-1 justify-center">Dashboard</Link>
                  <button onClick={handleLogout} className="btn-primary flex-1 justify-center">Keluar</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-ghost flex-1 justify-center">Masuk</Link>
                  <Link href="/register?role=vendor" className="btn-primary flex-1 justify-center">Jadi Vendor</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
