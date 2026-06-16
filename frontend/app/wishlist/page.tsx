'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { equipment, studios, formatIDR } from '@/lib/mockData';
import { Heart, FolderPlus, Folder, Trash2, ArrowRight, Star } from 'lucide-react';

const SAVED_ITEMS = [equipment[0], equipment[2], equipment[7], equipment[16], studios[0]];

const PROJECT_FOLDERS = [
  { id: 'f1', name: 'Proyek Dokumenter ITS', items: [equipment[0], equipment[16]] },
  { id: 'f2', name: 'Syuting Iklan Kosmetik', items: [equipment[2], studios[0]] },
];

export default function WishlistPage() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const folder = PROJECT_FOLDERS.find((f) => f.id === activeFolder);
  const itemsShown = folder ? folder.items : SAVED_ITEMS;

  function priceOf(item: typeof SAVED_ITEMS[number]): number {
    return 'pricePerDay' in item ? item.pricePerDay : 0;
  }
  const total = itemsShown.reduce((s, it) => s + priceOf(it), 0);

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-2 text-xs text-ink-400 mb-6">
          <Link href="/" className="hover:text-amber-400">Beranda</Link>
          <span>/</span>
          <span className="text-ink-300">Favorit</span>
        </div>

        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="eyebrow text-amber-400 mb-2">Papan Mood</div>
            <h1 className="headline text-5xl lg:text-6xl">
              Alat <span className="italic text-amber-400 font-light">favoritmu.</span>
            </h1>
            <p className="text-sm text-ink-300 mt-2 max-w-lg">
              Simpan alat yang kamu suka, susun jadi folder proyek untuk hitung estimasi RAB sebelum benar-benar menyewa.
            </p>
          </div>
          <button className="btn-ghost text-sm">
            <FolderPlus className="w-4 h-4" /> Folder Baru
          </button>
        </div>

        <div className="grid lg:grid-cols-[260px,1fr] gap-8">
          {/* Folder proyek sidebar */}
          <aside className="space-y-2">
            <button
              onClick={() => setActiveFolder(null)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition ${
                !activeFolder ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30' : 'hover:bg-ink-700/40'
              }`}
            >
              <span className="flex items-center gap-3"><Heart className="w-4 h-4" strokeWidth={1.5} /> Semua Tersimpan</span>
              <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-ink-700/50 tabular">{SAVED_ITEMS.length}</span>
            </button>
            {PROJECT_FOLDERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFolder(f.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm transition ${
                  activeFolder === f.id ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30' : 'hover:bg-ink-700/40'
                }`}
              >
                <span className="flex items-center gap-3 text-left">
                  <Folder className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  {f.name}
                </span>
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-ink-700/50 tabular shrink-0">{f.items.length}</span>
              </button>
            ))}
          </aside>

          <div>
            {folder && (
              <div className="card p-5 mb-6 flex items-center justify-between !bg-amber-400/5 !border-amber-400/30">
                <div>
                  <div className="text-sm font-medium">{folder.name}</div>
                  <div className="text-xs text-ink-400 mt-0.5">Estimasi total biaya sewa per hari</div>
                </div>
                <div className="font-display text-2xl text-amber-400 tabular">{formatIDR(total)}</div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {itemsShown.map((item) => {
                const isStudio = !('image' in item);
                const image = isStudio ? item.cover : item.image;
                const href = isStudio ? `/studio/${item.slug}` : `/equipment/${item.slug}`;
                return (
                  <div key={item.id} className="card overflow-hidden lift group">
                    <div className="relative aspect-[4/5] bg-ink-800">
                      <Image src={image} alt={item.name} fill className="object-cover" sizes="33vw" />
                      <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ink-900/80 backdrop-blur flex items-center justify-center text-red-400 hover:scale-110 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur text-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="tabular">{item.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg leading-tight mb-2 group-hover:text-amber-400 transition-colors">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="font-display text-amber-400 tabular">{formatIDR(item.pricePerDay)}<span className="text-xs text-ink-400">/hari</span></div>
                        <Link href={href} className="text-xs text-ink-300 hover:text-amber-400 flex items-center gap-1">
                          Lihat <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              {itemsShown.length === 0 && (
                <div className="card p-10 text-center text-ink-300 text-sm col-span-full">Folder ini masih kosong.</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
