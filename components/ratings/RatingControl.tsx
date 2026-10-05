'use client';

import React from 'react';
import { Minus, Plus, Star, X } from 'lucide-react';

interface RatingControlProps {
  communityScore: number;
  userRating: number | null;
  onChange: (rating: number | null) => void;
}

/**
 * Personal rating foundation — increment / decrement,
 * direct 1–10 selection, remove rating. The KAGE
 * community score stays visually separate in azure.
 */
export const RatingControl: React.FC<RatingControlProps> = ({
  communityScore,
  userRating,
  onChange,
}) => {
  const clamp = (n: number) => Math.max(1, Math.min(10, n));

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em]">
          My Rating
        </span>
        {/* Community score — kept separate from the personal score */}
        <span
          className="flex items-center gap-1.5 font-mono text-xs text-[#38BDF8]"
          title="KAGE community score"
        >
          <Star className="w-3 h-3 fill-current" />
          KAGE {communityScore.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(clamp((userRating ?? 1) - 1))}
          disabled={userRating === null}
          aria-label="Decrease personal rating"
          className="w-10 h-10 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#F8FAFC] flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex-1 h-10 rounded-[3px] bg-[#12141D] border border-[#1E293B] flex items-center justify-center font-mono">
          {userRating !== null ? (
            <span className="text-sm font-bold text-[#FF2E4D] flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              {userRating} / 10
            </span>
          ) : (
            <span className="text-xs text-[#64748B]">Not rated</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onChange(clamp((userRating ?? 0) + 1))}
          disabled={userRating === null}
          aria-label="Increase personal rating"
          className="w-10 h-10 rounded-[3px] bg-[#FF2E4D]/15 hover:bg-[#FF2E4D]/25 border border-[#FF2E4D]/40 text-[#FF2E4D] flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Direct 1–10 selection */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`Rate ${n} out of 10`}
            className={`h-7 flex-1 rounded-[3px] font-mono text-[11px] font-bold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
              userRating === n
                ? 'bg-[#FF2E4D] text-white'
                : 'bg-[#12141D] text-[#64748B] hover:text-[#F8FAFC] border border-[#1E293B]'
            }`}
          >
            {n}
          </button>
        ))}
        {userRating !== null && (
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove personal rating"
            title="Remove rating"
            className="w-7 h-7 ml-1 rounded-[3px] text-[#64748B] hover:text-[#EF4444] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
