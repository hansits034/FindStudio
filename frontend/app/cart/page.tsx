'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cartItems, formatIDR } from '@/lib/mockData';
import { Trash2, Shield, Plus, Minus, ArrowRight, ShoppingBag, Tag, CalendarDays } from 'lucide-react';

export default function CartPage() {
  // Group by vendor
  const groups = cartItems.reduce<Record<string, typeof cartItems>>((acc, item) => {
    acc[item.vendor] = acc[item.vendor] || [];
    acc[item.vendor].push(item);
    return acc;
  }, {});

  const subtotal = cartItems.reduce((s, i) => s + i.pricePerDay * i.days, 0);
  const protectionFee = cartItems.filter((i) => i.protection).reduce((s, i) => s + i.pricePerDay * i.days * 0.1, 0);
  const platformFee = 10000;
  const totalDeposit = cartItems.reduce((s, i) => s + i.deposit, 0);
  const grandTotal = subtotal + platformFee;

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-2 text-xs text-ink-400 mb-6">
          <Link href="/" className="hover:text-amber-400">Beranda</Link>
          <span>/</span>
          <span className="text-ink-300">Keranjang</span>
        </div>

        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <div className="eyebrow text-amber-400 mb-2">Checkout</div>
            <h1 className="headline text-5xl lg:text-6xl">
              Keranjang <span className="italic text-amber-400 font-light">multi-vendor.</span>
            </h1>
          </div>
          <div className="hidden md:block text-right text-sm text-ink-400">
            <div>{cartItems.length} item</div>
            <div>{Object.keys(groups).length} vendor</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,420px] gap-10">
          <div className="space-y-6">
            {Object.entries(groups).map(([vendor, items]) => (
              <div key={vendor} className="card overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-ink-700/40">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span className="font-medium">{vendor}</span>
                    <span className="pill !text-[0.65rem]">{items.length} item</span>
                  </div>
                  <button className="text-xs text-ink-400 hover:text-amber-400">Chat vendor →</button>
                </div>

                <ul className="divide-y divide-ink-700/40">
                  {items.map((item) => (
                    <li key={item.id} className="p-5 flex gap-4">
                      <div className="relative w-24 h-28 rounded-lg overflow-hidden shrink-0 bg-ink-800">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg leading-tight mb-1.5">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 text-xs text-ink-400 mb-2">
                          {item.protection && (
                            <span className="pill !text-[0.6rem]">
                              <Shield className="w-2.5 h-2.5" /> Proteksi
                            </span>
                          )}
                          <span>Deposit: {formatIDR(item.deposit)}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-ink-300 mb-3">
                          <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
                          <span>19 Jun 2026 → {new Date(2026, 5, 19 + item.days - 1).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-ink-400">Durasi:</span>
                            <div className="inline-flex items-center border border-ink-700/40 rounded-full">
                              <button className="w-7 h-7 flex items-center justify-center hover:bg-ink-700/50 rounded-l-full">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-sm tabular">{item.days} hari</span>
                              <button className="w-7 h-7 flex items-center justify-center hover:bg-ink-700/50 rounded-r-full">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-display text-amber-400 tabular text-lg">
                              {formatIDR(item.pricePerDay * item.days)}
                            </div>
                            <div className="text-[0.65rem] text-ink-400">
                              {formatIDR(item.pricePerDay)} × {item.days} hari
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="text-ink-400 hover:text-amber-400 self-start">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="card p-5 flex items-center gap-3">
              <Tag className="w-5 h-5 text-amber-400 shrink-0" />
              <input className="field !py-2 text-sm" placeholder="Kode promo (mis. KREATOR10)" />
              <button className="btn-ghost !py-2 !px-4 text-sm shrink-0">Terapkan</button>
            </div>
          </div>

          {/* Summary */}
          <aside>
            <div className="card p-6 lg:sticky lg:top-28">
              <h3 className="font-display text-2xl mb-5">Ringkasan</h3>

              <div className="space-y-2.5 text-sm pb-5 border-b border-ink-700/40">
                <Row label={`Subtotal sewa (${cartItems.length} item)`} value={formatIDR(subtotal)} />
                <Row label="Biaya layanan platform" value={formatIDR(platformFee)} muted />
                <Row label="Total deposit (refundable)" value={formatIDR(totalDeposit)} muted />
              </div>

              <div className="py-5 border-b border-ink-700/40">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className="eyebrow text-amber-400">Proteksi FindStudio</span>
                </div>
                <p className="text-xs text-ink-300 leading-relaxed">
                  10% dari nilai sewa item terproteksi ({formatIDR(protectionFee)}) masuk ke Platform Protection Fund.
                  Dipotong dari payout vendor, tidak menambah total bayar Anda.
                </p>
              </div>

              <div className="py-5 border-b border-ink-700/40">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Total bayar</span>
                  <span className="font-display text-3xl text-amber-400 tabular">{formatIDR(grandTotal)}</span>
                </div>
                <div className="text-xs text-ink-400 mt-1">+ deposit refundable {formatIDR(totalDeposit)}</div>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center mt-5">
                Lanjut ke checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/browse" className="block text-center text-xs text-ink-400 mt-3 hover:text-amber-400">
                ← Lanjut belanja
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={muted ? 'text-ink-400' : 'text-ink-200'}>{label}</span>
      <span className={`tabular ${muted ? 'text-ink-400' : ''}`}>{value}</span>
    </div>
  );
}
