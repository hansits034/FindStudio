import { formatIDR } from '@/lib/mockData';
import { Shield, CheckCircle2, Clock, Plus, Upload, AlertCircle } from 'lucide-react';

const VC = '#818cf8';

const ACTIVE_CLAIMS = [
  {
    id: 'KLM-021',
    item: 'DJI Mavic 3',
    issue: 'Baling-baling retak saat dikembalikan klien',
    amount: 385000,
    filed: '24 Mei 2026',
    steps: [
      { label: 'Klaim diajukan',                 done: true,    date: '24 Mei 2026'  },
      { label: 'Foto before/after diverifikasi', done: true,    date: '24 Mei 2026'  },
      { label: 'Estimasi servis ditinjau',        current: true, date: 'Sedang diproses…' },
      { label: 'Dana dicairkan ke wallet',        done: false,   date: 'Estimasi: 26 Mei' },
    ],
  },
];

const PAST_CLAIMS = [
  { id: 'KLM-018', item: 'Rode NTG4+', issue: 'Shock mount patah',    amount: 180000, settled: '14 Apr 2026', status: 'Cair' },
  { id: 'KLM-015', item: 'Godox AD300', issue: 'Kabel sync rusak',     amount: 95000,  settled: '2 Mar 2026',  status: 'Cair' },
  { id: 'KLM-010', item: 'Manfrotto 502', issue: 'Head tilting lepas', amount: 250000, settled: '18 Jan 2026', status: 'Cair' },
];

export default function ClaimsPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="eyebrow mb-1.5" style={{ color: VC }}>Pusat Klaim Proteksi</div>
          <h1 className="headline text-4xl lg:text-5xl">
            Asetmu <span className="italic font-light" style={{ color: '#34d399' }}>terlindungi.</span>
          </h1>
          <p className="text-sm text-ink-300 mt-1.5">1 klaim aktif · 3 klaim selesai (total dicairkan {formatIDR(525000)})</p>
        </div>
        <button className="text-sm inline-flex items-center gap-2 py-2.5 px-5 rounded-full font-medium" style={{ background: '#34d399', color: '#1a1c2e' }}>
          <Plus className="w-4 h-4" /> Ajukan Klaim Baru
        </button>
      </div>

      {/* Active claims */}
      <section className="mb-8">
        <div className="eyebrow text-ink-400 mb-4">Klaim Aktif</div>
        {ACTIVE_CLAIMS.map((c) => (
          <div key={c.id} className="card p-6" style={{ borderColor: 'rgba(249,177,122,0.35)' }}>
            <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-xl">{c.item}</div>
                  <div className="text-sm text-ink-400 mt-0.5">{c.issue}</div>
                  <div className="text-[0.65rem] text-ink-500 mt-1">{c.id} · Diajukan {c.filed}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="eyebrow text-ink-400 mb-1">Nilai klaim</div>
                <div className="font-display text-2xl text-amber-400 tabular">{formatIDR(c.amount)}</div>
              </div>
            </div>
            <div className="space-y-2">
              {c.steps.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  {s.done    ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> :
                   s.current ? <Clock className="w-5 h-5 text-amber-400 animate-shimmer shrink-0" /> :
                               <div className="w-5 h-5 rounded-full border-2 border-ink-700/40 shrink-0" />}
                  <span className={`flex-1 text-sm ${s.done || s.current ? 'text-ink-200' : 'text-ink-400'}`}>{s.label}</span>
                  <span className="text-xs text-ink-400 tabular">{s.date}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* New claim form */}
      <section className="card p-6 lg:p-8 mb-8" style={{ borderColor: 'rgba(52,211,153,0.25)' }}>
        <div className="eyebrow mb-2" style={{ color: '#34d399' }}>Ajukan Klaim Baru</div>
        <h2 className="font-display text-2xl mb-1">Laporkan Kerusakan Alat</h2>
        <p className="text-sm text-ink-300 mb-6">Dana perbaikan dicairkan dari kas FindStudio dalam &lt; 4 jam setelah verifikasi.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="eyebrow text-ink-400 block mb-2">ID Pesanan</label>
            <input className="field text-sm" placeholder="Contoh: ORD-091" />
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Nama Alat</label>
            <input className="field text-sm" placeholder="Nama alat yang rusak" />
          </div>
        </div>
        <div className="mb-5">
          <label className="eyebrow text-ink-400 block mb-2">Deskripsi Kerusakan</label>
          <textarea className="field text-sm !py-3 resize-none h-24" placeholder="Jelaskan kerusakan secara detail…" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Foto / Video Before-After</label>
            <div className="border-2 border-dashed border-ink-700/50 rounded-xl p-5 text-center hover:border-emerald-400/30 transition cursor-pointer">
              <Upload className="w-6 h-6 text-ink-500 mx-auto mb-1.5" />
              <div className="text-xs text-ink-400">Drag foto/video bukti kerusakan</div>
            </div>
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Nota Estimasi Servis Resmi</label>
            <div className="border-2 border-dashed border-ink-700/50 rounded-xl p-5 text-center hover:border-emerald-400/30 transition cursor-pointer">
              <Upload className="w-6 h-6 text-ink-500 mx-auto mb-1.5" />
              <div className="text-xs text-ink-400">Upload nota bengkel / toko servis</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 p-4 rounded-xl mb-5" style={{ background: 'rgba(249,177,122,0.08)', border: '1px solid rgba(249,177,122,0.2)' }}>
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-ink-300">
            Klaim proteksi hanya berlaku untuk alat yang telah mengaktifkan sakelar Proteksi FindStudio.
            Biaya pemotongan 10% dari setiap transaksi sewa akan dikumpulkan sebagai dana proteksi.
          </p>
        </div>
        <button className="text-sm inline-flex items-center gap-2 py-3 px-6 rounded-full font-medium" style={{ background: '#34d399', color: '#1a1c2e' }}>
          <Plus className="w-4 h-4" /> Kirim Klaim
        </button>
      </section>

      {/* Past claims */}
      <section className="card p-6">
        <h3 className="font-display text-xl mb-5">Riwayat Klaim</h3>
        <div className="space-y-3">
          {PAST_CLAIMS.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-3 border-b border-ink-700/30 last:border-0">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-medium">{c.item}</div>
                  <div className="text-[0.65rem] text-ink-400">{c.issue} · {c.id}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-emerald-400 tabular font-display">{formatIDR(c.amount)}</div>
                <div className="text-[0.65rem] text-ink-400">{c.settled}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
