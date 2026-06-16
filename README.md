<img width="1276" height="604" alt="image" src="https://github.com/user-attachments/assets/c904ccb8-8035-435e-9e80-e2e30c6f29e0" />
<img width="1279" height="599" alt="image" src="https://github.com/user-attachments/assets/c0a036da-e360-4848-8572-5e077cc86dbe" />
<img width="1277" height="600" alt="image" src="https://github.com/user-attachments/assets/72bfe3bc-15a9-4022-9292-228f5a15a6e4" />
<img width="1279" height="599" alt="image" src="https://github.com/user-attachments/assets/86a83f6b-1bfd-42ef-9a70-52383077721e" />

# FindStudio

**Ekosistem terpadu untuk kreator di Surabaya** — sewa kamera, lensa, drone, lighting, audio, gimbal;
pesan studio; dan pakai jasa profesional (editor, colorist, sound) dalam satu platform.
Lengkap dengan pencarian bahasa alami, booking multi-vendor, pembayaran escrow, dan Dana Proteksi internal.

> **Frontend-only.** Aplikasi ini 100% berjalan di browser (Next.js _static export_).
> Tidak ada backend/server: data katalog di-*hardcode* di `lib/mockData.ts`, dan login/register
> disimpan di `localStorage`. Siap di-deploy ke Netlify, Vercel, atau host statis apa pun.

- **Palet warna:** `#ffffff` · `#676f9d` · `#424769` · `#2d3250` · `#f9b17a`
- **Sistem warna peran:** amber = kreator/klien · indigo = vendor · emerald = admin
- **Lokasi demo:** Surabaya (area: Gubeng, Manyar, Sukolilo, Rungkut, Wonokromo, Tegalsari, Darmo, Mulyorejo, Wiyung)

---

