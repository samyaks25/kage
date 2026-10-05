'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Search,
  X,
  Minus,
  Plus,
  LayoutList,
  LayoutGrid,
  Trash2,
} from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';
import { StatusPill } from '../ui/StatusPill';
import { ViewAllLink, ViewAllLinkMobile } from '../ui/ViewAllLink';
import { AnimeCardLink } from '../anime/AnimeCardLink';
import { useUniverse } from '../tracking/UniverseProvider';
import { STATUS_ORDER, watchedPercent } from '@/lib/anime';
import { animeHref } from '@/lib/navigation';
import type { TrackingStatus } from '@/lib/mockData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

type UniverseTab = 'All' | TrackingStatus;
type SortKey = 'updated' | 'title' | 'score' | 'progress' | 'year';
type ViewMode = 'list' | 'grid';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'score', label: 'Highest Rated' },
  { value: 'progress', label: 'Most Watched' },
  { value: 'year', label: 'Newest First' },
];

interface UniverseListProps {
  initialTab: UniverseTab;
}

function isTrackingStatus(value: string): value is TrackingStatus {
  return (STATUS_ORDER as string[]).includes(value);
}

/**
 * Full tracking list — status tabs with counts, search, sorting,
 * list or grid layout, per-row episode steppers and progress.
 */
