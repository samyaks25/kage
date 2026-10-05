'use client';

import React, { useState, useEffect } from 'react';
import { Search, User } from 'lucide-react';
import { SearchModal } from '../navigation/SearchModal';
import { SearchTrigger } from '../navigation/SearchTrigger';
import { AnimeItem } from '@/lib/mockData';

interface NavbarProps {
  onSelectAnime: (anime: AnimeItem) => void;
}

const NAV_LINKS = [
  { label: 'Discover', href: '#discover' },
  { label: 'Seasonal', href: '#seasonal' },
  { label: 'Rankings', href: '#rankings' },
  { label: 'News', href: '#news' },
  { label: 'My Universe', href: '#my-universe' },
];

export const Navbar: React.FC<NavbarProps> = ({ onSelectAnime }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          {/* Brand */}
          <a
            href="#"
            aria-label="KAGE home"
            className="flex items-center gap-3 shrink-0 group"
          >
            <span className="w-8 h-8 rounded-[3px] bg-[#FF2E4D] text-white flex items-center justify-center font-black text-base leading-none transition-colors duration-200 group-hover:bg-[#FF4D66]">
              影
            </span>
            <span className="text-lg font-black tracking-[0.22em] text-[#F8FAFC]">
              KAGE
            </span>
          </a>

          {/* Editorial navigation */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200"
              >
                <span className="font-mono text-[9px] text-[#64748B] mr-1.5 transition-colors duration-200 group-hover:text-[#FF2E4D]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#FF2E4D] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Expandable search launcher */}
            <div className="hidden sm:block">
              <SearchTrigger onSearch={() => setIsSearchOpen(true)} />
            </div>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="sm:hidden w-9 h-9 rounded-[3px] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Profile Menu Trigger */}
            <button
              aria-label="User profile menu"
              className="w-9 h-9 rounded-full bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <User className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAnime={onSelectAnime}
      />
    </>
  );
};