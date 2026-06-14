/**
 * AI-powered search parser untuk FindStudio.
 *
 * Membedah kalimat bahasa alami menjadi filter + intent terstruktur:
 *   - kategori  (jenis layanan)
 *   - use-case  (niat pemakaian: landscape, wedding, commercial, dll.)
 *   - lokasi    (area Surabaya / terdekat)
 *   - harga     (maksimum / minimum)
 *   - rating    minimum
 *   - specKeywords — untuk relevance scoring di browse
 */

import type { Category } from './mockData';

export const SURABAYA_AREAS = [
  'Gubeng', 'Manyar', 'Sukolilo', 'Rungkut', 'Wonokromo',
  'Tegalsari', 'Darmo', 'Mulyorejo', 'Wiyung',
] as const;

export type SurabayaArea = (typeof SURABAYA_AREAS)[number];

export const AREA_COORDS: Record<SurabayaArea, { lat: number; lng: number }> = {
  Gubeng:    { lat: -7.2756, lng: 112.7506 },
  Manyar:    { lat: -7.2785, lng: 112.78   },
  Sukolilo:  { lat: -7.29,   lng: 112.799  },
  Rungkut:   { lat: -7.334,  lng: 112.799  },
  Wonokromo: { lat: -7.3,    lng: 112.737  },
  Tegalsari: { lat: -7.267,  lng: 112.739  },
  Darmo:     { lat: -7.292,  lng: 112.738  },
  Mulyorejo: { lat: -7.264,  lng: 112.79   },
  Wiyung:    { lat: -7.323,  lng: 112.69   },
};

// ── Use-case detection ────────────────────────────────────────────────────────

interface UseCaseMeta {
  label: string;
  primaryCat: Category;
  categories: Category[];
  specKeywords: string[];
}

const USE_CASE_META: Record<string, UseCaseMeta> = {
  landscape: {
    label: 'Foto Landscape',
    primaryCat: 'camera',
    categories: ['camera', 'lens'],
    specKeywords: ['full-frame', 'mirrorless', 'wide', 'BSI', 'sensor besar', '33MP', '45MP', 'full frame'],
  },
  portrait: {
    label: 'Foto Potret / Portrait',
    primaryCat: 'camera',
    categories: ['camera', 'lens', 'lighting'],
    specKeywords: ['prime', '85mm', '50mm', 'full-frame', 'Eye AF', 'bokeh', 'portrait'],
  },
  wedding: {
    label: 'Wedding / Pernikahan',
    primaryCat: 'camera',
    categories: ['camera', 'lens', 'lighting', 'audio'],
    specKeywords: ['full-frame', 'IBIS', 'dual slot', 'low light', 'cinema', 'wireless'],
  },
  product: {
    label: 'Product Photography',
    primaryCat: 'lighting',
    categories: ['camera', 'lighting', 'studio'],
    specKeywords: ['LED', 'strobe', 'softbox', 'bi-color', 'continuous', 'tabletop', 'macro'],
  },
  aerial: {
    label: 'Aerial / Drone Shot',
    primaryCat: 'drone',
    categories: ['drone'],
    specKeywords: ['Mavic', 'Inspire', 'cinematic', 'Hasselblad', '4K', 'omnidirectional', 'obstacle'],
  },
  commercial: {
    label: 'Video Brand Commercial',
    primaryCat: 'camera',
    categories: ['camera', 'lighting', 'audio', 'studio'],
    specKeywords: ['cinema', '4K', 'RAW', 'XLR', 'S-Cinetone', 'anamorphic', 'Cinema Line'],
  },
  event: {
    label: 'Dokumentasi Event',
    primaryCat: 'camera',
    categories: ['camera', 'audio', 'lighting'],
    specKeywords: ['zoom', 'telephoto', 'wireless', 'IBIS', 'autofocus', 'low light'],
  },
  studio: {
    label: 'Studio Session',
    primaryCat: 'studio',
    categories: ['studio', 'lighting'],
    specKeywords: ['cyclorama', 'backdrop', 'daylight', 'strobe', 'cyc'],
  },
  vlog: {
    label: 'Vlog / Content Creator',
    primaryCat: 'camera',
    categories: ['camera', 'audio', 'gimbal'],
    specKeywords: ['compact', 'gimbal', 'stabilizer', 'wireless', 'mirrorless'],
  },
  ecommerce: {
    label: 'E-commerce / Katalog',
    primaryCat: 'lighting',
    categories: ['camera', 'lighting'],
    specKeywords: ['LED', 'bi-color', 'softbox', 'continuous', 'tabletop', 'white bg'],
  },
};

