import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Users, Square } from 'lucide-react';
import { Studio, formatIDR } from '@/lib/mockData';

export default function StudioCard({ item }: { item: Studio }) {
  return (
    <Link href={`/studio/${item.slug}`} className="group block card overflow-hidden lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
        <Image
          src={item.cover}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="pill !text-[0.65rem] !py-1">{item.area}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur text-[0.65rem] tracking-wide border border-white/10">
            <Users className="w-3 h-3" />
            {item.capacity} pax
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur text-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="tabular">{item.rating}</span>
          <span className="text-ink-400">({item.reviewCount})</span>
        </div>
      </div>

      <div className="p-5">
        <div className="eyebrow text-ink-400 mb-1.5">Studio</div>
        <h3 className="font-display text-xl leading-tight tracking-tight group-hover:text-amber-400 transition-colors">
          {item.name}
        </h3>
        <div className="text-xs text-ink-400 mt-1 mb-4 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {item.location}
        </div>

        <div className="flex items-baseline justify-between border-t border-ink-700/40 pt-4">
          <div>
            <div className="font-display text-2xl text-amber-400 tabular">{formatIDR(item.pricePerHour)}</div>
            <div className="eyebrow text-ink-400 mt-1">per jam</div>
          </div>
          <span className="text-xs text-ink-300 group-hover:text-amber-400 transition-colors">
            Booking →
          </span>
        </div>
      </div>
    </Link>
  );
}
