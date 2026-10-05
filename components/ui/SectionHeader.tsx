import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  index?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  action?: React.ReactNode;
}

/**
 * Editorial section header — index numeral, kicker, strong title,
 * hairline rule. No boxes, no pills.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  kicker,
  title,
  subtitle,
  viewAllHref,
  action,
}) => {
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          {(kicker || index) && (
            <div className="flex items-center gap-3 mb-2">
              {index && (
                <span className="font-mono text-xs font-bold tracking-widest text-[#FF2E4D]">
                  {index}
                </span>
              )}
              {kicker && (
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#38BDF8]">
                  {kicker}
                </span>
              )}
            </div>
          )}
          <h2 className="text-2xl md:text-[2rem] font-black tracking-tight text-[#F8FAFC]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {action}
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] hover:text-[#FF2E4D] transition-colors group"
            >
              <span>Explore All</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>

      {subtitle && (
        <p className="mt-2 text-sm text-[#64748B] max-w-xl">{subtitle}</p>
      )}

      <div className="rule mt-5" />
    </div>
  );
};
