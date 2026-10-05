'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimeCardLink } from './AnimeCardLink';
import { SectionHeader } from '../ui/SectionHeader';
import { ViewAllLink } from '../ui/ViewAllLink';
import type { AnimeItem } from '@/lib/mockData';

interface AnimeCarouselLinkProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  index?: string;
  startIndex?: number;
  items: AnimeItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

/**
 * Routed horizontal rail — touch-enabled, snap points, numbered
 * cards, with an optional routed View All action.
 */
export function AnimeCarouselLink({
  title,
  subtitle,
  kicker,
  index,
  startIndex = 1,
  items,
  viewAllHref,
  viewAllLabel,
}: AnimeCarouselLinkProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative">
      <SectionHeader
        index={index}
        kicker={kicker}
        title={title}
        subtitle={subtitle}
        action={
          <div className="flex items-center gap-3">
            {viewAllHref && (
              <ViewAllLink href={viewAllHref} label={viewAllLabel} />
            )}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                aria-label="Previous items"
                className="w-9 h-9 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                aria-label="Next items"
                className="w-9 h-9 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        }
      />

      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-1"
      >
        {items.map((anime, i) => (
          <div
            key={anime.id}
            className="flex-none w-[150px] sm:w-[180px] md:w-[200px] snap-start"
          >
            <AnimeCardLink anime={anime} rank={startIndex + i} />
          </div>
        ))}
      </div>
    </section>
  );
}