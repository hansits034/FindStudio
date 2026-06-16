import { formatIDR } from '@/lib/mockData';
import { Wallet, ArrowDownToLine, Clock, CheckCircle2, Shield, TrendingUp } from 'lucide-react';

const VC = '#818cf8';

const TRANSACTIONS = [
  {
    id: 'TRX-210', date: '14 Jun 2026', item: 'Sony A7 IV (Maya R., 3 hari)',
    gross: 1500000, commission: 10000, protection: 150000, net: 1340000, status: 'Tertahan',
  },
  {
    id: 'TRX-208', date: '11 Jun 2026', item: 'Canon RF 24-70 (Galih S., 2 hari)',
    gross: 700000, commission: 10000, protection: 0, net: 690000, status: 'Cair',
  },
  {
    id: 'TRX-205', date: '8 Jun 2026', item: 'Rode NTG5 (Bara I., 3 hari)',
    gross: 480000, commission: 10000, protection: 48000, net: 422000, status: 'Cair',
  },
  {
    id: 'TRX-200', date: '2 Jun 2026', item: 'DJI RS 3 Pro (Tania W., 2 hari)',
    gross: 750000, commission: 10000, protection: 75000, net: 665000, status: 'Cair',
  },
  {
    id: 'TRX-195', date: '28 Mei 2026', item: 'Manfrotto Tripod (Dimas P., 4 hari)',
    gross: 400000, commission: 10000, protection: 0, net: 390000, status: 'Cair',
  },
];

const BANKS = [
  { name: 'BCA', logo: 'BCA' },
  { name: 'Mandiri', logo: 'MDR' },
  { name: 'BNI', logo: 'BNI' },
  { name: 'BRI', logo: 'BRI' },
  { name: 'GoPay', logo: 'GP' },
  { name: 'OVO', logo: 'OVO' },
];

