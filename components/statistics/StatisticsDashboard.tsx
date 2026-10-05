'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { ViewAllLink } from '../ui/ViewAllLink';
import { useUniverse } from '../tracking/UniverseProvider';
import { buildUniverseStats } from '@/lib/stats';
import { animeHref } from '@/lib/navigation';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Deeper statistics over the tracked library — status mix, genre,
 * format, year, studio and score distribution, plus personal
 * bests and most-watched lists.
 */
export function StatisticsDashboard() {
  const { items } = useUniverse();
  const stats = buildUniverseStats(items);

  return (
    <>
      {/* Headline figures */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASING }}
        className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-y border-[#1E293B] divide-x divide-[#1E293B]"
      >
        <HeadlineStat
          label="Titles Tracked"
          value={String(stats.tracked)}
        />
        <HeadlineStat
          label="Episodes Watched"
          value={String(stats.totalEpisodesWatched)}
          accent="#38BDF8"
        />
        <HeadlineStat
          label="Mean Score"
          value={stats.meanScore !== null ? stats.meanScore.toFixed(1) : '—'}
          accent="#FF2E4D"
        />
        <HeadlineStat
          label="Completion Rate"
          value={`${stats.completionRate}%`}
          accent="#10B981"
        />
      </motion.div>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Status mix */}
        <div className="lg:col-span-7">
          <SectionHeader
            kicker="Breakdown"
            title="Status distribution"
            subtitle="How your library splits across tracking states"
          />
          <ul className="border-t border-[#1E293B]">
            {stats.statusBreakdown.map((slice) => (
              <li key={slice.status} className="py-4 border-b border-[#1E293B]">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span style={{ color: slice.color }}>{slice.status}</span>
                  </span>
                  <span className="font-mono text-xs text-[#94A3B8]">
                    {slice.count} • {slice.percent}%
                  </span>
                </div>
                <div className="h-1 bg-[#1E293B] overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${slice.percent}%`,
                      backgroundColor: slice.color,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Score distribution */}
        <div className="lg:col-span-5">
          <SectionHeader
            kicker="Scores"
            title="Your rating spread"
            subtitle="Personal scores across rated titles"
          />
          <ul className="border-t border-[#1E293B]">
            {stats.scoreDistribution.map((bucket) => (
              <li
                key={bucket.label}
                className="flex items-center gap-4 py-3 border-b border-[#1E293B]"
              >
                <span className="font-mono text-sm text-[#FF2E4D] w-6 shrink-0">
                  {bucket.label}
                </span>
                <div className="flex-1 h-1.5 bg-[#1E293B] overflow-hidden rounded-full">
                  <div
                    className="h-full bg-[#FF2E4D] rounded-full transition-all duration-500"
                    style={{ width: `${bucket.percent}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-[#64748B] w-16 text-right shrink-0">
                  {bucket.count} • {bucket.percent}%
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-[#1E293B] pt-6 space-y-3">
            <MetaRow
              label="Total runtime watched"
              value={`${Math.round(stats.totalMinutesWatched / 60)} hours`}
            />
            <MetaRow
              label="Days watched"
              value={`${stats.daysWatched.toFixed(1)} days`}
            />
            <MetaRow
              label="Average community score"
              value={stats.averageCommunityScore.toFixed(2)}
            />
          </div>
        </div>
      </section>

      {/* Library composition */}
      <section className="mt-24 md:mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <BreakdownList
          kicker="Genres"
          title="Most collected genres"
          slices={stats.genreBreakdown.slice(0, 8)}
        />
        <BreakdownList
          kicker="Studios"
          title="Most tracked studios"
          slices={stats.studioBreakdown.slice(0, 8)}
        />
        <BreakdownList
          kicker="Format"
          title="Format split"
          slices={stats.formatBreakdown}
        />
        <BreakdownList
          kicker="Years"
          title="Release years"
          slices={stats.yearBreakdown}
        />
      </section>

      {/* Personal bests */}
      <section className="mt-24 md:mt-28">
        <SectionHeader
          kicker="Personal Bests"
          title="Your highest rated"
          subtitle="Titles you scored highest in your universe"
          action={<ViewAllLink href="/universe" label="Open Universe" />}
        />
        {stats.topRated.length === 0 ? (
          <p className="text-sm text-[#64748B]">
            No titles rated yet. Open any record to set a personal score.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.topRated.map((anime) => (
              <div key={anime.id} className="group">
                <Link href={animeHref(anime.id)} className="block">
                  <div className="relative aspect-[2/3] rounded-[4px] overflow-hidden bg-[#12141D] border border-[#1E293B] group-hover:border-[#FF2E4D]/50 transition-colors duration-300">
                    <Image
                      src={anime.posterImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      unoptimized
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 line-clamp-2">
                    {anime.title}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-[#FF2E4D]">
                    YOU {anime.userRating}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Most watched */}
      <section className="mt-24 md:mt-28">
        <SectionHeader
          kicker="Time Served"
          title="Most watched"
          subtitle="Titles with the highest episode counts in your library"
        />
        <ol className="border-t border-[#1E293B]">
          {stats.mostWatched.map((anime, index) => (
            <li key={anime.id} className="border-b border-[#1E293B]">
              <Link
                href={animeHref(anime.id)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
              >
                <span className="ghost-num font-mono text-2xl font-black select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 truncate">
                    {anime.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#64748B]">
                    {anime.studio} &bull; {anime.format}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#94A3B8] shrink-0">
                  {anime.watchedEpisodes || 0}/{anime.totalEpisodes} eps
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function HeadlineStat({
  label,
  value,
  accent = '#F8FAFC',
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="px-5 sm:px-7 py-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
        {label}
      </p>
      <p
        className="mt-2 text-3xl md:text-4xl font-black tracking-tight"
        style={{ color: accent }}
      >
        {value}
      </p>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
        {label}
      </span>
      <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-[#F8FAFC]">
        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
        {value}
      </span>
    </div>
  );
}

function BreakdownList({
  kicker,
  title,
  slices,
}: {
  kicker: string;
  title: string;
  slices: { label: string; count: number; percent: number }[];
}) {
  return (
    <div>
      <SectionHeader kicker={kicker} title={title} />
      {slices.length === 0 ? (
        <p className="text-sm text-[#64748B]">No data yet.</p>
      ) : (
        <ul className="border-t border-[#1E293B]">
          {slices.map((slice) => (
            <li
              key={slice.label}
              className="flex items-center gap-4 py-3 border-b border-[#1E293B]"
            >
              <span className="text-sm text-[#94A3B8] flex-1 truncate">
                {slice.label}
              </span>
              <div className="w-24 h-1 bg-[#1E293B] overflow-hidden rounded-full shrink-0">
                <div
                  className="h-full bg-[#38BDF8] rounded-full"
                  style={{ width: `${slice.percent}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-[#64748B] w-14 text-right shrink-0">
                {slice.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Star };