'use client';

import { useState } from 'react';
import { Send, Search, Store, Users2, ShieldCheck } from 'lucide-react';
import { vendors } from '@/lib/mockData';

const EM = '#34d399';

type Thread = {
  id: string;
  group: 'vendor' | 'klien';
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
};

const VENDOR_THREADS: Thread[] = vendors.slice(0, 6).map((v, i) => ({
  id: `vendor-${v.id}`,
  group: 'vendor',
  name: v.name,
  avatar: v.name.charAt(0),
  lastMsg: [
    'Mau tanya soal proses verifikasi KYC saya.',
    'Dana hasil sewa belum masuk ke rekening.',
    'Bagaimana cara naikkan limit alat yang bisa disewakan?',
    'Ada klien komplain soal kondisi alat, butuh bantuan admin.',
    'Tolong review ulang dokumen yang saya unggah.',
    'Terima kasih, masalah saya sudah selesai.',
  ][i] ?? 'Halo admin, mohon bantuannya.',
  time: ['10:21', '09:48', 'Kem.', 'Kem.', '2 hr', '1 hr'][i] ?? '',
  unread: [2, 0, 1, 3, 0, 0][i] ?? 0,
}));

const KLIEN_THREADS: Thread[] = [
  { id: 'klien-1', group: 'klien', name: 'Maya R.', avatar: 'M', lastMsg: 'Pesanan saya belum dikonfirmasi vendor, sudah 1 hari.', time: '11:05', unread: 1 },
  { id: 'klien-2', group: 'klien', name: 'Galih Saputra', avatar: 'G', lastMsg: 'Saya mau klaim Proteksi untuk alat yang rusak.', time: '09:30', unread: 2 },
  { id: 'klien-3', group: 'klien', name: 'Tania Wijaya', avatar: 'T', lastMsg: 'Bagaimana cara refund jika vendor cancel sepihak?', time: 'Kem.', unread: 0 },
  { id: 'klien-4', group: 'klien', name: 'Rakha Pratama', avatar: 'R', lastMsg: 'Terima kasih kak, sudah dibantu ya.', time: 'Kem.', unread: 0 },
];

const THREADS = [...VENDOR_THREADS, ...KLIEN_THREADS];

const SEED: Record<string, { from: 'admin' | 'user'; text: string; time: string }[]> = {
  'vendor-v1': [
    { from: 'user', text: 'Halo admin, mau tanya soal proses verifikasi KYC saya, sudah 3 hari belum ada update.', time: '10:15' },
    { from: 'admin', text: 'Halo, terima kasih sudah menghubungi. Saya cek dulu status dokumennya ya.', time: '10:18' },
    { from: 'user', text: 'Mau tanya soal proses verifikasi KYC saya.', time: '10:21' },
  ],
};

const TABS: { key: 'vendor' | 'klien'; label: string; icon: typeof Store; items: Thread[] }[] = [
  { key: 'vendor', label: 'Chat Vendor', icon: Store, items: VENDOR_THREADS },
  { key: 'klien', label: 'Chat Klien', icon: Users2, items: KLIEN_THREADS },
];

