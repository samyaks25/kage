'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Check, Star } from 'lucide-react';
import { AnimeCardLink } from './AnimeCardLink';
import { NewsCardLink } from '../news/NewsCardLink';
import { TrackingControlPanel } from '../tracking/TrackingControlPanel';
import { useUniverse } from '../tracking/UniverseProvider';
import { SectionHeader } from '../ui/SectionHeader';
import { ViewAllLink } from '../ui/ViewAllLink';
import { getAnimeExtras } from '@/lib/mockAnimeExtras';
import { getRelatedAnime, watchedPercent } from '@/lib/anime';
import { getNewsForAnime } from '@/lib/news';
import { animeHref } from '@/lib/navigation';
import { MOCK_ANIME_LIST } from '@/lib/mockData';
import type { AnimeItem } from '@/lib/mockData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TABS = ['Overview', 'Episodes', 'Characters', 'Statistics'] as const;
type DetailTab = (typeof TABS)[number];

const EPISODE_PREVIEW = 12;

interface AnimeDetailViewProps {
  anime: AnimeItem;
}

/**
 * Full anime detail experience for /anime/[id]. Reads live state
 * from the universe provider so tracking edits made on this page
 * are reflected immediately, falling back to the record passed in.
 */
export function AnimeDetailView({ anime: initialAnime }: AnimeDetailViewProps) {
  const { getAnime, isInUniverse, toggleInUniverse } = useUniverse();
  const [activeTab, setActiveTab] = useState<DetailTab>('Overview');
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const anime = getAnime(initialAnime.id) ?? initialAnime;
  const inUniverse = isInUniverse(anime.id);
  const extras = getAnimeExtras(anime.id);
  const related = getRelatedAnime(anime, MOCK_ANIME_LIST, 4);
  const relatedNews = getNewsForAnime(anime.id);
  const watched = anime.watchedEpisodes || 0;
  const percent = watchedPercent(anime);

  const episodeCount = anime.totalEpisodes;
  const visibleEpisodes = showAllEpisodes
    ? episodeCount
    : Math.min(EPISODE_PREVIEW, episodeCount);

  const statusColor =
    anime.status === 'Airing'
      ? 'text-[#38BDF8]'
      : anime.status === 'Completed'
        ? 'text-[#10B981]'
        : 'text-[#64748B]';

  return (
    <>
      {/* Cinematic backdrop header */}
      <section className="relative w-full overflow-hidden grain">
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-hero-drift">
            <Image
              src={anime.backdropImage || anime.posterImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center mask-fade-bottom"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F] via-[#090A0F]/80 to-[#090A0F]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-[#090A0F]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="flex flex-col sm:flex-row gap-7 sm:gap-9"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
              }}
              className="relative w-36 sm:w-48 aspect-[2/3] rounded-[4px] overflow-hidden bg-[#090A0F] border border-[#334155] shrink-0 shadow-xl"
            >
              <Image
                src={anime.posterImage}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                unoptimized
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
              }}
              className="min-w-0 flex-1"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#38BDF8]">
                {anime.format} &bull; Archive Rank #
                {String(anime.scoreRank ?? 0).padStart(2, '0')}
              </p>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F8FAFC] leading-[1.05]">
                {anime.title}
              </h1>

              <p className="mt-3 font-mono text-sm text-[#94A3B8]">
                {anime.japaneseTitle}
                {anime.englishTitle ? ` — ${anime.englishTitle}` : ''}
              </p>

              <p className="mt-6 font-mono text-xs sm:text-sm tracking-wider text-[#94A3B8]">
                <span className="text-[#38BDF8] font-bold">
                  {anime.rating.toFixed(2)}
                </span>
                <span className="text-[#334155] mx-2.5">&bull;</span>
                {anime.season} {anime.year}
                <span className="text-[#334155] mx-2.5">&bull;</span>
                {anime.totalEpisodes} Episodes
                <span className="text-[#334155] mx-2.5">&bull;</span>
                <span className={statusColor}>{anime.status}</span>
              </p>

              <p className="mt-4 text-[11px] font-mono uppercase tracking-[0.25em] text-[#64748B]">
                {anime.genres.join(' / ')}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleInUniverse(anime.id)}
                  className={`inline-flex items-center h-12 px-7 rounded-[3px] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F] ${
                    inUniverse
                      ? 'bg-[#FF2E4D]/15 text-[#FF2E4D] border border-[#FF2E4D]/40'
                      : 'bg-[#FF2E4D] hover:bg-[#FF4D66] text-white'
                  }`}
                >
                  {inUniverse ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      In Universe
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Universe
                    </>
                  )}
                </button>

                <Link
                  href="/universe"
                  className="inline-flex items-center h-12 px-6 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] text-[#F8FAFC] border border-[#334155] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F]"
                >
                  Open My Universe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#090A0F] to-transparent z-[5]" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tracking, episodes and rating foundation */}
        <section className="pt-14 md:pt-16">
          <SectionHeader
            kicker="Tracking"
            title="Your Progress"
            subtitle="Status, episode count and personal score"
          />
          <TrackingControlPanel anime={anime} />
        </section>

        {/* Detail tabs */}
        <section className="mt-20 md:mt-28">
          <div className="flex gap-6 overflow-x-auto no-scrollbar border-b border-[#1E293B]">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                data-active={activeTab === tab}
                className="tab-editorial shrink-0 pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#64748B] hover:text-[#94A3B8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pt-10">
            {activeTab === 'Overview' && (
              <OverviewTab anime={anime} studioNote={extras.synopsisNote} />
            )}

            {activeTab === 'Episodes' && (
              <EpisodesTab
                anime={anime}
                watched={watched}
                visible={visibleEpisodes}
                showAll={showAllEpisodes}
                onToggleShowAll={() => setShowAllEpisodes((prev) => !prev)}
              />
            )}

            {activeTab === 'Characters' && <CharactersTab anime={anime} />}

            {activeTab === 'Statistics' && (
              <StatisticsTab anime={anime} percent={percent} watched={watched} />
            )}
          </div>
        </section>

        {/* Related titles */}
        {related.length > 0 && (
          <section className="mt-24 md:mt-32">
            <SectionHeader
              kicker="Archive"
              title="Related Titles"
              subtitle="Matched on genre, studio and season"
              action={<ViewAllLink href="/discover" label="Explore All" />}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {related.map((item) => (
                <AnimeCardLink key={item.id} anime={item} />
              ))}
            </div>
          </section>
        )}

        {/* Related news */}
        {relatedNews.length > 0 && (
          <section className="mt-24 md:mt-32">
            <SectionHeader
              kicker="Wire"
              title={`News on ${anime.title}`}
              action={<ViewAllLink href="/news" label="All News" />}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((article) => (
                <NewsCardLink key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function OverviewTab({
  anime,
  studioNote,
}: {
  anime: AnimeItem;
  studioNote: string;
}) {
  const facts: { label: string; value: string }[] = [
    { label: 'Format', value: anime.format },
    { label: 'Episodes', value: String(anime.totalEpisodes) },
    { label: 'Season', value: `${anime.season} ${anime.year}` },
    { label: 'Status', value: anime.status },
    { label: 'Studio', value: anime.studio },
    { label: 'Archive Rank', value: `#${String(anime.scoreRank ?? 0).padStart(2, '0')}` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <div className="lg:col-span-7">
        <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
          Synopsis
        </h3>
        <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          {anime.synopsis}
        </p>
        <p className="mt-6 text-sm text-[#64748B] leading-relaxed italic">
          {studioNote}
        </p>

        <h3 className="mt-12 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
          Genres
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {anime.genres.map((genre) => (
            <li key={genre}>
              <Link
                href={`/discover?genre=${encodeURIComponent(genre)}`}
                className="inline-flex items-center px-2.5 py-1 rounded-[3px] bg-[#1A1D2A] border border-[#1E293B] text-[11px] font-mono uppercase tracking-widest text-[#94A3B8] hover:border-[#FF2E4D] hover:text-[#FF2E4D] transition-colors duration-200"
              >
                {genre}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <aside className="lg:col-span-5">
        <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
          Production
        </h3>
        <dl className="mt-4 border-t border-[#1E293B]">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-4 py-3 border-b border-[#1E293B]"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                {fact.label}
              </dt>
              <dd className="text-sm font-semibold text-[#F8FAFC] text-right">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-12 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
          Staff
        </h3>
        <dl className="mt-4 border-t border-[#1E293B]">
          <ProductionStaffRows anime={anime} />
        </dl>
      </aside>
    </div>
  );
}

function ProductionStaffRows({ anime }: { anime: AnimeItem }) {
  const extras = getAnimeExtras(anime.id);
  const staff = extras.staff.length > 0 ? extras.staff : [{ role: 'Studio', name: anime.studio }];

  return (
    <>
      {staff.map((member) => (
        <div
          key={`${member.role}-${member.name}`}
          className="flex items-baseline justify-between gap-4 py-3 border-b border-[#1E293B]"
        >
          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
            {member.role}
          </dt>
          <dd className="text-sm font-semibold text-[#F8FAFC] text-right">
            {member.name}
          </dd>
        </div>
      ))}
    </>
  );
}

function EpisodesTab({
  anime,
  watched,
  visible,
  showAll,
  onToggleShowAll,
}: {
  anime: AnimeItem;
  watched: number;
  visible: number;
  showAll: boolean;
  onToggleShowAll: () => void;
}) {
  const { setEpisode } = useUniverse();

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-mono text-xs text-[#94A3B8]">
          <span className="text-[#FF2E4D] font-bold text-base">{watched}</span>
          <span className="text-[#64748B]">
            {' '}
            / {anime.totalEpisodes} episodes watched
          </span>
        </p>
        {anime.status === 'Airing' && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#38BDF8]">
            Series airing
          </span>
        )}
      </div>

      <ul className="mt-8 border-t border-[#1E293B]">
        {Array.from({ length: visible }, (_, index) => index + 1).map((number) => {
          const isWatched = number <= watched;
          const isCurrent = number === watched + 1;

          return (
            <li
              key={number}
              className="flex items-center gap-4 sm:gap-6 py-4 border-b border-[#1E293B]"
            >
              <span
                className={`font-mono text-sm w-10 shrink-0 ${
                  isWatched ? 'text-[#10B981]' : 'text-[#64748B]'
                }`}
              >
                {String(number).padStart(2, '0')}
              </span>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-semibold truncate ${
                    isWatched ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'
                  }`}
                >
                  Episode {number}
                  {isCurrent && (
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF2E4D]">
                      Up Next
                    </span>
                  )}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-[#64748B]">
                  {isWatched ? 'Watched' : 'Unwatched'} &bull; 24 min
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setEpisode(anime.id, number - 1)}
                  disabled={watched <= number - 1}
                  aria-label={`Mark episode ${number} as unwatched`}
                  className="px-3 h-9 rounded-[3px] bg-[#12141D] hover:bg-[#1A1D2A] border border-[#1E293B] text-[#94A3B8] text-xs font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                >
                  Unwatched
                </button>
                <button
                  type="button"
                  onClick={() => setEpisode(anime.id, number)}
                  disabled={watched >= number}
                  aria-label={`Mark episode ${number} as watched`}
                  className="px-3 h-9 rounded-[3px] bg-[#FF2E4D]/15 hover:bg-[#FF2E4D]/25 border border-[#FF2E4D]/40 text-[#FF2E4D] text-xs font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
                >
                  Watched
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {anime.totalEpisodes > visible && !showAll && (
        <button
          type="button"
          onClick={onToggleShowAll}
          className="mt-8 w-full h-12 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
        >
          Show all {anime.totalEpisodes} episodes
        </button>
      )}
    </div>
  );
}

function CharactersTab({ anime }: { anime: AnimeItem }) {
  const extras = getAnimeExtras(anime.id);

  if (extras.characters.length === 0) {
    return (
      <p className="text-sm text-[#94A3B8] leading-relaxed">
        Cast records for {anime.title} are not archived yet.
      </p>
    );
  }

  return (
    <ul className="border-t border-[#1E293B]">
      {extras.characters.map((character, index) => (
        <li
          key={character.name}
          className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 border-b border-[#1E293B]"
        >
          <span className="ghost-num font-mono text-2xl font-black select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold text-[#F8FAFC] truncate">
              {character.name}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#38BDF8]">
              {character.role}
            </p>
          </div>
          <p className="col-start-2 sm:col-start-3 font-mono text-[11px] text-[#64748B]">
            {character.voiceActor}
          </p>
        </li>
      ))}
    </ul>
  );
}

function StatisticsTab({
  anime,
  percent,
  watched,
}: {
  anime: AnimeItem;
  percent: number;
  watched: number;
}) {
  const metrics = [
    { label: 'Community Score', value: anime.rating.toFixed(2), accent: '#38BDF8' },
    {
      label: 'Your Score',
      value: anime.userRating != null ? String(anime.userRating) : '—',
      accent: '#FF2E4D',
    },
    { label: 'Your Progress', value: `${percent}%`, accent: '#FF2E4D' },
    { label: 'Episodes Watched', value: `${watched}/${anime.totalEpisodes}`, accent: '#F8FAFC' },
    { label: 'Trending Rank', value: `#${String(anime.trendingRank ?? 0).padStart(2, '0')}`, accent: '#F8FAFC' },
    { label: 'Archive Rank', value: `#${String(anime.scoreRank ?? 0).padStart(2, '0')}`, accent: '#F8FAFC' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 border-y border-[#1E293B] divide-x divide-[#1E293B]">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-5 sm:px-7 py-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
              {metric.label}
            </p>
            <p
              className="mt-2 text-3xl font-black tracking-tight"
              style={{ color: metric.accent }}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
            <Star className="w-3.5 h-3.5 text-[#38BDF8]" />
            Score position
          </h3>
          <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
            {anime.title} sits at{' '}
            <span className="text-[#38BDF8] font-bold">
              {anime.rating.toFixed(2)}
            </span>{' '}
            in the KAGE archive, ranked{' '}
            <span className="text-[#F8FAFC] font-semibold">
              #{String(anime.scoreRank ?? 0).padStart(2, '0')}
            </span>{' '}
            overall and #{String(anime.trendingRank ?? 0).padStart(2, '0')} in
            the current trending chart.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
            Share the title
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={animeHref(anime.id)}
              className="inline-flex items-center h-11 px-5 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              Permalink
            </Link>
            <Link
              href="/rankings"
              className="inline-flex items-center h-11 px-5 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              See rankings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}