// keyword phrases → use-case key (ordered from most specific to least)
const USE_CASE_SIGNALS: [string, string[]][] = [
  ['aerial',     ['aerial', 'bird eye', 'bird-eye', 'dari udara', 'dari atas']],
  ['wedding',    ['wedding', 'pernikahan', 'nikah', 'pengantin', 'engagement', 'lamaran', 'akad']],
  ['ecommerce',  ['ecommerce', 'e-commerce', 'marketplace', 'tokopedia', 'shopee', 'katalog produk', 'listing']],
  ['product',    ['product photo', 'foto produk', 'tabletop', 'still life', 'food photo', 'beverage']],
  ['commercial', ['commercial', 'iklan', 'brand film', 'TVC', 'corporate video', 'company profile', 'advertis']],
  ['event',      ['event', 'konser', 'seminar', 'gathering', 'acara', 'dokumentasi acara', 'live event', 'conference']],
  ['studio',     ['studio session', 'studio shoot', 'di studio', 'cyclorama', 'cyc', 'backdrop']],
  ['vlog',       ['vlog', 'youtube', 'content creator', 'konten', 'tiktok', 'reels', 'podcast visual']],
  ['landscape',  ['landscape', 'pemandangan', 'alam', 'gunung', 'pantai', 'travel photo', 'nature', 'foto alam', 'outdoor photo']],
  ['portrait',   ['portrait', 'potret', 'headshot', 'personal branding', 'foto orang', 'foto model', 'actor']],
];

function detectUseCase(text: string): string | undefined {
  for (const [key, signals] of USE_CASE_SIGNALS) {
    if (signals.some((s) => text.includes(s.toLowerCase()))) return key;
  }
  return undefined;
}

// ── Category keywords ─────────────────────────────────────────────────────────

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  camera:   ['kamera', 'camera', 'mirrorless', 'dslr', 'bodi', 'body', 'sony', 'canon', 'fujifilm', 'fuji', 'leica', 'blackmagic', 'a7', 'fx3', 'r5'],
  lens:     ['lensa', 'lens', 'prime', 'fix', 'tele', 'wide', 'sigma', 'tamron', '24-70', '70-200', '16-35'],
  drone:    ['drone', 'mavic', 'aerial', 'udara', 'fpv', 'inspire', 'dji mini'],
  lighting: ['lighting', 'lampu', 'light', 'led', 'softbox', 'strobe', 'aputure', 'godox', 'profoto', 'nanlite', 'cahaya'],
  audio:    ['audio', 'mic', 'microphone', 'mikrofon', 'rode', 'recorder', 'sound', 'suara', 'wireless mic', 'clip on', 'zoom h'],
  gimbal:   ['gimbal', 'stabilizer', 'ronin', 'rig', 'crane', 'zhiyun', 'tilta', 'rs 3', 'rs3'],
  studio:   ['studio', 'ruang', 'cyc', 'cyclorama', 'greenscreen', 'green screen', 'livestream', 'live stream', 'podcast', 'daylight'],
  service:  ['jasa', 'editor', 'edit', 'editing', 'color', 'grading', 'colorist', 'retouch', 'mixing', 'mastering', 'sound engineer', 'videografer', 'fotografer'],
};

export type FilterGroup = { label: string; options: string[] };

