import {
  STATUS_COLORS,
  STATUS_ORDER,
} from './anime';
import type { AnimeItem, TrackingStatus } from './mockData';

/** Assumed runtime for one anime episode, in minutes. */
export const EPISODE_MINUTES = 24;

export interface StatusSlice {
  status: TrackingStatus;
  count: number;
  color: string;
  percent: number;
}

export interface BreakdownSlice {
  label: string;
  count: number;
  percent: number;
}

export interface ScoreBucket {
  label: string;
  count: number;
  percent: number;
}

export interface UniverseStats {
  tracked: number;
  totalEpisodesWatched: number;
  totalMinutesWatched: number;
  daysWatched: number;
  meanScore: number | null;
  averageCommunityScore: number;
  completionRate: number;
  statusBreakdown: StatusSlice[];
  genreBreakdown: BreakdownSlice[];
  formatBreakdown: BreakdownSlice[];
  yearBreakdown: BreakdownSlice[];
  studioBreakdown: BreakdownSlice[];
  scoreDistribution: ScoreBucket[];
  topRated: AnimeItem[];
  mostWatched: AnimeItem[];
}

function toBreakdown(
  entries: Map<string, number>,
  total: number,
): BreakdownSlice[] {
  return [...entries.entries()]
    .map(([label, count]) => ({
      label,
      count,
      percent: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function buildScoreDistribution(ratings: number[]): ScoreBucket[] {
  const bands: { label: string; min: number; max: number }[] = [
    { label: '10', min: 9.5, max: 10 },
    { label: '9', min: 8.5, max: 9.49 },
    { label: '8', min: 7.5, max: 8.49 },
    { label: '7', min: 6.5, max: 7.49 },
    { label: '6', min: 5.5, max: 6.49 },
    { label: '5', min: 0, max: 5.49 },
  ];

  return bands.map((band) => {
    const count = ratings.filter(
      (rating) => rating >= band.min && rating <= band.max,
    ).length;
    return {
      label: band.label,
      count,
      percent:
        ratings.length > 0 ? Math.round((count / ratings.length) * 100) : 0,
    };
  });
}

export function buildUniverseStats(items: AnimeItem[]): UniverseStats {
  const tracked = items.filter((item) => item.userStatus);

  const totalEpisodesWatched = tracked.reduce(
    (sum, item) => sum + (item.watchedEpisodes || 0),
    0,
  );
  const totalMinutesWatched = totalEpisodesWatched * EPISODE_MINUTES;

  const personalRatings = tracked
    .map((item) => item.userRating)
    .filter((rating): rating is number => rating !== null && rating !== undefined);

  const meanScore =
    personalRatings.length > 0
      ? personalRatings.reduce((sum, rating) => sum + rating, 0) /
        personalRatings.length
      : null;

  const averageCommunityScore =
    tracked.length > 0
      ? tracked.reduce((sum, item) => sum + item.rating, 0) / tracked.length
      : 0;

  const completed = tracked.filter(
    (item) => item.userStatus === 'Completed',
  ).length;

  const statusBreakdown: StatusSlice[] = STATUS_ORDER.map((status) => {
    const count = tracked.filter((item) => item.userStatus === status).length;
    return {
      status,
      count,
      color: STATUS_COLORS[status],
      percent:
        tracked.length > 0 ? Math.round((count / tracked.length) * 100) : 0,
    };
  });

  const genreCounts = new Map<string, number>();
  for (const item of tracked) {
    for (const genre of item.genres) {
      genreCounts.set(genre, (genreCounts.get(genre) ?? 0) + 1);
    }
  }

  const formatCounts = new Map<string, number>();
  for (const item of tracked) {
    formatCounts.set(item.format, (formatCounts.get(item.format) ?? 0) + 1);
  }

  const yearCounts = new Map<string, number>();
  for (const item of tracked) {
    const label = String(item.year);
    yearCounts.set(label, (yearCounts.get(label) ?? 0) + 1);
  }

  const studioCounts = new Map<string, number>();
  for (const item of tracked) {
    studioCounts.set(item.studio, (studioCounts.get(item.studio) ?? 0) + 1);
  }

  return {
    tracked: tracked.length,
    totalEpisodesWatched,
    totalMinutesWatched,
    daysWatched: totalMinutesWatched / 60 / 24,
    meanScore,
    averageCommunityScore,
    completionRate:
      tracked.length > 0 ? Math.round((completed / tracked.length) * 100) : 0,
    statusBreakdown,
    genreBreakdown: toBreakdown(genreCounts, tracked.length),
    formatBreakdown: toBreakdown(formatCounts, tracked.length),
    yearBreakdown: toBreakdown(yearCounts, tracked.length),
    studioBreakdown: toBreakdown(studioCounts, tracked.length),
    scoreDistribution: buildScoreDistribution(personalRatings),
    topRated: [...tracked]
      .filter(
        (item) => item.userRating !== null && item.userRating !== undefined,
      )
      .sort((a, b) => (b.userRating ?? 0) - (a.userRating ?? 0))
      .slice(0, 5),
    mostWatched: [...tracked]
      .sort((a, b) => (b.watchedEpisodes || 0) - (a.watchedEpisodes || 0))
      .slice(0, 5),
  };
}