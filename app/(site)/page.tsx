import React from 'react';
import type { Metadata } from 'next';
import { HomeDashboard } from '@/components/home/HomeDashboard';

export const metadata: Metadata = {
  title: 'KAGE (影) — Editorial Anime Discovery & Tracking',
  description:
    'KAGE is a neo-noir archive of the animated form. Discover, track, rate and organize anime with a cinematic editorial experience.',
};

export default function HomePage() {
  return <HomeDashboard />;
}