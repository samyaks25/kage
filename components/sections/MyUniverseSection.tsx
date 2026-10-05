'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Film, Tv, Star, Clock } from 'lucide-react';
import { AnimeItem, TrackingStatus } from '@/lib/mockData';
import { SectionHeader } from '../ui/SectionHeader';
import { EmptyState } from '../ui/EmptyState';
import { ALL_STATUSES, useUniverse } from '../tracking/UniverseProvider';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

type UniverseTab = 'All' | TrackingStatus;

const TABS: UniverseTab[] = ['All', ...ALL_STATUSES];

const STATUS_COLORS: Record<TrackingStatus, string> = {
  Watching: '#38BDF8',
  Completed: '#10B981',
  'On Hold': '#F59E0B',
  Dropped: '#EF4444',
  'Plan to Watch': '#94A3B8',
  Rewatching: '#FF2E4D',
};

interface MyUniverseSectionProps {
  onSelectAnime: (anime: AnimeItem) => void;
}

/**
 * My Universe snapshot — statistics and activity
 * composition with MAL-style status tabs.
 * Visual foundation only; local mock state.
 */
export const MyUniverseSection: React.FC<
  MyUniverseSectionProps
> = ({ onSelectAnime }) => {
  const { items } = useUniverse();
  const [activeTab, setActiveTab] = useState<UniverseTab>('All');

  const tracked = items.filter((item) => item.userStatus);
  const totalEps = tracked.reduce(
    (sum, item) => sum + (item.watchedEpisodes || 0),
    0,
  );
  const rated = tracked.filter(
    (item) =>
      item.userRating !== null && item.userRating !== undefined,
  );
  const meanScore =
    rated.length > 0
      ? (
          rated.reduce(
            (sum, item) => sum + (item.userRating || 0),
            0,
          ) / rated.length
        ).toFixed(1)
      : '—';
  const daysWatched = ((totalEps * 24) / 60 / 24).toFixed(1);

  const filtered = tracked.filter(
    (item) =>
      activeTab === 'All' || item.userStatus === activeTab,
  );

  return (
    <section id="my-universe" className="scroll-mt-24 mt-24 md:mt-32">
      <SectionHeader
        index="07"
        kicker="My Universe"
        title="Universe Snapshot"
        subtitle="Your tracking activity at a glance"
      />

      {/* Statistics — editorial numerals with hairline dividers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASING }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-y border-[#1E293B] divide-x divide-[#1E293B]"
      >
        <Stat
          icon={<Film className="w-4 h-4" />}
          value={String(tracked.length)}
          label="Tracked"
        />
        <Stat
          icon={<Tv className="w-4 h-4" />}
          value={String(totalEps)}
          label="Episodes Watched"
        />
        <Stat
          icon={<Star className="w-4 h-4" />}
          value={meanScore}
          label="Mean Score"
        />
        <Stat
          icon={<Clock className="w-4 h-4" />}
          value={`${daysWatched}d`}
          label="Days Watched"
        />
      </motion.div>

      {/* Status tabs — underline style, not pills */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar border-b border-[#1E293B] mt-10">
        {TABS.map((tab) => {
          const count =
            tab === 'All'
              ? tracked.length
              : tracked.filter((item) => item.userStatus === tab)
                  .length;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              data-active={activeTab === tab}
              className="tab-editorial shrink-0 pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B] hover:text-[#94A3B8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
            >
              {tab}{' '}
              <span className="text-[#334155]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title={`Nothing in "${activeTab}" yet`}
            description="Titles you add to your universe will appear here. Start by exploring the archive."
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASING }}
        >
          {filtered.map((anime) => {
            const watched = anime.watchedEpisodes || 0;
            const total = anime.totalEpisodes;
            const percent = Math.round((watched / total) * 100);
            const status: TrackingStatus =
              anime.userStatus || 'Plan to Watch';

            return (
              <div
                key={anime.id}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 border-b border-[#1E293B]"
              >
                {/* Poster */}
                <div
                  onClick={() => onSelectAnime(anime)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSelectAnime(anime);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${anime.title}`}
                  className="relative w-11 h-16 rounded-[3px] overflow-hidden bg-[#12141D] cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                >
                  <Image
                    src={anime.posterImage}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h3
                    onClick={() => onSelectAnime(anime)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onSelectAnime(anime);
                    }}
                    tabIndex={0}
                    className="text-sm sm:text-base font-semibold text-[#F8FAFC] hover:text-[#FF2E4D] transition-colors duration-200 cursor-pointer truncate focus:outline-none"
                  >
                    {anime.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-[#64748B]">
                    {anime.studio} &bull; {anime.format} &bull;{' '}
                    <span style={{ color: STATUS_COLORS[status] }}>
                      {status}
                    </span>
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-24 h-1 bg-[#1E293B] overflow-hidden rounded-full">
                      <div
                        className="h-full bg-[#FF2E4D] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#64748B]">
                      {watched}/{total} EPS
                    </span>
                  </div>
                </div>

                {/* Status + scores */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <span
                    className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest"
                    style={{ color: STATUS_COLORS[status] }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: STATUS_COLORS[status],
                      }}
                    />
                    {status}
                  </span>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 font-mono text-xs text-[#38BDF8]">
                      <Star className="w-3 h-3 fill-current" />
                      {anime.rating.toFixed(1)}
                    </div>
                    {anime.userRating != null && (
                      <div className="font-mono text-xs text-[#FF2E4D]">
                        YOU {anime.userRating}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
};

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="px-5 sm:px-7 py-7">
      <div className="flex items-center gap-2 text-[#64748B] mb-2">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>
      <span className="text-3xl md:text-4xl font-black tracking-tight text-[#F8FAFC]">
        {value}
      </span>
    </div>
  );
}