## Daftar Isi
1. [Cara menjalankan](#-cara-menjalankan-lokal)
2. [Build & deploy](#-build-statis)
3. [Akun demo](#-akun-demo-login-lokal-tanpa-server)
4. [Peta halaman](#-peta-halaman)
5. [Fitur utama](#-fitur-utama)
6. [Struktur proyek](#-struktur-proyek)
7. [Tech stack](#-tech-stack)
8. [Catatan penting](#-catatan-penting)

---

## ▶ Cara menjalankan (lokal)

Prasyarat: **Node.js 20+**.

```bash
cd frontend
npm install
npm run dev          # buka http://localhost:3000
```

> Project memakai **Node.js**, jadi daftar dependency ada di `package.json`
> (setara fungsi `requirements.txt` di Python). `npm install` membacanya otomatis.

---

## 📦 Build statis

```bash
cd frontend
npm run build        # output → frontend/out/  (HTML/CSS/JS statis)
```

Folder `frontend/out/` bisa dibuka di host statis mana pun, tanpa server Node.

### Deploy ke Netlify

**Opsi A — Drag & drop (paling cepat)**
1. `cd frontend && npm install && npm run build`
2. Buka <https://app.netlify.com/drop>
3. Seret folder **`frontend/out`** ke halaman itu.

**Opsi B — Connect Git (auto-deploy tiap push)** — Netlify → *Add new site → Import from Git*:

| Field | Nilai |
|---|---|
| Base directory | `findstudio/frontend` |
| Build command | `npm run build` |
| Publish directory | `findstudio/frontend/out` |
| Node version | 20 (sudah dipin di `.nvmrc`) |

Konfigurasi ini juga tersimpan di `frontend/netlify.toml`.

### Deploy ke Vercel

- **Cara 1:** push isi folder `frontend/` sebagai root repo → Vercel auto-detect Next.js, tanpa setting tambahan.
- **Cara 2:** push seluruh repo → Vercel → Project Settings → **Root Directory = `findstudio/frontend`**.

Jangan commit `node_modules/`, `.next/`, `out/` (sudah ada di `.gitignore`).

---

## 🔑 Akun demo (login lokal, tanpa server)

| Peran | Email | Password | Diarahkan ke |
|---|---|---|---|
| Kreator/Klien | `rakha@kreator.com` | `password123` | `/dashboard/client` |
| Vendor | `aperture@vendor.com` | `password123` | `/dashboard/vendor` |
| Admin | `admin@findstudio.id` | `admin123` | `/dashboard/admin` |

Registrasi user baru juga berfungsi — disimpan di `localStorage` browser (hilang jika cache dibersihkan).

---

## 🗺 Peta halaman

### Publik / Klien
| Path | Isi |
|---|---|
| `/` | Landing: hero + pencarian cerdas, kategori, tren lintas-kategori, dana proteksi, cara kerja, vendor |
| `/about` | Apa itu FindStudio: misi, 3 peran, cara kerja, fitur premium vendor, dana proteksi |
| `/browse` | Katalog + filter (kategori, area Surabaya, harga, rating) + pencarian bahasa alami |
| `/equipment/[id]` | Detail alat + spesifikasi + kalender ketersediaan |
| `/studio/[id]` | Detail studio |
| `/cart` · `/checkout` | Keranjang multi-vendor + checkout escrow (biaya layanan Rp 10.000) |
| `/orders` | Pesanan & jadwal (lini masa, status, chat vendor) |
| `/messages` | Chat klien ↔ vendor + notifikasi sistem |
| `/wishlist` · `/account` | Favorit & pengaturan akun klien |
| `/login` · `/register` | Auth lokal (`/register?role=vendor` langsung mode vendor) |

### Dashboard Vendor (`/dashboard/vendor`)
`beranda` · `catalog` (katalog aset) · `orders` (jadwal & pesanan) · `messages` (chat klien) ·
`claims` (pusat klaim proteksi) · `finance` (keuangan & wallet) · `settings` (pengaturan toko)

### Dashboard Admin (`/dashboard/admin`)
`dasbor utama` · `users` (pengguna & KYC) · `catalog` (moderasi katalog) · `finance` (escrow) ·
`disputes` (resolusi & klaim) · `promo` (loyalitas & promo) · `messages` (pesan & dukungan)

---

## ✨ Fitur utama

- **Pencarian bahasa alami / NLP-lite** (`lib/search.ts`) — membedah kalimat jadi kategori, lokasi,
  harga, dan rating. Contoh: *"kamera mirrorless di Gubeng di bawah 600rb rating 4.8"*.
- **Lokasi terdekat** — tombol di search bar memakai geolocation browser untuk memilih kecamatan terdekat.
- **Booking multi-vendor** — sewa alat dari beberapa vendor dalam satu keranjang & checkout.
- **Pembayaran escrow** — dana ditahan platform sampai sewa selesai (simulasi UI).
- **Dana Proteksi internal** *(bukan asuransi)* — potongan 10% dari nilai sewa masuk dana cadangan;
  vendor bisa klaim ganti rugi kerusakan.
- **Sistem peran berwarna** — amber (kreator), indigo (vendor), emerald (admin) agar konteks langsung terbaca.
- **Chat real-time (simulasi)** dengan pola master-detail yang nyaman di HP (daftar → buka chat → tombol kembali).
- **Responsif penuh** — diuji untuk HP, tablet, dan desktop (nav dashboard mobile, tabel scroll, chat adaptif).

---

## 🗂 Struktur proyek

```
findstudio/
├── README.md
└── frontend/                  # SATU-SATUNYA folder aplikasi
    ├── app/                   # Routes (Next.js App Router)
    │   ├── page.tsx           # Landing
    │   ├── about/ browse/ equipment/[id]/ studio/[id]/
    │   ├── cart/ checkout/ orders/ messages/ wishlist/ account/
    │   ├── login/ register/
    │   └── dashboard/
    │       ├── client/
    │       ├── vendor/        # + layout.tsx & sub-halaman (catalog, orders, dst)
    │       └── admin/         # + layout.tsx & sub-halaman (users, finance, dst)
    ├── components/            # Navbar, Footer, RoleBanner, SmartSearch,
    │                          # EquipmentCard, StudioCard, ServiceCard, FilterSidebar, ChatButton
    ├── lib/
    │   ├── mockData.ts        # "Database" hardcoded: equipment, studios, services, vendors, bookings
    │   ├── api.ts             # Auth lokal (seed users + localStorage)
    │   └── search.ts          # Parser pencarian bahasa alami + util lokasi terdekat
    ├── public/                # logo.png, favicon
    ├── package.json           # daftar dependency
    ├── next.config.mjs        # output: 'export' → folder out/ statis
    ├── netlify.toml           # konfigurasi deploy Netlify
    ├── tailwind.config.ts · postcss.config.js · tsconfig.json
    └── .nvmrc                 # pin Node 20
```

---

## 🧱 Tech stack

| Lapisan | Teknologi |
|---|---|
| Framework | **Next.js 14** (App Router, `output: 'export'`) |
| Bahasa | **TypeScript** |
| Styling | **Tailwind CSS** |
| Ikon | **lucide-react** |
| Font | Fraunces (display) · DM Sans (teks) · JetBrains Mono (mono) |
| Gambar produk | LoremFlickr (foto berbasis kata kunci sesuai kategori) + Unsplash |
| Data & Auth | Hardcoded di `lib/` + `localStorage` (tanpa backend) |
| Deploy | Netlify / Vercel / host statis apa pun |

---

## 📝 Catatan penting

- **Tidak ada backend.** Semua transaksi (booking, pembayaran, payout, klaim) adalah **simulasi UI**
  untuk keperluan prototipe/capstone — tidak ada uang/proses nyata.
- **Data tidak persisten antar perangkat.** User hasil register & sesi login hanya tersimpan di
  `localStorage` browser yang dipakai.
- **Dana Proteksi ≠ asuransi.** Ini dana cadangan internal yang dikelola sendiri oleh platform,
  bukan produk asuransi dan tidak terikat regulasi asuransi.
- **Gambar produk** memakai LoremFlickr berbasis kata kunci agar topik selalu cocok dengan kategori;
  untuk produksi sebaiknya diganti foto asli di `public/` lalu perbarui `lib/mockData.ts`.

---

> Proyek capstone — Informatika. Dibuat dengan fokus pada UI/UX dan alur ekosistem kreator.
