import Link from 'next/link';
import Image from 'next/image';
import { Star, Shield, Box } from 'lucide-react';
import { Equipment, formatIDR } from '@/lib/mockData';

export default function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <Link
      href={`/equipment/${item.slug}`}
      className="group block card overflow-hidden lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.protection && (
            <span className="pill !text-[0.65rem] !py-1">
              <Shield className="w-3 h-3" />
              Proteksi
            </span>
          )}
          {item.has3d && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur text-[0.65rem] tracking-wide border border-white/10">
              <Box className="w-3 h-3" />
              3D
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur text-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="tabular">{item.rating}</span>
          <span className="text-ink-400">({item.reviewCount})</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="eyebrow text-ink-400 mb-1.5">{item.brand}</div>
            <h3 className="font-display text-xl leading-tight tracking-tight group-hover:text-amber-400 transition-colors">
              {item.name}
            </h3>
          </div>
        </div>
        <div className="text-xs text-ink-400 mb-4">{item.location}</div>

        <div className="flex items-baseline justify-between border-t border-ink-700/40 pt-4">
          <div>
            <div className="font-display text-2xl text-amber-400 tabular">
              {formatIDR(item.pricePerDay)}
            </div>
            <div className="eyebrow text-ink-400 mt-1">per hari</div>
          </div>
          <span className="text-xs text-ink-300 group-hover:text-amber-400 transition-colors">
            Lihat →
          </span>
        </div>
      </div>
    </Link>
  );
}
