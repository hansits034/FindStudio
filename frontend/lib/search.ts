/**
 * "NLP-lite" search parser untuk FindStudio.
 *
 * Membedah kalimat bahasa alami pengguna menjadi filter terstruktur:
 *   - kategori (jenis layanan)
 *   - lokasi (area Surabaya / terdekat)
 *   - harga (maksimum / minimum)
 *   - rating minimum
 *   - kata kunci sisa
 *
 * Ini bukan LLM — tapi rule-based intent parser yang cukup untuk demo capstone,
 * dan jadi dasar yang jelas kalau nanti mau diganti model NLP betulan.
 */

import type { Category } from './mockData';

export const SURABAYA_AREAS = [
  'Gubeng',
  'Manyar',
  'Sukolilo',
  'Rungkut',
  'Wonokromo',
  'Tegalsari',
  'Darmo',
  'Mulyorejo',
  'Wiyung',
] as const;

export type SurabayaArea = (typeof SURABAYA_AREAS)[number];

// Koordinat perkiraan tiap kecamatan (untuk fitur "lokasi terdekat").
export const AREA_COORDS: Record<SurabayaArea, { lat: number; lng: number }> = {
  Gubeng: { lat: -7.2756, lng: 112.7506 },
  Manyar: { lat: -7.2785, lng: 112.78 },
  Sukolilo: { lat: -7.29, lng: 112.799 },
  Rungkut: { lat: -7.334, lng: 112.799 },
  Wonokromo: { lat: -7.3, lng: 112.737 },
  Tegalsari: { lat: -7.267, lng: 112.739 },
  Darmo: { lat: -7.292, lng: 112.738 },
  Mulyorejo: { lat: -7.264, lng: 112.79 },
  Wiyung: { lat: -7.323, lng: 112.69 },
};

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
}

// Kata kunci → kategori
const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  camera: ['kamera', 'camera', 'mirrorless', 'dslr', 'bodi', 'body', 'sony', 'canon', 'fujifilm', 'fuji', 'leica', 'blackmagic', 'a7', 'fx3', 'r5'],
  lens: ['lensa', 'lens', 'prime', 'fix', 'tele', 'wide', 'sigma', 'tamron', '24-70', '70-200', '16-35'],
  drone: ['drone', 'mavic', 'aerial', 'udara', 'fpv', 'inspire', 'dji mini'],
  lighting: ['lighting', 'lampu', 'light', 'led', 'softbox', 'strobe', 'aputure', 'godox', 'profoto', 'nanlite', 'cahaya'],
  audio: ['audio', 'mic', 'microphone', 'mikrofon', 'rode', 'recorder', 'sound', 'suara', 'wireless mic', 'clip on', 'zoom h'],
  gimbal: ['gimbal', 'stabilizer', 'ronin', 'rig', 'crane', 'zhiyun', 'tilta', 'rs 3', 'rs3'],
  studio: ['studio', 'ruang', 'cyc', 'cyclorama', 'greenscreen', 'green screen', 'livestream', 'live stream', 'podcast', 'daylight'],
  service: ['jasa', 'editor', 'edit', 'editing', 'color', 'grading', 'colorist', 'retouch', 'mixing', 'mastering', 'sound engineer', 'videografer', 'fotografer'],
};

// Kategori detail per layanan (untuk filter "jenis layanan yg detail")
export const SERVICE_DETAIL: Record<string, { label: string; options: string[] }> = {
  camera: { label: 'Tipe kamera', options: ['Mirrorless', 'Cinema line', 'Compact', 'Medium format'] },
  lens: { label: 'Tipe lensa', options: ['Zoom standar', 'Telephoto', 'Wide', 'Prime', 'Cine set'] },
  drone: { label: 'Tipe drone', options: ['Sub-249g', 'Prosumer', 'Cinema (pro)', 'FPV'] },
  lighting: { label: 'Tipe lighting', options: ['Continuous LED', 'Strobe', 'Bi-color', 'RGB tube'] },
  audio: { label: 'Tipe audio', options: ['Wireless mic', 'Shotgun', 'Recorder', 'Mixer'] },
  gimbal: { label: 'Tipe rig', options: ['Gimbal ringan', 'Gimbal pro', 'Heavy-duty', 'Cage rig'] },
  studio: { label: 'Tipe studio', options: ['Cyclorama', 'Daylight', 'Livestream', 'Podcast', 'Tabletop'] },
  service: { label: 'Tipe jasa', options: ['Editor video', 'Editor foto', 'Colorist', 'Sound engineer'] },
};

