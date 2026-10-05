'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { AnimeItem } from '@/lib/mockData';
import { SectionHeader } from '../ui/SectionHeader';
import { useUniverse } from '../tracking/UniverseProvider';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CurrentlyWatchingSectionProps {
  items: AnimeItem[];
  onSelect: (anime: AnimeItem) => void;
}

/**
 * Currently Watching — wide, progress-oriented
 * layout. Backdrop strip, inline episode stepper,
 * hairline-separated rows.
 */
export const CurrentlyWatchingSection: React.FC<
  CurrentlyWatchingSectionProps
> = ({ items, onSelect }) => {
  const { incrementEpisode, decrementEpisode } = useUniverse();
  const watching = items.filter((item) => item.isCurrentlyWatching);

  if (watching.length === 0) return null;

  return (
    <section id="currently-watching" className="scroll-mt-24 mt-24 md:mt-32">
      <SectionHeader
        index="02"
        kicker="Tracking"
        title="Currently Watching"
        subtitle="Active series and episode progress"
      />

      <div>
        {watching.map((anime, i) => {
          const watched = anime.watchedEpisodes || 0;
          const total = anime.totalEpisodes;
          const percent = Math.round((watched / total) * 100);
          const isAiring = anime.status === 'Airing';

          return (
            <motion.article
              key={anime.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                ease: EASING,
                delay: Math.min(i * 0.05, 0.2),
              }}
              className="group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-5 md:gap-8 py-6 sm:py-7 border-b border-[#1E293B]"
            >
              {/* Backdrop strip */}
              <div
                onClick={() => onSelect(anime)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelect(anime);
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${anime.title}`}
                className="relative w-full md:w-52 aspect-video md:aspect-auto md:h-32 rounded-[4px] overflow-hidden bg-[#12141D] cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
              >
                <Image
                  src={anime.backdropImage || anime.posterImage}
                  alt=""
                  fill
                  sizes="208px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F]/70 to-transparent" />
                <span className="absolute top-2 left-2 font-mono text-[9px] font-bold uppercase tracking-widest text-[#38BDF8]">
                  {isAiring ? 'Airing' : 'Tracking'}
                </span>
              </div>

              {/* Info + progress */}
              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    onClick={() => onSelect(anime)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onSelect(anime);
                    }}
                    tabIndex={0}
                    className="text-lg sm:text-xl font-bold text-[#F8FAFC] hover:text-[#FF2E4D] transition-colors duration-200 cursor-pointer truncate focus:outline-none"
                  >
                    {anime.title}
                  </h3>
                  <span className="font-mono text-[11px] text-[#64748B] shrink-0 hidden sm:block">
                    {anime.lastUpdatedTime || 'Recently'}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#64748B]">
                  {anime.studio} &bull; {anime.format} &bull;{' '}
                  {isAiring
                    ? `${total} episodes aired`
                    : `${total} episodes`}
                </p>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-baseline justify-between font-mono text-[11px] mb-2">
                    <span className="uppercase tracking-widest text-[#64748B]">
                      Episode Progress
                    </span>
                    <span className="text-[#94A3B8]">
                      <span className="text-[#FF2E4D] font-bold text-sm">
                        {watched}
                      </span>
                      <span className="text-[#64748B]">
                        {' '}
                        / {total} &bull; {percent}%
                      </span>
                    </span>
                  </div>
                  <div className="h-1 bg-[#1E293B] overflow-hidden">
                    <div
                      className="progress-fill h-full bg-[#FF2E4D]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Stepper — minus, count, plus */}
              <div className="flex md:flex-col items-center justify-center gap-3 md:gap-2">
                <button
                  type="button"
                  onClick={() => decrementEpisode(anime.id)}
                  disabled={watched <= 0}
                  aria-label={`Decrement episode progress for ${anime.title}`}
                  className="w-10 h-10 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#F8FAFC] flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="font-mono text-sm text-[#94A3B8] w-16 text-center">
                  <span className="text-[#F8FAFC] font-bold">
                    {watched}
                  </span>
                  <span className="text-[#64748B]"> / {total}</span>
                </div>
                <button
                  type="button"
                  onClick={() => incrementEpisode(anime.id)}
                  disabled={watched >= total}
                  aria-label={`Increment episode progress for ${anime.title}`}
                  className="w-10 h-10 rounded-[3px] bg-[#FF2E4D]/15 hover:bg-[#FF2E4D]/25 border border-[#FF2E4D]/40 text-[#FF2E4D] flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};