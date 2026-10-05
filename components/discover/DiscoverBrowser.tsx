'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal, Eye } from 'lucide-react';
import { AnimeCardLink } from '../anime/AnimeCardLink';
import { AnimeDetailModal } from '../anime/AnimeDetailModal';
import { EmptyState } from '../ui/EmptyState';
import {
  ANIME_FORMATS,
  ANIME_SORT_OPTIONS,
  ANIME_STATUSES,
  SEASONS,
  isAnimeSortKey,
  sortAnime,
} from '@/lib/anime';
import type { AnimeSortKey } from '@/lib/anime';
import type { AnimeItem } from '@/lib/mockData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface DiscoverFilters {
  query: string;
  genre: string;
  year: string;
  season: string;
  format: string;
  status: string;
  studio: string;
  minScore: number;
  maxEpisodes: number;
  sort: AnimeSortKey;
}

interface DiscoverBrowserProps {
  items: AnimeItem[];
  genres: string[];
  years: number[];
  studios: string[];
  initialFilters: Partial<DiscoverFilters>;
}

const DEFAULT_FILTERS: DiscoverFilters = {
  query: '',
  genre: '',
  year: '',
  season: '',
  format: '',
  status: '',
  studio: '',
  minScore: 0,
  maxEpisodes: 50,
  sort: 'trending',
};

const SCORE_STEPS = [0, 7, 8, 8.5, 9, 9.5];
const EPISODE_STEPS = [50, 12, 24, 8, 1];

