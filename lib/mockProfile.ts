import type { AnimeItem } from './mockData';

/**
 * Public profile foundation — mock records only. No accounts,
 * no auth; these exist so /profile/[username] renders a
 * believable destination until the backend lands.
 */

export type ProfileActivityKind =
  | 'started'
  | 'completed'
  | 'rated'
  | 'progress'
  | 'planned';

export interface ProfileActivity {
  id: string;
  kind: ProfileActivityKind;
  animeId: string;
  detail: string;
  timestamp: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  tagline: string;
  bio: string;
  joinedLabel: string;
  location: string;
  website: string;
  followers: number;
  following: number;
  favoriteAnimeIds: string[];
  activity: ProfileActivity[];
}

export const MOCK_PROFILES: UserProfile[] = [
  {
    username: 'sora',
    displayName: 'Sora',
    tagline: 'Archivist — late cour completions, slow burn only.',
    bio: 'I keep a physical notebook for every series I finish and I have opinions about episode 19. Currently on a long Frieren run and a dangerous amount of backlog.',
    joinedLabel: 'Joined March 2024',
    location: 'Sapporo, JP',
    website: 'kage.archive/sora',
    followers: 1284,
    following: 96,
    favoriteAnimeIds: [
      'frieren',
      'attack-on-titan-final',
      'vinland-saga-s2',
      'bleach-tybw',
    ],
    activity: [
      {
        id: 'sora-1',
        kind: 'progress',
        animeId: 'solo-leveling',
        detail: 'Reached episode 8 of 12',
        timestamp: '2 hours ago',
      },
      {
        id: 'sora-2',
        kind: 'completed',
        animeId: 'frieren',
        detail: 'Finished all 28 episodes',
        timestamp: 'Yesterday',
      },
      {
        id: 'sora-3',
        kind: 'rated',
        animeId: 'jujutsu-kaisen-s2',
        detail: 'Rated 9 / 10',
        timestamp: '2 days ago',
      },
      {
        id: 'sora-4',
        kind: 'progress',
        animeId: 'bleach-tybw',
        detail: 'Reached episode 8 of 13',
        timestamp: '3 days ago',
      },
      {
        id: 'sora-5',
        kind: 'started',
        animeId: 'chainsaw-man',
        detail: 'Started Reze Arc',
        timestamp: '4 days ago',
      },
    ],
  },
  {
    username: 'kage-editorial',
    displayName: 'KAGE Editorial',
    tagline: 'The desk that curates the archive.',
    bio: 'Official KAGE desk account. We publish weekly wire summaries, seasonal roundups and score revisions across the archive.',
    joinedLabel: 'Archive founding member',
    location: 'Editorial desk',
    website: 'kage.archive',
    followers: 18400,
    following: 12,
    favoriteAnimeIds: ['frieren', 'jujutsu-kaisen-s2', 'cyberpunk-edgerunners'],
    activity: [
      {
        id: 'editorial-1',
        kind: 'rated',
        animeId: 'cyberpunk-edgerunners',
        detail: 'Published a score revision note',
        timestamp: '5 days ago',
      },
      {
        id: 'editorial-2',
        kind: 'planned',
        animeId: 'fate-heavens-feel',
        detail: 'Queued for spring re-screening',
        timestamp: '1 week ago',
      },
    ],
  },
];

export function getProfile(username: string): UserProfile | undefined {
  return MOCK_PROFILES.find(
    (profile) => profile.username.toLowerCase() === username.toLowerCase(),
  );
}

export function getOtherProfiles(username: string): UserProfile[] {
  return MOCK_PROFILES.filter(
    (profile) => profile.username.toLowerCase() !== username.toLowerCase(),
  );
}

export function getProfileByUsernameList(): string[] {
  return MOCK_PROFILES.map((profile) => profile.username);
}

export function initialsOf(displayName: string): string {
  return displayName
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function activityVerb(kind: ProfileActivityKind): string {
  switch (kind) {
    case 'started':
      return 'Started';
    case 'completed':
      return 'Completed';
    case 'rated':
      return 'Rated';
    case 'progress':
      return 'Progress';
    case 'planned':
      return 'Planned';
    default:
      return 'Updated';
  }
}

export function profileFavorites(
  profile: UserProfile,
  resolve: (id: string) => AnimeItem | undefined,
): AnimeItem[] {
  return profile.favoriteAnimeIds
    .map((id) => resolve(id))
    .filter((item): item is AnimeItem => Boolean(item));
}