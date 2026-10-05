'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavbarRouted } from './NavbarRouted';
import { MobileNavbarRouted } from './MobileNavbarRouted';
import { FooterRouted } from './FooterRouted';
import { SearchModal } from '../navigation/SearchModal';
import type { AnimeItem } from '@/lib/mockData';

interface SiteShellProps {
  children: React.ReactNode;
}

/**
 * Shared application shell — the navbar, mobile bar and footer
 * persist across every route so only the page body re-renders.
 * Owns the one search overlay opened from the mobile action bar.
 */
export function SiteShell({ children }: SiteShellProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSelectAnime = (anime: AnimeItem) => {
    setIsSearchOpen(false);
    router.push(`/anime/${anime.id}`);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] selection:bg-[#FF2E4D] selection:text-white">
      <NavbarRouted />

      {/* Bottom clearance so the mobile action bar never covers content */}
      <main className="pb-24 md:pb-0">{children}</main>

      <FooterRouted />
      <MobileNavbarRouted onOpenSearch={() => setIsSearchOpen(true)} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAnime={handleSelectAnime}
      />
    </div>
  );
}