export default function AdminMessagesPage() {
  const [tab, setTab] = useState<'vendor' | 'klien'>('vendor');
  const [activeId, setActiveId] = useState('vendor-v1');
  const [input, setInput] = useState('');
  const [msgMap, setMsgMap] = useState(SEED);

  const active = THREADS.find((t) => t.id === activeId)!;
  const msgs = msgMap[activeId] ?? [];
  const visibleThreads = TABS.find((t) => t.key === tab)!.items;

  function send() {
    const text = input.trim();
    if (!text) return;
    setMsgMap((m) => ({
      ...m,
      [activeId]: [...(m[activeId] ?? []), { from: 'admin', text, time: 'Baru saja' }],
    }));
    setInput('');
  }

  function selectTab(key: 'vendor' | 'klien') {
    setTab(key);
    const first = TABS.find((t) => t.key === key)!.items[0];
    if (first) setActiveId(first.id);
  }

  return (
    <div>
      <div className="mb-6">
        <div className="eyebrow mb-1.5" style={{ color: EM }}>Pesan & Dukungan</div>
        <h1 className="headline text-4xl">
          Bantu <span className="italic font-light" style={{ color: EM }}>vendor & klienmu.</span>
        </h1>
      </div>

      <div className="flex gap-4 min-h-[620px]">
        <aside className="w-[280px] shrink-0 flex flex-col">
          {/* Klasifikasi vendor/klien sebagai tab di atas, bukan di-scroll */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => selectTab(t.key)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition"
                  style={
                    isActive
                      ? { background: `${EM}20`, color: EM, border: `1px solid ${EM}73` }
                      : { color: '#9399ba', border: '1px solid transparent' }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                  <span
                    className="text-[0.58rem] min-w-[1.05rem] text-center px-1 rounded-full font-bold"
                    style={isActive ? { background: EM, color: '#1a1c2e' } : { background: 'rgba(255,255,255,0.08)' }}
                  >
                    {t.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
            <input className="field !pl-9 !py-2 text-sm w-full" placeholder={`Cari ${tab === 'vendor' ? 'vendor' : 'klien'}…`} />
          </div>

          <div className="flex flex-col gap-1.5 overflow-y-auto">
            {visibleThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className="card p-3 text-left transition flex items-start gap-2.5"
                style={
                  activeId === t.id
                    ? { borderColor: `${EM}73`, background: `${EM}14` }
                    : undefined
                }
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-ink-900"
                  style={{ background: EM }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{t.name}</span>
                    <span className="text-[0.6rem] text-ink-500 shrink-0 ml-1">{t.time}</span>
                  </div>
                  <div className="text-[0.65rem] text-ink-400 truncate mt-0.5">{t.lastMsg}</div>
                </div>
                {t.unread > 0 && (
                  <span
                    className="text-[0.6rem] w-4 h-4 rounded-full font-bold flex items-center justify-center shrink-0"
                    style={{ background: EM, color: '#1a1c2e' }}
                  >
                    {t.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 flex flex-col card p-0 overflow-hidden">
          <div className="p-4 border-b border-ink-700/40 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-ink-900 shrink-0"
              style={{ background: EM }}
            >
              {active.avatar}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{active.name}</div>
              <div className="text-[0.65rem] text-ink-400 flex items-center gap-1.5">
                {active.group === 'vendor' ? <Store className="w-3 h-3" /> : <Users2 className="w-3 h-3" />}
                {active.group === 'vendor' ? 'Vendor' : 'Klien'}
              </div>
            </div>
            <div
              className="text-[0.65rem] px-2 py-1 rounded-full flex items-center gap-1.5"
              style={{ background: `${EM}20`, color: EM }}
            >
              <ShieldCheck className="w-3 h-3" /> Tim Admin
            </div>
          </div>

          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {msgs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2 py-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: `${EM}1a`, color: EM }}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-sm text-ink-200">Belum ada percakapan dengan {active.name}.</p>
                <p className="text-xs text-ink-400 max-w-xs">
                  Balasan akan terkirim langsung ke {active.group === 'vendor' ? 'dasbor vendor' : 'dasbor klien'} mereka.
                </p>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    m.from === 'admin'
                      ? { background: EM, color: '#1a1c2e', borderBottomRightRadius: 4 }
                      : { background: 'rgba(103,111,157,0.2)', borderBottomLeftRadius: 4 }
                  }
                >
                  {m.text}
                  <div className={`text-[0.58rem] mt-1 ${m.from === 'admin' ? 'text-emerald-900/60 text-right' : 'text-ink-500'}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-ink-700/40 flex gap-3">
            <input
              className="field flex-1 text-sm !py-2.5"
              placeholder={`Balas ${active.name}…`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button
              onClick={send}
              className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
              style={{ background: EM, color: '#1a1c2e' }}
            >
              <Send className="w-4 h-4" /> Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
