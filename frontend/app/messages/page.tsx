'use client';

import Navbar from '@/components/Navbar';
import { vendors } from '@/lib/mockData';
import Image from 'next/image';
import { useState } from 'react';
import { Send, Paperclip, Search, Image as ImageIcon, Phone, MoreHorizontal, Shield } from 'lucide-react';

const conversations = vendors.map((v, i) => ({
  ...v,
  preview: [
    'Halo! Sony A7 IV-nya sudah saya cek, kondisi prima. Kapan rencana shoot?',
    'Studio cyc tersedia tanggal 2 Juni. Saya kirim foto kondisi terkini ya.',
    'Drone Mavic 3-nya sudah siap, sudah saya lakukan kalibrasi ulang.',
    'Untuk color grading, mohon kirim sample 2-3 detik footage-nya.',
  ][i],
  time: ['09:42', '08:15', 'Kemarin', 'Senin'][i],
  unread: [2, 0, 1, 0][i],
}));

const messages = [
  { from: 'them', text: 'Halo! Sony A7 IV-nya sudah saya cek, kondisi prima.', time: '09:40' },
  { from: 'them', text: 'Kapan rencana shoot? Saya sediakan tas tahan air sekalian.', time: '09:42' },
  { from: 'me', text: 'Tanggal 28-30 Mei kak. Saya butuh untuk shoot wedding outdoor di Surabaya.', time: '09:44' },
  { from: 'them', text: 'Siap. Mau pakai dual baterai? Saya ada CFexpress 80GB juga jika perlu.', time: '09:45' },
  { from: 'me', text: 'Boleh kak, dua-duanya. Berapa total deposit-nya?', time: '09:46' },
  { from: 'them', text: 'Deposit Rp3.000.000, refundable. Pembayaran via escrow FindStudio jadi aman.', time: '09:48' },
];

export default function MessagesPage() {
  const [active, setActive] = useState(0);
  const v = conversations[active];

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="mb-6">
          <div className="eyebrow text-amber-400 mb-2">Pesan</div>
          <h1 className="headline text-4xl lg:text-5xl">Percakapan</h1>
        </div>

        <div className="card overflow-hidden grid lg:grid-cols-[340px,1fr] min-h-[640px]">
          {/* Sidebar */}
          <aside className="border-r border-ink-700/40 flex flex-col">
            <div className="p-4 border-b border-ink-700/40">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input className="field !pl-10 !py-2.5 text-sm" placeholder="Cari percakapan…" />
              </div>
            </div>
            <ul className="overflow-y-auto flex-1">
              {conversations.map((c, i) => (
                <li
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`p-4 cursor-pointer border-b border-ink-700/20 hover:bg-ink-700/30 transition flex gap-3 ${
                    i === active ? 'bg-ink-700/40 border-l-2 border-l-amber-400' : ''
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
              ))}
            </ul>
          </aside>

          {/* Conversation */}
          <section className="flex flex-col">
            <div className="px-6 py-4 border-b border-ink-700/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={v.avatar} alt="" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{v.name}</h3>
                    <span className="pill !text-[0.6rem] !py-0.5">
                      <Shield className="w-2.5 h-2.5" /> {v.verified}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-9 h-9 rounded-full hover:bg-ink-700/50 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full hover:bg-ink-700/50 flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gradient-to-b from-transparent to-ink-950/30">
              <div className="text-center">
                <span className="text-[0.65rem] text-ink-400 px-3 py-1 bg-ink-700/30 rounded-full">
                  Hari ini · 09:40
                </span>
              </div>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2.5 ${
                      m.from === 'me'
                        ? 'bg-amber-400/15 border border-amber-400/30 rounded-2xl rounded-tr-sm'
                        : 'bg-ink-700/40 border border-ink-700/40 rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    <p className="text-sm leading-snug">{m.text}</p>
                    <div className="text-[0.6rem] text-ink-400 mt-1 text-right tabular">{m.time}</div>
                  </div>
                </div>
              ))}

              <div className="card p-3 max-w-md mx-auto !bg-amber-400/5 border-amber-400/30">
                <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  Pengingat keamanan
                </div>
                <p className="text-xs text-ink-300">
                  Jangan bertransaksi di luar FindStudio. Semua pembayaran wajib melalui escrow agar Proteksi tetap aktif.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-ink-700/40">
              <div className="relative">
                <input className="field !pl-12 !pr-24" placeholder="Tulis pesan…" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full hover:bg-ink-700/50 flex items-center justify-center">
                    <Paperclip className="w-3.5 h-3.5 text-ink-400" />
                  </button>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full hover:bg-ink-700/50 flex items-center justify-center">
                    <ImageIcon className="w-3.5 h-3.5 text-ink-400" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-amber-400 text-ink-900 flex items-center justify-center">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
