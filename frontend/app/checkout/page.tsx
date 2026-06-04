'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cartItems, formatIDR } from '@/lib/mockData';
import { Shield, MapPin, Truck, CreditCard, Banknote, Check, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const subtotal = cartItems.reduce((s, i) => s + i.pricePerDay * i.days, 0);
  const platformFee = 10000;
  const totalDeposit = cartItems.reduce((s, i) => s + i.deposit, 0);
  const grandTotal = subtotal + platformFee;

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex items-center gap-3 text-xs text-ink-400 mb-4">
          <Link href="/cart" className="hover:text-amber-400">← Kembali ke keranjang</Link>
        </div>

        <h1 className="headline text-5xl lg:text-6xl mb-10">
          Checkout <span className="italic text-amber-400 font-light">aman.</span>
        </h1>

        <div className="grid lg:grid-cols-[1fr,420px] gap-10">
          <div className="space-y-8">
            {/* Pickup/Delivery */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl">1. Pengambilan</h3>
                <span className="eyebrow text-ink-400">Pilih satu</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="card p-5 cursor-pointer border-2 border-amber-400 has-[:checked]:bg-amber-400/5 transition">
                  <div className="flex items-start gap-3">
                    <input type="radio" name="ship" defaultChecked className="mt-1 accent-amber-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span className="font-medium">Ambil sendiri</span>
                      </div>
                      <p className="text-xs text-ink-400">Gratis. Lokasi pickup ditampilkan setelah konfirmasi.</p>
                    </div>
                  </div>
                </label>
                <label className="card p-5 cursor-pointer hover:border-amber-400/40 transition">
                  <div className="flex items-start gap-3">
                    <input type="radio" name="ship" className="mt-1 accent-amber-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span className="font-medium">Antar via Gojek/Grab</span>
                      </div>
                      <p className="text-xs text-ink-400">Rp 25.000 — Rp 50.000 (tergantung jarak)</p>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* Brief */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl">2. Brief Project (opsional)</h3>
                <span className="eyebrow text-ink-400">untuk vendor</span>
              </div>
              <p className="text-xs text-ink-400 mb-3">
                Jelaskan secara singkat — vendor akan menyiapkan setup paling sesuai.
              </p>
              <textarea
                rows={4}
                className="field"
                placeholder="Mis. shoot product cosmetic, butuh setup softbox dan tabletop. Outdoor di rooftop."
              />
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="pill !text-xs cursor-pointer hover:bg-amber-400/20">+ Moodboard</button>
                <button className="pill !text-xs cursor-pointer hover:bg-amber-400/20">+ Referensi</button>
                <button className="pill !text-xs cursor-pointer hover:bg-amber-400/20">+ Storyboard</button>
              </div>
            </section>

            {/* Payment */}
            <section className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl">3. Metode Pembayaran</h3>
                <span className="flex items-center gap-1 text-xs text-amber-400">
                  <Lock className="w-3 h-3" /> Escrow aman
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Virtual Account BCA', detail: 'Bayar via m-banking / ATM', icon: Banknote, recommended: true },
                  { name: 'GoPay / OVO / Dana', detail: 'Pembayaran instan via e-wallet', icon: CreditCard },
                  { name: 'Kartu Kredit / Debit', detail: 'Visa, Mastercard, JCB', icon: CreditCard },
                ].map((m, i) => (
                  <label key={i} className={`card p-4 cursor-pointer flex items-center gap-4 ${i === 0 ? 'border-amber-400' : ''}`}>
                    <input type="radio" name="pay" defaultChecked={i === 0} className="accent-amber-400" />
                    <m.icon className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{m.name}</span>
                        {m.recommended && <span className="pill !text-[0.6rem]">Direkomendasikan</span>}
                      </div>
                      <div className="text-xs text-ink-400">{m.detail}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-ink-700/40 flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-xs text-ink-300 leading-relaxed">
                  Dana Anda <span className="text-amber-400 font-medium">ditahan di escrow FindStudio</span> sampai
                  alat dikembalikan / jasa selesai. Tidak ada dana yang dikirim langsung ke vendor.
                </p>
              </div>
            </section>

            {/* Items */}
            <section className="card p-6">
              <h3 className="font-display text-xl mb-5">Item yang disewa</h3>
              <ul className="divide-y divide-ink-700/40">
                {cartItems.map((i) => (
                  <li key={i.id} className="py-3 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-ink-800">
                      <Image src={i.image} alt="" fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{i.name}</div>
                      <div className="text-xs text-ink-400">{i.vendor} · {i.days} hari</div>
                    </div>
                    <div className="tabular text-sm">{formatIDR(i.pricePerDay * i.days)}</div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Summary */}
          <aside>
            <div className="card p-6 lg:sticky lg:top-28">
              <h3 className="font-display text-2xl mb-5">Total bayar</h3>

              <div className="space-y-2.5 text-sm pb-5 border-b border-ink-700/40">
                <Row label="Subtotal sewa" value={formatIDR(subtotal)} />
                <Row label="Biaya layanan" value={formatIDR(platformFee)} muted />
                <Row label="Pengiriman" value="Rp 0" muted />
              </div>

              <div className="py-5 border-b border-ink-700/40 space-y-2 text-sm">
                <Row label="Total bayar" value={formatIDR(grandTotal)} bold />
                <Row label="Deposit (refundable)" value={formatIDR(totalDeposit)} muted />
                <div className="text-[0.65rem] text-ink-400 mt-1">
                  Deposit dicairkan kembali ke rekening Anda setelah alat dikembalikan tanpa kerusakan.
                </div>
              </div>

              <div className="my-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className="eyebrow text-amber-400">Yang Anda dapat</span>
                </div>
                <ul className="text-xs text-ink-300 space-y-1.5">
                  {[
                    'Proteksi FindStudio aktif untuk semua item',
                    'Dana ditahan via escrow sampai alat kembali',
                    'Akses chat real-time dengan vendor',
                    'Pengembalian deposit otomatis < 24 jam',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn-primary w-full justify-center text-base">
                <Lock className="w-4 h-4" />
                Bayar {formatIDR(grandTotal)}
              </button>
              <div className="text-center text-[0.65rem] text-ink-400 mt-3">
                Dengan menekan tombol, Anda menyetujui <Link href="#" className="text-amber-400 hover:underline">Syarat & Ketentuan</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={muted ? 'text-ink-400' : 'text-ink-200'}>{label}</span>
      <span className={`tabular ${muted ? 'text-ink-400' : ''} ${bold ? 'font-display text-xl text-amber-400' : ''}`}>{value}</span>
    </div>
  );
}
