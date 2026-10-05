'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_NEWS_ARTICLES } from '@/lib/mockNewsData';
import { SectionHeader } from '../ui/SectionHeader';
import { NewsCard } from '../news/NewsCard';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Latest Anime News — first-class KAGE feature.
 * Featured story beside a lead article, then a
 * three-up editorial row.
 */
export const NewsSection: React.FC = () => {
  const featured =
    MOCK_NEWS_ARTICLES.find((a) => a.isFeatured) ??
    MOCK_NEWS_ARTICLES[0];
  const lead = MOCK_NEWS_ARTICLES.find((a) => a.id !== featured?.id);
  const rest = MOCK_NEWS_ARTICLES.filter(
    (a) => a.id !== featured?.id && a.id !== lead?.id,
  ).slice(0, 3);

  if (!featured) return null;

  return (
    <section id="news" className="scroll-mt-24 mt-24 md:mt-32">
      <SectionHeader
        index="05"
        kicker="News"
        title="Latest Anime News"
        subtitle="Industry wire, announcements and adaptations"
      />

      {/* Featured + lead article */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASING }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8"
      >
        <NewsCard article={featured} variant="featured" />
        {lead && <NewsCard article={lead} />}
      </motion.div>

      {/* Supporting row */}
      {rest.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASING, delay: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rest.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </motion.div>
      )}
    </section>
  );
};