export function UniverseList({ initialTab }: UniverseListProps) {
  const { items, incrementEpisode, decrementEpisode, toggleInUniverse } =
    useUniverse();

  const [activeTab, setActiveTab] = useState<UniverseTab>(initialTab);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('updated');
  const [view, setView] = useState<ViewMode>('list');

  const tracked = useMemo(
    () => items.filter((item) => item.userStatus),
    [items],
  );

  const counts = useMemo(() => {
    const map = new Map<UniverseTab, number>();
    map.set('All', tracked.length);
    for (const status of STATUS_ORDER) {
      map.set(
        status,
        tracked.filter((item) => item.userStatus === status).length,
      );
    }
    return map;
  }, [tracked]);

  const entries = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = tracked.filter((item) => {
      const matchesTab = activeTab === 'All' || item.userStatus === activeTab;
      const matchesQuery = needle
        ? item.title.toLowerCase().includes(needle) ||
          item.japaneseTitle.toLowerCase().includes(needle) ||
          item.studio.toLowerCase().includes(needle)
        : true;
      return matchesTab && matchesQuery;
    });

    const sorted = [...filtered];
    switch (sort) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'score':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'progress':
        sorted.sort(
          (a, b) => (b.watchedEpisodes || 0) - (a.watchedEpisodes || 0),
        );
        break;
      case 'year':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'updated':
      default:
        sorted.sort(
          (a, b) =>
            (b.lastUpdatedTime ? 1 : 0) - (a.lastUpdatedTime ? 1 : 0) ||
            (b.watchedEpisodes || 0) - (a.watchedEpisodes || 0),
        );
        break;
    }
    return sorted;
  }, [tracked, activeTab, query, sort]);

  const totalEpisodes = tracked.reduce(
    (sum, item) => sum + (item.watchedEpisodes || 0),
    0,
  );
  const rated = tracked.filter((item) => item.userRating != null);
  const meanScore =
    rated.length > 0
      ? (
          rated.reduce((sum, item) => sum + (item.userRating || 0), 0) /
          rated.length
        ).toFixed(1)
      : '—';

  const tabs: UniverseTab[] = ['All', ...STATUS_ORDER];

  return (
    <>
      {/* Library summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASING }}
        className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-y border-[#1E293B] divide-x divide-[#1E293B]"
      >
        <SummaryStat label="Tracked" value={String(tracked.length)} />
        <SummaryStat label="Episodes Watched" value={String(totalEpisodes)} />
        <SummaryStat label="Mean Score" value={meanScore} accent="#FF2E4D" />
        <SummaryStat
          label="Rated Titles"
          value={String(rated.length)}
          accent="#38BDF8"
        />
      </motion.div>

      {/* Status tabs */}
      <div className="mt-12 flex gap-6 overflow-x-auto no-scrollbar border-b border-[#1E293B]">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            data-active={activeTab === tab}
            className="tab-editorial shrink-0 pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B] hover:text-[#94A3B8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
          >
            {tab}{' '}
            <span className="text-[#334155]">({counts.get(tab) ?? 0})</span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <section className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1 flex items-center px-4 h-12 bg-[#12141D] border border-[#1E293B] focus-within:border-[#FF2E4D]/50 transition-colors duration-200 rounded-[4px]">
          <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your library"
            aria-label="Search your universe"
            className="w-full pl-3 pr-3 bg-transparent text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear library search"
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="universe-sort"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]"
          >
            Sort
          </label>
          <select
            id="universe-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-12 px-3 bg-[#12141D] border border-[#1E293B] rounded-[4px] text-xs font-semibold text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setView('list')}
              aria-label="List view"
              aria-pressed={view === 'list'}
              className={`w-12 h-12 rounded-[3px] border flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
                view === 'list'
                  ? 'bg-[#FF2E4D]/12 border-[#FF2E4D]/40 text-[#FF2E4D]'
                  : 'bg-[#12141D] border-[#1E293B] text-[#64748B] hover:text-[#F8FAFC]'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setView('grid')}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              className={`w-12 h-12 rounded-[3px] border flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
                view === 'grid'
                  ? 'bg-[#FF2E4D]/12 border-[#FF2E4D]/40 text-[#FF2E4D]'
                  : 'bg-[#12141D] border-[#1E293B] text-[#64748B] hover:text-[#F8FAFC]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="mt-10">
        <p className="font-mono text-xs text-[#94A3B8] mb-6">
          <span className="text-[#F8FAFC] font-bold text-base">
            {entries.length}
          </span>{' '}
          {entries.length === 1 ? 'entry' : 'entries'}
          {activeTab !== 'All' && (
            <span className="text-[#64748B]"> in {activeTab}</span>
          )}
        </p>

        {entries.length === 0 ? (
          <EmptyState
            title={query ? 'No matches in your library' : `Nothing in "${activeTab}"`}
            description={
              query
                ? 'Try a different keyword, or clear the search to see your whole library.'
                : 'Titles you add to your universe appear here. Start from Discover.'
            }
          />
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
            {entries.map((anime) => (
              <AnimeCardLink key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          entries.map((anime) => {
            const watched = anime.watchedEpisodes || 0;
            const total = anime.totalEpisodes;
            const percent = watchedPercent(anime);
            const status: TrackingStatus =
              anime.userStatus ?? 'Plan to Watch';

            return (
              <div
                key={anime.id}
                className="group relative grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 border-b border-[#1E293B] rounded-[3px] focus-within:outline-none"
              >
                <div className="relative w-14 h-20 rounded-[3px] overflow-hidden bg-[#12141D] shrink-0">
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
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 truncate">
                      <Link href={animeHref(anime.id)} className="block truncate">
                        {anime.title}
                      </Link>
                    </h3>
                    <StatusPill status={status} />
                  </div>

                  <p className="mt-1 font-mono text-[11px] text-[#64748B] truncate">
                    {anime.studio} &bull; {anime.format} &bull;{' '}
                    {anime.season} {anime.year} &bull; {anime.status}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-28 sm:w-40 h-1 bg-[#1E293B] overflow-hidden rounded-full">
                      <div
                        className="progress-fill h-full bg-[#FF2E4D] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#64748B]">
                      {watched}/{total} EPS • {percent}%
                    </span>
                  </div>
                </div>

                {/* Stepper + scores + remove */}
                <div className="col-span-2 lg:col-span-1 flex items-center justify-between lg:justify-end gap-3 sm:gap-6">
                  <div className="relative z-20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrementEpisode(anime.id)}
                      disabled={watched <= 0}
                      aria-label={`Decrement episode progress for ${anime.title}`}
                      className="w-10 h-10 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#F8FAFC] flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-sm text-[#F8FAFC] w-12 text-center">
                      {watched}
                      <span className="text-[#64748B]">/{total}</span>
                    </span>
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

                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1 font-mono text-xs text-[#38BDF8]">
                      <Star className="w-3 h-3 fill-current" />
                      {anime.rating.toFixed(1)}
                    </div>
                    <div className="font-mono text-xs text-[#FF2E4D]">
                      {anime.userRating != null ? `YOU ${anime.userRating}` : '—'}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleInUniverse(anime.id)}
                    aria-label={`Remove ${anime.title} from Universe`}
                    className="relative z-20 w-10 h-10 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#64748B] hover:text-[#EF4444] flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href={animeHref(anime.id)}
                  className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                >
                  <span className="sr-only">
                    {`View details for ${anime.title}`}
                  </span>
                </Link>
              </div>
            );
          })
        )}
      </section>

      {/* Deeper analysis */}
      <section className="mt-16 flex flex-wrap items-center gap-6">
        <ViewAllLink href="/statistics" label="Full Statistics" />
        <ViewAllLinkMobile href="/statistics" label="Full Statistics" />
      </section>
    </>
  );
}

function SummaryStat({
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

export { isTrackingStatus };