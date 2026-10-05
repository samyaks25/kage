import React from 'react';
import { SiteProviders } from '@/components/layout/SiteProviders';

interface SiteLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared layout for every route in the site group — navbar, mobile
 * bar and footer persist here so pages only render their own body.
 */
export default function SiteLayout({ children }: SiteLayoutProps) {
  return <SiteProviders>{children}</SiteProviders>;
}