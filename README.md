# FindStudio

Ekosistem terpadu untuk kreator konten, fotografer, videografer, dan sinematografer di
**Surabaya** — sewa kamera, lensa, drone, lighting; pesan studio; dan pakai jasa profesional
(editor, colorist, sound) dalam satu platform.

> **Frontend-only.** Aplikasi ini 100% berjalan di sisi browser (Next.js static export).
> Tidak ada backend/server — data katalog di-*hardcode*, dan login/register disimpan di
> `localStorage`. Siap di-deploy ke Netlify (atau host statis apa pun).

Palet warna: `#ffffff` `#676f9d` `#424769` `#2d3250` `#f9b17a`
Sistem warna peran: **amber** = kreator/klien · **indigo** = vendor.

---

## Struktur

```
findstudio/
└── frontend/            # SATU-SATUNYA folder aplikasi
    ├── app/             # Halaman (App Router)
    ├── components/      # Komponen UI
    ├── lib/             # Data hardcoded (mockData), auth lokal, parser pencarian
    ├── public/          # logo.png, favicon
    ├── package.json     # daftar dependency  (ini "requirements"-nya project Node)
    ├── next.config.mjs  # output: 'export' → menghasilkan folder out/ statis
    ├── netlify.toml      # konfigurasi deploy Netlify
    └── .nvmrc           # pin Node 20 untuk Netlify
```

> Catatan: project ini memakai **Node.js**, jadi daftar dependency ada di `package.json`
> (bukan `requirements.txt`, yang khusus Python). Netlify membaca `package.json` otomatis.

---

## Menjalankan secara lokal

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

## Build statis (untuk hosting)

```bash
cd frontend
npm run build        # menghasilkan folder  frontend/out/
```

Hasilnya berupa HTML/CSS/JS statis di `frontend/out/` — bisa dibuka host statis mana pun.

---

## Deploy ke Netlify

### Opsi A — Drag & drop (paling cepat)
1. `cd frontend && npm install && npm run build`
2. Buka <https://app.netlify.com/drop>
3. Seret folder **`frontend/out`** ke halaman itu. Selesai.

### Opsi B — Connect Git (auto-deploy tiap push)
Di Netlify → **Add new site → Import from Git**, lalu set:

| Field | Nilai |
|---|---|
| Base directory | `findstudio/frontend` |
| Build command | `npm run build` |
| Publish directory | `findstudio/frontend/out` |
| Node version | 20 (sudah dipin via `.nvmrc`) |

Konfigurasi ini juga sudah ditulis di `frontend/netlify.toml`, jadi Netlify akan memakainya
otomatis bila base directory diarahkan ke `frontend`.

---

## Akun demo (login lokal, tanpa server)

| Peran | Email | Password |
|---|---|---|
| Kreator | `rakha@kreator.com` | `password123` |
| Vendor | `aperture@vendor.com` | `password123` |
| Admin | `admin@findstudio.id` | `admin123` |

Registrasi user baru juga berfungsi — disimpan di `localStorage` browser.

---

## Halaman

| Path | Isi |
|---|---|
| `/` | Landing: hero + pencarian cerdas, kategori, tren lintas-kategori, dana proteksi, cara kerja, vendor |
| `/about` | Apa itu FindStudio (misi, 3 peran, fitur, dana proteksi) |
| `/browse` | Katalog + filter (kategori, area Surabaya, harga, rating) + pencarian bahasa alami |
| `/equipment/[slug]` | Detail alat + kalender ketersediaan |
| `/studio/[slug]` | Detail studio |
| `/cart`, `/checkout` | Keranjang multi-vendor + checkout escrow (biaya layanan Rp 10.000) |
| `/orders` | Pemesanan & penjadwalan (lini masa jadwal) |
| `/messages` | Chat klien ↔ vendor |
| `/login`, `/register` | Auth lokal (register `?role=vendor` langsung mode vendor) |
| `/dashboard/client` · `/vendor` · `/admin` | Dashboard per peran (warna berbeda per peran) |

## Fitur khas

- **Pencarian bahasa alami** (`lib/search.ts`) — membedah kalimat jadi kategori, lokasi, harga,
  dan rating. Contoh: *"kamera mirrorless di Gubeng di bawah 600rb rating 4.8"*.
- **Lokasi terdekat** — tombol di search bar memakai geolocation untuk memilih kecamatan terdekat.
- **Dana Proteksi internal** (bukan asuransi) — potongan 10% dari nilai sewa ke dana cadangan.
- **Warna peran** — amber untuk kreator, indigo untuk vendor.

## Tech stack

Next.js 14 (App Router, static export) · TypeScript · Tailwind CSS · lucide-react ·
Fraunces + DM Sans + JetBrains Mono.
