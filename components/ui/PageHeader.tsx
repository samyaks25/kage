import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  kicker: string;
  title: string;
  lede?: string;
  meta?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/**
 * Editorial page masthead for interior routes — kicker, strong
 * title, lede, mono metadata and an optional breadcrumb trail.
 * Deliberately not a boxed card.
 */
export function PageHeader({
  kicker,
  title,
  lede,
  meta,
  crumbs,
  children,
}: PageHeaderProps) {
  return (
    <header className="pt-28 sm:pt-32 md:pt-36">
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3 h-3 text-[#334155]" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#FF2E4D] transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-[#94A3B8]">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-px bg-[#FF2E4D]" />
        <span className="text-[11px] font-mono font-semibold tracking-[0.3em] uppercase text-[#FF2E4D]">
          {kicker}
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.03] text-[#F8FAFC] max-w-4xl">
        {title}
      </h1>

      {lede && (
        <p className="mt-6 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
          {lede}
        </p>
      )}

      {meta && (
        <p className="mt-7 font-mono text-xs tracking-wider text-[#64748B]">
          {meta}
        </p>
      )}

      {children && <div className="mt-10">{children}</div>}

      <div className="rule mt-12" />
    </header>
  );
}