import Link from 'next/link';
import { Instagram, Youtube, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-ink-700/40">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <h3 className="headline text-5xl lg:text-6xl mb-6">
              Punya alat?
              <br />
              <span className="text-amber-400 italic font-light">Mulai hasilkan.</span>
            </h3>
            <p className="text-ink-300 max-w-md mb-8">
              Daftarkan kamera, drone, lighting, atau studio Anda — lengkap dengan Proteksi
              FindStudio agar setiap penyewaan terjamin.
            </p>
            <Link href="/register" className="btn-primary">
              Jadi Vendor
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="eyebrow text-amber-400 mb-4">Jelajahi</div>
              <ul className="space-y-2.5 text-ink-300">
                <li><Link href="/browse?cat=camera" className="hover:text-white">Kamera</Link></li>
                <li><Link href="/browse?cat=lens" className="hover:text-white">Lensa</Link></li>
                <li><Link href="/browse?cat=drone" className="hover:text-white">Drone</Link></li>
                <li><Link href="/browse?cat=lighting" className="hover:text-white">Lighting</Link></li>
                <li><Link href="/browse?cat=studio" className="hover:text-white">Studio</Link></li>
              </ul>
            </div>
            <div>
              <div className="eyebrow text-amber-400 mb-4">Platform</div>
              <ul className="space-y-2.5 text-ink-300">
                <li><Link href="/dashboard/vendor" className="hover:text-white">Dashboard Vendor</Link></li>
                <li><Link href="/dashboard/client" className="hover:text-white">Dashboard Klien</Link></li>
                <li><Link href="#" className="hover:text-white">Proteksi FindStudio</Link></li>
                <li><Link href="#" className="hover:text-white">Smart Recommendations</Link></li>
                <li><Link href="#" className="hover:text-white">Pusat Bantuan</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="eyebrow text-amber-400 mb-4">Perusahaan</div>
              <ul className="space-y-2.5 text-ink-300">
                <li><Link href="#" className="hover:text-white">Tentang</Link></li>
                <li><Link href="#" className="hover:text-white">Karir</Link></li>
                <li><Link href="#" className="hover:text-white">Kebijakan Privasi</Link></li>
                <li><Link href="#" className="hover:text-white">Syarat & Ketentuan</Link></li>
                <li><Link href="#" className="hover:text-white">Hubungi Kami</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-xs text-ink-400">
            © 2026 FindStudio. Sebuah ekosistem untuk para kreator.
          </div>
          <div className="flex items-center gap-2">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Youtube, label: 'Youtube' },
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Mail, label: 'Email' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-ink-700/40 flex items-center justify-center text-ink-300 hover:text-amber-400 hover:border-amber-400/50 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 select-none">
          <div className="text-[14vw] leading-[0.85] font-display font-light text-ink-700/40 tracking-tightest">
            FindStudio<span className="text-amber-400/30">.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
