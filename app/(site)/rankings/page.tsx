import React from 'react';
import type { Metadata } from 'next';
import { RankingsBoard } from '@/components/rankings/RankingsBoard';
import { PageHeader } from '@/components/ui/PageHeader';
import { getAllGenres } from '@/lib/anime';
import { MOCK_ANIME_LIST } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'Anime Rankings — Overall, Trending & Seasonal Charts | KAGE',
  description:
    'KAGE rankings: overall archive standings, highest rated, popular, trending and this-season charts, filterable by genre.',
};

interface RankingsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const VALID_TABS = [
  'overall',
  'highest-rated',
  'popular',
  'trending',
  'this-season',
] as const;

type RankingTab = (typeof VALID_TABS)[number];

function firstParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
): string {
  const value = params[key];
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function RankingsPage({
  searchParams,
}: RankingsPageProps) {
  const params = await searchParams;
  const tabParam = firstParam(params, 'tab');

  const initialTab: RankingTab = (VALID_TABS as readonly string[]).includes(
    tabParam,
  )
    ? (tabParam as RankingTab)
    : 'overall';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Rankings"
        title="Standings across the archive"
        lede="Five charts over the same catalogue — overall rank, community score, audience reach, weekly movement and the current seasonal table."
        meta={`${MOCK_ANIME_LIST.length} ranked records`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Rankings' }]}
      />

      <RankingsBoard
        items={MOCK_ANIME_LIST}
        genres={getAllGenres()}
        initialTab={initialTab}
        initialGenre={firstParam(params, 'genre')}
      />
    </div>
  );
}