import {
  MOCK_ANIME_LIST,
  type AnimeItem,
  type TrackingStatus,
} from './mockData';

export const SEASONS: AnimeItem['season'][] = [
  'Winter',
  'Spring',
  'Summer',
  'Fall',
];

export const ANIME_FORMATS: AnimeItem['format'][] = ['TV', 'Movie', 'OVA'];

export const ANIME_STATUSES: AnimeItem['status'][] = [
  'Airing',
  'Completed',
  'Upcoming',
];

export const STATUS_COLORS: Record<TrackingStatus, string> = {
  Watching: '#38BDF8',
  Completed: '#10B981',
  'On Hold': '#F59E0B',
  Dropped: '#EF4444',
  'Plan to Watch': '#94A3B8',
  Rewatching: '#FF2E4D',
};

export const STATUS_ORDER: TrackingStatus[] = [
  'Watching',
  'Completed',
  'On Hold',
  'Dropped',
  'Plan to Watch',
  'Rewatching',
];

export function getAnimeById(id: string): AnimeItem | undefined {
  return MOCK_ANIME_LIST.find((item) => item.id === id);
}

export function getAnimeByIds(ids: string[]): AnimeItem[] {
  return ids
    .map((id) => getAnimeById(id))
    .filter((item): item is AnimeItem => Boolean(item));
}

/** Unique values ordered by archive frequency, then alphabetically. */
function frequencyValues(counts: Map<string, number>): string[] {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([value]) => value);
}

export function getAllGenres(items: AnimeItem[] = MOCK_ANIME_LIST): string[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const genre of item.genres) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }
  return frequencyValues(counts);
}

export function getAllStudios(
  items: AnimeItem[] = MOCK_ANIME_LIST,
): string[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.studio, (counts.get(item.studio) ?? 0) + 1);
  }
  return frequencyValues(counts);
}

export function getAllYears(
  items: AnimeItem[] = MOCK_ANIME_LIST,
): number[] {
  const counts = new Map<number, number>();
  for (const item of items) {
    counts.set(item.year, (counts.get(item.year) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year]) => year);
}

export interface SeasonKey {
  season: AnimeItem['season'];
  year: number;
}

export function seasonKeyOf(item: AnimeItem): SeasonKey {
  return { season: item.season, year: item.year };
}

export function seasonLabel(season: AnimeItem['season'], year: number): string {
  return `${season} ${year}`;
}

export function seasonKeyLabel(key: SeasonKey): string {
  return seasonLabel(key.season, key.year);
}

/**
 * The archive's current season: the season with the most entries,
 * newest year wins ties. Falls back to the first seasonal record.
 */
export function getCurrentSeason(
  items: AnimeItem[] = MOCK_ANIME_LIST,
): SeasonKey {
  const counts = new Map<string, SeasonKey>();
  for (const item of items) {
    const key = `${item.season} ${item.year}`;
    const existing = counts.get(key);
    if (!existing || item.year > existing.year) {
      counts.set(key, { season: item.season, year: item.year });
    }
  }

  const ranked = [...counts.values()].sort((a, b) => {
    const ca = items.filter(
      (i) => i.season === a.season && i.year === a.year,
    ).length;
    const cb = items.filter(
      (i) => i.season === b.season && i.year === b.year,
    ).length;
    return cb - ca || b.year - a.year;
  });

  return ranked[0] ?? { season: 'Winter', year: new Date().getFullYear() };
}

/** Every distinct season present in the archive, newest first. */
export function getAllSeasons(items: AnimeItem[] = MOCK_ANIME_LIST): SeasonKey[] {
  const map = new Map<string, SeasonKey>();
  for (const item of items) {
    map.set(`${item.season} ${item.year}`, {
      season: item.season,
      year: item.year,
    });
  }
  return [...map.values()].sort(
    (a, b) => b.year - a.year || SEASONS.indexOf(a.season) - SEASONS.indexOf(b.season),
  );
}

export function getAnimeForSeason(
  items: AnimeItem[],
  key: SeasonKey,
): AnimeItem[] {
  return items
    .filter((item) => item.season === key.season && item.year === key.year)
    .sort((a, b) => b.rating - a.rating);
}

