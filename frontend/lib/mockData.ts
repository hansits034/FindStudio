export type Category = 'camera' | 'lens' | 'drone' | 'lighting' | 'audio' | 'gimbal' | 'studio' | 'service';

export interface Equipment {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  pricePerDay: number;
  weekendMultiplier: number;
  deposit: number;
  protection: boolean;
  rating: number;
  reviewCount: number;
  vendorId: string;
  location: string;
  available: boolean;
  image: string;
  gallery: string[];
  specs: { label: string; value: string }[];
  description: string;
  has3d: boolean;
  bookedDates: string[];
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  cover: string;
  location: string;
  verified: 'KYC' | 'Biometric' | 'Pending';
  rating: number;
  responseTime: string;
  totalRentals: number;
  joined: string;
  tagline: string;
}

export interface Studio {
  id: string;
  slug: string;
  name: string;
  vendorId: string;
  pricePerHour: number;
  pricePerDay: number;
  capacity: number;
  area: string;
  location: string;
  amenities: string[];
  cover: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;
  equipmentId?: string;
  studioId?: string;
  serviceId?: string;
  status: 'pending' | 'confirmed' | 'ongoing' | 'returned' | 'completed' | 'claimed';
  startDate: string;
  endDate: string;
  total: number;
  vendorName: string;
  itemName: string;
  itemImage: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  type: 'editor-photo' | 'editor-video' | 'colorist' | 'sound';
  vendorId: string;
  pricePerProject: number;
  turnaround: string;
  portfolio: string[];
  rating: number;
  reviewCount: number;
  description: string;
  cover: string;
}

// ---- Helper: stable Unsplash URLs ------------------------------------------
// All photo IDs below were verified to load via images.unsplash.com.
// We add ?auto=format&fit=crop&w= for consistent rendering.
const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// ---- Vendors ----------------------------------------------------------------
export const vendors: Vendor[] = [
  {
    id: 'v1',
    slug: 'aperture-rental',
    name: 'Aperture Rental Co.',
    avatar: u('photo-1535713875002-d1d0cf377fde', 240),
    cover: u('photo-1452780212940-6f5c0d14d848', 1600),
    location: 'Surabaya, Gubeng',
    verified: 'Biometric',
    rating: 4.96,
    responseTime: '< 12 menit',
    totalRentals: 1284,
    joined: '2024-03',
    tagline: 'Spesialis Sony & Canon Cinema.',
  },
  {
    id: 'v2',
    slug: 'roll-house-studio',
    name: 'Roll House Studio',
    avatar: u('photo-1438761681033-6461ffad8d80', 240),
    cover: u('photo-1492691527719-9d1e07e534b4', 1600),
    location: 'Surabaya, Sukolilo',
    verified: 'KYC',
    rating: 4.88,
    responseTime: '< 30 menit',
    totalRentals: 642,
    joined: '2024-08',
    tagline: 'Studio cyclorama 8×5m + grip lengkap.',
  },
  {
    id: 'v3',
    slug: 'skyborne-aerials',
    name: 'Skyborne Aerials',
    avatar: u('photo-1494790108377-be9c29b29330', 240),
    cover: u('photo-1473968512647-3e447244af8f', 1600),
    location: 'Surabaya, Rungkut',
    verified: 'Biometric',
    rating: 4.92,
    responseTime: '< 20 menit',
    totalRentals: 410,
    joined: '2024-11',
    tagline: 'Drone Mavic 3 Pro & FPV custom.',
  },
  {
    id: 'v4',
    slug: 'tone-collective',
    name: 'Tone Collective',
    avatar: u('photo-1539571696357-5a69c17a67c6', 240),
    cover: u('photo-1574375927938-d5a98e8ffe85', 1600),
    location: 'Surabaya, Manyar',
    verified: 'KYC',
    rating: 4.85,
    responseTime: '< 1 jam',
    totalRentals: 318,
    joined: '2025-01',
    tagline: 'Colorist & editor untuk brand commercial.',
  },
  {
    id: 'v5',
    slug: 'soundscape-pro',
    name: 'Soundscape Pro',
    avatar: u('photo-1500648767791-00dcc994a43e', 240),
    cover: u('photo-1590602847861-f357a9332bbc', 1600),
    location: 'Surabaya, Wonokromo',
    verified: 'KYC',
    rating: 4.81,
    responseTime: '< 45 menit',
    totalRentals: 224,
    joined: '2025-02',
    tagline: 'Audio kit profesional & sound engineer.',
  },
  {
    id: 'v6',
    slug: 'lumen-broadcast',
    name: 'Lumen Broadcast',
    avatar: u('photo-1507003211169-0a1dd7228f2d', 240),
    cover: u('photo-1497366216548-37526070297c', 1600),
    location: 'Surabaya, Tegalsari',
    verified: 'Biometric',
    rating: 4.9,
    responseTime: '< 15 menit',
    totalRentals: 712,
    joined: '2024-06',
    tagline: 'Lighting cinematic & continuous LED.',
  },
];

