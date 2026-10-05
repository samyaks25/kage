'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Settings, User } from 'lucide-react';
import { SearchModal } from '../navigation/SearchModal';
import { SearchTrigger } from '../navigation/SearchTrigger';
import {
  DEFAULT_PROFILE_USERNAME,
  NAV_LINKS,
  isActivePath,
} from '@/lib/navigation';
import type { AnimeItem } from '@/lib/mockData';

/**
 * Routed top navigation. Every destination is a real route â€” no
 * in-page anchors â€” and the active destination is marked with
 * aria-current plus the crimson underline. The header only turns
 * opaque once the page is scrolled.
 */
export function NavbarRouted() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpenPath, setSearchOpenPath] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSearchOpen = searchOpenPath === pathname;

  const openSearch = () => {
    setSearchOpenPath(pathname);
  };

  const closeSearch = () => {
    setSearchOpenPath(null);
  };

  const handleSelectAnime = (anime: AnimeItem) => {
    closeSearch();
    router.push(`/anime/${anime.id}`);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090A0F]/92 backdrop-blur-md border-b border-[#1E293B]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[4.5rem] flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="KAGE home"
            className="flex items-center gap-3 shrink-0 group"
          >
            <span className="w-8 h-8 rounded-[3px] bg-[#FF2E4D] text-white flex items-center justify-center font-black text-base leading-none transition-colors duration-200 group-hover:bg-[#FF4D66]">
              å½±
            </span>
            <span className="text-lg font-black tracking-[0.22em] text-[#F8FAFC]">
              KAGE
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#F8FAFC]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] mr-1.5 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#FF2E4D]'
                        : 'text-[#64748B] group-hover:text-[#FF2E4D]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-[#FF2E4D] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:block">
              <SearchTrigger onSearch={openSearch} />
            </div>

            <button
              type="button"
              onClick={openSearch}
              aria-label="Open search"
              className="sm:hidden w-9 h-9 rounded-[3px] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/settings"
              aria-label="Settings"
              className="hidden sm:flex w-9 h-9 rounded-[3px] items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <Settings className="w-4 h-4" />
            </Link>

            <Link
              href={`/profile/${DEFAULT_PROFILE_USERNAME}`}
              aria-label="Your profile"
              className="w-9 h-9 rounded-full bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <User className="w-4 h-4 text-[#38BDF8]" />
            </Link>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onSelectAnime={handleSelectAnime}
      />
    </>
  );
}
