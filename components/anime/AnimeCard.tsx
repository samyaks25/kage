'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Plus, Check } from 'lucide-react';
import { AnimeItem } from '@/lib/mockData';
import { useUniverse } from '../tracking/UniverseProvider';

interface AnimeCardProps {
  anime: AnimeItem;
  rank?: number;
  onSelect?: (anime: AnimeItem) => void;
}

/**
 * AnimeCard — artwork dominates. Poster, typography,
 * community score, year/status. Hover reveals
 * View Details and Add to Universe. No play icon.
 */
export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  rank,
  onSelect,
}) => {
  const { isInUniverse, toggleInUniverse } = useUniverse();
  const inUniverse = isInUniverse(anime.id);

  return (
    <div
      onClick={() => onSelect?.(anime)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect?.(anime);
      }}
      className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
      tabIndex={0}
      role="article"
      aria-label={`${anime.title}, KAGE score ${anime.rating}`}
    >
      {/* Artwork */}
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

        {/* Rank numeral */}
        {rank !== undefined && (
          <span className="absolute top-2.5 left-2.5 font-mono text-[11px] font-bold tracking-widest text-[#F8FAFC]/80">
            {String(rank).padStart(2, '0')}
          </span>
        )}

        {/* Community score */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 font-mono text-[11px] font-bold text-[#38BDF8]">
          <Star className="w-3 h-3 fill-current" />
          {anime.rating.toFixed(1)}
        </div>

        {/* Hover actions */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(anime);
            }}
            className="flex-1 h-8 rounded-[3px] bg-[#FF2E4D] hover:bg-[#FF4D66] text-white text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleInUniverse(anime.id);
            }}
            aria-label={
              inUniverse ? 'Remove from Universe' : 'Add to Universe'
            }
            title={inUniverse ? 'In Universe' : 'Add to Universe'}
            className={`w-8 h-8 rounded-[3px] flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
              inUniverse
                ? 'bg-[#FF2E4D] text-white'
                : 'bg-[#090A0F]/85 text-[#F8FAFC] border border-[#334155] hover:border-[#FF2E4D]'
            }`}
          >
            {inUniverse ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Typography */}
      <div className="mt-2.5 px-0.5">
        <h3 className="text-sm font-semibold leading-snug text-[#F8FAFC] line-clamp-2 group-hover:text-[#FF2E4D] transition-colors duration-200">
          {anime.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] text-[#64748B]">
          {anime.year} &bull; {anime.format} &bull; {anime.status}
        </p>
      </div>
    </div>
  );
};