// ---- EQUIPMENT (32 items across 6 categories) -------------------------------
export const equipment: Equipment[] = [
  // ==================== CAMERAS (6) ====================
  {
    id: 'e1', slug: 'sony-a7-iv', name: 'Sony A7 IV Body', brand: 'Sony', category: 'camera',
    pricePerDay: 500000, weekendMultiplier: 1.2, deposit: 3000000, protection: true,
    rating: 4.96, reviewCount: 184, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1502920917128-1aa500764cbd'),
    gallery: [u('photo-1502920917128-1aa500764cbd', 1600), u('photo-1502920917128-1aa500764cbd', 1600), u('photo-1500634245200-e5245c7574ef', 1600)],
    specs: [
      { label: 'Sensor', value: '33MP Full-frame BSI CMOS' },
      { label: 'Video', value: '4K 60p 10-bit 4:2:2' },
      { label: 'Stabilisasi', value: '5-axis IBIS' },
      { label: 'AF', value: 'Real-time Eye AF' },
      { label: 'Slot', value: 'Dual (CFexpress A + SD)' },
    ],
    description: 'Workhorse hybrid full-frame untuk video sinematik dan stills komersial. Termasuk 2× baterai, 1× CFexpress 80GB, dan strap.',
    has3d: true, bookedDates: ['2026-06-02', '2026-06-03', '2026-06-04', '2026-06-15'],
  },
  {
    id: 'e2', slug: 'sony-fx3', name: 'Sony FX3 Cinema Line', brand: 'Sony', category: 'camera',
    pricePerDay: 950000, weekendMultiplier: 1.25, deposit: 5000000, protection: true,
    rating: 4.94, reviewCount: 76, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1502920917128-1aa500764cbd'),
    gallery: [u('photo-1502920917128-1aa500764cbd', 1600)],
    specs: [
      { label: 'Sensor', value: 'Full-frame 12MP' },
      { label: 'Video', value: '4K 120p, S-Cinetone' },
      { label: 'Audio', value: 'XLR top handle' },
    ],
    description: 'Cinema-line full-frame compact. Perfect untuk handheld run-and-gun commercial shoot.',
    has3d: false, bookedDates: ['2026-06-08'],
  },
  {
    id: 'e3', slug: 'canon-r5-c', name: 'Canon EOS R5 C', brand: 'Canon', category: 'camera',
    pricePerDay: 850000, weekendMultiplier: 1.25, deposit: 4500000, protection: true,
    rating: 4.89, reviewCount: 52, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1542038784456-1ea8e935640e'),
    gallery: [u('photo-1542038784456-1ea8e935640e', 1600)],
    specs: [
      { label: 'Sensor', value: '45MP Full-frame' },
      { label: 'Video', value: '8K RAW 60p / 4K 120p' },
      { label: 'Cooling', value: 'Active fan' },
    ],
    description: 'Hybrid 8K untuk yang butuh resolusi maximal. Stamina tinggi karena active cooling.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e4', slug: 'fuji-xt5', name: 'Fujifilm X-T5 Body', brand: 'Fujifilm', category: 'camera',
    pricePerDay: 380000, weekendMultiplier: 1.15, deposit: 2500000, protection: true,
    rating: 4.87, reviewCount: 94, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1516035069371-29a1b244cc32'),
    gallery: [u('photo-1516035069371-29a1b244cc32', 1600)],
    specs: [
      { label: 'Sensor', value: '40MP APS-C X-Trans' },
      { label: 'Video', value: '6.2K 30p' },
      { label: 'Film simulation', value: '19 profile' },
    ],
    description: 'Sweet spot APS-C dengan film simulation Fuji yang ikonik. Cocok untuk lifestyle & travel.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e5', slug: 'blackmagic-6k-pro', name: 'Blackmagic Pocket 6K Pro', brand: 'Blackmagic', category: 'camera',
    pricePerDay: 650000, weekendMultiplier: 1.2, deposit: 3500000, protection: true,
    rating: 4.83, reviewCount: 38, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1516035069371-29a1b244cc32'),
    gallery: [u('photo-1516035069371-29a1b244cc32', 1600)],
    specs: [
      { label: 'Sensor', value: 'Super 35 HDR' },
      { label: 'Codec', value: 'BRAW + ProRes' },
      { label: 'Mount', value: 'EF' },
    ],
    description: 'Cinema cam dengan ND internal & sensor S35. RAW workflow untuk grading bebas.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e6', slug: 'leica-q3', name: 'Leica Q3 (28mm f/1.7)', brand: 'Leica', category: 'camera',
    pricePerDay: 720000, weekendMultiplier: 1.3, deposit: 6000000, protection: true,
    rating: 4.97, reviewCount: 41, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1495707902641-75cac588d2e9'),
    gallery: [u('photo-1495707902641-75cac588d2e9', 1600)],
    specs: [
      { label: 'Sensor', value: '60MP Full-frame' },
      { label: 'Lens', value: 'Fixed Summilux 28mm f/1.7' },
      { label: 'Build', value: 'Brass, weather-sealed' },
    ],
    description: 'Premium fixed-lens compact untuk street, documentary, & editorial.',
    has3d: false, bookedDates: ['2026-06-20'],
  },

  // ==================== LENSES (6) ====================
  {
    id: 'e7', slug: 'canon-rf-24-70', name: 'Canon RF 24–70mm f/2.8L', brand: 'Canon', category: 'lens',
    pricePerDay: 350000, weekendMultiplier: 1.15, deposit: 2500000, protection: true,
    rating: 4.91, reviewCount: 142, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1495707902641-75cac588d2e9'),
    gallery: [u('photo-1495707902641-75cac588d2e9', 1600)],
    specs: [
      { label: 'Mount', value: 'RF' }, { label: 'Aperture', value: 'f/2.8 constant' }, { label: 'IS', value: '5 stops' },
    ],
    description: 'Standard zoom serbaguna untuk event & wedding.', has3d: false, bookedDates: ['2026-06-08'],
  },
  {
    id: 'e8', slug: 'sony-gm-70-200', name: 'Sony FE 70–200mm f/2.8 GM II', brand: 'Sony', category: 'lens',
    pricePerDay: 450000, weekendMultiplier: 1.2, deposit: 3500000, protection: true,
    rating: 4.95, reviewCount: 112, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1502920917128-1aa500764cbd'),
    gallery: [u('photo-1502920917128-1aa500764cbd', 1600)],
    specs: [
      { label: 'Mount', value: 'E-mount FE' }, { label: 'Weight', value: '1045g' }, { label: 'OSS', value: 'Mode 1/2/3' },
    ],
    description: 'Telephoto pro favorit untuk portrait & event. Mark II — lebih ringan, AF lebih cepat.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e9', slug: 'sigma-art-35', name: 'Sigma 35mm f/1.4 Art', brand: 'Sigma', category: 'lens',
    pricePerDay: 180000, weekendMultiplier: 1.1, deposit: 1500000, protection: true,
    rating: 4.86, reviewCount: 88, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1495707902641-75cac588d2e9'),
    gallery: [u('photo-1495707902641-75cac588d2e9', 1600)],
    specs: [
      { label: 'Aperture', value: 'f/1.4' }, { label: 'Element', value: '13 elements / 11 group' },
    ],
    description: 'Prime cepat untuk low-light & cinematic shallow depth-of-field.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e10', slug: 'tamron-28-75', name: 'Tamron 28–75mm f/2.8 G2', brand: 'Tamron', category: 'lens',
    pricePerDay: 220000, weekendMultiplier: 1.1, deposit: 1800000, protection: true,
    rating: 4.82, reviewCount: 67, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1500634245200-e5245c7574ef'),
    gallery: [u('photo-1500634245200-e5245c7574ef', 1600)],
    specs: [{ label: 'Mount', value: 'Sony FE' }, { label: 'Aperture', value: 'f/2.8' }],
    description: 'Standard zoom value-for-money. Compact, sharp, AF cepat.', has3d: false, bookedDates: [],
  },
  {
    id: 'e11', slug: 'samyang-vdslr-cine', name: 'Samyang VDSLR MK2 Cine 4-Lens Kit', brand: 'Samyang', category: 'lens',
    pricePerDay: 400000, weekendMultiplier: 1.2, deposit: 3000000, protection: true,
    rating: 4.78, reviewCount: 43, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1542038784456-1ea8e935640e'),
    gallery: [u('photo-1542038784456-1ea8e935640e', 1600)],
    specs: [
      { label: 'Set', value: '24mm + 35mm + 50mm + 85mm T1.5' },
      { label: 'Gear', value: '0.8 mod cine gears' },
    ],
    description: 'Set lensa cine 4 focal length. Cocok untuk narrative & music video.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e12', slug: 'sony-fe-16-35', name: 'Sony FE 16–35mm f/2.8 GM', brand: 'Sony', category: 'lens',
    pricePerDay: 380000, weekendMultiplier: 1.2, deposit: 2800000, protection: true,
    rating: 4.9, reviewCount: 76, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1500634245200-e5245c7574ef'),
    gallery: [u('photo-1500634245200-e5245c7574ef', 1600)],
    specs: [{ label: 'Mount', value: 'Sony FE' }, { label: 'Range', value: '16-35mm' }],
    description: 'Ultra-wide zoom untuk landscape, architecture, dan vlogging.',
    has3d: false, bookedDates: [],
  },

  // ==================== DRONES (4) ====================
  {
    id: 'e13', slug: 'dji-mavic-3-pro', name: 'DJI Mavic 3 Pro Cine', brand: 'DJI', category: 'drone',
    pricePerDay: 750000, weekendMultiplier: 1.25, deposit: 5000000, protection: true,
    rating: 4.94, reviewCount: 96, vendorId: 'v3', location: 'Surabaya, Rungkut', available: true,
    image: u('photo-1473968512647-3e447244af8f'),
    gallery: [u('photo-1473968512647-3e447244af8f', 1600), u('photo-1521405924368-64c5b84bec60', 1600)],
    specs: [
      { label: 'Kamera', value: 'Hasselblad 4/3 CMOS + Tele 70mm + 166mm' },
      { label: 'Video', value: '5.1K Apple ProRes' },
      { label: 'Range', value: 'O4+ 28 km' },
    ],
    description: 'Drone tri-kamera untuk aerial sinematik. Termasuk RC Pro, 3 baterai, ND filter set.',
    has3d: true, bookedDates: ['2026-06-10', '2026-06-11'],
  },
  {
    id: 'e14', slug: 'dji-mini-4-pro', name: 'DJI Mini 4 Pro Fly More', brand: 'DJI', category: 'drone',
    pricePerDay: 280000, weekendMultiplier: 1.15, deposit: 1800000, protection: true,
    rating: 4.86, reviewCount: 62, vendorId: 'v3', location: 'Surabaya, Rungkut', available: true,
    image: u('photo-1508614589041-895b88991e3e'),
    gallery: [u('photo-1508614589041-895b88991e3e', 1600)],
    specs: [{ label: 'Weight', value: '< 249g' }, { label: 'Video', value: '4K HDR' }, { label: 'Range', value: '20 km' }],
    description: 'Drone sub-249g — bebas izin di banyak lokasi. Pilihan favorit travel creator.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e15', slug: 'dji-inspire-3', name: 'DJI Inspire 3 (Pro)', brand: 'DJI', category: 'drone',
    pricePerDay: 2500000, weekendMultiplier: 1.3, deposit: 25000000, protection: true,
    rating: 4.95, reviewCount: 18, vendorId: 'v3', location: 'Surabaya, Rungkut', available: true,
    image: u('photo-1521405924368-64c5b84bec60'),
    gallery: [u('photo-1521405924368-64c5b84bec60', 1600)],
    specs: [
      { label: 'Kamera', value: 'X9-8K Air' },
      { label: 'Video', value: '8K 25p / 4K 120p ProRes RAW' },
      { label: 'Setup', value: 'Dual operator (pilot + camera)' },
    ],
    description: 'Drone profesional kelas film & commercial. Wajib dual-operator. Termasuk ND set + 3 TB-30.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e16', slug: 'fpv-custom-cinewhoop', name: 'FPV Cinewhoop Custom', brand: 'Custom', category: 'drone',
    pricePerDay: 450000, weekendMultiplier: 1.2, deposit: 3500000, protection: true,
    rating: 4.79, reviewCount: 24, vendorId: 'v3', location: 'Surabaya, Rungkut', available: true,
    image: u('photo-1579829366248-204fe8413f31'),
    gallery: [u('photo-1579829366248-204fe8413f31', 1600)],
    specs: [{ label: 'Cam', value: 'GoPro Hero 11 mount' }, { label: 'Frame', value: '3" ducted' }],
    description: 'Cinewhoop indoor / venue dengan operator on-demand. Termasuk goggles & radio.',
    has3d: false, bookedDates: [],
  },

  // ==================== LIGHTING (5) ====================
  {
    id: 'e17', slug: 'aputure-600d', name: 'Aputure LS 600d Pro', brand: 'Aputure', category: 'lighting',
    pricePerDay: 400000, weekendMultiplier: 1.2, deposit: 2000000, protection: true,
    rating: 4.89, reviewCount: 71, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1542038784456-1ea8e935640e'),
    gallery: [u('photo-1542038784456-1ea8e935640e', 1600)],
    specs: [{ label: 'Output', value: '600W Daylight' }, { label: 'Mount', value: 'Bowens' }, { label: 'Power', value: 'AC + V-mount 26V' }],
    description: 'Lampu LED 600W untuk komersial besar. Sudah termasuk reflector + softbox 120cm.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e18', slug: 'aputure-300x', name: 'Aputure LS 300X Bi-Color', brand: 'Aputure', category: 'lighting',
    pricePerDay: 220000, weekendMultiplier: 1.15, deposit: 1500000, protection: true,
    rating: 4.84, reviewCount: 53, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1581235720704-06d3acfcb36f'),
    gallery: [u('photo-1581235720704-06d3acfcb36f', 1600)],
    specs: [{ label: 'Output', value: '350W Bi-Color' }, { label: 'CCT', value: '2700K – 6500K' }],
    description: 'Bi-color LED untuk interview & talking head. Lebih kontrol white balance dibanding tungsten.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e19', slug: 'godox-ad600pro', name: 'Godox AD600 Pro × 2', brand: 'Godox', category: 'lighting',
    pricePerDay: 250000, weekendMultiplier: 1.15, deposit: 1800000, protection: true,
    rating: 4.78, reviewCount: 42, vendorId: 'v2', location: 'Surabaya, Sukolilo', available: true,
    image: u('photo-1581235720704-06d3acfcb36f'),
    gallery: [u('photo-1581235720704-06d3acfcb36f', 1600)],
    specs: [{ label: 'Output', value: '600Ws strobe ×2' }, { label: 'Battery', value: 'Built-in lithium' }],
    description: 'Twin strobe location kit. Bekal lighting yang reliable untuk wedding & beauty.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e20', slug: 'led-tube-set', name: 'Nanlite PavoTube II 30C × 4', brand: 'Nanlite', category: 'lighting',
    pricePerDay: 280000, weekendMultiplier: 1.2, deposit: 2200000, protection: true,
    rating: 4.81, reviewCount: 36, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1581235720704-06d3acfcb36f'),
    gallery: [u('photo-1581235720704-06d3acfcb36f', 1600)],
    specs: [{ label: 'Set', value: '4× tube RGBWW 120cm' }, { label: 'FX', value: 'Built-in DMX effects' }],
    description: 'Tube RGB untuk music video & creator content. Magnet base, baterai built-in.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e21', slug: 'profoto-b10x', name: 'Profoto B10X Plus', brand: 'Profoto', category: 'lighting',
    pricePerDay: 320000, weekendMultiplier: 1.2, deposit: 2500000, protection: true,
    rating: 4.92, reviewCount: 28, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1551817958-d9d86fb29431'),
    gallery: [u('photo-1551817958-d9d86fb29431', 1600)],
    specs: [{ label: 'Output', value: '500Ws + 2500lm LED modeling' }, { label: 'Battery', value: '3 hours' }],
    description: 'Strobe wireless premium untuk on-location commercial. Quality of light kelas dewa.',
    has3d: false, bookedDates: [],
  },

  // ==================== AUDIO (5) ====================
  {
    id: 'e22', slug: 'rode-wireless-pro', name: 'Rode Wireless Pro', brand: 'Rode', category: 'audio',
    pricePerDay: 150000, weekendMultiplier: 1.1, deposit: 800000, protection: false,
    rating: 4.78, reviewCount: 44, vendorId: 'v5', location: 'Surabaya, Wonokromo', available: true,
    image: u('photo-1590602847861-f357a9332bbc'),
    gallery: [u('photo-1590602847861-f357a9332bbc', 1600)],
    specs: [
      { label: 'TX', value: '2× transmitter + onboard 32-bit float' },
      { label: 'Range', value: '260m line-of-sight' },
    ],
    description: 'Wireless mic dengan 32-bit float recording — anti clipping di outdoor shoot.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e23', slug: 'dji-mic-2', name: 'DJI Mic 2 (2-pack)', brand: 'DJI', category: 'audio',
    pricePerDay: 90000, weekendMultiplier: 1.1, deposit: 600000, protection: false,
    rating: 4.85, reviewCount: 67, vendorId: 'v5', location: 'Surabaya, Wonokromo', available: true,
    image: u('photo-1583394838336-acd977736f90'),
    gallery: [u('photo-1583394838336-acd977736f90', 1600)],
    specs: [{ label: 'Range', value: '250m' }, { label: 'Internal storage', value: '8GB' }],
    description: 'Mic wireless mungil dengan internal storage. Pilihan utama vlogger & content creator.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e24', slug: 'sennheiser-mke-600', name: 'Sennheiser MKE 600 Shotgun', brand: 'Sennheiser', category: 'audio',
    pricePerDay: 120000, weekendMultiplier: 1.1, deposit: 700000, protection: false,
    rating: 4.8, reviewCount: 31, vendorId: 'v5', location: 'Surabaya, Wonokromo', available: true,
    image: u('photo-1493676304819-0d7a8d026dcf'),
    gallery: [u('photo-1493676304819-0d7a8d026dcf', 1600)],
    specs: [{ label: 'Pattern', value: 'Super-cardioid' }, { label: 'Power', value: 'Phantom 48V atau AA' }],
    description: 'Shotgun broadcast untuk dialog. Termasuk pistol grip & dead-cat windshield.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e25', slug: 'zoom-h6', name: 'Zoom H6 Audio Recorder', brand: 'Zoom', category: 'audio',
    pricePerDay: 80000, weekendMultiplier: 1.1, deposit: 500000, protection: false,
    rating: 4.76, reviewCount: 56, vendorId: 'v5', location: 'Surabaya, Wonokromo', available: true,
    image: u('photo-1518131672697-613becd4fab5'),
    gallery: [u('photo-1518131672697-613becd4fab5', 1600)],
    specs: [{ label: 'Channels', value: '6 input' }, { label: 'Resolution', value: '24-bit / 96 kHz' }],
    description: 'Field recorder favorit. 4 input XLR + 2 capsul interchangeable.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e26', slug: 'sound-devices-mixpre-3', name: 'Sound Devices MixPre-3 II', brand: 'Sound Devices', category: 'audio',
    pricePerDay: 220000, weekendMultiplier: 1.15, deposit: 1800000, protection: true,
    rating: 4.93, reviewCount: 19, vendorId: 'v5', location: 'Surabaya, Wonokromo', available: true,
    image: u('photo-1471478331149-c72f17e33c73'),
    gallery: [u('photo-1471478331149-c72f17e33c73', 1600)],
    specs: [{ label: 'Inputs', value: '3× XLR Kashmir mic pre' }, { label: 'Format', value: '32-bit float WAV' }],
    description: 'Recorder broadcast premium. Pilihan utama untuk shooting documentary serius.',
    has3d: false, bookedDates: [],
  },

  // ==================== GIMBAL / RIG (4) ====================
  {
    id: 'e27', slug: 'dji-rs3-pro', name: 'DJI RS 3 Pro Gimbal', brand: 'DJI', category: 'gimbal',
    pricePerDay: 250000, weekendMultiplier: 1.15, deposit: 1500000, protection: true,
    rating: 4.83, reviewCount: 58, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1542038784456-1ea8e935640e'),
    gallery: [u('photo-1542038784456-1ea8e935640e', 1600)],
    specs: [{ label: 'Payload', value: '4.5 kg' }, { label: 'Display', value: '1.8" OLED' }, { label: 'LiDAR', value: 'Optional' }],
    description: 'Gimbal kelas pro untuk camera setup berat. Termasuk briefcase mode handle.',
    has3d: false, bookedDates: ['2026-06-05'],
  },
  {
    id: 'e28', slug: 'zhiyun-crane-4', name: 'Zhiyun Crane 4', brand: 'Zhiyun', category: 'gimbal',
    pricePerDay: 180000, weekendMultiplier: 1.15, deposit: 1200000, protection: true,
    rating: 4.77, reviewCount: 41, vendorId: 'v1', location: 'Surabaya, Gubeng', available: true,
    image: u('photo-1542038784456-1ea8e935640e'),
    gallery: [u('photo-1542038784456-1ea8e935640e', 1600)],
    specs: [{ label: 'Payload', value: '3 kg' }, { label: 'Battery', value: '13 jam' }],
    description: 'Alternative DJI RS dengan fill light built-in. Cocok untuk mirrorless setup.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e29', slug: 'ronin-2-pro', name: 'DJI Ronin 2 Pro Combo', brand: 'DJI', category: 'gimbal',
    pricePerDay: 850000, weekendMultiplier: 1.25, deposit: 8000000, protection: true,
    rating: 4.9, reviewCount: 22, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1581235720704-06d3acfcb36f'),
    gallery: [u('photo-1581235720704-06d3acfcb36f', 1600)],
    specs: [{ label: 'Payload', value: '13.6 kg' }, { label: 'Operasi', value: 'Solo / Dual / Vehicle' }],
    description: 'Heavy-duty gimbal untuk cinema rig. Vehicle mount + remote operator standby.',
    has3d: false, bookedDates: [],
  },
  {
    id: 'e30', slug: 'tilta-cage-rig', name: 'Tilta Camera Cage Rig Kit', brand: 'Tilta', category: 'gimbal',
    pricePerDay: 130000, weekendMultiplier: 1.1, deposit: 1000000, protection: true,
    rating: 4.7, reviewCount: 18, vendorId: 'v6', location: 'Surabaya, Tegalsari', available: true,
    image: u('photo-1542038784456-1ea8e935640e'),
    gallery: [u('photo-1542038784456-1ea8e935640e', 1600)],
    specs: [{ label: 'Bundle', value: 'Cage + matte box + follow focus + top handle' }],
    description: 'Cage rig lengkap untuk transform mirrorless jadi rig cinema.',
    has3d: false, bookedDates: [],
  },
];

