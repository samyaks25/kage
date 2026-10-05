'use client';

import React from 'react';
import { UniverseProvider } from '../tracking/UniverseProvider';
import { SiteShell } from './SiteShell';

interface SiteProvidersProps {
  children: React.ReactNode;
}

/**
 * Client boundary for the whole site: tracking state lives above
 * the persistent shell so it survives every client-side navigation,
 * and pages can read it without prop drilling.
 */
export function SiteProviders({ children }: SiteProvidersProps) {
  return (
    <UniverseProvider>
      <SiteShell>{children}</SiteShell>
    </UniverseProvider>
  );
}