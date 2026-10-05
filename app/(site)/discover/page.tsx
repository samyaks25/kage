import React from 'react';
import type { Metadata } from 'next';
import { DiscoverBrowser } from '@/components/discover/DiscoverBrowser';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  getAllGenres,
  getAllStudios,
  getAllYears,
  isAnimeSortKey,
} from '@/lib/anime';
import { MOCK_ANIME_LIST } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'Discover — Search & Filter Anime | KAGE',
  description:
    'Search and filter the KAGE archive by genre, year, season, format, status, studio, score and episode count.',
};

interface DiscoverPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string {
  const value = params[key];
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;

  const initialFilters = {
    query: firstParam(params, 'q'),
    genre: firstParam(params, 'genre'),
    year: firstParam(params, 'year'),
    season: firstParam(params, 'season'),
    format: firstParam(params, 'format'),
    status: firstParam(params, 'status'),
    studio: firstParam(params, 'studio'),
    sort: (isAnimeSortKey(firstParam(params, 'sort'))
      ? firstParam(params, 'sort')
      : 'trending') as 'trending',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Discover"
        title="Search the archive"
        lede="Every title KAGE has catalogued, filterable by genre, season, studio, score and length. Combine as many facets as you like."
        meta={`${MOCK_ANIME_LIST.length} records indexed — mock archive, no external metadata source`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Discover' }]}
      />

      <DiscoverBrowser
        items={MOCK_ANIME_LIST}
        genres={getAllGenres()}
        years={getAllYears()}
        studios={getAllStudios()}
        initialFilters={initialFilters}
      />
    </div>
  );
}