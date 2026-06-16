'use client';

import Navbar from '@/components/Navbar';
import { vendors } from '@/lib/mockData';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  Send, Search, Shield, MoreHorizontal, ImageIcon, X, Check, CheckCheck,
  Bell, CheckCircle2, Clock, AlertTriangle, ShieldCheck, ArrowLeft,
} from 'lucide-react';

const SYSTEM_NOTIFS = [
  { id: 1, icon: CheckCircle2, color: '#34d399', title: 'Pembayaran berhasil', desc: 'Pembayaran untuk Sony A7 IV Body (28-30 Mei) telah dikonfirmasi.', time: '2 jam lalu' },
  { id: 2, icon: CheckCircle2, color: '#34d399', title: 'Vendor mengonfirmasi pesananmu', desc: 'Aperture Rental Co. telah menerima pesanan #FS-BK1029.', time: 'Kemarin' },
  { id: 3, icon: AlertTriangle, color: '#f9b17a', title: 'Jangan lupa kembalikan alat', desc: 'Sony A7 IV harus dikembalikan hari ini sebelum jam 18:00.', time: 'Hari ini' },
  { id: 4, icon: Clock, color: '#818cf8', title: 'Pengingat pembayaran', desc: 'Selesaikan pembayaran keranjangmu sebelum slot tanggal hangus.', time: '3 hari lalu' },
];

type Msg =
  | { id: number; from: 'me' | 'them'; type: 'text'; text: string; time: string; read?: boolean }
  | { id: number; from: 'me' | 'them'; type: 'image'; imgSrc: string; time: string; read?: boolean };

// Omit biasa tidak terdistribusi pada union (hanya menyisakan properti bersama).
// Versi distributif ini menerapkan Omit ke tiap varian, jadi `text`/`imgSrc` tetap ada.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

const ADMIN_CONTACT = {
  id: 'admin', slug: 'admin-support', name: 'Admin FindStudio',
  avatar: '/logo.png', cover: '', location: '',
  verified: 'KYC' as const, rating: 0, responseTime: '< 1 jam',
  totalRentals: 0, joined: '', tagline: '',
  preview: 'Ada masalah pesanan, pembayaran, atau klaim? Chat kami di sini.',
  time: '', unread: 0,
};

const conversations = [
  ADMIN_CONTACT,
  ...vendors.map((v, i) => ({
    ...v,
    preview: [
      'Halo! Sony A7 IV-nya sudah saya cek, kondisi prima.',
      'Studio cyc tersedia tanggal 2 Juni. Saya kirim foto terkini ya.',
      'Drone Mavic 3-nya sudah siap, sudah saya kalibrasi ulang.',
      'Untuk color grading, mohon kirim sample 2-3 detik footage.',
      'Audio kit lengkap tersedia. Kapan mau ambil?',
      'Lighting set Aputure 600X Pro siap dipickup.',
    ][i] ?? 'Siap membantu!',
    time: ['09:42', '08:15', 'Kemarin', 'Senin', '11:30', '14:20'][i] ?? '-',
    unread: [2, 0, 1, 0, 0, 3][i] ?? 0,
  })),
];

const SEED_MESSAGES: Record<string, Msg[]> = {
  admin: [],
  v1: [
    { id: 1, from: 'them', type: 'text', text: 'Halo! Sony A7 IV-nya sudah saya cek, kondisi prima.', time: '09:40' },
    { id: 2, from: 'them', type: 'text', text: 'Kapan rencana shoot? Saya sediakan tas tahan air sekalian.', time: '09:42' },
    { id: 3, from: 'me', type: 'text', text: 'Tanggal 28-30 Mei kak. Untuk shoot wedding outdoor di Surabaya.', time: '09:44', read: true },
    { id: 4, from: 'them', type: 'text', text: 'Siap. Mau dual baterai? Saya ada CFexpress 80GB juga jika perlu.', time: '09:45' },
    { id: 5, from: 'me', type: 'text', text: 'Boleh kak, dua-duanya. Berapa total deposit-nya?', time: '09:46', read: true },
    { id: 6, from: 'them', type: 'text', text: 'Deposit Rp3.000.000, refundable. Pembayaran via escrow FindStudio jadi aman.', time: '09:48' },
  ],
};

function now() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

let nextId = 100;