// ---- STUDIOS (6) -----------------------------------------------------------
export const studios: Studio[] = [
  {
    id: 's1', slug: 'roll-house-cyc', name: 'Roll House — Cyc White 8×5m', vendorId: 'v2',
    pricePerHour: 250000, pricePerDay: 1800000, capacity: 12, area: '40 m²', location: 'Surabaya, Sukolilo',
    amenities: ['Cyclorama Putih', 'AC Inverter', 'Ruang Make-up', 'Wifi 500Mbps', 'Parkir Mobil'],
    cover: u('photo-1492691527719-9d1e07e534b4', 1600),
    gallery: [u('photo-1492691527719-9d1e07e534b4', 1600), u('photo-1581235720704-06d3acfcb36f', 1600)],
    rating: 4.9, reviewCount: 122,
  },
  {
    id: 's2', slug: 'tone-livestream', name: 'Tone — Livestream Black Room', vendorId: 'v4',
    pricePerHour: 180000, pricePerDay: 1200000, capacity: 6, area: '24 m²', location: 'Surabaya, Manyar',
    amenities: ['Greenscreen', 'LED Wall 4×2m', 'Audio booth', 'Direct Fiber 1Gbps'],
    cover: u('photo-1574375927938-d5a98e8ffe85', 1600),
    gallery: [u('photo-1574375927938-d5a98e8ffe85', 1600)],
    rating: 4.84, reviewCount: 71,
  },
  {
    id: 's3', slug: 'aperture-loft', name: 'Aperture — Loft Daylight', vendorId: 'v1',
    pricePerHour: 300000, pricePerDay: 2200000, capacity: 15, area: '60 m²', location: 'Surabaya, Darmo',
    amenities: ['Jendela Utara 4m', 'Lantai Kayu', 'Dapur', 'Wardrobe Rack'],
    cover: u('photo-1497366216548-37526070297c', 1600),
    gallery: [u('photo-1497366216548-37526070297c', 1600)],
    rating: 4.93, reviewCount: 153,
  },
  {
    id: 's4', slug: 'lumen-grand-cyc', name: 'Lumen — Grand Cyc Two-Wall', vendorId: 'v6',
    pricePerHour: 450000, pricePerDay: 3200000, capacity: 25, area: '120 m²', location: 'Surabaya, Tegalsari',
    amenities: ['Cyc 12×6m', '6m Ceiling', 'Loading Dock', 'Green Room', 'Gantry'],
    cover: u('photo-1497366811353-6870744d04b2', 1600),
    gallery: [u('photo-1497366811353-6870744d04b2', 1600)],
    rating: 4.95, reviewCount: 87,
  },
  {
    id: 's5', slug: 'roll-house-tabletop', name: 'Roll House — Tabletop Studio', vendorId: 'v2',
    pricePerHour: 150000, pricePerDay: 950000, capacity: 4, area: '15 m²', location: 'Surabaya, Sukolilo',
    amenities: ['Acrylic Top', 'Overhead Mount', 'Color Backdrop', 'Light Tent'],
    cover: u('photo-1556761175-5973dc0f32e7', 1600),
    gallery: [u('photo-1556761175-5973dc0f32e7', 1600)],
    rating: 4.78, reviewCount: 54,
  },
  {
    id: 's6', slug: 'tone-podcast-booth', name: 'Tone — Podcast Audio Booth', vendorId: 'v4',
    pricePerHour: 120000, pricePerDay: 800000, capacity: 4, area: '18 m²', location: 'Surabaya, Manyar',
    amenities: ['Acoustic Treated', 'Shure SM7B ×4', 'Rodecaster Pro', '4K Cam ×3'],
    cover: u('photo-1478737270239-2f02b77fc618', 1600),
    gallery: [u('photo-1478737270239-2f02b77fc618', 1600)],
    rating: 4.86, reviewCount: 62,
  },
];

