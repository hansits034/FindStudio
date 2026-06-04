import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Sparkles } from 'lucide-react';
import { Service, formatIDR, getVendor } from '@/lib/mockData';

const typeLabel: Record<Service['type'], string> = {
  'editor-photo': 'Editor Foto',
  'editor-video': 'Editor Video',
  colorist: 'Colorist',
  sound: 'Sound Engineer',
};

export default function ServiceCard({ item }: { item: Service }) {
  const v = getVendor(item.vendorId);

  return (
    <Link href={`/browse?cat=service`} className="group block card overflow-hidden lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
        <Image
          src={item.cover}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="pill !text-[0.65rem] !py-1">
            <Sparkles className="w-3 h-3" />
            {typeLabel[item.type]}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur text-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="tabular">{item.rating}</span>
          <span className="text-ink-400">({item.reviewCount})</span>
        </div>
      </div>

      <div className="p-5">
        <div className="eyebrow text-ink-400 mb-1.5">Jasa Profesional</div>
        <h3 className="font-display text-xl leading-tight tracking-tight group-hover:text-amber-400 transition-colors">
          {item.name}
        </h3>
        <div className="text-xs text-ink-400 mt-1 mb-3">{v?.name}</div>

        <div className="flex items-center gap-1 text-xs text-ink-300 mb-4">
          <Clock className="w-3 h-3 text-amber-400" />
          Turnaround {item.turnaround}
        </div>

        <div className="flex items-baseline justify-between border-t border-ink-700/40 pt-4">
          <div>
            <div className="font-display text-2xl text-amber-400 tabular">{formatIDR(item.pricePerProject)}</div>
            <div className="eyebrow text-ink-400 mt-1">per project</div>
          </div>
          <span className="text-xs text-ink-300 group-hover:text-amber-400 transition-colors">
            Pesan →
          </span>
        </div>
      </div>
    </Link>
  );
}
