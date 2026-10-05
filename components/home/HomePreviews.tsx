'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Minus, Plus } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { ViewAllLink, ViewAllLinkMobile } from '../ui/ViewAllLink';
import { useUniverse } from '../tracking/UniverseProvider';
import { animeHref } from '@/lib/navigation';
import type { AnimeItem } from '@/lib/mockData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Trending preview — numbered editorial rows, five deep. */
export function HomeTrendingPreview({ items }: { items: AnimeItem[] }) {
  const trending = items
    .filter((item) => item.trendingRank)
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0))
    .slice(0, 5);

  if (trending.length === 0) return null;

  return (
    <section className="mt-20 md:mt-24">
      <SectionHeader
        index="01"
        kicker="Discover"
        title="Trending Now"
        subtitle="Titles capturing global attention this week"
        action={<ViewAllLink href="/discover" label="View All" />}
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
            className="group relative grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-6 border-b border-[#1E293B] rounded-[3px] focus-within:outline-none"
          >
            <span
              className="ghost-num font-mono text-5xl sm:text-6xl font-black select-none"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

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

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200">
                <Link href={animeHref(anime.id)} className="block truncate">
                  {anime.title}
                </Link>
              </h3>
              <p className="mt-1 font-mono text-[11px] text-[#64748B] truncate">
                {anime.studio} • {anime.genres.slice(0, 2).join(' / ')}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-[#94A3B8]">
                {anime.season} {anime.year} • {anime.format} • {anime.status}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-1.5 font-mono text-lg sm:text-xl font-bold text-[#38BDF8]">
                <Star className="w-4 h-4 fill-current" />
                {anime.rating.toFixed(2)}
              </div>
              <ArrowRight className="mt-2 ml-auto w-4 h-4 text-[#334155] transition-all duration-300 group-hover:text-[#FF2E4D] group-hover:translate-x-1" />
            </div>

            <Link
              href={animeHref(anime.id)}
              className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <span className="sr-only">{`View details for ${anime.title}`}</span>
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="mt-6">
        <ViewAllLinkMobile href="/discover" label="View All" />
      </div>
    </section>
  );
}

/** Currently watching preview — three rows with inline steppers. */
export function HomeWatchingPreview({ items }: { items: AnimeItem[] }) {
  const { incrementEpisode, decrementEpisode } = useUniverse();
  const watching = items
    .filter((item) => item.isCurrentlyWatching)
    .slice(0, 3);

  if (watching.length === 0) return null;

  return (
    <section className="mt-24 md:mt-32">
      <SectionHeader
        index="02"
        kicker="Tracking"
        title="Currently Watching"
        subtitle="Active series and episode progress"
        action={<ViewAllLink href="/universe" label="View All" />}
      />

      <div>
        {watching.map((anime) => {
          const watched = anime.watchedEpisodes || 0;
          const total = anime.totalEpisodes;
          const percent = Math.round((watched / total) * 100);

          return (
            <div
              key={anime.id}
              className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-5 md:gap-8 py-6 sm:py-7 border-b border-[#1E293B] rounded-[3px] focus-within:outline-none"
            >
              <div className="relative w-full md:w-52 aspect-video md:aspect-auto md:h-32 rounded-[4px] overflow-hidden bg-[#12141D] shrink-0">
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
                  {anime.status === 'Airing' ? 'Airing' : 'Tracking'}
                </span>
              </div>

              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 truncate">
                    <Link href={animeHref(anime.id)} className="block truncate">
                      {anime.title}
                    </Link>
                  </h3>
                  <span className="font-mono text-[11px] text-[#64748B] shrink-0 hidden sm:block">
                    {anime.lastUpdatedTime || 'Recently'}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#64748B]">
                  {anime.studio} &bull; {anime.format} &bull;{' '}
                  {anime.status === 'Airing'
                    ? `${total} episodes aired`
                    : `${total} episodes`}
                </p>

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

              <div className="relative z-20 flex md:flex-col items-center justify-center gap-3 md:gap-2">
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
                  <span className="text-[#F8FAFC] font-bold">{watched}</span>
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

              <Link
                href={animeHref(anime.id)}
                className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
              >
                <span className="sr-only">{`View details for ${anime.title}`}</span>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <ViewAllLinkMobile href="/universe" label="View All" />
      </div>
    </section>
  );
}

/** Seasonal preview — one lead feature plus supporting rows. */
export function HomeSeasonalPreview({ items }: { items: AnimeItem[] }) {
  const seasonal = items
    .filter((item) => item.isSeasonal)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (seasonal.length === 0) return null;

  const [lead, ...supporting] = seasonal;
  const seasonLabel = `${lead.season} ${lead.year}`;

  return (
    <section className="mt-24 md:mt-32">
      <SectionHeader
        index="03"
        kicker="Seasonal"
        title={`${seasonLabel} Highlights`}
        subtitle="Handpicked releases airing this season"
        action={<ViewAllLink href="/seasonal" label="View All" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASING }}
          className="lg:col-span-7 group relative h-[420px] sm:h-[480px] rounded-[4px] overflow-hidden bg-[#12141D] focus-within:outline-none"
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
              <Link href={animeHref(lead.id)}>{lead.title}</Link>
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

          <Link
            href={animeHref(lead.id)}
            className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
          >
            <span className="sr-only">{`View details for ${lead.title}`}</span>
          </Link>
        </motion.article>

        <div className="lg:col-span-5 flex flex-col justify-between">
          {supporting.map((anime, i) => (
            <motion.article
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASING, delay: i * 0.06 }}
              className="group relative flex items-center gap-4 sm:gap-5 py-5 border-b border-[#1E293B] last:border-b-0 rounded-[3px] focus-within:outline-none"
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
                  <Link href={animeHref(anime.id)}>{anime.title}</Link>
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

              <Link
                href={animeHref(anime.id)}
                className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
              >
                <span className="sr-only">{`View details for ${anime.title}`}</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <ViewAllLinkMobile href="/seasonal" label="View All" />
      </div>
    </section>
  );
}