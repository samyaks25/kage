import {
  MOCK_NEWS_ARTICLES,
  type NewsArticle,
  type NewsCategory,
} from './mockNewsData';

export const NEWS_CATEGORIES: NewsCategory[] = [
  'Announcements',
  'Adaptations',
  'Trailers',
  'Releases',
  'Industry',
  'Events',
  'Games',
  'Manga',
];

export const NEWS_PAGE_SIZE = 6;

export function getAllNews(): NewsArticle[] {
  return [...MOCK_NEWS_ARTICLES];
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return MOCK_NEWS_ARTICLES.find((article) => article.id === slug);
}

export function getFeaturedNews(): NewsArticle | undefined {
  return (
    MOCK_NEWS_ARTICLES.find((article) => article.isFeatured) ??
    MOCK_NEWS_ARTICLES[0]
  );
}

export function getNewsForAnime(animeId: string): NewsArticle[] {
  return MOCK_NEWS_ARTICLES.filter(
    (article) => article.relatedAnimeId === animeId,
  );
}

export function getAllNewsAnimeIds(): string[] {
  return [
    ...new Set(
      MOCK_NEWS_ARTICLES.map((article) => article.relatedAnimeId).filter(
        (id): id is string => Boolean(id),
      ),
    ),
  ];
}

/** Same category first, then anything else — newest wire order wins. */
export function getRelatedNews(
  current: NewsArticle,
  limit = 3,
): NewsArticle[] {
  const others = MOCK_NEWS_ARTICLES.filter(
    (article) => article.id !== current.id,
  );
  return [...others]
    .sort((a, b) => {
      const aScore =
        (a.category === current.category ? 2 : 0) +
        (a.relatedAnimeId && a.relatedAnimeId === current.relatedAnimeId ? 1 : 0);
      const bScore =
        (b.category === current.category ? 2 : 0) +
        (b.relatedAnimeId && b.relatedAnimeId === current.relatedAnimeId ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

export interface NewsFilters {
  query?: string;
  category?: NewsCategory | null;
}

export function filterNews(
  articles: NewsArticle[],
  { query, category }: NewsFilters,
): NewsArticle[] {
  const needle = query?.trim().toLowerCase() ?? '';

  return articles.filter((article) => {
    const matchesCategory = category ? article.category === category : true;
    if (!matchesCategory) return false;
    if (!needle) return true;
    return (
      article.title.toLowerCase().includes(needle) ||
      (article.subtitle?.toLowerCase().includes(needle) ?? false) ||
      article.excerpt.toLowerCase().includes(needle) ||
      article.category.toLowerCase().includes(needle) ||
      article.source.toLowerCase().includes(needle)
    );
  });
}

export function isNewsCategory(value: string | undefined): value is NewsCategory {
  return (
    !!value &&
    (NEWS_CATEGORIES as string[]).includes(value)
  );
}

export function newsCategoryCount(category: NewsCategory): number {
  return MOCK_NEWS_ARTICLES.filter(
    (article) => article.category === category,
  ).length;
}

/**
 * Article bodies are stored as a single block of copy. Split them
 * into readable paragraphs so the article page reads like an
 * editorial long-form layout rather than one wall of text.
 */
export function articleParagraphs(article: NewsArticle): string[] {
  const sentences = article.content
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join(' '));
  }
  return paragraphs.length > 0 ? paragraphs : [article.content];
}