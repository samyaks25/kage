'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Users, Globe, CalendarDays } from 'lucide-react';
import { AnimeCardLink } from '../anime/AnimeCardLink';
import { SectionHeader } from '../ui/SectionHeader';
import { ViewAllLink } from '../ui/ViewAllLink';
import { useUniverse } from '../tracking/UniverseProvider';
import { buildUniverseStats } from '@/lib/stats';
import { getAnimeById } from '@/lib/anime';
import { animeHref } from '@/lib/navigation';
import {
  activityVerb,
  getOtherProfiles,
  initialsOf,
  type UserProfile,
} from '@/lib/mockProfile';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProfileViewProps {
  profile: UserProfile;
}

/**
 * Public profile foundation — identity, counts, favourites, recent
 * activity and a statistics preview. No accounts yet; the records
 * are local mock profiles.
 */
export function ProfileView({ profile }: ProfileViewProps) {
  const { items } = useUniverse();
  const stats = buildUniverseStats(items);

  const favorites = profile.favoriteAnimeIds
    .map((id) => getAnimeById(id))
    .filter((anime): anime is NonNullable<typeof anime> => Boolean(anime));

  const otherProfiles = getOtherProfiles(profile.username);

  return (
    <>
      {/* Identity */}
      <section className="relative w-full overflow-hidden grain">
        <div className="absolute inset-0">
          {favorites[0] && (
            <div className="absolute inset-0 animate-hero-drift">
              <Image
                src={favorites[0].backdropImage || favorites[0].posterImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center mask-fade-bottom"
                unoptimized
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F] via-[#090A0F]/85 to-[#090A0F]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-[#090A0F]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASING }}
            className="flex flex-col sm:flex-row sm:items-end gap-7"
          >
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1A1D2A] border-2 border-[#FF2E4D]/40 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <span className="text-3xl sm:text-4xl font-black text-[#FF2E4D]">
                {initialsOf(profile.displayName)}
              </span>
            </div>

            <div className="min-w-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF2E4D]">
                Public Profile
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F8FAFC] leading-[1.05]">
                {profile.displayName}
              </h1>
              <p className="mt-2 font-mono text-sm text-[#38BDF8]">
                @{profile.username}
              </p>
              <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed max-w-xl">
                {profile.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {profile.joinedLabel}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {profile.followers.toLocaleString()} followers
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#090A0F] to-transparent z-[5]" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Counts */}
        <section className="pt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-y border-[#1E293B] divide-x divide-[#1E293B]">
          <ProfileStat label="Titles Tracked" value={String(stats.tracked)} />
          <ProfileStat
            label="Episodes Watched"
            value={String(stats.totalEpisodesWatched)}
            accent="#38BDF8"
          />
          <ProfileStat
            label="Mean Score"
            value={stats.meanScore !== null ? stats.meanScore.toFixed(1) : '—'}
            accent="#FF2E4D"
          />
          <ProfileStat
            label="Following"
            value={String(profile.following)}
            accent="#10B981"
          />
        </section>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left rail */}
          <aside className="lg:col-span-4">
            <h2 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
              About
            </h2>
            <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
              {profile.bio}
            </p>

            <dl className="mt-8 border-t border-[#1E293B]">
              {[
                { label: 'Website', value: profile.website },
                { label: 'Location', value: profile.location },
                { label: 'Joined', value: profile.joinedLabel },
                { label: 'Followers', value: profile.followers.toLocaleString() },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 py-3 border-b border-[#1E293B]"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                    {row.label}
                  </dt>
                  <dd className="text-sm font-semibold text-[#F8FAFC] text-right truncate">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Statistics preview */}
            <div className="mt-12">
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
                Statistics preview
              </h2>
              <ul className="mt-4 border-t border-[#1E293B]">
                {stats.statusBreakdown
                  .filter((slice) => slice.count > 0)
                  .slice(0, 4)
                  .map((slice) => (
                    <li
                      key={slice.status}
                      className="py-3 border-b border-[#1E293B]"
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <span
                          className="font-mono text-[11px] uppercase tracking-[0.2em]"
                          style={{ color: slice.color }}
                        >
                          {slice.status}
                        </span>
                        <span className="font-mono text-[11px] text-[#64748B]">
                          {slice.count}
                        </span>
                      </div>
                      <div className="h-1 bg-[#1E293B] overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${slice.percent}%`,
                            backgroundColor: slice.color,
                          }}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="mt-6">
                <ViewAllLink href="/statistics" label="Full Statistics" />
              </div>
            </div>
          </aside>

          {/* Right column */}
          <div className="lg:col-span-8">
            {/* Favourites */}
            <section>
              <SectionHeader
                kicker="Favourites"
                title={`${profile.displayName}'s favourites`}
                subtitle="Titles this member returns to"
              />
              {favorites.length === 0 ? (
                <p className="text-sm text-[#64748B]">
                  No favourites recorded for this profile.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8">
                  {favorites.map((anime) => (
                    <AnimeCardLink key={anime.id} anime={anime} />
                  ))}
                </div>
              )}
            </section>

            {/* Recent activity */}
            <section className="mt-20">
              <SectionHeader
                kicker="Activity"
                title="Recent activity"
                subtitle="Latest tracking events"
              />
              <ol className="border-t border-[#1E293B]">
                {profile.activity.map((entry) => {
                  const anime = getAnimeById(entry.animeId);

                  return (
                    <li key={entry.id} className="border-b border-[#1E293B]">
                      <div className="flex items-start gap-4 py-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF2E4D] w-20 shrink-0 pt-1">
                          {activityVerb(entry.kind)}
                        </span>
                        <div className="min-w-0 flex-1">
                          {anime ? (
                            <Link
                              href={animeHref(anime.id)}
                              className="text-sm font-semibold text-[#F8FAFC] hover:text-[#FF2E4D] transition-colors duration-200"
                            >
                              {anime.title}
                            </Link>
                          ) : (
                            <p className="text-sm font-semibold text-[#F8FAFC]">
                              {entry.detail}
                            </p>
                          )}
                          <p className="mt-1 font-mono text-[11px] text-[#64748B]">
                            {entry.detail} &bull; {entry.timestamp}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Other members */}
            {otherProfiles.length > 0 && (
              <section className="mt-20">
                <SectionHeader
                  kicker="Archive"
                  title="Other members"
                  subtitle="Profiles in this mock directory"
                />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherProfiles.map((entry) => (
                    <li key={entry.username}>
                      <Link
                        href={`/profile/${entry.username}`}
                        className="group flex items-center gap-4 p-4 bg-[#12141D] border border-[#1E293B] hover:border-[#FF2E4D]/40 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[4px]"
                      >
                        <span className="w-10 h-10 rounded-full bg-[#1A1D2A] border border-[#334155] flex items-center justify-center font-black text-xs text-[#FF2E4D] shrink-0">
                          {initialsOf(entry.displayName)}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200">
                            {entry.displayName}
                          </span>
                          <span className="block font-mono text-[11px] text-[#64748B] truncate">
                            @{entry.username} • {entry.followers.toLocaleString()}{' '}
                            followers
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        <section className="mt-20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#334155]">
          <Star className="w-3.5 h-3.5" />
          Profile foundation — no accounts or authentication in this build
        </section>
      </div>
    </>
  );
}

function ProfileStat({
  label,
  value,
  accent = '#F8FAFC',
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="px-5 sm:px-7 py-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
        {label}
      </p>
      <p
        className="mt-2 text-3xl md:text-4xl font-black tracking-tight"
        style={{ color: accent }}
      >
        {value}
      </p>
    </div>
  );
}