export default function MessagesPage() {
  const [active, setActive] = useState(0);
  const [msgMap, setMsgMap] = useState<Record<string, Msg[]>>(() => {
    const m: Record<string, Msg[]> = {};
    conversations.forEach((v) => { m[v.id] = SEED_MESSAGES[v.id] ?? []; });
    return m;
  });
  const [input, setInput] = useState('');
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'chat' | 'system'>('chat');
  // Mobile: tampilkan daftar ATAU percakapan (master-detail), bukan keduanya bertumpuk.
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const v = conversations[active];
  const messages = msgMap[v.id] ?? [];

  // auto-select vendor from ?v= query param
  useEffect(() => {
    const vId = new URLSearchParams(window.location.search).get('v');
    if (vId) {
      const idx = conversations.findIndex((c) => c.id === vId);
      if (idx >= 0) { setActive(idx); setMobileChatOpen(true); }
    }
  }, []);

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, active]);

  function addMsg(msg: DistributiveOmit<Msg, 'id'>) {
    const full = { ...msg, id: nextId++ } as Msg;
    setMsgMap((prev) => ({ ...prev, [v.id]: [...(prev[v.id] ?? []), full] }));
  }

  function send() {
    const text = input.trim();
    if (!text && !imgPreview) return;
    if (imgPreview) {
      addMsg({ from: 'me', type: 'image', imgSrc: imgPreview, time: now(), read: false });
      setImgPreview(null);
    }
    if (text) {
      addMsg({ from: 'me', type: 'text', text, time: now(), read: false });
      setInput('');
      // mock reply after 1.2s
      setTimeout(() => {
        const reply = v.id === 'admin'
          ? 'Terima kasih telah menghubungi Admin FindStudio. Tim kami akan merespons dalam < 1 jam.'
          : 'Baik, terima kasih! Segera saya konfirmasi.';
        addMsg({ from: 'them', type: 'text', text: reply, time: now() });
      }, 1200);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="mb-6">
          <div className="eyebrow text-amber-400 mb-2">Kotak Masuk</div>
          <h1 className="headline text-4xl lg:text-5xl">Pesan & Notifikasi.</h1>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('chat')}
            className={`text-sm px-5 py-2.5 rounded-full font-medium border transition inline-flex items-center gap-2 ${
              view === 'chat' ? 'bg-amber-400 text-ink-900 border-amber-400' : 'border-ink-700/40 text-ink-300 hover:border-amber-400/40'
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Chat Vendor
          </button>
          <button
            onClick={() => setView('system')}
            className={`text-sm px-5 py-2.5 rounded-full font-medium border transition inline-flex items-center gap-2 ${
              view === 'system' ? 'bg-amber-400 text-ink-900 border-amber-400' : 'border-ink-700/40 text-ink-300 hover:border-amber-400/40'
            }`}
          >
            <Bell className="w-3.5 h-3.5" /> Notifikasi Sistem
          </button>
        </div>

        {view === 'system' ? (
          <div className="card max-w-2xl divide-y divide-ink-700/30">
            {SYSTEM_NOTIFS.map((n) => (
              <div key={n.id} className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${n.color}22`, color: n.color }}>
                  <n.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-0.5">{n.title}</div>
                  <div className="text-xs text-ink-300 leading-relaxed">{n.desc}</div>
                </div>
                <span className="text-[0.65rem] text-ink-500 shrink-0 tabular">{n.time}</span>
              </div>
            ))}
          </div>
        ) : (
        <div className="card overflow-hidden grid lg:grid-cols-[340px,1fr] min-h-[70vh] lg:min-h-[640px]">
          {/* ── Sidebar (daftar percakapan) ────────────────────────── */}
          <aside className={`${mobileChatOpen ? 'hidden' : 'flex'} lg:flex border-r border-ink-700/40 flex-col`}>
            <div className="p-4 border-b border-ink-700/40">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  className="field !pl-10 !py-2.5 text-sm"
                  placeholder="Cari percakapan…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ul className="overflow-y-auto flex-1">
              {filtered.map((c) => {
                const idx = conversations.indexOf(c);
                return (
                  <li
                    key={c.id}
                    onClick={() => { setActive(idx); setMobileChatOpen(true); }}
                    className={`p-4 cursor-pointer border-b border-ink-700/20 hover:bg-ink-700/30 transition flex gap-3 ${
                      idx === active ? 'bg-ink-700/40 border-l-2 border-l-amber-400' : ''
                    }`}
                  >
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                      <Image src={c.avatar} alt="" fill className="object-cover" sizes="44px" />
                      {c.unread > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-400 text-ink-900 text-[0.6rem] rounded-full flex items-center justify-center font-medium tabular">
                          {c.unread}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm truncate">{c.name}</span>
                        <span className="text-[0.65rem] text-ink-400 tabular shrink-0">{c.time}</span>
                      </div>
                      <p className={`text-xs truncate ${c.unread ? 'text-ink-200' : 'text-ink-400'}`}>{c.preview}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* ── Conversation ───────────────────────────────────────── */}
          <section className={`${mobileChatOpen ? 'flex' : 'hidden'} lg:flex flex-col min-h-0`}>
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-ink-700/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileChatOpen(false)}
                  className="lg:hidden w-9 h-9 -ml-1 rounded-full hover:bg-ink-700/50 flex items-center justify-center shrink-0"
                  aria-label="Kembali ke daftar"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={v.avatar} alt="" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{v.name}</h3>
                    {v.id === 'admin' ? (
                      <span className="pill !text-[0.6rem] !py-0.5 !bg-emerald-400/15 !border-emerald-400/40 !text-emerald-300">
                        <ShieldCheck className="w-2.5 h-2.5" /> Tim Resmi
                      </span>
                    ) : (
                      <span className="pill !text-[0.6rem] !py-0.5">
                        <Shield className="w-2.5 h-2.5" /> {v.verified}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {v.id === 'admin' ? 'Respon < 1 jam' : 'online'}
                  </div>
                </div>
              </div>
              <button className="w-9 h-9 rounded-full hover:bg-ink-700/50 flex items-center justify-center">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto bg-gradient-to-b from-transparent to-ink-950/30">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-2 py-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-1">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-ink-200">Belum ada percakapan dengan {v.name}.</p>
                  <p className="text-xs text-ink-400 max-w-xs">
                    Ada masalah pesanan, pembayaran, atau klaim Proteksi? Tulis pesanmu di bawah, tim kami akan membantu.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-[0.65rem] text-ink-400 px-3 py-1 bg-ink-700/30 rounded-full">
                    Hari ini
                  </span>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {m.from === 'them' && (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 mt-1">
                      <Image src={v.avatar} alt="" fill className="object-cover" sizes="28px" />
                    </div>
                  )}
                  <div className={`max-w-[82%] sm:max-w-[68%] ${m.from === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {m.type === 'text' ? (
                      <div className={`px-4 py-2.5 ${
                        m.from === 'me'
                          ? 'bg-amber-400/15 border border-amber-400/30 rounded-2xl rounded-tr-sm'
                          : 'bg-ink-700/40 border border-ink-700/40 rounded-2xl rounded-tl-sm'
                      }`}>
                        <p className="text-sm leading-snug">{m.text}</p>
                      </div>
                    ) : (
                      <div className={`overflow-hidden rounded-2xl border ${
                        m.from === 'me' ? 'border-amber-400/30 rounded-tr-sm' : 'border-ink-700/40 rounded-tl-sm'
                      }`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.imgSrc} alt="gambar" className="max-w-[70vw] sm:max-w-[280px] max-h-[320px] object-cover block" />
                      </div>
                    )}
                    <div className={`flex items-center gap-1 text-[0.6rem] text-ink-400 ${m.from === 'me' ? 'flex-row-reverse' : ''}`}>
                      <span className="tabular">{m.time}</span>
                      {m.from === 'me' && (
                        m.read
                          ? <CheckCheck className="w-3 h-3 text-amber-400" />
                          : <Check className="w-3 h-3 text-ink-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Security reminder */}
              <div className="card p-3 max-w-md mx-auto !bg-amber-400/5 border-amber-400/30">
                <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  Pengingat keamanan
                </div>
                <p className="text-xs text-ink-300">
                  Jangan bertransaksi di luar FindStudio. Semua pembayaran wajib melalui escrow agar Proteksi tetap aktif.
                </p>
              </div>

              <div ref={bottomRef} />
            </div>

            {/* Image preview strip */}
            {imgPreview && (
              <div className="px-4 pt-3 border-t border-ink-700/40 flex items-center gap-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgPreview} alt="preview" className="h-16 w-16 object-cover rounded-lg border border-amber-400/30" />
                  <button
                    onClick={() => setImgPreview(null)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-xs text-ink-400">Gambar siap dikirim</span>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-ink-700/40 shrink-0">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-9 h-9 rounded-full hover:bg-ink-700/50 flex items-center justify-center shrink-0 transition"
                  title="Kirim gambar"
                >
                  <ImageIcon className="w-4 h-4 text-ink-400" />
                </button>
                <input
                  className="field flex-1 !py-2.5 text-sm"
                  placeholder="Tulis pesan…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() && !imgPreview}
                  className="w-9 h-9 rounded-full bg-amber-400 text-ink-900 flex items-center justify-center shrink-0 disabled:opacity-40 hover:scale-105 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
        )}
      </main>
    </>
  );
}
