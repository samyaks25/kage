import React from 'react';

export const AnimeCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2 animate-pulse">
      <div className="w-full aspect-[2/3] bg-[#12141D] rounded-[6px] border border-[#1E293B]" />
      <div className="h-4 bg-[#1A1D2A] rounded w-3/4" />
      <div className="h-3 bg-[#12141D] rounded w-1/2" />
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[65vh] min-h-[480px] bg-[#12141D] rounded-[10px] animate-pulse relative overflow-hidden">
      <div className="absolute bottom-10 left-10 space-y-4 max-w-xl">
        <div className="h-4 w-28 bg-[#1A1D2A] rounded" />
        <div className="h-10 w-96 bg-[#1A1D2A] rounded" />
        <div className="h-16 w-full bg-[#1A1D2A] rounded" />
        <div className="flex space-x-3">
          <div className="h-10 w-32 bg-[#FF2E4D]/30 rounded" />
          <div className="h-10 w-32 bg-[#1A1D2A] rounded" />
        </div>
      </div>
    </div>
  );
};
