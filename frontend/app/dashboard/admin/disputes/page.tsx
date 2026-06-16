'use client';

import { useState } from 'react';
import { formatIDR } from '@/lib/mockData';
import {
  MessageSquareWarning, ShieldAlert, Clock, CheckCircle2, ImageIcon, AlertTriangle,
} from 'lucide-react';

const DISPUTES = [
  { id: 'd1', type: 'Keterlambatan Pengembalian', client: 'Maya R.', vendor: 'Aperture Rental Co.', item: 'Sony A7 IV Body', opened: '3 jam lalu' },
  { id: 'd2', type: 'Layanan Tidak Sesuai', client: 'Rakha P.', vendor: 'Tone Collective', item: 'Color Grading Sinematik', opened: 'Kemarin' },
];

const CLAIMS = [
  {
    id: 'c1', vendor: 'Skyborne Aerials', item: 'DJI Mavic 3 Pro Cine — propeller patah',
    repairCost: 385000, slaMinutesLeft: 142, hasPhotos: true,
  },
  {
    id: 'c2', vendor: 'Roll House Studio', item: 'Godox AD600 Pro — flash tube pecah',
    repairCost: 620000, slaMinutesLeft: 19, hasPhotos: true,
  },
];

function sla(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const urgent = min < 60;
  return (
    <span className={`flex items-center gap-1 text-xs ${urgent ? 'text-red-400' : 'text-amber-400'}`}>
      <Clock className="w-3.5 h-3.5" /> {h}j {m}m tersisa
    </span>
  );
}

export default function AdminDisputesPage() {
  const [claims, setClaims] = useState(CLAIMS);
  const [disputes] = useState(DISPUTES);

  function approveClaim(id: string) {
    setClaims((c) => c.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="mb-8">
        <div className="eyebrow text-emerald-400 mb-2">Pusat Resolusi</div>
        <h1 className="headline text-4xl">
          Sengketa & <span className="italic text-emerald-400 font-light">klaim Proteksi.</span>
        </h1>
      </div>

      {/* Dispute tickets */}
      <section className="card overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between">
          <h3 className="font-display text-xl flex items-center gap-2">
            <MessageSquareWarning className="w-4 h-4 text-amber-400" /> Tiket Sengketa
          </h3>
          <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
            {disputes.length} terbuka
          </span>
        </div>
        <ul className="divide-y divide-ink-700/30">
          {disputes.map((d) => (
            <li key={d.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-sm font-medium">{d.type}</div>
                <div className="text-[0.65rem] text-ink-400">{d.client} vs {d.vendor} · {d.item} · dibuka {d.opened}</div>
              </div>
              <button className="btn-ghost !py-1.5 !px-3 text-xs">
                Tinjau Riwayat Chat
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Protection claims with SLA */}
      <section className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between">
          <h3 className="font-display text-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" /> Klaim Proteksi Alat
          </h3>
          <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-red-400/10 text-red-300 border border-red-400/30">
            SLA &lt; 4 jam
          </span>
        </div>

        {claims.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-ink-400">Tidak ada klaim Proteksi yang menunggu.</div>
        ) : (
          <ul className="divide-y divide-ink-700/30">
            {claims.map((c) => (
              <li key={c.id} className="px-6 py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="text-sm font-medium">{c.vendor}</div>
                    <div className="text-[0.65rem] text-ink-400">{c.item}</div>
                  </div>
                  {sla(c.slaMinutesLeft)}
                </div>

                <div className="flex items-center gap-2 mb-3 text-xs text-ink-300">
                  <ImageIcon className="w-3.5 h-3.5 text-ink-400" /> Foto sebelum/sesudah terlampir
                  {c.slaMinutesLeft < 60 && (
                    <span className="flex items-center gap-1 text-red-400 ml-2">
                      <AlertTriangle className="w-3.5 h-3.5" /> Mendekati batas SLA
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="text-sm">
                    Estimasi biaya perbaikan (service center resmi):{' '}
                    <span className="text-emerald-400 tabular font-medium">{formatIDR(c.repairCost)}</span>
                  </div>
                  <button
                    onClick={() => approveClaim(c.id)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve Claim — transfer dari Protection Fund
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
