'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { NewsArticle } from '@/lib/mockNewsData';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'featured' | 'standard';
}

/**
 * Editorial news card — image, category tag,
 * headline, excerpt, source and date in mono.
 */
export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  variant = 'standard',
}) => {
  const featured = variant === 'featured';

  return (
    <article className="group flex flex-col h-full">
      <div
        className={`relative rounded-[4px] overflow-hidden bg-[#12141D] ${
          featured ? 'aspect-[16/9]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={article.image}
          alt=""
          fill
          sizes={featured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 640px) 100vw, 33vw'}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          unoptimized
        />
        <span className="absolute top-3 left-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] bg-[#090A0F]/85 text-[#FF2E4D] px-2 py-1 rounded-[3px]">
          {article.category}
        </span>
      </div>

      <div className="mt-4 flex-1 flex flex-col">
        <p className="font-mono text-[10px] text-[#64748B] uppercase tracking-widest">
          {article.publicationDate} &bull; {article.source}
        </p>
        <h3
          className={`mt-2 font-bold leading-snug text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200 line-clamp-2 ${
            featured ? 'text-2xl sm:text-3xl' : 'text-lg'
          }`}
        >
          {article.title}
        </h3>
        {article.subtitle && featured && (
          <p className="mt-2 text-sm font-medium text-[#94A3B8] leading-relaxed">
            {article.subtitle}
          </p>
        )}
        <p
          className={`mt-2 text-sm text-[#94A3B8] leading-relaxed ${
            featured ? 'line-clamp-4' : 'line-clamp-3'
          }`}
        >
          {article.excerpt}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between font-mono text-[10px] text-[#64748B] uppercase tracking-widest">
          <span>{article.readTimeMinutes} min read</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#334155] group-hover:text-[#FF2E4D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>
      </div>
    </article>
  );
};
