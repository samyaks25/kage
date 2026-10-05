'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { NewsCardLink } from './NewsCardLink';
import { EmptyState } from '../ui/EmptyState';
import {
  NEWS_CATEGORIES,
  NEWS_PAGE_SIZE,
  filterNews,
} from '@/lib/news';
import type { NewsArticle, NewsCategory } from '@/lib/mockNewsData';

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface NewsIndexProps {
  articles: NewsArticle[];
  featured: NewsArticle;
}

/**
 * News index — featured wire story, category filters, search and a
 * load-more foundation over the article list.
 */
export function NewsIndex({ articles, featured }: NewsIndexProps) {
  const [category, setCategory] = useState<NewsCategory | null>(null);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(NEWS_PAGE_SIZE);

  const filtered = useMemo(
    () => filterNews(articles, { query, category }),
    [articles, query, category],
  );

  const supporting = useMemo(
    () => filtered.filter((article) => article.id !== featured.id),
    [filtered, featured.id],
  );

  const visible = supporting.slice(0, visibleCount);
  const hasMore = supporting.length > visible.length;
  const showFeatured = !category && !query.trim();

  const resetPaging = (nextCategory: NewsCategory | null) => {
    setCategory(nextCategory);
    setVisibleCount(NEWS_PAGE_SIZE);
  };

  return (
    <>
      {/* Featured story */}
      {showFeatured && (
        <section className="mt-12">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF2E4D] mb-5">
            Featured Story
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            <NewsCardLink article={featured} variant="featured" />
            <aside className="lg:pt-2">
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
                From the desk
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {featured.excerpt}
              </p>
              <dl className="mt-8 border-t border-[#1E293B]">
                {[
                  { label: 'Category', value: featured.category },
                  { label: 'Source', value: featured.source },
                  { label: 'Published', value: featured.publicationDate },
                  { label: 'Read time', value: `${featured.readTimeMinutes} min` },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 py-3 border-b border-[#1E293B]"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-semibold text-[#F8FAFC] text-right">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>
      )}

      {/* Category filters */}
      <section className="mt-16" aria-label="News filters">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <CategoryChip
            label="All Categories"
            active={category === null}
            onClick={() => resetPaging(null)}
          />
          {NEWS_CATEGORIES.map((entry) => (
            <CategoryChip
              key={entry}
              label={entry}
              active={category === entry}
              onClick={() => resetPaging(category === entry ? null : entry)}
            />
          ))}
        </div>

        <div className="mt-5 relative flex items-center px-4 h-12 bg-[#12141D] border border-[#1E293B] focus-within:border-[#FF2E4D]/50 transition-colors duration-200 rounded-[4px] max-w-xl">
          <Search className="w-4 h-4 text-[#94A3B8] shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(NEWS_PAGE_SIZE);
            }}
            placeholder="Search headlines, sources, categories"
            aria-label="Search news"
            className="w-full pl-3 pr-3 bg-transparent text-[#F8FAFC] placeholder-[#64748B] text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear news search"
              className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Latest articles */}
      <section className="mt-12 border-t border-[#1E293B] pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-black tracking-tight text-[#F8FAFC]">
            {showFeatured ? 'Latest Articles' : 'Filtered Articles'}
          </h2>
          <p className="font-mono text-xs text-[#64748B]">
            {supporting.length} {supporting.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title="No articles match"
            description="Try a different category, or clear the search to see the full wire."
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASING }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {visible.map((article) => (
              <NewsCardLink key={article.id} article={article} />
            ))}
          </motion.div>
        )}

        {hasMore && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => count + NEWS_PAGE_SIZE)
              }
              className="w-full sm:w-auto h-12 px-8 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              Load more articles
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#334155]">
              Showing {visible.length} of {supporting.length}
            </p>
          </div>
        )}
      </section>
    </>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 px-4 h-10 rounded-[3px] text-xs font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
        active
          ? 'bg-[#FF2E4D] text-white'
          : 'bg-[#1A1D2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#1E293B]'
      }`}
    >
      {label}
    </button>
  );
}