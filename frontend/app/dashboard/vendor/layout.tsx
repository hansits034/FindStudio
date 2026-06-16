'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid, Boxes, CalendarDays, MessageCircle, Shield,
  Wallet, Settings, Bell, Store, Search, LogOut,
} from 'lucide-react';
import { clearSession } from '@/lib/api';

const NAV = [
  { icon: LayoutGrid,    label: 'Beranda',          href: '/dashboard/vendor',           badge: null as number | null },
  { icon: Boxes,         label: 'Katalog Aset',     href: '/dashboard/vendor/catalog',   badge: 35 },
  { icon: CalendarDays,  label: 'Jadwal & Pesanan', href: '/dashboard/vendor/orders',    badge: 2 },
  { icon: MessageCircle, label: 'Pesan',             href: '/dashboard/vendor/messages',  badge: 3 },
  { icon: Shield,        label: 'Pusat Klaim',       href: '/dashboard/vendor/claims',    badge: 1 },
  { icon: Wallet,        label: 'Keuangan & Wallet', href: '/dashboard/vendor/finance',   badge: null },
  { icon: Settings,      label: 'Pengaturan Toko',   href: '/dashboard/vendor/settings',  badge: null },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearSession();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-ink-900 flex flex-col">
      {/* ── TOP BAR ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-ink-900/95 backdrop-blur border-b border-ink-700/40 h-14 flex items-center gap-4 px-5">
        <div className="flex items-center gap-2 shrink-0 mr-1 cursor-default">
          <Image src="/logo.png" alt="FindStudio" width={28} height={28} className="object-contain" priority />
          <span className="font-display text-[0.92rem]">FindStudio</span>
          <span
            className="text-[0.58rem] px-1.5 py-0.5 rounded font-semibold"
            style={{ background: 'rgba(129,140,248,0.16)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.3)' }}
          >
            Vendor
          </span>
        </div>

        <div className="flex-1 max-w-xs relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
          <input
            className="field !pl-9 !py-1.5 text-sm w-full"
            placeholder="Cari pesanan, aset, atau klien…"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <a
            href="/browse"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition"
            style={{ borderColor: 'rgba(129,140,248,0.35)', color: '#818cf8' }}
          >
            <Store className="w-3.5 h-3.5" /> Etalase Publik
          </a>

          <button className="relative p-2 rounded-full hover:bg-ink-700/40 transition">
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            <span
              className="absolute top-0.5 right-0.5 w-3.5 h-3.5 text-[0.5rem] rounded-full font-bold flex items-center justify-center"
              style={{ background: '#818cf8', color: '#1a1c2e' }}
            >5</span>
          </button>

          <button className="flex items-center gap-2">
            <div
              className="relative w-7 h-7 rounded-full overflow-hidden ring-2"
              style={{ '--tw-ring-color': '#818cf8' } as React.CSSProperties}
            >
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80"
                alt="" fill className="object-cover" sizes="28px"
              />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-medium">Aperture Rental</div>
              <div className="text-[0.6rem] text-ink-400">★ 4.96</div>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full text-ink-400 hover:text-red-400 hover:bg-red-400/5 transition"
          >
            <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* ── MOBILE NAV (horizontal scroll) ──────────────── */}
      <nav className="lg:hidden sticky top-14 z-30 bg-ink-900/95 backdrop-blur border-b border-ink-700/40 flex gap-1.5 overflow-x-auto px-4 py-2.5">
        {NAV.map((item) => {
          const active =
            item.href === '/dashboard/vendor' ? path === item.href : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition"
              style={
                active
                  ? { background: 'rgba(129,140,248,0.13)', color: '#a5b4fc', border: '1px solid rgba(129,140,248,0.35)' }
                  : { color: '#9399ba', border: '1px solid rgba(103,111,157,0.25)' }
              }
            >
              <item.icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              {item.label}
              {item.badge !== null && (
                <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full font-bold" style={{ background: '#818cf8', color: '#1a1c2e' }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* ── SIDEBAR ─────────────────────────────────────── */}
        <aside className="hidden lg:flex w-[210px] shrink-0 flex-col border-r border-ink-700/30 overflow-y-auto">
          <nav className="flex-1 p-3 pt-4 space-y-0.5">
            {NAV.map((item) => {
              const active =
                item.href === '/dashboard/vendor'
                  ? path === item.href
                  : path.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={
                    active
                      ? { background: 'rgba(129,140,248,0.13)', color: '#a5b4fc', border: '1px solid rgba(129,140,248,0.35)' }
                      : { color: '#9399ba' }
                  }
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    {item.label}
                  </span>
                  {item.badge !== null && (
                    <span
                      className="text-[0.6rem] min-w-[1.1rem] text-center px-1 py-0.5 rounded-full font-bold"
                      style={{ background: '#818cf8', color: '#1a1c2e' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-ink-700/30">
            <div className="px-3 py-1.5">
              <div className="text-xs font-medium truncate">Aperture Rental Co.</div>
              <div className="text-[0.6rem] text-ink-500 truncate">aperture@vendor.com</div>
            </div>
          </div>
        </aside>

        {/* ── PAGE CONTENT ────────────────────────────────── */}
        <main className="flex-1 min-w-0 overflow-y-auto px-5 lg:px-9 py-7">
          {children}
        </main>
      </div>
    </div>
  );
}
