import React from 'react';
import { AnimeCardSkeleton } from '@/components/ui/LoadingSkeleton';

export default function SiteLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <div className="h-3 w-28 bg-[#1A1D2A] rounded animate-pulse" />
      <div className="mt-6 h-12 w-2/3 max-w-xl bg-[#12141D] rounded animate-pulse" />
      <div className="mt-4 h-4 w-1/2 max-w-md bg-[#12141D] rounded animate-pulse" />
      <div className="rule mt-12" />

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
        {Array.from({ length: 6 }, (_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}