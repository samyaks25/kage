'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Plus, Check, Eye } from 'lucide-react';
import { useUniverse } from '../tracking/UniverseProvider';
import { animeHref } from '@/lib/navigation';
import type { AnimeItem } from '@/lib/mockData';

interface AnimeCardLinkProps {
  anime: AnimeItem;
  rank?: number;
  /** Optional quick-preview; the card always links to the full page. */
  onPreview?: (anime: AnimeItem) => void;
}

/**
 * Poster card for the multi-page archive. The card navigates to
 * /anime/[id] via a stretched link, so the universe toggle stays a
 * real button instead of being nested inside an anchor.
 */
export function AnimeCardLink({ anime, rank, onPreview }: AnimeCardLinkProps) {
  const { isInUniverse, toggleInUniverse } = useUniverse();
  const inUniverse = isInUniverse(anime.id);
  const href = animeHref(anime.id);

  return (
    <article className="group relative rounded-[3px] focus-within:outline-none">
      <div className="relative aspect-[2/3] rounded-[4px] overflow-hidden bg-[#12141D] border border-[#1E293B] transition-all duration-300 group-hover:border-[#FF2E4D]/50 group-hover:shadow-lg">
        <Image
          src={anime.posterImage}
          alt=""
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F]/95 via-[#090A0F]/10 to-[#090A0F]/20" />

        {rank !== undefined && (
          <span className="absolute top-2.5 left-2.5 font-mono text-[11px] font-bold tracking-widest text-[#F8FAFC]/80">
            {String(rank).padStart(2, '0')}
          </span>
        )}

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 font-mono text-[11px] font-bold text-[#38BDF8]">
          <Star className="w-3 h-3 fill-current" />
          {anime.rating.toFixed(1)}
        </div>

        {/* Interactive layer — above the stretched link */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-20 flex gap-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
          {onPreview && (
            <button
              type="button"
              onClick={() => onPreview(anime)}
              aria-label={`Quick preview of ${anime.title}`}
              title="Quick preview"
              className="w-8 h-8 rounded-[3px] bg-[#090A0F]/85 text-[#F8FAFC] border border-[#334155] hover:border-[#FF2E4D] flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => toggleInUniverse(anime.id)}
            aria-label={inUniverse ? 'Remove from Universe' : 'Add to Universe'}
            title={inUniverse ? 'In Universe' : 'Add to Universe'}
            className={`w-8 h-8 rounded-[3px] flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
              inUniverse
                ? 'bg-[#FF2E4D] text-white'
                : 'bg-[#090A0F]/85 text-[#F8FAFC] border border-[#334155] hover:border-[#FF2E4D]'
            }`}
          >
            {inUniverse ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Stretched link — covers the artwork, sits under the buttons */}
        <Link
          href={href}
          className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
        >
          <span className="sr-only">{`View details for ${anime.title}`}</span>
        </Link>
      </div>

      <div className="mt-2.5 px-0.5">
        <h3 className="text-sm font-semibold leading-snug text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200">
          <Link href={href} className="line-clamp-2">
            {anime.title}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-[11px] text-[#64748B]">
          {anime.year} &bull; {anime.format} &bull; {anime.status}
        </p>
      </div>
    </article>
  );
}