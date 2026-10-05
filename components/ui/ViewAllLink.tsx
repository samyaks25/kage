import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * Section header action — a real routed "View All" link. Used as
 * the `action` slot of the shared SectionHeader so every preview
 * on the homepage points at its dedicated page.
 */
export function ViewAllLink({
  href,
  label = 'View All',
  className = '',
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] hover:text-[#FF2E4D] transition-colors duration-200 ${className}`}
    >
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * Always-visible counterpart for narrow viewports, where the
 * SectionHeader action slot is hidden.
 */
export function ViewAllLinkMobile({
  href,
  label = 'View All',
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="sm:hidden group inline-flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] hover:text-[#FF2E4D] transition-colors duration-200"
    >
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}