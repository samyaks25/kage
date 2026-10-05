import React from 'react';
import type { Metadata } from 'next';
import { SeasonalBrowser } from '@/components/seasonal/SeasonalBrowser';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  getAllGenres,
  getAllSeasons,
  getCurrentSeason,
  seasonKeyLabel,
} from '@/lib/anime';
import { MOCK_ANIME_LIST } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'Seasonal Anime — Current Season | KAGE',
  description:
    'Browse KAGE season by season: release lineups, series airing now and genre breakdowns across the archive.',
};

export default function SeasonalPage() {
  const seasons = getAllSeasons();
  const currentSeason = getCurrentSeason();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Seasonal"
        title={`${seasonKeyLabel(currentSeason)} and every season in the archive`}
        lede="A full seasonal browser rather than a single highlight — switch seasons, isolate what is currently broadcasting, or cut the archive by genre."
        meta={`${seasons.length} seasons indexed · ${MOCK_ANIME_LIST.length} records total`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Seasonal' }]}
      />

      <SeasonalBrowser
        items={MOCK_ANIME_LIST}
        seasons={seasons}
        currentSeason={currentSeason}
        genres={getAllGenres()}
      />
    </div>
  );
}