function parsePriceToken(token: string): number | null {
  // contoh: "500rb", "500k", "1jt", "1.5juta", "750000"
  const m = token.match(/([\d.,]+)\s*(jt|juta|rb|ribu|k)?/i);
  if (!m) return null;
  let num = parseFloat(m[1].replace(/\./g, '').replace(',', '.'));
  if (isNaN(num)) return null;
  const unit = (m[2] || '').toLowerCase();
  if (unit === 'jt' || unit === 'juta') num *= 1_000_000;
  else if (unit === 'rb' || unit === 'ribu' || unit === 'k') num *= 1_000;
  // angka telanjang kecil seperti "500" pada konteks harga → anggap ribuan
  else if (num > 0 && num < 10000) num *= 1_000;
  return Math.round(num);
}

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

  // --- Harga ---
  // maksimum
  const maxMatch = text.match(/(?:di ?bawah|maks(?:imal)?|max|kurang dari|under|budget|<=?)\s*rp?\s*([\d.,]+\s*(?:jt|juta|rb|ribu|k)?)/i);
  if (maxMatch) {
    const v = parsePriceToken(maxMatch[1]);
    if (v) {
      result.maxPrice = v;
      result.summary.push(`≤ Rp${v.toLocaleString('id-ID')}`);
    }
  }
  const minMatch = text.match(/(?:di ?atas|min(?:imal)?|lebih dari|over|>=?)\s*rp?\s*([\d.,]+\s*(?:jt|juta|rb|ribu|k)?)/i);
  if (minMatch) {
    const v = parsePriceToken(minMatch[1]);
    if (v) {
      result.minPrice = v;
      result.summary.push(`≥ Rp${v.toLocaleString('id-ID')}`);
    }
  }
  // "budget 4 juta" tanpa kata kunci max → anggap maksimum
  if (!result.maxPrice && !result.minPrice) {
    const budgetMatch = text.match(/\brp?\s*([\d.,]+\s*(?:jt|juta|rb|ribu|k))/i);
    if (budgetMatch) {
      const v = parsePriceToken(budgetMatch[1]);
      if (v) {
        result.maxPrice = v;
        result.summary.push(`≤ Rp${v.toLocaleString('id-ID')}`);
      }
    }
  }

  // --- Rating ---
  const ratingMatch = text.match(/(?:rating|bintang)\s*([0-9](?:[.,][0-9])?)\+?/);
  if (ratingMatch) {
    result.minRating = parseFloat(ratingMatch[1].replace(',', '.'));
  } else if (/\b([0-9](?:[.,][0-9])?)\s*\+/.test(text)) {
    const m = text.match(/\b([0-9](?:[.,][0-9])?)\s*\+/);
    if (m) result.minRating = parseFloat(m[1].replace(',', '.'));
  } else if (/\bterbaik\b|\btop\b|\bberkualitas\b/.test(text)) {
    result.minRating = 4.8;
  } else if (/\bbagus\b|\brecommended\b|\bberkualitas\b/.test(text)) {
    result.minRating = 4.5;
  }
  if (result.minRating) result.summary.push(`Rating ≥ ${result.minRating}`);

  // --- keywords sisa (untuk pencocokan teks) ---
  result.keywords = raw
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (result.category) {
    const catLabel: Record<Category, string> = {
      camera: 'Kamera', lens: 'Lensa', drone: 'Drone', lighting: 'Lighting',
      audio: 'Audio', gimbal: 'Gimbal & Rig', studio: 'Studio', service: 'Jasa profesional',
    };
    result.summary.unshift(catLabel[result.category]);
  }

  return result;
}

export function toQueryString(p: ParsedQuery): string {
  const sp = new URLSearchParams();
  if (p.category) sp.set('cat', p.category);
  if (p.location) sp.set('loc', p.location);
  if (p.near) sp.set('near', '1');
  if (p.maxPrice) sp.set('max', String(p.maxPrice));
  if (p.minPrice) sp.set('min', String(p.minPrice));
  if (p.minRating) sp.set('rating', String(p.minRating));
  if (p.raw.trim()) sp.set('q', p.raw.trim());
  return sp.toString();
}

// Haversine (km)
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
    if (d < bestD) {
      bestD = d;
      best = area;
    }
  }
  return best;
}

// Ekstrak nama kecamatan dari string lokasi "Surabaya, Gubeng"
export function areaOf(location: string): SurabayaArea | undefined {
  return SURABAYA_AREAS.find((a) => location.includes(a));
}
