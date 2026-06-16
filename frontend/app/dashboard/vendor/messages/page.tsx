'use client';

import { useState } from 'react';
import { Send, Search, Package, ShieldCheck, ArrowLeft } from 'lucide-react';

const VC = '#818cf8';
const EM = '#34d399';

const CONTACTS = [
  {
    id: 0, name: 'Admin FindStudio', avatar: 'A', avatarColor: EM,
    lastMsg: 'Ada masalah pesanan, pembayaran, atau klaim? Chat kami di sini.', time: '', unread: 0,
    order: '', orderItem: '', isSupport: true,
  },
  {
    id: 1, name: 'Dimas P.', avatar: 'D', avatarColor: '#f9b17a',
    lastMsg: 'Kak, boleh minta kalau ada gimbal juga?', time: '10:42', unread: 2,
    order: 'ORD-091', orderItem: 'Sony A7 IV + Lensa 24-70', isSupport: false,
  },
  {
    id: 2, name: 'Rina C.', avatar: 'R', avatarColor: '#a78bfa',
    lastMsg: 'Oke siap, saya ambil jam 1 siang ya kak', time: '09:15', unread: 0,
    order: 'ORD-092', orderItem: 'Aputure 600X Pro', isSupport: false,
  },
  {
    id: 3, name: 'Galih S.', avatar: 'G', avatarColor: '#34d399',
    lastMsg: 'Bisa minta invoice ya kak?', time: 'Kem.', unread: 1,
    order: 'ORD-089', orderItem: 'Canon RF 24-70 f/2.8', isSupport: false,
  },
  {
    id: 4, name: 'Tania W.', avatar: 'T', avatarColor: '#fb923c',
    lastMsg: 'Gimbal sudah dikembalikan ya kak 🙏', time: 'Kem.', unread: 0,
    order: 'ORD-083', orderItem: 'DJI RS 3 Pro', isSupport: false,
  },
];

