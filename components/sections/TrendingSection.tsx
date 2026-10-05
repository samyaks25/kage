'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { AnimeItem } from '@/lib/mockData';
import { SectionHeader } from '../ui/SectionHeader';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TrendingSectionProps {
  items: AnimeItem[];
  onSelectAnime: (anime: AnimeItem) => void;
}

/**
 * Trending — editorial numbered composition.
 * Full-width rows with ghost rank numerals,
 * hairline separators, no card boxes.
 */
export const TrendingSection: React.FC<TrendingSectionProps> = ({
  items,
  onSelectAnime,
}) => {
  const trending = items
    .filter((item) => item.trendingRank)
    .sort(
      (a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0),
    );

  if (trending.length === 0) return null;

  return (
    <section id="discover" className="scroll-mt-24 mt-20 md:mt-24">
      <SectionHeader
        index="01"
        kicker="Discover"
        title="Trending Now"
        subtitle="Titles capturing global attention this week"
      />

      <div>
        {trending.map((anime, i) => (
          <motion.article
            key={anime.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.55,
              ease: EASING,
              delay: Math.min(i * 0.04, 0.2),
            }}
            onClick={() => onSelectAnime(anime)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelectAnime(anime);
            }}
            tabIndex={0}
            role="article"
            aria-label={`${anime.title}, KAGE score ${anime.rating}`}
            className="group relative grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-6 border-b border-[#1E293B] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
          >
            {/* Ghost rank numeral */}
            <span
              className="ghost-num font-mono text-5xl sm:text-6xl font-black select-none"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Poster */}
            <div className="relative w-14 h-20 sm:w-16 sm:h-24 rounded-[4px] overflow-hidden bg-[#12141D] shrink-0">
              <Image
                src={anime.posterImage}
                alt=""
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </div>

            {/* Info */}
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-[#F8FAFC] truncate group-hover:text-[#FF2E4D] transition-colors duration-200">
                {anime.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] text-[#64748B] truncate">
                {anime.studio} • {anime.genres.slice(0, 2).join(' / ')}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-[#94A3B8]">
                {anime.season} {anime.year} • {anime.format} •{' '}
                {anime.status}
              </p>
            </div>

            {/* Score */}
            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-1.5 font-mono text-lg sm:text-xl font-bold text-[#38BDF8]">
                <Star className="w-4 h-4 fill-current" />
                {anime.rating.toFixed(2)}
              </div>
              <ArrowRight className="mt-2 ml-auto w-4 h-4 text-[#334155] transition-all duration-300 group-hover:text-[#FF2E4D] group-hover:translate-x-1" />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
