'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film, Tv, Star, Clock } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { ViewAllLink, ViewAllLinkMobile } from '../ui/ViewAllLink';
import { NewsCardLink } from '../news/NewsCardLink';
import { AnimeCardLink } from '../anime/AnimeCardLink';
import { useUniverse } from '../tracking/UniverseProvider';
import { animeHref } from '@/lib/navigation';
import { getFeaturedNews, getAllNews } from '@/lib/news';
import { STATUS_COLORS } from '@/lib/anime';
import type { AnimeItem, TrackingStatus } from '@/lib/mockData';
import type { NewsArticle } from '@/lib/mockNewsData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Latest news preview — featured wire story plus two more. */
export function HomeNewsPreview() {
  const articles = getAllNews();
  const featured = getFeaturedNews();
  const lead = articles.find((article) => article.id !== featured?.id);
  const supporting = articles
    .filter(
      (article) =>
        article.id !== featured?.id && article.id !== lead?.id,
    )
    .slice(0, 2);

  if (!featured) return null;

  return (
    <section className="mt-24 md:mt-32">
      <SectionHeader
        index="05"
        kicker="News"
        title="Latest Anime News"
        subtitle="Industry wire, announcements and adaptations"
        action={<ViewAllLink href="/news" label="View All" />}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASING }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      >
        <NewsCardLink article={featured} variant="featured" />
        {lead && <NewsCardLink article={lead} />}
      </motion.div>

      {supporting.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASING, delay: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:mt-8"
        >
          {supporting.map((article) => (
            <NewsCardLink key={article.id} article={article} />
          ))}
        </motion.div>
      )}

      <div className="mt-6">
        <ViewAllLinkMobile href="/news" label="View All" />
      </div>
    </section>
  );
}

/** Discover preview — six curated posters. */
export function HomeDiscoverPreview({ items }: { items: AnimeItem[] }) {
  const discover = items
    .filter((item) => item.isRecommended)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  if (discover.length === 0) return null;

  return (
    <section className="mt-24 md:mt-32">
      <SectionHeader
        index="06"
        kicker="Curated"
        title="Discover For You"
        subtitle="Editorial selections from the archive"
        action={<ViewAllLink href="/discover" label="View All" />}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASING }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8"
      >
        {discover.map((anime) => (
          <AnimeCardLink key={anime.id} anime={anime} />
        ))}
      </motion.div>

      <div className="mt-6">
        <ViewAllLinkMobile href="/discover" label="View All" />
      </div>
    </section>
  );
}

/** Universe snapshot preview — statistics strip plus four entries. */
export function HomeUniversePreview() {
  const { items } = useUniverse();
  const tracked = items.filter((item) => item.userStatus);

  const totalEpisodes = tracked.reduce(
    (sum, item) => sum + (item.watchedEpisodes || 0),
    0,
  );
  const rated = tracked.filter(
    (item) => item.userRating !== null && item.userRating !== undefined,
  );
  const meanScore =
    rated.length > 0
      ? (
          rated.reduce((sum, item) => sum + (item.userRating || 0), 0) /
          rated.length
        ).toFixed(1)
      : '—';
  const daysWatched = ((totalEpisodes * 24) / 60 / 24).toFixed(1);

  const entries = [...tracked]
    .sort(
      (a, b) =>
        (b.watchedEpisodes || 0) - (a.watchedEpisodes || 0) ||
        b.rating - a.rating,
    )
    .slice(0, 4);

  return (
    <section className="mt-24 md:mt-32">
      <SectionHeader
        index="07"
        kicker="My Universe"
        title="Universe Snapshot"
        subtitle="Your tracking activity at a glance"
        action={<ViewAllLink href="/universe" label="View All" />}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASING }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-y border-[#1E293B] divide-x divide-[#1E293B]"
      >
        <Stat icon={<Film className="w-4 h-4" />} value={String(tracked.length)} label="Tracked" />
        <Stat icon={<Tv className="w-4 h-4" />} value={String(totalEpisodes)} label="Episodes Watched" />
        <Stat icon={<Star className="w-4 h-4" />} value={meanScore} label="Mean Score" />
        <Stat icon={<Clock className="w-4 h-4" />} value={`${daysWatched}d`} label="Days Watched" />
      </motion.div>

      <div className="mt-10">
        {entries.map((anime) => {
          const watched = anime.watchedEpisodes || 0;
          const total = anime.totalEpisodes;
          const percent = Math.round((watched / total) * 100);
          const status: TrackingStatus = anime.userStatus || 'Plan to Watch';

          return (
            <div
              key={anime.id}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 border-b border-[#1E293B] rounded-[3px] focus-within:outline-none"
            >
              <div className="relative w-11 h-16 rounded-[3px] overflow-hidden bg-[#12141D] shrink-0">
                <Image
                  src={anime.posterImage}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 truncate">
                  <Link href={animeHref(anime.id)} className="block truncate">
                    {anime.title}
                  </Link>
                </h3>
                <p className="mt-1 font-mono text-[11px] text-[#64748B]">
                  {anime.studio} &bull; {anime.format} &bull;{' '}
                  <span style={{ color: STATUS_COLORS[status] }}>{status}</span>
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-24 h-1 bg-[#1E293B] overflow-hidden rounded-full">
                    <div
                      className="h-full bg-[#FF2E4D] rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#64748B]">
                    {watched}/{total} EPS
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-center justify-end gap-1 font-mono text-xs text-[#38BDF8]">
                  <Star className="w-3 h-3 fill-current" />
                  {anime.rating.toFixed(1)}
                </div>
                {anime.userRating != null && (
                  <div className="font-mono text-xs text-[#FF2E4D]">
                    YOU {anime.userRating}
                  </div>
                )}
              </div>

              <Link
                href={animeHref(anime.id)}
                className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
              >
                <span className="sr-only">{`View details for ${anime.title}`}</span>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <ViewAllLinkMobile href="/universe" label="View All" />
        <ViewAllLink href="/statistics" label="Full Statistics" />
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="px-5 sm:px-7 py-7">
      <div className="flex items-center gap-2 text-[#64748B] mb-2">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>
      <span className="text-3xl md:text-4xl font-black tracking-tight text-[#F8FAFC]">
        {value}
      </span>
    </div>
  );
}

export type { NewsArticle };