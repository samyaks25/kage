import React from 'react';
import type { Metadata } from 'next';
import { UniverseList } from '@/components/universe/UniverseList';
import { PageHeader } from '@/components/ui/PageHeader';
import { STATUS_ORDER } from '@/lib/anime';
import type { TrackingStatus } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'My Universe — Anime Tracking List | KAGE',
  description:
    'Your KAGE tracking library: every title with status, episode progress, personal rating, sorting and filtering.',
};

interface UniversePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function UniversePage({
  searchParams,
}: UniversePageProps) {
  const params = await searchParams;
  const rawStatus = params.status;
  const statusValue = Array.isArray(rawStatus) ? rawStatus[0] : rawStatus;

  const initialTab: 'All' | TrackingStatus =
    statusValue && (STATUS_ORDER as string[]).includes(statusValue)
      ? (statusValue as TrackingStatus)
      : 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        kicker="My Universe"
        title="Your tracking library"
        lede="Every title you have added, grouped by status with episode progress, personal ratings and the controls to update them in place."
        meta="Local mock tracking state — no account required"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'My Universe' }]}
      />

      <UniverseList initialTab={initialTab} />
    </div>
  );
}