'use client';

import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AnimeItem, TrackingStatus } from '@/lib/mockData';
import { ALL_STATUSES, useUniverse } from './UniverseProvider';
import { EpisodeProgress } from './EpisodeProgress';
import { RatingControl } from '../ratings/RatingControl';

const STATUS_COLORS: Record<TrackingStatus, string> = {
  Watching: '#38BDF8',
  Completed: '#10B981',
  'On Hold': '#F59E0B',
  Dropped: '#EF4444',
  'Plan to Watch': '#94A3B8',
  Rewatching: '#FF2E4D',
};

interface TrackingControlPanelProps {
  anime: AnimeItem;
}

/**
 * Tracking control panel — MAL-style status selector,
 * episode progress stepper and personal rating
 * foundation. Local mock state only.
 */
export const TrackingControlPanel: React.FC<
  TrackingControlPanelProps
> = ({ anime }) => {
  const { setStatus, setEpisode, setRating } = useUniverse();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const watched = anime.watchedEpisodes || 0;
  const total = anime.totalEpisodes;
  const status: TrackingStatus =
    anime.userStatus || 'Plan to Watch';
  const isAiring = anime.status === 'Airing';

  return (
    <div className="space-y-7 font-mono">
      {/* MY STATUS */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em]">
          My Status
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Select tracking status"
            aria-expanded={isDropdownOpen}
            className="w-full h-11 px-3 rounded-[3px] bg-[#12141D] border border-[#1E293B] hover:border-[#334155] flex items-center justify-between text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            style={{ color: STATUS_COLORS[status] }}
          >
            <span className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: STATUS_COLORS[status],
                }}
              />
              {status}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isDropdownOpen && (
            <button
              type="button"
              aria-label="Close status menu"
              tabIndex={-1}
              onClick={() => setIsDropdownOpen(false)}
              className="fixed inset-0 z-20 cursor-default"
            />
          )}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-[#1A1D2A] border border-[#334155] rounded-[3px] shadow-xl py-1.5">
              {ALL_STATUSES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setStatus(anime.id, st);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors hover:bg-[#222638] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF2E4D]"
                  style={{ color: STATUS_COLORS[st] }}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: STATUS_COLORS[st],
                      }}
                    />
                    {st}
                  </span>
                  {status === st && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EPISODE PROGRESS */}
      <EpisodeProgress
        watched={watched}
        total={total}
        isAiring={isAiring}
        onChange={(n) => setEpisode(anime.id, n)}
      />

      {/* MY RATING */}
      <RatingControl
        communityScore={anime.rating}
        userRating={anime.userRating ?? null}
        onChange={(r) => setRating(anime.id, r)}
      />
    </div>
  );
};