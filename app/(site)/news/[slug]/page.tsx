import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { NewsCardLink } from '@/components/news/NewsCardLink';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ViewAllLink } from '@/components/ui/ViewAllLink';
import {
  articleParagraphs,
  getAllNews,
  getNewsBySlug,
  getRelatedNews,
} from '@/lib/news';
import { animeHref } from '@/lib/navigation';
import { getAnimeById } from '@/lib/anime';

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllNews().map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return { title: 'Article not found — KAGE' };
  }

  return {
    title: `${article.title} | KAGE News`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) notFound();

  const paragraphs = articleParagraphs(article);
  const related = getRelatedNews(article, 3);
  const relatedAnime = article.relatedAnimeId
    ? getAnimeById(article.relatedAnimeId)
    : undefined;

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Masthead */}
      <header className="pt-28 sm:pt-32 md:pt-36 max-w-4xl">
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#64748B] hover:text-[#FF2E4D] transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to News
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] bg-[#090A0F]/85 text-[#FF2E4D] px-2 py-1 rounded-[3px] border border-[#FF2E4D]/30">
            {article.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
            {article.publicationDate}
          </span>
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.06] text-[#F8FAFC]">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="mt-5 text-lg text-[#94A3B8] leading-relaxed">
            {article.subtitle}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-[#64748B]">
          <span>{article.source}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {article.readTimeMinutes} min read
          </span>
        </div>

        <div className="rule mt-10" />
      </header>

      {/* Hero image */}
      <div className="mt-12 relative aspect-[16/9] rounded-[4px] overflow-hidden bg-[#12141D]">
        <Image
          src={article.image}
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Body */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-8">
          <p className="text-lg sm:text-xl text-[#F8FAFC] leading-relaxed font-medium">
            {article.excerpt}
          </p>

          <div className="mt-8 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base text-[#94A3B8] leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#1E293B] flex flex-wrap items-center gap-4">
            <Link
              href="/news"
              className="inline-flex items-center h-11 px-5 rounded-[3px] bg-[#1A1D2A] hover:bg-[#222638] border border-[#334155] text-[#F8FAFC] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              More News
            </Link>
            {relatedAnime && (
              <Link
                href={animeHref(relatedAnime.id)}
                className="inline-flex items-center h-11 px-5 rounded-[3px] bg-[#FF2E4D] hover:bg-[#FF4D66] text-white text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F]"
              >
                View {relatedAnime.title}
              </Link>
            )}
          </div>
        </div>

        {/* Rail */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
              Related anime
            </h2>

            {relatedAnime ? (
              <Link
                href={animeHref(relatedAnime.id)}
                className="group mt-5 block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[4px]"
              >
                <div className="relative aspect-[2/3] max-w-[200px] rounded-[4px] overflow-hidden bg-[#12141D] border border-[#1E293B] group-hover:border-[#FF2E4D]/50 transition-colors duration-300">
                  <Image
                    src={relatedAnime.posterImage}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#F8FAFC] group-hover:text-[#FF2E4D] transition-colors duration-200">
                  {relatedAnime.title}
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#64748B]">
                  {relatedAnime.season} {relatedAnime.year} &bull;{' '}
                  {relatedAnime.format} &bull; Score{' '}
                  {relatedAnime.rating.toFixed(2)}
                </p>
              </Link>
            ) : (
              <p className="mt-5 text-sm text-[#64748B] leading-relaxed">
                This story is not tied to a specific title in the archive.
              </p>
            )}

            <h2 className="mt-12 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
              Wire
            </h2>
            <ul className="mt-4 border-t border-[#1E293B]">
              {getAllNews()
                .filter((entry) => entry.id !== article.id)
                .map((entry) => (
                  <li key={entry.id} className="border-b border-[#1E293B]">
                    <Link
                      href={`/news/${entry.id}`}
                      className="group block py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] rounded-[3px]"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                        {entry.category} &bull; {entry.publicationDate}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-[#94A3B8] group-hover:text-[#FF2E4D] transition-colors duration-200 line-clamp-2">
                        {entry.title}
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-24 md:mt-32">
          <SectionHeader
            kicker="Wire"
            title="More from the archive"
            action={<ViewAllLink href="/news" label="All News" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {related.map((entry) => (
              <NewsCardLink key={entry.id} article={entry} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}