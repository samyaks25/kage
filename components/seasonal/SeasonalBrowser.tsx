'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Radio } from 'lucide-react';
import Image from 'next/image';
import { AnimeCardLink } from '../anime/AnimeCardLink';
import { SectionHeader } from '../ui/SectionHeader';
import { EmptyState } from '../ui/EmptyState';
import { seasonKeyLabel, type SeasonKey } from '@/lib/anime';
import type { AnimeItem } from '@/lib/mockData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SeasonalBrowserProps {
  items: AnimeItem[];
  seasons: SeasonKey[];
  currentSeason: SeasonKey;
  genres: string[];
}

type SeasonalTab = 'season' | 'airing' | 'genre';

const TABS: { id: SeasonalTab; label: string }[] = [
  { id: 'season', label: 'By Season' },
  { id: 'airing', label: 'Airing Now' },
  { id: 'genre', label: 'By Genre' },
];

/**
 * Seasonal browsing — a full season browser rather than a single
 * highlight, with airing-now and genre lenses over the same archive.
 */
export function SeasonalBrowser({
  items,
  seasons,
  currentSeason,
  genres,
}: SeasonalBrowserProps) {
  const [activeTab, setActiveTab] = useState<SeasonalTab>('season');
  const [seasonKey, setSeasonKey] = useState<SeasonKey>(currentSeason);
  const [genre, setGenre] = useState<string>(genres[0] ?? '');

  const seasonItems = items
    .filter(
      (item) => item.season === seasonKey.season && item.year === seasonKey.year,
    )
    .sort((a, b) => b.rating - a.rating);

  const airing = items
    .filter((item) => item.status === 'Airing')
    .sort((a, b) => b.rating - a.rating);

  const byGenre = genre
    ? items.filter((item) => item.genres.includes(genre)).sort((a, b) => b.rating - a.rating)
    : [];

  const [lead, ...supporting] = seasonItems;
  const averageScore =
    seasonItems.length > 0
      ? (
          seasonItems.reduce((sum, item) => sum + item.rating, 0) /
          seasonItems.length
        ).toFixed(2)
      : '—';

  return (
    <>
      {/* Season at a glance */}
      <section className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-y border-[#1E293B] divide-x divide-[#1E293B]">
        <GlanceStat label="Releases" value={String(seasonItems.length)} />
        <GlanceStat label="Average Score" value={averageScore} accent="#38BDF8" />
        <GlanceStat
          label="Airing"
          value={String(seasonItems.filter((item) => item.status === 'Airing').length)}
          accent="#10B981"
        />
        <GlanceStat
          label="Top Genre"
          value={topGenreOf(seasonItems)}
        />
      </section>

      {/* Lens tabs */}
      <div className="mt-12 flex gap-6 overflow-x-auto no-scrollbar border-b border-[#1E293B]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            data-active={activeTab === tab.id}
            className="tab-editorial shrink-0 pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B] hover:text-[#94A3B8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'season' && (
        <section className="mt-10">
          {/* Season selector */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {seasons.map((key) => {
              const label = seasonKeyLabel(key);
              const isActive =
                key.season === seasonKey.season && key.year === seasonKey.year;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSeasonKey(key)}
                  aria-pressed={isActive}
                  className={`shrink-0 px-4 h-11 rounded-[3px] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
                    isActive
                      ? 'bg-[#FF2E4D] text-white'
                      : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {seasonItems.length === 0 ? (
            <EmptyState
              title="No releases in this season"
              description="The mock archive has no records for this season yet. Pick another season to continue browsing."
            />
          ) : (
            <>
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                {lead && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: EASING }}
                    className="lg:col-span-7"
                  >
                    <SeasonLead anime={lead} />
                  </motion.div>
                )}

                <ul className="lg:col-span-5 flex flex-col">
                  {supporting.map((anime, index) => (
                    <SeasonRow key={anime.id} anime={anime} index={index + 1} />
                  ))}
                </ul>
              </div>

              {supporting.length > 0 && (
                <div className="mt-12">
                  <SectionHeader
                    kicker="Full Season"
                    title={`${seasonKeyLabel(seasonKey)} Lineup`}
                    subtitle={`${seasonItems.length} releases in the archive`}
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
                    {seasonItems.map((anime) => (
                      <AnimeCardLink key={anime.id} anime={anime} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {activeTab === 'airing' && (
        <section className="mt-10">
          <SectionHeader
            kicker="Broadcast"
            title="Airing Now"
            subtitle="Series currently running in the archive"
          />
          {airing.length === 0 ? (
            <EmptyState title="Nothing airing" description="No series are marked as airing." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
              {airing.map((anime) => (
                <AnimeCardLink key={anime.id} anime={anime} />
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'genre' && (
        <section className="mt-10">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {genres.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => setGenre(entry)}
                aria-pressed={entry === genre}
                className={`shrink-0 px-4 h-11 rounded-[3px] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
                  entry === genre
                    ? 'bg-[#FF2E4D] text-white'
                    : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
                }`}
              >
                {entry}
              </button>
            ))}
          </div>

          <div className="mt-10">
            <SectionHeader
              kicker="Genre"
              title={genre || 'All Genres'}
              subtitle={`${byGenre.length} releases tagged ${genre || 'any genre'}`}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
              {byGenre.map((anime) => (
                <AnimeCardLink key={anime.id} anime={anime} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function GlanceStat({
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
      <p className="mt-2 text-3xl font-black tracking-tight" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

function topGenreOf(items: AnimeItem[]): string {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const genre of item.genres) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  return top ? top[0] : '—';
}

function SeasonLead({ anime }: { anime: AnimeItem }) {
  return (
    <article className="relative h-[420px] sm:h-[520px] rounded-[4px] overflow-hidden bg-[#12141D] group">
      <div className="absolute inset-0" />
      <AnimeBackdrop anime={anime} />
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
          Season Feature
        </p>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F8FAFC] max-w-lg">
          {anime.title}
        </h2>
        <p className="mt-3 font-mono text-xs text-[#94A3B8]">
          <span className="text-[#38BDF8] font-bold">{anime.rating.toFixed(2)}</span>
          <span className="text-[#334155] mx-2.5">&bull;</span>
          {anime.season} {anime.year}
          <span className="text-[#334155] mx-2.5">&bull;</span>
          {anime.totalEpisodes} Episodes
          <span className="text-[#334155] mx-2.5">&bull;</span>
          {anime.status}
        </p>
        <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed max-w-xl line-clamp-3">
          {anime.synopsis}
        </p>
        <div className="mt-6">
          <AnimeCardLinkInline anime={anime} />
        </div>
      </div>
    </article>
  );
}

function AnimeBackdrop({ anime }: { anime: AnimeItem }) {
  const [image, setImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    void import('next/image').then(() => {
      if (!cancelled) setImage(anime.backdropImage || anime.posterImage);
    });
    return () => {
      cancelled = true;
    };
  }, [anime.backdropImage, anime.posterImage]);

  if (!image) return <div className="absolute inset-0 bg-[#12141D]" />;

  return (
    <Image
      src={image}
      alt=""
      fill
      sizes="(max-width: 1024px) 100vw, 60vw"
      className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      unoptimized
    />
  );
}

function AnimeCardLinkInline({ anime }: { anime: AnimeItem }) {
  return (
    <div className="max-w-[200px]">
      <AnimeCardLink anime={anime} />
    </div>
  );
}

function SeasonRow({ anime, index }: { anime: AnimeItem; index: number }) {
  return (
    <li className="group border-b border-[#1E293B]">
      <div className="flex items-center gap-4 sm:gap-5 py-5">
        <span
          className="ghost-num font-mono text-2xl font-black select-none"
          aria-hidden="true"
        >
          {String(index).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] line-clamp-2">
            {anime.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-[#64748B]">
            {anime.studio} &bull; {anime.format} &bull; {anime.status}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-[#94A3B8] truncate">
            {anime.genres.slice(0, 3).join(' / ')}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="flex items-center justify-end gap-1 font-mono text-sm font-bold text-[#38BDF8]">
            <Star className="w-3.5 h-3.5 fill-current" />
            {anime.rating.toFixed(1)}
          </div>
          {anime.status === 'Airing' && (
            <p className="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#38BDF8]">
              <Radio className="w-3 h-3" />
              Airing
            </p>
          )}
        </div>
      </div>
    </li>
  );
}