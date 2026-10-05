'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Flame, CalendarRange, Trophy } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';
import { animeHref } from '@/lib/navigation';
import { getCurrentSeason, seasonKeyLabel } from '@/lib/anime';
import type { AnimeItem } from '@/lib/mockData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RankingTab =
  | 'overall'
  | 'highest-rated'
  | 'popular'
  | 'trending'
  | 'this-season';

interface RankingTabDef {
  id: RankingTab;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const TABS: RankingTabDef[] = [
  {
    id: 'overall',
    label: 'Overall',
    icon: <Trophy className="w-4 h-4" />,
    description: 'Archive rank — every title, scored by the community',
  },
  {
    id: 'highest-rated',
    label: 'Highest Rated',
    icon: <Star className="w-4 h-4" />,
    description: 'Pure community score, best first',
  },
  {
    id: 'popular',
    label: 'Popular',
    icon: <Flame className="w-4 h-4" />,
    description: 'Titles with the widest audience in the archive',
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: <TrendingUp className="w-4 h-4" />,
    description: 'What is moving this week',
  },
  {
    id: 'this-season',
    label: 'This Season',
    icon: <CalendarRange className="w-4 h-4" />,
    description: 'Standings for the current seasonal lineup',
  },
];

interface RankingsBoardProps {
  items: AnimeItem[];
  genres: string[];
  initialTab: RankingTab;
  initialGenre: string;
}

/**
 * Rankings board — chart-style numbered rows with a score bar,
 * filterable by chart type and genre.
 */
export function RankingsBoard({
  items,
  genres,
  initialTab,
  initialGenre,
}: RankingsBoardProps) {
  const [activeTab, setActiveTab] = useState<RankingTab>(initialTab);
  const [genre, setGenre] = useState<string>(initialGenre);

  const currentSeason = getCurrentSeason(items);

  const chart = (() => {
    switch (activeTab) {
      case 'overall':
        return [...items].sort(
          (a, b) => (a.scoreRank ?? 99) - (b.scoreRank ?? 99),
        );
      case 'highest-rated':
        return [...items].sort((a, b) => b.rating - a.rating);
      case 'popular':
        return [...items]
          .filter((item) => item.isPopular)
          .sort((a, b) => b.rating - a.rating);
      case 'trending':
        return [...items]
          .filter((item) => item.trendingRank)
          .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0));
      case 'this-season':
      default:
        return items
          .filter(
            (item) =>
              item.season === currentSeason.season &&
              item.year === currentSeason.year,
          )
          .sort((a, b) => b.rating - a.rating);
    }
  })();

  const rows = genre
    ? chart.filter((item) => item.genres.includes(genre))
    : chart;

  const activeTabDef =
    TABS.find((tab) => tab.id === activeTab) ?? TABS[0];
  const topScore = rows.length > 0 ? rows[0].rating : 1;

  return (
    <>
      {/* Chart tabs */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              className={`flex flex-col items-start gap-2 p-4 rounded-[4px] text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
                isActive
                  ? 'bg-[#FF2E4D]/12 border border-[#FF2E4D]/40'
                  : 'bg-[#12141D] border border-[#1E293B] hover:border-[#334155]'
              }`}
            >
              <span
                className={
                  isActive ? 'text-[#FF2E4D]' : 'text-[#64748B]'
                }
              >
                {tab.icon}
              </span>
              <span
                className={`text-sm font-semibold ${
                  isActive ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Genre filter */}
      <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          type="button"
          onClick={() => setGenre('')}
          aria-pressed={genre === ''}
          className={`shrink-0 px-3 h-9 rounded-[3px] text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
            genre === ''
              ? 'bg-[#FF2E4D] text-white'
              : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
          }`}
        >
          All Genres
        </button>
        {genres.map((entry) => (
          <button
            key={entry}
            type="button"
            onClick={() => setGenre(entry === genre ? '' : entry)}
            aria-pressed={entry === genre}
            className={`shrink-0 px-3 h-9 rounded-[3px] text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
              entry === genre
                ? 'bg-[#FF2E4D] text-white'
                : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
            }`}
          >
            {entry}
          </button>
        ))}
      </div>

      {/* Chart meta */}
      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3 border-t border-[#1E293B] pt-6">
        <div>
          <h2 className="text-xl font-black tracking-tight text-[#F8FAFC]">
            {activeTabDef.label}
            {genre && (
              <span className="text-[#FF2E4D]"> · {genre}</span>
            )}
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            {activeTabDef.description}
            {activeTab === 'this-season' && (
              <span className="text-[#94A3B8]">
                {' '}
                — {seasonKeyLabel(currentSeason)}
              </span>
            )}
          </p>
        </div>
        <p className="font-mono text-xs text-[#64748B]">
          {rows.length} {rows.length === 1 ? 'entry' : 'entries'}
        </p>
      </div>

      {/* Chart rows */}
      {rows.length === 0 ? (
        <EmptyState
          title="No entries on this chart"
          description="No titles match the selected chart and genre. Clear the genre filter or switch chart."
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASING }}
        >
          {rows.map((anime, index) => (
            <div
              key={anime.id}
              className="group relative grid grid-cols-[auto_auto_1fr] sm:grid-cols-[auto_auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 border-b border-[#1E293B] rounded-[3px] focus-within:outline-none"
            >
              <span
                className={`font-mono text-3xl sm:text-4xl font-black select-none ${
                  index < 3 ? 'ghost-num' : 'text-[#334155]'
                }`}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative w-12 h-16 sm:w-14 sm:h-20 rounded-[4px] overflow-hidden bg-[#12141D] shrink-0">
                <Image
                  src={anime.posterImage}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 truncate">
                  {anime.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-[#64748B] truncate">
                  {anime.studio} &bull; {anime.genres.slice(0, 2).join(' / ')}
                </p>
                <div className="mt-2 hidden sm:flex items-center gap-3">
                  <div className="w-32 h-1 bg-[#1E293B] overflow-hidden rounded-full">
                    <div
                      className="h-full bg-[#38BDF8] rounded-full"
                      style={{
                        width: `${Math.round((anime.rating / topScore) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#64748B]">
                    {anime.season} {anime.year} &bull; {anime.format}
                  </span>
                </div>
              </div>

              <div className="col-start-3 sm:col-start-4 text-right shrink-0">
                <div className="flex items-center justify-end gap-1 font-mono text-base sm:text-lg font-bold text-[#38BDF8]">
                  <Star className="w-4 h-4 fill-current" />
                  {anime.rating.toFixed(2)}
                </div>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                  Rank #{String(anime.scoreRank ?? 0).padStart(2, '0')}
                </p>
              </div>

              <Link
                href={animeHref(anime.id)}
                className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
              >
                <span className="sr-only">{`View details for ${anime.title}`}</span>
              </Link>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
}