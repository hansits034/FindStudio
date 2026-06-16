import { formatIDR } from '@/lib/mockData';
import { CalendarDays, Check, X, ChevronRight, Clock, CheckCircle2, Package } from 'lucide-react';

const VC = '#818cf8';

const COLUMNS = [
  {
    id: 'waiting',
    label: 'Menunggu Konfirmasi',
    color: VC,
    bg: 'rgba(129,140,248,0.08)',
    border: 'rgba(129,140,248,0.3)',
    orders: [
      { id: 'ORD-091', client: 'Dimas P.',  avatar: 'D', item: 'Sony A7 IV + Lensa 24-70', dates: '19–22 Jun', total: 1500000 },
      { id: 'ORD-092', client: 'Rina C.',   avatar: 'R', item: 'Aputure 600X Pro',          dates: '20–22 Jun', total: 840000  },
    ],
    actions: true,
  },
  {
    id: 'ready',
    label: 'Siap Diambil',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.3)',
    orders: [
      { id: 'ORD-089', client: 'Galih S.', avatar: 'G', item: 'Canon RF 24-70 f/2.8', dates: '16–18 Jun', total: 1050000 },
    ],
    actions: false,
  },
  {
    id: 'ongoing',
    label: 'Sedang Disewa',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.3)',
    orders: [
      { id: 'ORD-085', client: 'Maya R.',  avatar: 'M', item: 'Sony A7 IV',      dates: '10–16 Jun', total: 1500000 },
      { id: 'ORD-083', client: 'Tania W.', avatar: 'T', item: 'DJI RS 3 Pro',    dates: '13–16 Jun', total: 750000  },
      { id: 'ORD-080', client: 'Bara I.',  avatar: 'B', item: 'Rode NTG5',       dates: '14–16 Jun', total: 480000  },
    ],
    actions: false,
  },
  {
    id: 'done',
    label: 'Selesai / Dikembalikan',
    color: '#9399ba',
    bg: 'rgba(147,153,186,0.06)',
    border: 'rgba(147,153,186,0.2)',
    orders: [
      { id: 'ORD-077', client: 'Dimas P.', avatar: 'D', item: 'Manfrotto Tripod', dates: '5–9 Jun',  total: 400000 },
      { id: 'ORD-075', client: 'Rina C.',  avatar: 'R', item: 'Godox AD300',      dates: '2–5 Jun',  total: 540000 },
    ],
    actions: false,
  },
];

const JUNE_2026 = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, null, null, null, null],
];

const BOOKED = new Set([1, 2, 3, 8, 9, 10, 13, 14, 15, 19, 20, 21, 22, 23, 24]);
const BLOCKED = new Set([27, 28]);
const TODAY = 16;

export default function OrdersPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="eyebrow mb-1.5" style={{ color: VC }}>Jadwal & Pesanan</div>
          <h1 className="headline text-4xl lg:text-5xl">Kelola <span className="italic font-light" style={{ color: VC }}>Pesananmu.</span></h1>
          <p className="text-sm text-ink-300 mt-1.5">8 pesanan aktif · 2 menunggu konfirmasi</p>
        </div>
      </div>

      {/* ── KANBAN ───────────────────────────────────────── */}
      <section className="mb-10">
        <div className="eyebrow text-ink-400 mb-4">Status Pesanan</div>
        <div className="grid xl:grid-cols-4 gap-4 overflow-x-auto">
          {COLUMNS.map((col) => (
            <div key={col.id} className="min-w-[240px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: col.color }} />
                <span className="text-xs font-medium" style={{ color: col.color }}>{col.label}</span>
                <span className="text-[0.6rem] px-1.5 py-0.5 rounded-full ml-auto" style={{ background: `${col.color}20`, color: col.color }}>
                  {col.orders.length}
                </span>
              </div>
              <div className="space-y-3">
                {col.orders.map((o) => (
                  <div key={o.id} className="card p-4" style={{ borderColor: col.border, background: col.bg }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold shrink-0 text-ink-900" style={{ background: col.color }}>
                        {o.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[0.65rem] font-medium truncate">{o.client}</div>
                        <div className="text-[0.6rem] text-ink-500">{o.id}</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium mb-1 leading-snug">{o.item}</div>
                    <div className="text-[0.65rem] text-ink-400 mb-2 flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" /> {o.dates}
                    </div>
                    <div className="text-amber-400 tabular text-xs font-display mb-3">{formatIDR(o.total)}</div>
                    {col.actions && (
                      <div className="flex gap-1.5">
                        <button className="flex-1 flex items-center justify-center gap-1 text-[0.65rem] py-1.5 rounded-lg border border-red-400/35 text-red-400 hover:bg-red-400/10 transition">
                          <X className="w-3 h-3" /> Tolak
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 text-[0.65rem] py-1.5 rounded-lg font-medium transition" style={{ background: '#34d399', color: '#1a1c2e' }}>
                          <Check className="w-3 h-3" /> Terima
                        </button>
                      </div>
                    )}
                    {col.id === 'ready' && (
                      <div className="text-[0.65rem] text-center py-1.5 rounded-lg" style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa' }}>
                        Menunggu klien pickup
                      </div>
                    )}
                    {col.id === 'ongoing' && (
                      <div className="text-[0.65rem] flex items-center gap-1 justify-center py-1 text-ink-400">
                        <Clock className="w-3 h-3" /> Pengembalian hari ini
                      </div>
                    )}
                    {col.id === 'done' && (
                      <div className="flex items-center gap-1 text-[0.65rem] text-emerald-400 justify-center">
                        <CheckCircle2 className="w-3 h-3" /> Selesai
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CALENDAR ─────────────────────────────────────── */}
      <section className="card p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="eyebrow text-ink-400 mb-1">Kalender Ketersediaan</div>
            <h2 className="font-display text-2xl">Juni 2026</h2>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: 'rgba(129,140,248,0.4)' }} /> Terpesan</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ink-700/60" /> Diblokir vendor</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: 'rgba(129,140,248,0.9)' }} /> Hari ini</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d) => (
            <div key={d} className="text-[0.65rem] text-ink-500 py-1 font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {JUNE_2026.flat().map((day, i) => {
            if (!day) return <div key={i} />;
            const isBooked  = BOOKED.has(day);
            const isBlocked = BLOCKED.has(day);
            const isToday   = day === TODAY;
            return (
              <button
                key={i}
                className="aspect-square flex items-center justify-center text-sm rounded-lg transition font-medium"
                style={
                  isToday   ? { background: VC, color: '#1a1c2e', fontWeight: 700 } :
                  isBooked  ? { background: 'rgba(129,140,248,0.3)', color: '#a5b4fc' } :
                  isBlocked ? { background: 'rgba(103,111,157,0.25)', color: '#9399ba' } :
                              { color: '#e2e5f1' }
                }
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-5 border-t border-ink-700/40 flex gap-3 flex-wrap">
          <button className="text-xs px-4 py-2 rounded-full border transition" style={{ borderColor: 'rgba(249,177,122,0.4)', color: '#f9b17a' }}>
            + Blokir Tanggal Manual
          </button>
          <button className="text-xs px-4 py-2 rounded-full border border-ink-700/40 hover:border-[#818cf8]/30 transition text-ink-400">
            Buka Blokir Tanggal
          </button>
        </div>
      </section>
    </>
  );
}