export function getSeasonalHighlights(
  items: AnimeItem[] = MOCK_ANIME_LIST,
  limit = 4,
): AnimeItem[] {
  const flagged = items.filter((item) => item.isSeasonal);
  const pool = flagged.length > 0 ? flagged : items;
  return [...pool].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getTrending(
  items: AnimeItem[] = MOCK_ANIME_LIST,
  limit?: number,
): AnimeItem[] {
  const ranked = items
    .filter((item) => item.trendingRank)
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0));
  return limit ? ranked.slice(0, limit) : ranked;
}

export function getRecommended(
  items: AnimeItem[] = MOCK_ANIME_LIST,
  limit?: number,
): AnimeItem[] {
  const pool = items.filter((item) => item.isRecommended);
  const ranked = pool.length > 0 ? pool : items;
  const sorted = [...ranked].sort((a, b) => b.rating - a.rating);
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getPopular(
  items: AnimeItem[] = MOCK_ANIME_LIST,
): AnimeItem[] {
  return items
    .filter((item) => item.isPopular)
    .sort((a, b) => b.rating - a.rating);
}

/**
 * Related titles: shared genres dominate, then shared studio,
 * then same season. Falls back to archive order when nothing ties.
 */
export function getRelatedAnime(
  anime: AnimeItem,
  items: AnimeItem[] = MOCK_ANIME_LIST,
  limit = 4,
): AnimeItem[] {
  return items
    .filter((item) => item.id !== anime.id)
    .map((item) => {
      const shared = item.genres.filter((g) => anime.genres.includes(g)).length;
      const sameStudio = item.studio === anime.studio ? 1 : 0;
      const sameSeason =
        item.season === anime.season && item.year === anime.year ? 1 : 0;
      return { item, weight: shared * 3 + sameStudio * 2 + sameSeason };
    })
    .sort((a, b) => b.weight - a.weight || b.item.rating - a.item.rating)
    .slice(0, limit)
    .map(({ item }) => item);
}

export type AnimeSortKey =
  | 'trending'
  | 'score-desc'
  | 'score-asc'
  | 'title'
  | 'year-desc'
  | 'year-asc'
  | 'episodes-desc'
  | 'episodes-asc';

export interface AnimeSortOption {
  value: AnimeSortKey;
  label: string;
}

export const ANIME_SORT_OPTIONS: AnimeSortOption[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'score-desc', label: 'Highest Rated' },
  { value: 'score-asc', label: 'Lowest Rated' },
  { value: 'title', label: 'Title A–Z' },
  { value: 'year-desc', label: 'Newest First' },
  { value: 'year-asc' as AnimeSortKey, label: 'Oldest First' },
  { value: 'episodes-desc', label: 'Most Episodes' },
  { value: 'episodes-asc', label: 'Fewest Episodes' },
];

export const SORT_KEYS: AnimeSortKey[] = [
  'trending',
  'score-desc',
  'score-asc',
  'title',
  'year-desc',
  'year-asc',
  'episodes-desc',
  'episodes-asc',
];

export function isAnimeSortKey(value: string | undefined): value is AnimeSortKey {
  return !!value && (SORT_KEYS as string[]).includes(value);
}

export function sortAnime(
  items: AnimeItem[],
  sort: AnimeSortKey,
): AnimeItem[] {
  const sorted = [...items];
  switch (sort) {
    case 'score-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'score-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    case 'episodes-desc':
      return sorted.sort((a, b) => b.totalEpisodes - a.totalEpisodes);
    case 'episodes-asc':
      return sorted.sort((a, b) => a.totalEpisodes - b.totalEpisodes);
    case 'trending':
    default:
      return sorted.sort(
        (a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99),
      );
  }
}

export function watchedPercent(item: AnimeItem): number {
  if (!item.totalEpisodes) return 0;
  return Math.round(((item.watchedEpisodes || 0) / item.totalEpisodes) * 100);
}

export function formatScore(rating: number, digits = 1): string {
  return rating.toFixed(digits);
}