// ---- SERVICES (6) ----------------------------------------------------------
export const services: Service[] = [
  {
    id: 'srv1', slug: 'tone-color-grade', name: 'Color Grading Sinematik', type: 'colorist',
    vendorId: 'v4', pricePerProject: 2500000, turnaround: '3–5 hari',
    portfolio: [u('photo-1574375927938-d5a98e8ffe85', 1200), u('photo-1492691527719-9d1e07e534b4', 1200)],
    cover: u('photo-1574375927938-d5a98e8ffe85', 1200),
    rating: 4.95, reviewCount: 38,
    description: 'Grading di DaVinci Resolve dengan workflow ACES. Cocok untuk brand commercial 30–60 detik.',
  },
  {
    id: 'srv2', slug: 'editor-video-tone', name: 'Video Editing Multi-cam', type: 'editor-video',
    vendorId: 'v4', pricePerProject: 1800000, turnaround: '5–7 hari',
    portfolio: [u('photo-1574375927938-d5a98e8ffe85', 1200)],
    cover: u('photo-1492691527719-9d1e07e534b4', 1200),
    rating: 4.88, reviewCount: 24,
    description: 'Editing multicam (hingga 4 angle) + motion graphic ringan + delivery 4K.',
  },
  {
    id: 'srv3', slug: 'photo-retouch', name: 'Photo Retouching Beauty', type: 'editor-photo',
    vendorId: 'v4', pricePerProject: 350000, turnaround: '24 jam',
    portfolio: [u('photo-1556761175-5973dc0f32e7', 1200)],
    cover: u('photo-1556761175-5973dc0f32e7', 1200),
    rating: 4.92, reviewCount: 88,
    description: 'High-end retouch (10 foto) — skin, color, dodge & burn. Frequency separation.',
  },
  {
    id: 'srv4', slug: 'wedding-edit-package', name: 'Wedding Highlight Edit', type: 'editor-video',
    vendorId: 'v2', pricePerProject: 3200000, turnaround: '14 hari',
    portfolio: [u('photo-1519225421980-715cb0215aed', 1200)],
    cover: u('photo-1519225421980-715cb0215aed', 1200),
    rating: 4.86, reviewCount: 41,
    description: 'Highlight reel 3-5 menit + ceremony cut + reels short-form. License music profesional.',
  },
  {
    id: 'srv5', slug: 'sound-mix-master', name: 'Audio Mixing & Mastering', type: 'sound',
    vendorId: 'v5', pricePerProject: 1500000, turnaround: '4–6 hari',
    portfolio: [u('photo-1493676304819-0d7a8d026dcf', 1200)],
    cover: u('photo-1493676304819-0d7a8d026dcf', 1200),
    rating: 4.9, reviewCount: 27,
    description: 'Mixing dialog, ADR, foley, music dengan delivery -16 LUFS untuk YouTube.',
  },
  {
    id: 'srv6', slug: 'product-retouch-ecom', name: 'E-commerce Product Edit (50 SKU)', type: 'editor-photo',
    vendorId: 'v4', pricePerProject: 1200000, turnaround: '3 hari',
    portfolio: [u('photo-1556761175-5973dc0f32e7', 1200)],
    cover: u('photo-1556761175-5973dc0f32e7', 1200),
    rating: 4.82, reviewCount: 52,
    description: 'Background removal, color correction, & shadow add-on untuk listing marketplace.',
  },
];

