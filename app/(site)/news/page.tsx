import React from 'react';
import type { Metadata } from 'next';
import { NewsIndex } from '@/components/news/NewsIndex';
import { PageHeader } from '@/components/ui/PageHeader';
import { getAllNews, getFeaturedNews } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Anime News — Industry Wire & Announcements | KAGE',
  description:
    'KAGE news wire: industry reports, announcements, trailers, adaptations, events and release coverage for anime.',
};

export default function NewsPage() {
  const articles = getAllNews();
  const featured = getFeaturedNews();

  if (!featured) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        kicker="News"
        title="The anime wire"
        lede="Announcements, industry reporting, trailers and event coverage — with category filters and search across the full archive."
        meta={`${articles.length} articles · mock wire, no external news source`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <NewsIndex articles={articles} featured={featured} />
    </div>
  );
}