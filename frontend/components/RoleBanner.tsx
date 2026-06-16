import Link from 'next/link';
import { Camera, Store, ShieldCheck, CalendarCheck, MessageCircle, Heart, UserCircle2 } from 'lucide-react';

type Role = 'CLIENT' | 'VENDOR' | 'ADMIN';

const CONFIG: Record<Role, { label: string; icon: any; color: string; tint: string; desc: string }> = {
  CLIENT: {
    label: 'Mode Kreator',
    icon: Camera,
    color: '#f9b17a',
    tint: 'rgba(249,177,122,0.12)',
    desc: 'Anda menyewa alat, studio & jasa.',
  },
  VENDOR: {
    label: 'Mode Vendor',
    icon: Store,
    color: '#818cf8',
    tint: 'rgba(129,140,248,0.10)',
    desc: 'Anda menyewakan & mengelola aset.',
  },
  ADMIN: {
    label: 'Mode Admin',
    icon: ShieldCheck,
    color: '#34d399',
    tint: 'rgba(52,211,153,0.08)',
    desc: 'Pemantauan ekosistem FindStudio.',
  },
};

export default function RoleBanner({ role, name }: { role: Role; name: string }) {
  const c = CONFIG[role];
  const Icon = c.icon;
  return (
    <div
      className="border-b"
      style={{ background: c.tint, borderColor: `${c.color}40` }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: c.color, color: '#2d3250' }}
          >
            <Icon className="w-4 h-4" />
          </span>
          <div className="leading-tight">
            <span className="text-sm font-medium" style={{ color: c.color }}>{c.label}</span>
            <span className="text-sm text-ink-300"> · {name}</span>
            <div className="text-[0.7rem] text-ink-400">{c.desc}</div>
          </div>
        </div>

        {role !== 'ADMIN' && (
          <div className="flex items-center gap-2">
            <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border hover:bg-white/5 transition" style={{ borderColor: `${c.color}55` }}>
              <CalendarCheck className="w-3.5 h-3.5" style={{ color: c.color }} /> Pesanan & Jadwal
            </Link>
            <Link href="/messages" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border hover:bg-white/5 transition" style={{ borderColor: `${c.color}55` }}>
              <MessageCircle className="w-3.5 h-3.5" style={{ color: c.color }} /> Chat
            </Link>
            {role === 'CLIENT' && (
              <>
                <Link href="/wishlist" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border hover:bg-white/5 transition" style={{ borderColor: `${c.color}55` }}>
                  <Heart className="w-3.5 h-3.5" style={{ color: c.color }} /> Favorit
                </Link>
                <Link href="/account" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border hover:bg-white/5 transition" style={{ borderColor: `${c.color}55` }}>
                  <UserCircle2 className="w-3.5 h-3.5" style={{ color: c.color }} /> Akun
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
