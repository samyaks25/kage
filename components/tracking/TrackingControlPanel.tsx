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

export interface DraftState {
  status: TrackingStatus;
  watchedEpisodes: number;
  rating: number | null;
}

interface TrackingControlPanelProps {
  anime: AnimeItem;
  /** Draft mode: when provided, controls read from draft and report changes via onDraftChange without mutating the provider. */
  draft?: DraftState;
  onDraftChange?: (draft: DraftState) => void;
}

/**
 * Tracking control panel — MAL-style status selector,
 * episode progress stepper and personal rating
 * foundation. Local mock state only.
 */
export const TrackingControlPanel: React.FC<
  TrackingControlPanelProps
> = ({ anime, draft, onDraftChange }) => {
  const { setStatus, setEpisode, setRating } = useUniverse();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const watched = draft?.watchedEpisodes ?? (anime.watchedEpisodes || 0);
  const total = anime.totalEpisodes;
  const status: TrackingStatus = draft?.status ?? (anime.userStatus || 'Plan to Watch');
  const isAiring = anime.status === 'Airing';

  const commitDraft = (next: Partial<DraftState>) => {
    if (!draft) return;
    onDraftChange?.({ ...draft, ...next });
  };

   const handleStatusChange = (next: TrackingStatus) => {
     if (draft) {
       const newDraft: Partial<DraftState> = { status: next };
       if (next === 'Completed' && Number.isInteger(anime.totalEpisodes) && anime.totalEpisodes > 0) {
         newDraft.watchedEpisodes = anime.totalEpisodes;
       }
       commitDraft(newDraft);
     } else {
       setStatus(anime.id, next);
     }
   };

  const handleEpisodeChange = (next: number) => {
    if (draft) {
      commitDraft({ watchedEpisodes: next });
    } else {
      setEpisode(anime.id, next);
    }
  };

  const handleRatingChange = (next: number | null) => {
    if (draft) {
      commitDraft({ rating: next });
    } else {
      setRating(anime.id, next);
    }
  };

  return (
    <div className="space-y-7">
      {/* MY STATUS */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-semibold text-[#64748B] tracking-[0.15em]">
          My Status
        </span>
        <div className="relative border-b border-[#1E293B] pb-0.5">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Select tracking status"
            aria-expanded={isDropdownOpen}
            className="w-full py-2.5 flex items-center justify-between text-xs font-semibold transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
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
            <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-[#090A0F] border-y border-[#1E293B] py-1">
              {ALL_STATUSES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    handleStatusChange(st);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-1 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF2E4D]"
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
        onChange={(n) => handleEpisodeChange(n)}
      />

      {/* MY RATING */}
      <RatingControl
        communityScore={anime.rating}
        userRating={draft?.rating ?? null}
        onChange={(r) => handleRatingChange(r)}
      />
    </div>
  );
};