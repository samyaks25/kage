'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { MOCK_ANIME_LIST, AnimeItem } from '@/lib/mockData';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnime: (anime: AnimeItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAnime,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
  onClose();
}
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularTags = ["Action", "Fantasy", "Supernatural", "Cyberpunk", "Drama", "Sci-Fi"];

  const filteredResults = MOCK_ANIME_LIST.filter((anime) => {
    const matchesQuery =
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      anime.japaneseTitle.toLowerCase().includes(query.toLowerCase()) ||
      anime.genres.some(g => g.toLowerCase().includes(query.toLowerCase()));

    const matchesTag = selectedTag ? anime.genres.includes(selectedTag) : true;

    return matchesQuery && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-[#12141D] border border-[#334155] rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="relative flex items-center px-4 border-b border-[#1E293B]">
          <Search className="w-5 h-5 text-[#94A3B8] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime title, genre, or studio... (Press ESC to exit)"
            autoFocus
            className="w-full py-4 pl-3 pr-10 bg-transparent text-[#F8FAFC] placeholder-[#64748B] text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#94A3B8] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tag Filters */}
        <div className="flex items-center space-x-2 px-4 py-3 bg-[#090A0F]/60 overflow-x-auto no-scrollbar border-b border-[#1E293B]">
          <span className="text-xs font-mono text-[#64748B] shrink-0">Filter Tag:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 text-xs rounded-[3px] shrink-0 transition-colors ${
              selectedTag === null
                ? 'bg-[#FF2E4D] text-white font-semibold'
                : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
            }`}
          >
            All
          </button>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 text-xs rounded-[3px] shrink-0 transition-colors ${
                selectedTag === tag
                  ? 'bg-[#FF2E4D] text-white font-semibold'
                  : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[50vh] overflow-y-auto p-3 divide-y divide-[#1E293B]">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-[#64748B] text-sm">
              No anime found matching &quot;{query}&quot;
            </div>
          ) : (
            filteredResults.map((anime) => (
              <div
                key={anime.id}
                onClick={() => {
                  onSelectAnime(anime);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-[6px] hover:bg-[#1A1D2A] transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="relative w-10 h-14 rounded-[3px] overflow-hidden bg-[#090A0F] shrink-0">
                    <Image
                      src={anime.posterImage}
                      alt={anime.title}
                      fill
                      sizes="50px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors line-clamp-1">
                      {anime.title}
                    </h4>
                    <p className="text-xs text-[#64748B] line-clamp-1 font-mono">
                      {anime.japaneseTitle} • {anime.year} • {anime.format}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 pl-2">
                  <div className="flex items-center space-x-1 text-xs font-mono text-[#38BDF8]">
                    <Star className="w-3.5 h-3.5 fill-[#38BDF8]" />
                    <span>{anime.rating.toFixed(1)}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FF2E4D] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Shortcut Note */}
        <div className="px-4 py-2.5 bg-[#090A0F] border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#64748B] font-mono">
          <span>KAGE Editorial Discovery</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
