import React from 'react';
import { STATUS_COLORS } from '@/lib/anime';
import type { TrackingStatus } from '@/lib/mockData';

interface StatusPillProps {
  status: TrackingStatus;
  withDot?: boolean;
  className?: string;
}

/**
 * Tracking status indicator — mono caps plus a state dot.
 * Colour comes from the shared KAGE status palette.
 */
export function StatusPill({
  status,
  withDot = true,
  className = '',
}: StatusPillProps) {
  const color = STATUS_COLORS[status];

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest ${className}`}
      style={{ color }}
    >
      {withDot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {status}
    </span>
  );
}