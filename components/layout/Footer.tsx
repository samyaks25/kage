'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

const DISCOVERY_LINKS = [
  { label: 'Trending Now', href: '#discover' },
  { label: 'Seasonal Highlights', href: '#seasonal' },
  { label: 'Top Rated All-Time', href: '#rankings' },
  { label: 'Latest News', href: '#news' },
];

const UNIVERSE_LINKS = [
  { label: 'Currently Watching', href: '#currently-watching' },
  { label: 'My Universe', href: '#my-universe' },
  { label: 'Episode Progress', href: '#currently-watching' },
  { label: 'My Ratings', href: '#my-universe' },
];

const PLATFORM_LINKS = [
  { label: 'About KAGE', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Metadata Sources', href: '#' },
];

/**
 * Editorial footer — large wordmark, hairline-ruled
 * link columns, mono metadata strip.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 md:mt-32 border-t border-[#1E293B] pb-24 md:pb-10 pt-14 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand statement */}
          <div className="md:col-span-5">
            <p className="text-5xl md:text-6xl font-black tracking-tight text-[#F8FAFC]">
              影 <span className="text-[#FF2E4D]">KAGE</span>
            </p>
            <p className="mt-5 text-sm text-[#64748B] leading-relaxed max-w-sm">
              A neo-noir archive of the animated form. Discover, track,
              rate and organize the series that matter — curated like a
              publication, built like an archive.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>ARCHIVE ONLINE</span>
            </div>
          </div>

          {/* Link columns with hairline rules */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <FooterColumn title="Discovery" links={DISCOVERY_LINKS} />
            <FooterColumn title="My Universe" links={UNIVERSE_LINKS} />
            <FooterColumn title="Platform" links={PLATFORM_LINKS} />
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-[#64748B]">
          <p>&copy; 2026 KAGE (影) — Editorial Anime Archive</p>
          <p className="tracking-[0.2em] uppercase">
            Discover — Track — Rate — Organize — Analyze
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
            Verified Metadata
          </p>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#F8FAFC] border-t border-[#334155] pt-3">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-xs text-[#64748B] hover:text-[#FF2E4D] transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}