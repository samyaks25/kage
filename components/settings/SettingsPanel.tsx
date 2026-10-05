'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Bell,
  Monitor,
  Database,
  Info,
  Check,
  Lock,
} from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { useUniverse } from '../tracking/UniverseProvider';

type ToggleKey =
  | 'airingNotifications'
  | 'newsDigest'
  | 'releaseReminders'
  | 'reduceMotion'
  | 'compactPosters';

const NOTIFICATION_ROWS: {
  key: ToggleKey;
  label: string;
  description: string;
}[] = [
  {
    key: 'airingNotifications',
    label: 'Airing notifications',
    description: 'Alert when a tracked series broadcasts a new episode',
  },
  {
    key: 'newsDigest',
    label: 'Weekly news digest',
    description: 'A summary of the anime wire each Sunday',
  },
  {
    key: 'releaseReminders',
    label: 'Release reminders',
    description: 'Remind me when a Plan to Watch title is added to the archive',
  },
];

const DISPLAY_ROWS: { key: ToggleKey; label: string; description: string }[] =
  [
    {
      key: 'reduceMotion',
      label: 'Reduce motion',
      description: 'Minimise entrance animations across the site',
    },
    {
      key: 'compactPosters',
      label: 'Compact posters',
      description: 'Tighter poster grid on discover and seasonal pages',
    },
  ];

export function SettingsPanel() {
  const { items } = useUniverse();
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    airingNotifications: true,
    newsDigest: false,
    releaseReminders: true,
    reduceMotion: false,
    compactPosters: false,
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const tracked = items.filter((item) => item.userStatus).length;

  const toggle = (key: ToggleKey) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    setSavedAt(null);
  };

  const handleSave = () => {
    setSavedAt(
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Settings"
        title="Preferences"
        lede="Presentation and notification preferences for this browser. Preferences are local only — nothing is synced to an account."
        meta="Foundation UI · no persistence layer wired up yet"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8 space-y-16">
          {/* Account */}
          <SettingsSection
            icon={<User className="w-4 h-4" />}
            title="Account"
            subtitle="Sign-in is not part of this build"
          >
            <div className="flex items-start gap-4 p-4 bg-[#12141D] border border-[#1E293B] rounded-[4px]">
              <Lock className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">
                  Authentication not connected
                </p>
                <p className="mt-1 text-sm text-[#94A3B8] leading-relaxed">
                  Accounts, cloud sync and cross-device libraries arrive with
                  the backend integration. Until then your universe lives in
                  this browser session only.
                </p>
                <Link
                  href="/profile/sora"
                  className="mt-4 inline-flex items-center h-10 px-4 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                >
                  View the mock profile
                </Link>
              </div>
            </div>
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            icon={<Bell className="w-4 h-4" />}
            title="Notifications"
            subtitle="What KAGE would surface to you"
          >
            <ul className="border-t border-[#1E293B]">
              {NOTIFICATION_ROWS.map((row) => (
                <ToggleRow
                  key={row.key}
                  label={row.label}
                  description={row.description}
                  enabled={toggles[row.key]}
                  onToggle={() => toggle(row.key)}
                />
              ))}
            </ul>
          </SettingsSection>

          {/* Display */}
          <SettingsSection
            icon={<Monitor className="w-4 h-4" />}
            title="Display"
            subtitle="Density and motion"
          >
            <ul className="border-t border-[#1E293B]">
              {DISPLAY_ROWS.map((row) => (
                <ToggleRow
                  key={row.key}
                  label={row.label}
                  description={row.description}
                  enabled={toggles[row.key]}
                  onToggle={() => toggle(row.key)}
                />
              ))}
            </ul>
          </SettingsSection>

          {/* Data */}
          <SettingsSection
            icon={<Database className="w-4 h-4" />}
            title="Data"
            subtitle="What this build stores locally"
          >
            <dl className="border-t border-[#1E293B]">
              {[
                { label: 'Tracked titles', value: String(tracked) },
                { label: 'Sync status', value: 'Local session only' },
                { label: 'Metadata source', value: 'Mock archive' },
                { label: 'Persistence', value: 'In-memory provider' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 py-3 border-b border-[#1E293B]"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                    {row.label}
                  </dt>
                  <dd className="text-sm font-semibold text-[#F8FAFC] text-right">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </SettingsSection>

          {/* Save */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center h-12 px-7 rounded-[3px] bg-[#FF2E4D] hover:bg-[#FF4D66] text-white text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F]"
            >
              Save Preferences
            </button>
            {savedAt && (
              <span className="flex items-center gap-2 font-mono text-[11px] text-[#10B981]">
                <Check className="w-3.5 h-3.5" />
                Saved locally at {savedAt}
              </span>
            )}
          </div>
        </div>

        {/* Rail */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
              <Info className="w-4 h-4 text-[#38BDF8]" />
              About this page
            </h2>
            <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
              Settings is a presentation foundation. Toggles drive local state
              only — no accounts, no sync, no server round-trip. The controls
              are laid out so each row maps directly onto a real preference once
              the backend lands.
            </p>

            <h3 className="mt-10 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
              Elsewhere
            </h3>
            <ul className="mt-4 border-t border-[#1E293B]">
              {[
                { label: 'My Universe', href: '/universe' },
                { label: 'Statistics', href: '/statistics' },
                { label: 'Discover', href: '/discover' },
                { label: 'Public Profile', href: '/profile/sora' },
              ].map((link) => (
                <li key={link.href} className="border-b border-[#1E293B]">
                  <Link
                    href={link.href}
                    className="block py-3 text-sm text-[#94A3B8] hover:text-[#FF2E4D] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-[3px] bg-[#1A1D2A] border border-[#1E293B] flex items-center justify-center text-[#38BDF8]">
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-bold text-[#F8FAFC]">{title}</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="flex items-center justify-between gap-6 py-4 border-b border-[#1E293B]">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#F8FAFC]">{label}</p>
        <p className="mt-1 text-sm text-[#64748B] leading-relaxed">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={onToggle}
        className={`relative w-12 h-7 rounded-full shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
          enabled ? 'bg-[#FF2E4D]' : 'bg-[#1E293B]'
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-200 ${
            enabled ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </li>
  );
}