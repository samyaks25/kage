'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimeItem } from '@/lib/mockData';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimeCard } from '../anime/AnimeCard';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface DiscoverGridSectionProps {
  items: AnimeItem[];
  onSelectAnime: (anime: AnimeItem) => void;
}

/**
 * Discover For You — traditional editorial grid.
 * The only dense grid on the page; every other
 * section uses a distinct composition.
 */
export const DiscoverGridSection: React.FC<
  DiscoverGridSectionProps
> = ({ items, onSelectAnime }) => {
  const discover = items
    .filter((item) => item.isRecommended)
    .slice(0, 12);

  if (discover.length === 0) return null;

  return (
    <section className="mt-24 md:mt-32">
      <SectionHeader
        index="06"
        kicker="Curated"
        title="Discover For You"
        subtitle="Editorial selections from the archive"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASING }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8"
      >
        {discover.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onSelect={onSelectAnime}
          />
        ))}
      </motion.div>
    </section>
  );
};
