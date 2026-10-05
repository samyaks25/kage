'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { AnimeItem } from '@/lib/mockData';
import { useUniverse } from '../tracking/UniverseProvider';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroProps {
  featuredAnime: AnimeItem;
  onViewDetails: (anime: AnimeItem) => void;
}

/**
 * Cinematic editorial hero — full-bleed artwork masked into
 * the page, asymmetric typography, compact mono metadata.
 * No bordered card. No play controls.
 */
export const Hero: React.FC<HeroProps> = ({
  featuredAnime,
  onViewDetails,
}) => {
  const { isInUniverse, toggleInUniverse } = useUniverse();
  const inUniverse = isInUniverse(featuredAnime.id);

  const statusColor =
    featuredAnime.status === 'Airing'
      ? 'text-[#38BDF8]'
      : featuredAnime.status === 'Completed'
        ? 'text-[#10B981]'
        : 'text-[#64748B]';

  return (
    <section
      className="relative w-full overflow-hidden grain"
      aria-label="Featured anime"
    >
      {/* Artwork layer — full bleed, right edge dissolves into the page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-hero-drift">
          <Image
            src={featuredAnime.backdropImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center mask-fade-right"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F] via-[#090A0F]/80 to-[#090A0F]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-[#090A0F]/50" />
      </div>

      {/* Editorial content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[86vh] flex items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
          className="max-w-2xl pt-24 pb-20"
        >
          {/* Kicker */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASING },
              },
            }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[#FF2E4D]" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.3em] uppercase text-[#FF2E4D]">
              Featured Premiere
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASING },
              },
            }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.02] text-[#F8FAFC]"
          >
            {featuredAnime.title}
          </motion.h1>

          {/* Japanese title */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASING },
              },
            }}
            className="mt-4 font-mono text-sm text-[#94A3B8]"
          >
            {featuredAnime.japaneseTitle}
            {featuredAnime.englishTitle
              ? ` — ${featuredAnime.englishTitle}`
              : ''}
          </motion.p>

          {/* Compact metadata: 8.92 • WINTER 2025 • 12 EPISODES • AIRING */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASING },
              },
            }}
            className="mt-7 font-mono text-xs sm:text-sm tracking-wider"
          >
            <span className="text-[#38BDF8] font-bold">
              {featuredAnime.rating.toFixed(2)}
            </span>
            <span className="text-[#334155] mx-2.5">&bull;</span>
            <span className="text-[#F8FAFC]">
              {featuredAnime.season} {featuredAnime.year}
            </span>
            <span className="text-[#334155] mx-2.5">&bull;</span>
            <span className="text-[#F8FAFC]">
              {featuredAnime.totalEpisodes} EPISODES
            </span>
            <span className="text-[#334155] mx-2.5">&bull;</span>
            <span className={statusColor}>{featuredAnime.status}</span>
          </motion.p>

          {/* Genres — restrained inline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASING },
              },
            }}
            className="mt-4 text-[11px] font-mono uppercase tracking-[0.25em] text-[#64748B]"
          >
            {featuredAnime.genres.join(' / ')}
          </motion.p>

          {/* Synopsis excerpt */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASING },
              },
            }}
            className="mt-7 text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl line-clamp-3"
          >
            {featuredAnime.synopsis}
          </motion.p>

          {/* Primary actions */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASING },
              },
            }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => onViewDetails(featuredAnime)}
              className="inline-flex items-center h-12 px-7 rounded-[3px] bg-[#FF2E4D] hover:bg-[#FF4D66] text-white text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F]"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button
              type="button"
              onClick={() => toggleInUniverse(featuredAnime.id)}
              className={`inline-flex items-center h-12 px-6 rounded-[3px] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F] ${
                inUniverse
                  ? 'bg-[#FF2E4D]/15 text-[#FF2E4D] border border-[#FF2E4D]/40'
                  : 'bg-[#1A1D2A] hover:bg-[#222638] text-[#F8FAFC] border border-[#334155]'
              }`}
            >
              {inUniverse ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  In Universe
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Universe
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Editorial corner index */}
      <div className="absolute bottom-8 right-6 md:right-10 z-10 hidden md:flex flex-col items-end gap-3 font-mono text-[10px] tracking-[0.35em] text-[#64748B] uppercase">
        <span>
          No. {String(featuredAnime.scoreRank ?? 1).padStart(2, '0')}
        </span>
        <span className="w-px h-10 bg-[#334155]" />
        <span>Archive</span>
      </div>

      {/* Bottom fade into the page */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#090A0F] to-transparent z-[5]" />
    </section>
  );
};