export default function FinancePage() {
  const saldoAktif = 2845000;
  const saldoTertahan = 4200000;
  const totalBulanIni = TRANSACTIONS.reduce((s, t) => s + t.net, 0);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="eyebrow mb-1.5" style={{ color: VC }}>Keuangan & Wallet</div>
        <h1 className="headline text-4xl lg:text-5xl">
          Arus Kas <span className="italic font-light" style={{ color: VC }}>Transparan.</span>
        </h1>
        <p className="text-sm text-ink-300 mt-1.5">Semua potongan biaya ditampilkan secara jelas per transaksi.</p>
      </div>

      {/* Balance cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {/* Saldo aktif */}
        <div className="card p-6" style={{ borderColor: 'rgba(52,211,153,0.35)', background: 'rgba(52,211,153,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <div className="eyebrow text-emerald-400">Saldo Aktif</div>
          </div>
          <div className="font-display text-3xl text-emerald-400 tabular mb-1">{formatIDR(saldoAktif)}</div>
          <div className="text-xs text-ink-400 mb-4">Siap ditarik ke rekening bank</div>
          <button
            className="w-full text-sm flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition"
            style={{ background: '#34d399', color: '#1a1c2e' }}
          >
            <ArrowDownToLine className="w-4 h-4" /> Tarik Dana
          </button>
        </div>

        {/* Saldo tertahan */}
        <div className="card p-6" style={{ borderColor: 'rgba(129,140,248,0.35)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5" style={{ color: VC }} />
            <div className="eyebrow" style={{ color: VC }}>Saldo Tertahan (Escrow)</div>
          </div>
          <div className="font-display text-3xl text-amber-400 tabular mb-1">{formatIDR(saldoTertahan)}</div>
          <div className="text-xs text-ink-400 mb-4">Dari 3 pesanan yang sedang berjalan</div>
          <div className="text-xs p-3 rounded-lg" style={{ background: 'rgba(129,140,248,0.08)' }}>
            Dana dilepas 1×24 jam setelah alat dikembalikan tanpa masalah.
          </div>
        </div>

        {/* Monthly stat */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <div className="eyebrow text-ink-400">Total Bersih Bulan Ini</div>
          </div>
          <div className="font-display text-3xl text-amber-400 tabular mb-1">{formatIDR(totalBulanIni)}</div>
          <div className="text-xs text-ink-400 mb-4">5 transaksi selesai</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18% vs bulan lalu
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <section className="card p-6 mb-8">
        <h3 className="font-display text-xl mb-1">Riwayat Transaksi</h3>
        <p className="text-xs text-ink-400 mb-5">Komisi vendor Rp 10.000/transaksi · Proteksi 10% (jika diaktifkan)</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-ink-700/40">
                {['Tanggal', 'Pesanan', 'Kotor', 'Komisi (Rp 10rb)', 'Proteksi (10%)', 'Bersih', 'Status'].map((h) => (
                  <th key={h} className="text-left text-[0.65rem] text-ink-400 pb-3 pr-4 eyebrow font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-0">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="border-b border-ink-700/20 last:border-0">
                  <td className="py-3 pr-4 text-xs text-ink-400 whitespace-nowrap">{t.date}</td>
                  <td className="py-3 pr-4">
                    <div className="text-xs font-medium leading-tight">{t.item}</div>
                    <div className="text-[0.6rem] text-ink-500">{t.id}</div>
                  </td>
                  <td className="py-3 pr-4 text-xs tabular text-ink-200 whitespace-nowrap">{formatIDR(t.gross)}</td>
                  <td className="py-3 pr-4 text-xs tabular text-red-400 whitespace-nowrap">−{formatIDR(t.commission)}</td>
                  <td className="py-3 pr-4 text-xs tabular whitespace-nowrap" style={{ color: t.protection ? '#f87171' : '#9399ba' }}>
                    {t.protection ? `−${formatIDR(t.protection)}` : '—'}
                  </td>
                  <td className="py-3 pr-4 text-sm tabular text-amber-400 font-display whitespace-nowrap">{formatIDR(t.net)}</td>
                  <td className="py-3">
                    <span
                      className="text-[0.6rem] px-2 py-0.5 rounded-full font-medium"
                      style={
                        t.status === 'Cair'
                          ? { background: 'rgba(52,211,153,0.12)', color: '#34d399' }
                          : { background: 'rgba(129,140,248,0.12)', color: VC }
                      }
                    >
                      {t.status === 'Cair' ? <CheckCircle2 className="inline w-2.5 h-2.5 mr-0.5" /> : <Clock className="inline w-2.5 h-2.5 mr-0.5" />}
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Withdraw / bank settings */}
      <section className="card p-6">
        <h3 className="font-display text-xl mb-5">Tarik Dana ke Rekening</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="eyebrow text-ink-400 block mb-3">Pilih Bank / E-wallet</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {BANKS.map((b, i) => (
                <button
                  key={b.name}
                  className="p-3 rounded-xl border text-xs font-bold transition"
                  style={i === 0
                    ? { borderColor: 'rgba(129,140,248,0.5)', background: 'rgba(129,140,248,0.1)', color: '#a5b4fc' }
                    : { borderColor: 'rgba(103,111,157,0.3)', color: '#9399ba' }}
                >
                  {b.logo}
                </button>
              ))}
            </div>
            <div>
              <label className="eyebrow text-ink-400 block mb-2">Nomor Rekening</label>
              <input className="field text-sm" defaultValue="0888-4521-3345" />
            </div>
          </div>
          <div>
            <label className="eyebrow text-ink-400 block mb-2">Jumlah Penarikan (Rp)</label>
            <input className="field text-sm mb-3" defaultValue="2845000" />
            <div className="p-4 rounded-xl text-xs space-y-1.5 mb-4" style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.2)' }}>
              <div className="flex justify-between"><span className="text-ink-400">Saldo aktif</span><span className="tabular">{formatIDR(saldoAktif)}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Biaya transfer</span><span className="tabular text-red-400">−Rp 0</span></div>
              <div className="flex justify-between font-medium border-t border-ink-700/40 pt-1.5"><span>Diterima</span><span className="text-emerald-400 tabular">{formatIDR(saldoAktif)}</span></div>
            </div>
            <button className="w-full text-sm flex items-center justify-center gap-2 py-3 rounded-xl font-medium" style={{ background: '#34d399', color: '#1a1c2e' }}>
              <ArrowDownToLine className="w-4 h-4" /> Konfirmasi Penarikan
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
