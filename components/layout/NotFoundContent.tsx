import React from 'react';
import Link from 'next/link';

interface NotFoundContentProps {
  code?: string;
  title: string;
  description: string;
}

const RECOVERY_LINKS = [
  { label: 'Discover', href: '/discover' },
  { label: 'Seasonal', href: '/seasonal' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'News', href: '/news' },
  { label: 'My Universe', href: '/universe' },
];

/**
 * Shared 404 body — used by both the site group boundary and the
 * root boundary so unmatched URLs keep the KAGE identity.
 */
export function NotFoundContent({
  code = '404',
  title,
  description,
}: NotFoundContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 md:pb-32">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF2E4D]">
        Error {code}
      </span>

      <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F8FAFC] max-w-3xl leading-[1.05]">
        {title}
      </h1>

      <p className="mt-6 text-base text-[#94A3B8] leading-relaxed max-w-xl">
        {description}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center h-12 px-7 rounded-[3px] bg-[#FF2E4D] hover:bg-[#FF4D66] text-white text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F]"
        >
          Return Home
        </Link>
        <Link
          href="/discover"
          className="inline-flex items-center h-12 px-7 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] text-[#F8FAFC] border border-[#334155] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F]"
        >
          Browse Discover
        </Link>
      </div>

      <div className="rule mt-14" />

      <nav aria-label="Recovery" className="mt-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {RECOVERY_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[#94A3B8] hover:text-[#FF2E4D] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}