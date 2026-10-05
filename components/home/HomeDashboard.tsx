'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '../sections/Hero';
import { AnimeCarouselLink } from '../anime/AnimeCarouselLink';
import { useUniverse } from '../tracking/UniverseProvider';
import {
  HomeTrendingPreview,
  HomeWatchingPreview,
  HomeSeasonalPreview,
} from './HomePreviews';
import {
  HomeNewsPreview,
  HomeDiscoverPreview,
  HomeUniversePreview,
} from './HomeDiscoveryPreviews';
import type { AnimeItem } from '@/lib/mockData';

/**
 * Curated landing dashboard. Every block is a preview of a
 * destination: trending, currently watching, seasonal highlights,
 * latest news, discover picks and a universe snapshot — each with
 * a View All action that routes to its own page.
 */
export function HomeDashboard() {
  const { items } = useUniverse();
  const router = useRouter();

  const featured = items[0];
  const topRated = [...items].sort((a, b) => b.rating - a.rating).slice(0, 10);

  const handleViewDetails = (anime: AnimeItem) => {
    router.push(`/anime/${anime.id}`);
  };

  if (!featured) return null;

  return (
    <>
      <Hero featuredAnime={featured} onViewDetails={handleViewDetails} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeTrendingPreview items={items} />

        <HomeWatchingPreview items={items} />

        <HomeSeasonalPreview items={items} />

        <div className="mt-24 md:mt-32">
          <AnimeCarouselLink
            index="04"
            kicker="Rankings"
            title="Top Rated All-Time"
            subtitle="The highest-scored titles in the archive"
            startIndex={1}
            items={topRated}
            viewAllHref="/rankings"
            viewAllLabel="View All"
          />
        </div>

        <HomeNewsPreview />

        <HomeDiscoverPreview items={items} />

        <HomeUniversePreview />
      </div>
    </>
  );
}