export const SERVICE_DETAIL: Record<string, FilterGroup[]> = {
  camera: [
    { label: 'Jenis', options: ['Mirrorless', 'DSLR', 'Cinema line', 'Compact', 'Medium format'] },
    { label: 'Tipe sensor', options: ['Full Frame', 'APS-C', 'Micro 4/3', 'Medium Format'] },
    { label: 'Brand', options: ['Sony', 'Canon', 'Nikon', 'Fujifilm', 'Panasonic', 'Leica'] },
    { label: 'Resolusi', options: ['12–24 MP', '25–36 MP', '40–50 MP', '60 MP+'] },
    { label: 'Fitur', options: ['4K Video', '6K/8K Video', 'RAW Shooting', 'IBIS', 'Weather Sealed', 'Dual card slot'] },
  ],
  lens: [
    { label: 'Focal length', options: ['Ultra wide <24mm', 'Wide 24–35mm', 'Normal 35–50mm', 'Portrait 85–135mm', 'Tele 200mm+', 'Macro'] },
    { label: 'Aperture max', options: ['f/1.2–f/1.4', 'f/1.8–f/2', 'f/2.8', 'f/4+'] },
    { label: 'Jenis', options: ['Prime', 'Zoom', 'Cine lens', 'Anamorphic'] },
    { label: 'Mount', options: ['Sony E-mount', 'Canon RF', 'Nikon Z', 'Fuji X', 'L-mount'] },
  ],
  drone: [
    { label: 'Kelas', options: ['Sub-249g (tanpa SIM)', 'Prosumer', 'Cinema Pro', 'FPV'] },
    { label: 'Resolusi kamera', options: ['4K 30fps', '4K 60fps', '5.1K', '6K+'] },
    { label: 'Flight time', options: ['< 20 menit', '20–30 menit', '30+ menit'] },
    { label: 'Fitur', options: ['Obstacle avoidance', 'Active Track', 'RTH otomatis', 'ND Filter set', 'Raw video'] },
  ],
  lighting: [
    { label: 'Tipe', options: ['LED panel', 'Bi-color LED', 'RGB LED', 'Strobe / Flash', 'Ring light', 'COB spotlight'] },
    { label: 'Suhu warna', options: ['Daylight 5600K', 'Tungsten 3200K', 'Bi-color 3200–5600K', 'RGB full spectrum'] },
    { label: 'Output', options: ['< 100W', '100–200W', '200–500W', '500W+'] },
    { label: 'Aksesoris', options: ['Softbox', 'Umbrella', 'Beauty dish', 'Grid', 'Barndoor'] },
  ],
  audio: [
    { label: 'Tipe', options: ['Wireless lavalier', 'Shotgun mic', 'Boom mic', 'Recorder portable', 'Mixer / interface'] },
    { label: 'Koneksi', options: ['XLR', '3.5mm TRS', 'USB', '2.4GHz wireless', 'Bluetooth'] },
    { label: 'Brand', options: ['Rode', 'Sennheiser', 'Sony', 'DJI Mic', 'Zoom', 'Tascam'] },
    { label: 'Fitur', options: ['32-bit float', 'Noise cancelling', 'Directional (cardioid)', 'Omnidirectional'] },
  ],
  gimbal: [
    { label: 'Kompatibilitas', options: ['Smartphone', 'Mirrorless ringan', 'Mirrorless + lensa besar', 'DSLR', 'Cinema / C70+', 'Action cam'] },
    { label: 'Payload maks.', options: ['< 1 kg', '1–2 kg', '2–3.5 kg', '3.5 kg+'] },
    { label: 'Fitur', options: ['Follow mode', 'Active Track', 'POV mode', '360° pan', 'Underslung mode'] },
    { label: 'Aksesoris', options: ['Cage rig', 'Follow focus', 'Monitor holder', 'Extension arm'] },
  ],
  studio: [
    { label: 'Tipe', options: ['Cyclorama (infinity wall)', 'Daylight studio', 'Podcast / talkshow', 'Livestream setup', 'Tabletop product', 'Green screen'] },
    { label: 'Fasilitas', options: ['AC', 'Wi-Fi', 'Makeup area', 'Changing room', 'Parkir', 'Monitor review'] },
    { label: 'Kapasitas', options: ['1–3 orang', '4–10 orang', '10–25 orang', '25+ orang'] },
    { label: 'Akses', options: ['Ground floor', 'Akses lift', 'Parkir motor', 'Parkir mobil'] },
  ],
  service: [
    { label: 'Spesialisasi', options: ['Fotografer E-commerce', 'Fotografer Potret', 'Fotografer Produk', 'Videografer Wedding', 'Videografer Commercial', 'Editor Video'] },
    { label: 'Format output', options: ['JPEG edited', 'RAW + JPEG', 'MP4 (H.264)', 'ProRes / Log footage'] },
    { label: 'Turnaround', options: ['Same day', '1–3 hari', '3–7 hari', '> 7 hari'] },
    { label: 'Fitur tambahan', options: ['On-location', 'Revisi unlimited', 'SFX / musik', 'Colour grading'] },
  ],
};

