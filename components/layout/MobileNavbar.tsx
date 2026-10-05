'use client';

import React from 'react';
import {
  Compass,
  CalendarRange,
  Search,
  Newspaper,
  Library,
} from 'lucide-react';

interface MobileNavbarProps {
  onOpenSearch: () => void;
}

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const LEADING_ITEMS: MobileNavItem[] = [
  {
    label: 'Discover',
    href: '#discover',
    icon: <Compass className="w-5 h-5" />,
  },
  {
    label: 'Seasonal',
    href: '#seasonal',
    icon: <CalendarRange className="w-5 h-5" />,
  },
];

const TRAILING_ITEMS: MobileNavItem[] = [
  {
    label: 'News',
    href: '#news',
    icon: <Newspaper className="w-5 h-5" />,
  },
  {
    label: 'Universe',
    href: '#my-universe',
    icon: <Library className="w-5 h-5" />,
  },
];

/**
 * Mobile navigation — purpose-built bottom action bar.
 * Primary destinations flank a raised search control;
 * profile access lives in the top navbar.
 */
export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  onOpenSearch,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#090A0F]/95 backdrop-blur-lg border-t border-[#1E293B]"
      aria-label="Mobile"
    >
      <div
        className="grid grid-cols-5 h-16"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {LEADING_ITEMS.map((item) => (
          <MobileLink key={item.label} item={item} />
        ))}

        {/* Raised search control */}
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

        {TRAILING_ITEMS.map((item) => (
          <MobileLink key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
};

function MobileLink({ item }: { item: MobileNavItem }) {
  return (
    <a
      href={item.href}
      className="flex flex-col items-center justify-center gap-1.5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
    >
      {item.icon}
      <span className="text-[9px] font-mono font-medium uppercase tracking-widest">
        {item.label}
      </span>
    </a>
  );
}