// ---- Mock bookings ----------------------------------------------------------
export const myBookings: Booking[] = [
  {
    id: 'bk1', equipmentId: 'e1', status: 'ongoing', startDate: '2026-05-26', endDate: '2026-05-28',
    total: 1500000, vendorName: 'Aperture Rental Co.', itemName: 'Sony A7 IV Body',
    itemImage: u('photo-1502920917128-1aa500764cbd', 400),
  },
  {
    id: 'bk2', studioId: 's1', status: 'confirmed', startDate: '2026-06-02', endDate: '2026-06-02',
    total: 1800000, vendorName: 'Roll House Studio', itemName: 'Roll House — Cyc White 8×5m',
    itemImage: u('photo-1492691527719-9d1e07e534b4', 400),
  },
  {
    id: 'bk3', equipmentId: 'e13', status: 'completed', startDate: '2026-04-12', endDate: '2026-04-15',
    total: 2812500, vendorName: 'Skyborne Aerials', itemName: 'DJI Mavic 3 Pro Cine',
    itemImage: u('photo-1473968512647-3e447244af8f', 400),
  },
  {
    id: 'bk4', serviceId: 'srv1', status: 'pending', startDate: '2026-06-10', endDate: '2026-06-15',
    total: 2500000, vendorName: 'Tone Collective', itemName: 'Color Grading Sinematik',
    itemImage: u('photo-1574375927938-d5a98e8ffe85', 400),
  },
];

