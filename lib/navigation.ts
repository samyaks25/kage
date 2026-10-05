/**
 * KAGE site navigation — single source of truth for every
 * destination in the application. Navbar, mobile bar and footer
 * all read from here so a route is never defined twice.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

/** Mock profile used by the navbar avatar until accounts exist. */
export const DEFAULT_PROFILE_USERNAME = 'sora';

/** Primary editorial navigation (desktop navbar + brand menu). */
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/', description: 'Curated dashboard' },
  { label: 'Discover', href: '/discover', description: 'Search the archive' },
  { label: 'Seasonal', href: '/seasonal', description: 'This season' },
  { label: 'Rankings', href: '/rankings', description: 'Charts & standings' },
  { label: 'News', href: '/news', description: 'Industry wire' },
  { label: 'My Universe', href: '/universe', description: 'Your library' },
];

/** Bottom-bar destinations. Icons are resolved in MobileNavbar. */
export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: 'Discover', href: '/discover' },
  { label: 'Seasonal', href: '/seasonal' },
  { label: 'News', href: '/news' },
  { label: 'Universe', href: '/universe' },
];

export const FOOTER_DISCOVERY_LINKS: NavLink[] = [
  { label: 'Discover', href: '/discover' },
  { label: 'Seasonal', href: '/seasonal' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Latest News', href: '/news' },
];

export const FOOTER_UNIVERSE_LINKS: NavLink[] = [
  { label: 'My Universe', href: '/universe' },
  { label: 'Currently Watching', href: '/universe?status=Watching' },
  { label: 'Statistics', href: '/statistics' },
  { label: 'Public Profile', href: `/profile/${DEFAULT_PROFILE_USERNAME}` },
];

export const FOOTER_PLATFORM_LINKS: NavLink[] = [
  { label: 'Settings', href: '/settings' },
  { label: 'Top Rated', href: '/rankings?tab=highest-rated' },
  { label: 'Archive Index', href: '/discover?sort=score-desc' },
  { label: 'Airing Now', href: '/discover?status=Airing' },
];

export function animeHref(id: string): string {
  return `/anime/${id}`;
}

export function newsHref(slug: string): string {
  return `/news/${slug}`;
}

/**
 * Active-route resolution. `/` only matches exactly so it does not
 * light up on every nested page; every other destination also
 * matches its own sub-routes.
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  const [path] = href.split('?');
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}