export function DiscoverBrowser({
  items,
  genres,
  years,
  studios,
  initialFilters,
}: DiscoverBrowserProps) {
  const [filters, setFilters] = useState<DiscoverFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [preview, setPreview] = useState<AnimeItem | null>(null);

  const results = useMemo(() => {
    const needle = filters.query.trim().toLowerCase();

    const filtered = items.filter((anime) => {
      const matchesQuery = needle
        ? anime.title.toLowerCase().includes(needle) ||
          anime.japaneseTitle.toLowerCase().includes(needle) ||
          (anime.englishTitle?.toLowerCase().includes(needle) ?? false) ||
          anime.genres.some((genre) => genre.toLowerCase().includes(needle)) ||
          anime.studio.toLowerCase().includes(needle)
        : true;

      const matchesGenre = filters.genre
        ? anime.genres.includes(filters.genre)
        : true;
      const matchesYear = filters.year ? String(anime.year) === filters.year : true;
      const matchesSeason = filters.season ? anime.season === filters.season : true;
      const matchesFormat = filters.format ? anime.format === filters.format : true;
      const matchesStatus = filters.status ? anime.status === filters.status : true;
      const matchesStudio = filters.studio ? anime.studio === filters.studio : true;
      const matchesScore = anime.rating >= filters.minScore;
      const matchesEpisodes = anime.totalEpisodes <= filters.maxEpisodes;

      return (
        matchesQuery &&
        matchesGenre &&
        matchesYear &&
        matchesSeason &&
        matchesFormat &&
        matchesStatus &&
        matchesStudio &&
        matchesScore &&
        matchesEpisodes
      );
    });

    return sortAnime(filtered, filters.sort);
  }, [items, filters]);

  const activeFilterCount = [
    filters.genre,
    filters.year,
    filters.season,
    filters.format,
    filters.status,
    filters.studio,
  ].filter(Boolean).length + (filters.minScore > 0 ? 1 : 0) +
  (filters.maxEpisodes < DEFAULT_FILTERS.maxEpisodes ? 1 : 0);

  const setFilter = <K extends keyof DiscoverFilters>(
    key: K,
    value: DiscoverFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <>
      {/* Filter rail */}
      <section aria-label="Filters" className="mt-12">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748B] mb-4">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Refine
          {activeFilterCount > 0 && (
            <span className="text-[#FF2E4D]">
              {activeFilterCount} active
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative flex items-center px-4 h-12 bg-[#12141D] border border-[#1E293B] focus-within:border-[#FF2E4D]/50 transition-colors duration-200 rounded-[4px]">
          <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => setFilter('query', event.target.value)}
            placeholder="Search title, genre or studio"
            aria-label="Search the archive"
            className="w-full pl-3 pr-3 bg-transparent text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none"
          />
          {filters.query && (
            <button
              type="button"
              onClick={() => setFilter('query', '')}
              aria-label="Clear search"
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Genre chips */}
        <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <FilterChip
            label="All Genres"
            active={filters.genre === ''}
            onClick={() => setFilter('genre', '')}
          />
          {genres.map((genre) => (
            <FilterChip
              key={genre}
              label={genre}
              active={filters.genre === genre}
              onClick={() =>
                setFilter('genre', filters.genre === genre ? '' : genre)
              }
            />
          ))}
        </div>

        {/* Selects */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <FilterSelect
            label="Year"
            value={filters.year}
            onChange={(value) => setFilter('year', value)}
            options={years.map((year) => ({ value: String(year), label: String(year) }))}
          />
          <FilterSelect
            label="Season"
            value={filters.season}
            onChange={(value) => setFilter('season', value)}
            options={SEASONS.map((season) => ({ value: season, label: season }))}
          />
          <FilterSelect
            label="Format"
            value={filters.format}
            onChange={(value) => setFilter('format', value)}
            options={ANIME_FORMATS.map((format) => ({ value: format, label: format }))}
          />
          <FilterSelect
            label="Status"
            value={filters.status}
            onChange={(value) => setFilter('status', value)}
            options={ANIME_STATUSES.map((status) => ({ value: status, label: status }))}
          />
          <FilterSelect
            label="Studio"
            value={filters.studio}
            onChange={(value) => setFilter('studio', value)}
            options={studios.map((studio) => ({ value: studio, label: studio }))}
          />
        </div>

        {/* Score + episodes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <StepFilter
            label="Minimum Score"
            steps={SCORE_STEPS}
            value={filters.minScore}
            format={(value) => (value === 0 ? 'Any' : `${value.toFixed(1)}+`)}
            onChange={(value) => setFilter('minScore', value)}
          />
          <StepFilter
            label="Max Episodes"
            steps={EPISODE_STEPS}
            value={filters.maxEpisodes}
            format={(value) =>
              value >= DEFAULT_FILTERS.maxEpisodes ? 'Any' : `${value} eps`
            }
            onChange={(value) => setFilter('maxEpisodes', value)}
          />
        </div>
      </section>

      {/* Result meta + sort */}
      <section className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E293B] pt-6">
        <p className="font-mono text-xs text-[#94A3B8]">
          <span className="text-[#F8FAFC] font-bold text-base">
            {results.length}
          </span>{' '}
          {results.length === 1 ? 'title' : 'titles'} in the archive
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="discover-sort"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]"
          >
            Sort
          </label>
          <select
            id="discover-sort"
            value={filters.sort}
            onChange={(event) => {
              const next = event.target.value;
              if (isAnimeSortKey(next)) setFilter('sort', next);
            }}
            className="h-10 px-3 bg-[#12141D] border border-[#1E293B] rounded-[4px] text-xs font-semibold text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
          >
            {ANIME_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="h-10 px-4 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-xs font-semibold text-[#F8FAFC] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Grid */}
      {results.length === 0 ? (
        <EmptyState
          title="No titles match these filters"
          description="Try widening the score or episode range, or clear a genre to see more of the archive."
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASING }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8"
        >
          {results.map((anime) => (
            <AnimeCardLink
              key={anime.id}
              anime={anime}
              onPreview={setPreview}
            />
          ))}
        </motion.div>
      )}

      <p className="mt-12 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#334155]">
        <Eye className="w-3.5 h-3.5" />
        Hover a poster for quick preview — open the title for the full record
      </p>

      <AnimeDetailModal anime={preview} onClose={() => setPreview(null)} />
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 px-3 h-9 rounded-[3px] text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
        active
          ? 'bg-[#FF2E4D] text-white'
          : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
      }`}
    >
      {label}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-2"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-11 px-3 bg-[#12141D] border border-[#1E293B] rounded-[4px] text-sm text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function StepFilter({
  label,
  steps,
  value,
  format,
  onChange,
}: {
  label: string;
  steps: number[];
  value: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B] mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {steps.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => onChange(step)}
            aria-pressed={value === step}
            className={`px-3 h-9 rounded-[3px] text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
              value === step
                ? 'bg-[#FF2E4D] text-white'
                : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
            }`}
          >
            {format(step)}
          </button>
        ))}
      </div>
    </div>
  );
}