// ---- Cart -------------------------------------------------------------------
export const cartItems = [
  {
    id: 'e1', name: 'Sony A7 IV Body', vendor: 'Aperture Rental Co.', vendorId: 'v1',
    image: u('photo-1502920917128-1aa500764cbd', 400),
    days: 3, pricePerDay: 500000, protection: true, deposit: 3000000,
  },
  {
    id: 'e7', name: 'Canon RF 24–70mm f/2.8L', vendor: 'Aperture Rental Co.', vendorId: 'v1',
    image: u('photo-1495707902641-75cac588d2e9', 400),
    days: 3, pricePerDay: 350000, protection: true, deposit: 2500000,
  },
  {
    id: 's1', name: 'Roll House — Cyc White 8×5m', vendor: 'Roll House Studio', vendorId: 'v2',
    image: u('photo-1492691527719-9d1e07e534b4', 400),
    days: 1, pricePerDay: 1800000, protection: false, deposit: 0,
  },
];

// ---- Categories with real counts -------------------------------------------
export const categories = [
  { key: 'camera', label: 'Kamera' },
  { key: 'lens', label: 'Lensa' },
  { key: 'drone', label: 'Drone' },
  { key: 'lighting', label: 'Lighting' },
  { key: 'audio', label: 'Audio' },
  { key: 'gimbal', label: 'Gimbal & Rig' },
  { key: 'studio', label: 'Studio' },
  { key: 'service', label: 'Jasa Profesional' },
].map((c) => ({
  ...c,
  count:
    c.key === 'studio'
      ? studios.length
      : c.key === 'service'
        ? services.length
        : equipment.filter((e) => e.category === c.key).length,
}));

export function formatIDR(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export function getVendor(id: string) {
  return vendors.find((v) => v.id === id);
}

export function categoryLabel(key: string): string {
  return categories.find((c) => c.key === key)?.label ?? 'Semua';
}