// ── Parsed query type ─────────────────────────────────────────────────────────

export interface ParsedQuery {
  raw: string;
  category?: Category;
  location?: SurabayaArea;
  near?: boolean;
  maxPrice?: number;
  minPrice?: number;
  minRating?: number;
  keywords: string[];
  summary: string[];
  // AI use-case fields
  useCase?: string;
  useCaseLabel?: string;
  specKeywords?: string[];
}

// ── Price token parser ────────────────────────────────────────────────────────

function parsePriceToken(token: string): number | null {
  const m = token.match(/([\d.,]+)\s*(jt|juta|rb|ribu|k)?/i);
  if (!m) return null;
  let num = parseFloat(m[1].replace(/\./g, '').replace(',', '.'));
  if (isNaN(num)) return null;
  const unit = (m[2] || '').toLowerCase();
  if (unit === 'jt' || unit === 'juta') num *= 1_000_000;
  else if (unit === 'rb' || unit === 'ribu' || unit === 'k') num *= 1_000;
  else if (num > 0 && num < 10000) num *= 1_000;
  return Math.round(num);
}

// ── Main parser ───────────────────────────────────────────────────────────────

export function parseQuery(raw: string): ParsedQuery {
  const text = ` ${raw.toLowerCase()} `;
  const result: ParsedQuery = { raw, keywords: [], summary: [] };

  // --- Kategori ---
  for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS) as [Category, string[]][]) {
    if (words.some((w) => text.includes(` ${w}`) || text.includes(`${w} `) || text.includes(w))) {
      result.category = cat;
      break;
    }
  }

  // --- Lokasi ---
  if (/\b(terdekat|dekat sini|sekitar(ku)?|nearby|deket)\b/.test(text)) {
    result.near = true;
    result.summary.push('Lokasi terdekat');
  }
  for (const area of SURABAYA_AREAS) {
    if (text.includes(area.toLowerCase())) {
      result.location = area;
      result.summary.push(`Area ${area}`);
      break;
    }
  }

  // --- Harga max ---
  const maxMatch = text.match(/(?:di ?bawah|maks(?:imal)?|max|kurang dari|under|budget|<=?)\s*rp?\s*([\d.,]+\s*(?:jt|juta|rb|ribu|k)?)/i);
  if (maxMatch) {
    const v = parsePriceToken(maxMatch[1]);
    if (v) { result.maxPrice = v; result.summary.push(`≤ Rp${v.toLocaleString('id-ID')}`); }
  }

  // --- Harga min ---
  const minMatch = text.match(/(?:di ?atas|min(?:imal)?|lebih dari|over|>=?)\s*rp?\s*([\d.,]+\s*(?:jt|juta|rb|ribu|k)?)/i);
  if (minMatch) {
    const v = parsePriceToken(minMatch[1]);
    if (v) { result.minPrice = v; result.summary.push(`≥ Rp${v.toLocaleString('id-ID')}`); }
  }

  // "budget 4 juta" tanpa kata kunci max → anggap maksimum
  if (!result.maxPrice && !result.minPrice) {
    const budgetMatch = text.match(/\brp?\s*([\d.,]+\s*(?:jt|juta|rb|ribu|k))/i);
    if (budgetMatch) {
      const v = parsePriceToken(budgetMatch[1]);
      if (v) { result.maxPrice = v; result.summary.push(`≤ Rp${v.toLocaleString('id-ID')}`); }
    }
  }

  // --- Rating ---
  const ratingMatch = text.match(/(?:rating|bintang)\s*([0-9](?:[.,][0-9])?)\+?/);
  if (ratingMatch) {
    result.minRating = parseFloat(ratingMatch[1].replace(',', '.'));
  } else if (/\b([0-9](?:[.,][0-9])?)\s*\+/.test(text)) {
    const m = text.match(/\b([0-9](?:[.,][0-9])?)\s*\+/);
    if (m) result.minRating = parseFloat(m[1].replace(',', '.'));
  } else if (/\bterbaik\b|\btop\b/.test(text)) {
    result.minRating = 4.8;
  } else if (/\bbagus\b|\brecommended\b|\bberkualitas\b/.test(text)) {
    result.minRating = 4.5;
  }
  if (result.minRating) result.summary.push(`Rating ≥ ${result.minRating}`);

  // --- Use-case (AI intent) ---
  const ucKey = detectUseCase(text);
  if (ucKey) {
    const meta = USE_CASE_META[ucKey];
    result.useCase = ucKey;
    result.useCaseLabel = meta.label;
    result.specKeywords = meta.specKeywords;
    if (!result.category) result.category = meta.primaryCat;
    result.summary.push(`Cocok untuk ${meta.label}`);
  }

  // --- Keywords sisa ---
  result.keywords = raw
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  // Category label at front of summary
  if (result.category) {
    const catLabel: Record<Category, string> = {
      camera: 'Kamera', lens: 'Lensa', drone: 'Drone', lighting: 'Lighting',
      audio: 'Audio', gimbal: 'Gimbal & Rig', studio: 'Studio', service: 'Jasa profesional',
    };
    result.summary.unshift(catLabel[result.category]);
  }

  return result;
}

