'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  CalendarRange,
  Search,
  Newspaper,
  Library,
} from 'lucide-react';
import { MOBILE_NAV_LINKS, isActivePath } from '@/lib/navigation';

interface MobileNavbarRoutedProps {
  onOpenSearch: () => void;
}

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ICONS: Record<string, React.ReactNode> = {
  '/discover': <Compass className="w-5 h-5" />,
  '/seasonal': <CalendarRange className="w-5 h-5" />,
  '/news': <Newspaper className="w-5 h-5" />,
  '/universe': <Library className="w-5 h-5" />,
};

const ITEMS: MobileNavItem[] = MOBILE_NAV_LINKS.map((link) => ({
  label: link.label,
  href: link.href,
  icon: ICONS[link.href] ?? <Compass className="w-5 h-5" />,
}));

/**
 * Routed mobile navigation — purpose-built bottom action bar.
 * Discover and Seasonal lead, a raised search control sits in the
 * centre, News and Universe trail. The search overlay is owned by
 * the site shell; profile access lives in the top navbar.
 */
export function MobileNavbarRouted({ onOpenSearch }: MobileNavbarRoutedProps) {
  const pathname = usePathname();
  const leadingItems = ITEMS.slice(0, 2);
  const trailingItems = ITEMS.slice(2);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#090A0F]/95 backdrop-blur-lg border-t border-[#1E293B]"
      aria-label="Mobile"
    >
      <div
        className="grid grid-cols-5 h-16"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {leadingItems.map((item) => (
          <MobileLink key={item.href} item={item} pathname={pathname} />
        ))}

        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search"
            className="w-11 h-11 -mt-5 rounded-full bg-[#FF2E4D] hover:bg-[#FF4D66] text-white flex items-center justify-center shadow-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F]"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {trailingItems.map((item) => (
          <MobileLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
    </nav>
  );
}

function MobileLink({
  item,
  pathname,
}: {
  item: MobileNavItem;
  pathname: string;
}) {
  const isActive = isActivePath(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className={
        isActive
          ? 'flex flex-col items-center justify-center gap-1.5 text-[#FF2E4D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]'
          : 'flex flex-col items-center justify-center gap-1.5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]'
      }
    >
      {item.icon}
      <span className="text-[9px] font-mono font-medium uppercase tracking-widest">
        {item.label}
      </span>
    </Link>
  );
}