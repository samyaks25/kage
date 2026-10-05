'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface EpisodeProgressProps {
  watched: number;
  total: number;
  isAiring?: boolean;
  onChange: (episode: number) => void;
}

/**
 * Episode progress — decrement, current episode,
 * increment, progress bar, percentage and the
 * known episode limit. Handles currently-airing
 * series by treating the aired count as the limit.
 */
export const EpisodeProgress: React.FC<EpisodeProgressProps> = ({
  watched,
  total,
  isAiring = false,
  onChange,
}) => {
  const percent = Math.round((watched / total) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em]">
          Episode Progress
        </span>
        <span className="font-mono text-xs text-[#94A3B8]">
          <span className="text-[#FF2E4D] font-bold text-sm">
            {watched}
          </span>
          <span className="text-[#64748B]"> / {total}</span>
          <span className="text-[#64748B]"> &bull; {percent}%</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(watched - 1)}
          disabled={watched <= 0}
          aria-label="Decrement episode progress"
          className="w-10 h-10 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#F8FAFC] flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex-1 h-1.5 bg-[#1E293B] overflow-hidden rounded-full">
          <div
            className="progress-fill h-full bg-[#FF2E4D] rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => onChange(watched + 1)}
          disabled={watched >= total}
          aria-label="Increment episode progress"
          className="w-10 h-10 rounded-[3px] bg-[#FF2E4D]/15 hover:bg-[#FF2E4D]/25 border border-[#FF2E4D]/40 text-[#FF2E4D] flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {isAiring && (
        <p className="font-mono text-[10px] text-[#38BDF8] uppercase tracking-widest">
          Series airing — {total} episodes aired to date
        </p>
      )}
    </div>
  );
};
