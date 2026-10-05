import React from 'react';
import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/settings/SettingsPanel';

export const metadata: Metadata = {
  title: 'Settings — Preferences | KAGE',
  description:
    'KAGE display, notification and data preferences. Local-only foundation while accounts and sync are pending.',
};

export default function SettingsPage() {
  return <SettingsPanel />;
}