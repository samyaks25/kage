'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import {
  MOCK_ANIME_LIST,
  type AnimeItem,
  type TrackingStatus,
} from '@/lib/mockData';

export const ALL_STATUSES: TrackingStatus[] = [
  'Watching',
  'Completed',
  'On Hold',
  'Dropped',
  'Plan to Watch',
  'Rewatching',
];

interface UniverseContextValue {
  items: AnimeItem[];
  getAnime: (id: string) => AnimeItem | undefined;
  isInUniverse: (id: string) => boolean;
  toggleInUniverse: (id: string) => void;
  setStatus: (id: string, status: TrackingStatus) => void;
  setEpisode: (id: string, episode: number) => void;
  incrementEpisode: (id: string) => void;
  decrementEpisode: (id: string) => void;
  setRating: (id: string, rating: number | null) => void;
}

const UniverseContext = createContext<UniverseContextValue | null>(null);

/**
 * UniverseProvider — local/mock tracking state.
 * Replace with backend sync (Supabase/AniList) later; the interface
 * stays identical so components never need to change.
 */
export function UniverseProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<AnimeItem[]>(MOCK_ANIME_LIST);

  const [universeIds, setUniverseIds] = useState<Set<string>>(
    () =>
      new Set(
        MOCK_ANIME_LIST.filter((item) => item.userStatus || item.isCurrentlyWatching).map(
          (item) => item.id,
        ),
      ),
  );

  const updateItem = useCallback(
    (id: string, updater: (item: AnimeItem) => AnimeItem) => {
      setItems((prev) => prev.map((item) => (item.id === id ? updater(item) : item)));
    },
    [],
  );

  const getAnime = useCallback(
    (id: string) => items.find((item) => item.id === id),
    [items],
  );

  const isInUniverse = useCallback((id: string) => universeIds.has(id), [universeIds]);

  const toggleInUniverse = useCallback((id: string) => {
    setUniverseIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

   const setStatus = useCallback(
     (id: string, status: TrackingStatus) => {
       updateItem(id, (item) => {
         let watched = item.watchedEpisodes || 0;
         if (status === 'Completed') {
           // Only update episode count if totalEpisodes is a known, valid integer > 0
           if (Number.isInteger(item.totalEpisodes) && item.totalEpisodes > 0) {
             watched = item.totalEpisodes;
           }
           // If totalEpisodes is unknown, invalid, or <=0, preserve existing watchedEpisodes
         }
         if (
           (status === 'Watching' || status === 'Rewatching') &&
           watched === 0
         ) {
           watched = 1;
         }
         return {
           ...item,
           userStatus: status,
           watchedEpisodes: watched,
           isCurrentlyWatching: status === 'Watching' || status === 'Rewatching',
           lastUpdatedTime: 'Just now',
         };
       });
     },
     [updateItem],
   );

  const setEpisode = useCallback(
    (id: string, episode: number) => {
      updateItem(id, (item) => {
        const total = item.totalEpisodes;
        const clamped = Math.max(0, Math.min(episode, total));
        let status: TrackingStatus = item.userStatus || 'Plan to Watch';
        // Currently-airing handling: reaching the latest known episode
        // keeps the series in "Watching" instead of forcing completion.
        if (clamped >= total && item.status !== 'Airing') {
          status = 'Completed';
        } else if (clamped > 0 && (status === 'Plan to Watch' || status === 'Dropped')) {
          status = 'Watching';
        } else if (clamped < total && status === 'Completed') {
          status = 'Watching';
        }
        return {
          ...item,
          watchedEpisodes: clamped,
          userStatus: status,
          isCurrentlyWatching: status === 'Watching' || status === 'Rewatching',
          lastUpdatedTime: 'Just now',
        };
      });
    },
    [updateItem],
  );

  const incrementEpisode = useCallback(
    (id: string) => {
      const item = items.find((entry) => entry.id === id);
      if (!item) return;
      setEpisode(id, (item.watchedEpisodes || 0) + 1);
    },
    [items, setEpisode],
  );

  const decrementEpisode = useCallback(
    (id: string) => {
      const item = items.find((entry) => entry.id === id);
      if (!item) return;
      setEpisode(id, (item.watchedEpisodes || 0) - 1);
    },
    [items, setEpisode],
  );

  const setRating = useCallback(
    (id: string, rating: number | null) => {
      updateItem(id, (item) => ({ ...item, userRating: rating }));
    },
    [updateItem],
  );

  const value = useMemo<UniverseContextValue>(
    () => ({
      items,
      getAnime,
      isInUniverse,
      toggleInUniverse,
      setStatus,
      setEpisode,
      incrementEpisode,
      decrementEpisode,
      setRating,
    }),
    [
      items,
      getAnime,
      isInUniverse,
      toggleInUniverse,
      setStatus,
      setEpisode,
      incrementEpisode,
      decrementEpisode,
      setRating,
    ],
  );

  return (
    <UniverseContext.Provider value={value}>
      {children}
    </UniverseContext.Provider>
  );
}

export function useUniverse(): UniverseContextValue {
  const ctx = useContext(UniverseContext);
  if (!ctx) {
    throw new Error('useUniverse must be used within <UniverseProvider>');
  }
  return ctx;
}
