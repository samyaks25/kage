export type NewsCategory =
  | 'Industry'
  | 'Announcements'
  | 'Adaptations'
  | 'Trailers'
  | 'Releases'
  | 'Events'
  | 'Games'
  | 'Manga';

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  category: NewsCategory;
  source: string;
  publicationDate: string;
  image: string;
  excerpt: string;
  content: string;
  isFeatured?: boolean;
  relatedAnimeId?: string;
  relatedAnimeTitle?: string;
  readTimeMinutes: number;
}

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-solo-leveling-s2-reveal",
    title: "Solo Leveling Season 2 Confirms Worldwide Premiere Date & New Visual Teaser",
    subtitle: "A-1 Pictures unveils key production staff and expanded cast details for the upcoming arc.",
    category: "Announcements",
    source: "KAGE Editorial Wire",
    publicationDate: "Oct 4, 2026",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
    excerpt: "The official committee for Solo Leveling has officially confirmed that Season 2 will launch with a double-episode special featuring enhanced combat sequences directed by Shunsuke Nakashige.",
    content: "Aniplex and A-1 Pictures officially showcased the key poster art and main trailer for Solo Leveling Season 2: Arise from the Shadow. Following the massive global reception of the first season, production staff confirmed that the new season will adapt the Jeju Island arc with unprecedented frame-rate fluidity. Composer Hiroyuki Sawano returns to produce the orchestral soundtrack alongside new vocal tracks.",
    isFeatured: true,
    relatedAnimeId: "solo-leveling",
    relatedAnimeTitle: "Solo Leveling: Season 2",
    readTimeMinutes: 3
  },
  {
    id: "news-frieren-s2-production",
    title: "Madhouse Officially Begins Pre-Production on Frieren: Beyond Journey's End Sequel",
    subtitle: "Director Keiichiro Saito returns to helm the continuation of the award-winning fantasy epic.",
    category: "Adaptations",
    source: "Tokyo Anime Report",
    publicationDate: "Oct 3, 2026",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Following the historic sweep at the 2026 Anime Awards, Studio Madhouse and TOHO Animation have greenlit the next phase of Frieren's journey.",
    content: "Studio Madhouse announced today that pre-production has officially commenced for the continuation of Frieren: Beyond Journey's End. Author Kanehito Yamada and illustrator Tsukasa Abe expressed gratitude to international fans. The upcoming adaptation will cover the Northern Plateau Arc.",
    isFeatured: false,
    relatedAnimeId: "frieren",
    relatedAnimeTitle: "Frieren: Beyond Journey's End",
    readTimeMinutes: 4
  },
  {
    id: "news-bleach-tybw-climax",
    title: "BLEACH: Thousand-Year Blood War Part 3 Reaches Climax in Special 1-Hour Broadcast",
    subtitle: "Studio Pierrot Films reveals key animation cuts for the battle in the Royal Realm.",
    category: "Trailers",
    source: "Anime News Network Digest",
    publicationDate: "Oct 1, 2026",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Tite Kubo oversees expanded anime-original battle scenes featuring the Squad 0 Bankai reveals.",
    content: "Pierrot Films released an extended 90-second promotional video confirming that the final two episodes of BLEACH TYBW Part 3 will air back-to-back as a 1-hour special broadcast. Series author Tite Kubo personally storyboarded additional fight choreography.",
    isFeatured: false,
    relatedAnimeId: "bleach-tybw",
    relatedAnimeTitle: "BLEACH: TYBW Part 3",
    readTimeMinutes: 2
  },
  {
    id: "news-industry-report-2026",
    title: "Global Anime Market Value Crosses $35 Billion as Overseas Licensing Surges",
    subtitle: "The Association of Japanese Animations (AJA) releases its annual industry report.",
    category: "Industry",
    source: "Nikkei Entertainment / AJA",
    publicationDate: "Sep 28, 2026",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Overseas revenue now accounts for more than 54% of total Japanese animation industry income, driven by digital tracking and global theatrical runs.",
    content: "The Association of Japanese Animations published its annual landmark report, documenting record growth in overseas licensing, streaming rights, and merchandise. Digital tracking platforms and editorial community hubs were cited as key catalysts for international engagement.",
    isFeatured: false,
    readTimeMinutes: 5
  },
  {
    id: "news-mappa-stage-2026-event",
    title: "MAPPA Stage 2026 Announced: New Project Teasers for Chainsaw Man & Jujutsu Kaisen",
    subtitle: "The annual showcase event will take place live at Tokyo Garden Theater this November.",
    category: "Events",
    source: "MAPPA Official Press",
    publicationDate: "Sep 25, 2026",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop",
    excerpt: "MAPPA will reveal updates on Chainsaw Man Reze Arc movie and Jujutsu Kaisen Culling Game Arc.",
    content: "Animation studio MAPPA announced that MAPPA STAGE 2026 will be held at Tokyo Garden Theater. Voice cast members for Jujutsu Kaisen, Chainsaw Man, and Hell's Paradise will join live Q&A panels.",
    isFeatured: false,
    relatedAnimeId: "jujutsu-kaisen-s2",
    relatedAnimeTitle: "Jujutsu Kaisen",
    readTimeMinutes: 3
  }
];
