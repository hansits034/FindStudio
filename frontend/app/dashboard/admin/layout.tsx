'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid, Users, Boxes, Wallet, ShieldAlert, Gift,
  Bell, Search, LogOut, ScrollText, MessageCircle,
} from 'lucide-react';
import { clearSession } from '@/lib/api';

const EM = '#34d399';

const NAV = [
  { icon: LayoutGrid,  label: 'Dasbor Utama',      href: '/dashboard/admin',          badge: null as number | null },
  { icon: Users,       label: 'Pengguna & KYC',     href: '/dashboard/admin/users',    badge: 17 },
  { icon: Boxes,       label: 'Moderasi Katalog',   href: '/dashboard/admin/catalog',  badge: 6 },
  { icon: Wallet,      label: 'Keuangan & Escrow',  href: '/dashboard/admin/finance',  badge: 4 },
  { icon: ShieldAlert, label: 'Resolusi & Klaim',   href: '/dashboard/admin/disputes', badge: 3 },
  { icon: Gift,        label: 'Loyalitas & Promo',  href: '/dashboard/admin/promo',    badge: null },
  { icon: MessageCircle, label: 'Pesan & Dukungan', href: '/dashboard/admin/messages', badge: 9 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
            style={{ background: 'rgba(52,211,153,0.16)', color: EM, border: '1px solid rgba(52,211,153,0.3)' }}
          >
            Admin
          </span>
        </div>

        <div className="flex-1 max-w-xs relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
          <input
            className="field !pl-9 !py-1.5 text-sm w-full"
            placeholder="Cari pengguna, transaksi, atau tiket…"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/dashboard/admin/disputes"
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition"
            style={{ borderColor: 'rgba(52,211,153,0.35)', color: EM }}
          >
            <ScrollText className="w-3.5 h-3.5" /> Audit Log
          </Link>

          <button className="relative p-2 rounded-full hover:bg-ink-700/40 transition">
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            <span
              className="absolute top-0.5 right-0.5 w-3.5 h-3.5 text-[0.5rem] rounded-full font-bold flex items-center justify-center"
              style={{ background: EM, color: '#1a1c2e' }}
            >9</span>
          </button>

          <button className="flex items-center gap-2">
            <div
              className="relative w-7 h-7 rounded-full overflow-hidden ring-2 flex items-center justify-center text-[0.6rem] font-bold text-ink-900"
              style={{ background: EM, '--tw-ring-color': EM } as React.CSSProperties}
            >
              AF
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-medium">Admin FindStudio</div>
              <div className="text-[0.6rem] text-ink-400">Super Admin</div>
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
            item.href === '/dashboard/admin' ? path === item.href : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition"
              style={
                active
                  ? { background: 'rgba(52,211,153,0.13)', color: '#6ee7b7', border: '1px solid rgba(52,211,153,0.35)' }
                  : { color: '#9399ba', border: '1px solid rgba(103,111,157,0.25)' }
              }
            >
              <item.icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              {item.label}
              {item.badge !== null && (
                <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full font-bold" style={{ background: EM, color: '#1a1c2e' }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* ── SIDEBAR ─────────────────────────────────────── */}
        <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-ink-700/30 overflow-y-auto">
          <nav className="flex-1 p-3 pt-4 space-y-0.5">
            {NAV.map((item) => {
              const active =
                item.href === '/dashboard/admin'
                  ? path === item.href
                  : path.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={
                    active
                      ? { background: 'rgba(52,211,153,0.13)', color: '#6ee7b7', border: '1px solid rgba(52,211,153,0.35)' }
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
                      style={{ background: EM, color: '#1a1c2e' }}
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
              <div className="text-xs font-medium truncate">Admin FindStudio</div>
              <div className="text-[0.6rem] text-ink-500 truncate">admin@findstudio.id</div>
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