// ── Serialisation ─────────────────────────────────────────────────────────────

export function toQueryString(p: ParsedQuery): string {
  const sp = new URLSearchParams();
  if (p.category)           sp.set('cat',     p.category);
  if (p.location)           sp.set('loc',     p.location);
  if (p.near)               sp.set('near',    '1');
  if (p.maxPrice)           sp.set('max',     String(p.maxPrice));
  if (p.minPrice)           sp.set('min',     String(p.minPrice));
  if (p.minRating)          sp.set('rating',  String(p.minRating));
  if (p.raw.trim())         sp.set('q',       p.raw.trim());
  if (p.useCase)            sp.set('usecase', p.useCase);
  if (p.specKeywords?.length) sp.set('specs', p.specKeywords.join(','));
  return sp.toString();
}

// ── Geo helpers ───────────────────────────────────────────────────────────────

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function nearestArea(lat: number, lng: number): SurabayaArea {
  let best: SurabayaArea = 'Gubeng';
  let bestD = Infinity;
  for (const area of SURABAYA_AREAS) {
    const d = distanceKm({ lat, lng }, AREA_COORDS[area]);
    if (d < bestD) { bestD = d; best = area; }
  }
  return best;
}

export function areaOf(location: string): SurabayaArea | undefined {
  return SURABAYA_AREAS.find((a) => location.includes(a));
}

// ── Relevance scoring (for AI-ranked results in browse) ───────────────────────

export function computeRelevance(
  item: {
    name: string;
    description: string;
    rating: number;
    specs?: { label: string; value: string }[];
    brand?: string;
  },
  specKeywords: string[]
): number {
  if (!specKeywords.length) return item.rating * 10;
  const haystack = [
    item.name,
    item.brand ?? '',
    item.description,
    ...(item.specs ?? []).map((s) => `${s.label} ${s.value}`),
  ].join(' ').toLowerCase();

  let score = item.rating * 5; // base (max ~25 pts)
  for (const kw of specKeywords) {
    if (haystack.includes(kw.toLowerCase())) score += 15;
  }
  return score;
}