const MESSAGES: Record<number, { from: 'vendor' | 'client'; text: string; time: string }[]> = {
  0: [],
  1: [
    { from: 'client', text: 'Halo kak, mau tanya soal ketersediaan Sony A7 IV untuk tanggal 19-22 Juni.', time: '10:30' },
    { from: 'vendor', text: 'Halo Dimas! Untuk tanggal tersebut masih tersedia ya. Sudah kamu order juga lewat sistem.', time: '10:35' },
    { from: 'client', text: 'Siip terima kasih kak! Oh iya, kalau boleh request, ada gimbal yang bisa ditambahkan ke order ga kak?', time: '10:40' },
    { from: 'client', text: 'Kak, boleh minta kalau ada gimbal juga?', time: '10:42' },
  ],
  2: [
    { from: 'client', text: 'Kak saya mau ambil Aputure 600X besok ya sesuai order.', time: '09:10' },
    { from: 'vendor', text: 'Siap Rina, alat sudah disiapkan. Datang ke alamat di profil ya.', time: '09:12' },
    { from: 'client', text: 'Oke siap, saya ambil jam 1 siang ya kak', time: '09:15' },
  ],
  3: [
    { from: 'client', text: 'Kak Canon RF 24-70 kondisinya bagaimana? Ada cacat ga?', time: 'Kem. 14:00' },
    { from: 'vendor', text: 'Kondisi 98%, ada sedikit baret halus di bodi tapi optik sempurna. Akan saya foto dan kirimkan.', time: 'Kem. 14:05' },
    { from: 'client', text: 'Bisa minta invoice ya kak?', time: 'Kem. 14:30' },
  ],
  4: [
    { from: 'client', text: 'Kak gimbal sudah kami kembalikan, sudah saya taruh di resepsionis.', time: 'Kem. 16:00' },
    { from: 'vendor', text: 'Sudah diterima Tania, terima kasih sudah menjaga dengan baik! Ulasan bisa ditulis di platform ya 🙏', time: 'Kem. 16:10' },
    { from: 'client', text: 'Gimbal sudah dikembalikan ya kak 🙏', time: 'Kem. 16:15' },
  ],
};

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState('');
  // Mobile: tampilkan daftar klien ATAU percakapan (master-detail).
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const active = CONTACTS.find((c) => c.id === activeId)!;
  const msgs = MESSAGES[activeId] ?? [];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="eyebrow mb-1.5" style={{ color: VC }}>Pesan</div>
        <h1 className="headline text-4xl">Chat dengan <span className="italic font-light" style={{ color: VC }}>Klienmu.</span></h1>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row gap-4 lg:min-h-[620px] flex-1">

        {/* Contact list */}
        <aside className={`${mobileChatOpen ? 'hidden' : 'flex'} lg:flex w-full lg:w-[260px] shrink-0 flex-col gap-2`}>
          <div className="relative mb-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
            <input className="field !pl-9 !py-2 text-sm w-full" placeholder="Cari klien…" />
          </div>
          {CONTACTS.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActiveId(c.id); setMobileChatOpen(true); }}
              className="card p-3.5 text-left transition flex items-start gap-3"
              style={
                activeId === c.id
                  ? c.isSupport
                    ? { borderColor: `${EM}73`, background: `${EM}14` }
                    : { borderColor: 'rgba(129,140,248,0.45)', background: 'rgba(129,140,248,0.08)' }
                  : undefined
              }
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-ink-900" style={{ background: c.avatarColor }}>
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className="text-[0.6rem] text-ink-500">{c.time}</span>
                </div>
                <div className="text-[0.65rem] text-ink-400 truncate mt-0.5">{c.lastMsg}</div>
                {c.isSupport ? (
                  <div className="text-[0.6rem] mt-1 flex items-center gap-1" style={{ color: EM }}>
                    <ShieldCheck className="w-2.5 h-2.5" /> Bantuan & Dukungan
                  </div>
                ) : (
                  <div className="text-[0.6rem] text-ink-500 mt-1 flex items-center gap-1">
                    <Package className="w-2.5 h-2.5" /> {c.order}
                  </div>
                )}
              </div>
              {c.unread > 0 && (
                <span className="text-[0.6rem] w-4 h-4 rounded-full font-bold flex items-center justify-center shrink-0" style={{ background: VC, color: '#1a1c2e' }}>
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Chat window */}
        <div className={`${mobileChatOpen ? 'flex' : 'hidden'} lg:flex flex-1 min-w-0 flex-col card p-0 overflow-hidden`}>
          {/* Chat header — order context */}
          <div className="p-4 border-b border-ink-700/40 flex items-center gap-3">
            <button
              onClick={() => setMobileChatOpen(false)}
              className="lg:hidden w-9 h-9 -ml-1 rounded-full hover:bg-ink-700/50 flex items-center justify-center shrink-0"
              aria-label="Kembali ke daftar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-ink-900 shrink-0" style={{ background: active.avatarColor }}>
              {active.avatar}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{active.name}</div>
              {active.isSupport ? (
                <div className="text-[0.65rem] flex items-center gap-1.5" style={{ color: EM }}>
                  <ShieldCheck className="w-3 h-3" /> Tim Resmi FindStudio · respon &lt; 1 jam
                </div>
              ) : (
                <div className="text-[0.65rem] text-ink-400 flex items-center gap-1.5">
                  <Package className="w-3 h-3" style={{ color: VC }} />
                  <span style={{ color: VC }}>{active.order}</span>
                  <span className="text-ink-500">·</span>
                  <span>{active.orderItem}</span>
                </div>
              )}
            </div>
            <div
              className="text-[0.65rem] px-2 py-1 rounded-full"
              style={active.isSupport ? { background: `${EM}20`, color: EM } : { background: 'rgba(52,211,153,0.12)', color: '#34d399' }}
            >
              {active.isSupport ? 'Bantuan & Dukungan' : 'Pesanan Aktif'}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {msgs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2 py-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: `${EM}1a`, color: EM }}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-sm text-ink-200">Belum ada percakapan dengan {active.name}.</p>
                <p className="text-xs text-ink-400 max-w-xs">
                  Mengalami masalah dengan klien, pembayaran, atau klaim Proteksi? Tulis pesanmu di bawah.
                </p>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    m.from === 'vendor'
                      ? { background: VC, color: '#1a1c2e', borderBottomRightRadius: 4 }
                      : { background: 'rgba(103,111,157,0.2)', borderBottomLeftRadius: 4 }
                  }
                >
                  {m.text}
                  <div className={`text-[0.58rem] mt-1 ${m.from === 'vendor' ? 'text-indigo-200/70 text-right' : 'text-ink-500'}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-ink-700/40 flex gap-3">
            <input
              className="field flex-1 text-sm !py-2.5"
              placeholder={`Balas ${active.name}…`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setInput('')}
            />
            <button
              onClick={() => setInput('')}
              className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition"
              style={{ background: VC, color: '#1a1c2e' }}
            >
              <Send className="w-4 h-4" /> Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
