import React from 'react';
import type { Metadata } from 'next';
import { StatisticsDashboard } from '@/components/statistics/StatisticsDashboard';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Statistics — Your Anime Analytics | KAGE',
  description:
    'Detailed personal anime statistics: status mix, rating spread, genre and studio breakdowns, completion rate and personal bests.',
};

export default function StatisticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Statistics"
        title="Your anime analytics"
        lede="The deeper read on your tracking history — how the library splits, how you score, what you finish and where your hours go."
        meta="Derived live from your universe • 24 min assumed per episode"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'My Universe', href: '/universe' },
          { label: 'Statistics' },
        ]}
      />

      <StatisticsDashboard />
    </div>
  );
}