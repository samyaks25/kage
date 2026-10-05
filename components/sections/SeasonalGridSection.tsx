'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { AnimeItem } from '@/lib/mockData';
import { SectionHeader } from '../ui/SectionHeader';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SeasonalGridSectionProps {
  items: AnimeItem[];
  onSelectAnime: (anime: AnimeItem) => void;
}

/**
 * Seasonal — asymmetric composition: one large
 * feature plus supporting releases in a
 * numbered editorial stack.
 */
export const SeasonalGridSection: React.FC<
  SeasonalGridSectionProps
> = ({ items, onSelectAnime }) => {
  const seasonal = items.filter((item) => item.isSeasonal).slice(0, 4);
  if (seasonal.length === 0) return null;

  const [lead, ...supporting] = seasonal;
  const seasonLabel = `${lead.season} ${lead.year}`;

  return (
    <section id="seasonal" className="scroll-mt-24 mt-24 md:mt-32">
      <SectionHeader
        index="03"
        kicker="Seasonal"
        title={`${seasonLabel} Highlights`}
        subtitle="Handpicked releases airing this season"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Lead feature */}
        {lead && (
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASING }}
            onClick={() => onSelectAnime(lead)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelectAnime(lead);
            }}
            tabIndex={0}
            role="article"
            aria-label={`Featured seasonal anime: ${lead.title}`}
            className="lg:col-span-7 group relative h-[420px] sm:h-[480px] rounded-[4px] overflow-hidden bg-[#12141D] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
          >
            <Image
              src={lead.backdropImage || lead.posterImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F]/60 to-transparent" />

            {/* Ghost index */}
            <span
              className="ghost-num absolute top-5 right-6 font-mono text-7xl font-black select-none"
              aria-hidden="true"
            >
              01
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF2E4D] mb-3">
                Seasonal Feature
              </p>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 max-w-lg">
                {lead.title}
              </h3>
              <p className="mt-3 font-mono text-xs text-[#94A3B8]">
                <span className="text-[#38BDF8] font-bold">
                  {lead.rating.toFixed(2)}
                </span>
                <span className="text-[#334155] mx-2.5">&bull;</span>
                {lead.season} {lead.year}
                <span className="text-[#334155] mx-2.5">&bull;</span>
                {lead.totalEpisodes} Episodes
                <span className="text-[#334155] mx-2.5">&bull;</span>
                {lead.status}
              </p>
              <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed max-w-xl line-clamp-2">
                {lead.synopsis}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </motion.article>
        )}

        {/* Supporting releases */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          {supporting.map((anime, i) => (
            <motion.article
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                ease: EASING,
                delay: i * 0.06,
              }}
              onClick={() => onSelectAnime(anime)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSelectAnime(anime);
              }}
              tabIndex={0}
              role="article"
              aria-label={anime.title}
              className="group flex items-center gap-4 sm:gap-5 py-5 border-b border-[#1E293B] last:border-b-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
            >
              <span
                className="ghost-num font-mono text-2xl font-black select-none"
                aria-hidden="true"
              >
                {String(i + 2).padStart(2, '0')}
              </span>
              <div className="relative w-14 h-20 rounded-[4px] overflow-hidden bg-[#12141D] shrink-0">
                <Image
                  src={anime.posterImage}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-[#F8FAFC] line-clamp-2 group-hover:text-[#FF2E4D] transition-colors duration-200">
                  {anime.title}
                </h4>
                <p className="mt-1 font-mono text-[11px] text-[#64748B]">
                  {anime.season} {anime.year} &bull; {anime.format} &bull;{' '}
                  {anime.status}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-[#94A3B8] truncate">
                  {anime.genres.slice(0, 3).join(' / ')}
                </p>
              </div>
              <div className="flex items-center gap-1 font-mono text-sm font-bold text-[#38BDF8] shrink-0">
                <Star className="w-3.5 h-3.5 fill-current" />
                {anime.rating.toFixed(1)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};