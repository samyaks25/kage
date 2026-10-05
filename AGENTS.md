<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes â€” APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` â€” verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KAGE Architecture, Design System & Development Guidelines

KAGE (å½±) is a premium, editorial anime discovery and tracking platform inspired by the functionality of MyAnimeList/AniList, featuring a completely original visual identity. It is designed to feel like an authentic, high-end entertainment streaming product rather than an AI-generated SaaS dashboard.

---

## 1. Visual Direction & Anti-Patterns

### Core Visual Direction
- **Atmosphere**: Premium dark cinematic obsidian interface with high contrast and dark ambient depth.
- **Imagery**: Cinematic anime artwork presentation with editorial layouts and immersive media hero sections.
- **Typography**: Sophisticated font hierarchy with high character display styling and crisp legibility.
- **Color Discipline**: Restrained, targeted use of KAGE Crimson (`#FF2E4D`) and Cyber Azure (`#38BDF8`), anchored in deep slate/obsidian neutrals (`#090A0F`).
- **Composition**: Asymmetrical layouts, deliberate whitespace, distinct section framing, and editorial media hero headers.
- **Motion**: Purposeful, snappy micro-interactions (`150ms-250ms`) using custom easing (`cubic-bezier(0.16, 1, 0.3, 1)`).

### Strict Prohibitions (STRICTLY AVOID)
- âŒ **No generic purple/violet gradient backgrounds** (e.g. `from-purple-900 to-indigo-900`).
- âŒ **No excessive glassmorphism** or opaque blurry frosted cards covering the screen.
- âŒ **No putting every single piece of content into enclosed bordered cards**.
- âŒ **No repetitive, uniform card grids repeated continuously down the page**.
- âŒ **No oversized, meaningless hero headings without hierarchy**.
- âŒ **No random multi-color gradients** on text or borders.
- âŒ **No neon glows or heavy drop shadows** on generic UI elements.
- âŒ **No bubble-like excessive rounded rectangles** (stick to sharp, clean `3px-10px` radii).
- âŒ **No emoji used as UI icons** (use structured SVG icons like Lucide icons).
- âŒ **No generic SaaS/admin dashboard layouts** with sidebars crammed with analytics widgets.
- âŒ **No decorative fluff, random background blurs, or visual noise**.
- âŒ **No visually identical sections repeated down the page**.

---

## 2. Design System Tokens

### Color Palette

| Token Name | CSS Variable | Hex / Value | Usage Description |
| :--- | :--- | :--- | :--- |
| **Background Base** | `--bg-base` | `#090A0F` | Deep obsidian canvas |
| **Surface Low** | `--bg-surface` | `#12141D` | Default section containers & subtle panels |
| **Surface Elevated** | `--bg-surface-elevated` | `#1A1D2A` | Interactive surface, active cards, headers |
| **Surface Overlay** | `--bg-overlay` | `#222638` | Modals, dialogs, popovers, dropdown menus |
| **Primary Accent** | `--accent-primary` | `#FF2E4D` | KAGE Crimson - Call to actions, primary badges |
| **Primary Hover** | `--accent-primary-hover` | `#FF4D66` | Hover state for primary accent |
| **Secondary Accent** | `--accent-secondary` | `#38BDF8` | Cyber Azure - Scores, status indicators, secondary badges |
| **Accent Muted** | `--accent-muted` | `rgba(255, 46, 77, 0.12)` | Subtle highlighted background tints |
| **Primary Text** | `--text-primary` | `#F8FAFC` | Main headings, primary content body |
| **Secondary Text** | `--text-secondary` | `#94A3B8` | Metadata, subtitles, descriptions |
| **Muted Text** | `--text-muted` | `#64748B` | Captions, disabled text, placeholders |
| **Border Subtle** | `--border-subtle` | `#1E293B` | Subtle dividers and section lines |
| **Border Default** | `--border-default` | `#334155` | Default component borders |
| **Border Accent** | `--border-accent` | `rgba(255, 46, 77, 0.4)` | Active/focus state borders |
| **Success State** | `--color-success` | `#10B981` | Completed tracking, positive badges |
| **Warning State** | `--color-warning` | `#F59E0B` | On-hold tracking, warnings |
| **Error State** | `--color-error` | `#EF4444` | Dropped anime, alert banners, form errors |

### Typography Scale

- **Font Family Display & Body**: `Geist`, `Inter`, or `Outfit` sans-serif (High legibility, sharp tracking)
- **Font Family Mono**: `Geist_Mono` (Data, episode counts, scores)
- **Hierarchy Scale**:
  - `text-xs`: `0.75rem` (12px) - Line height: 1.4 - Badges, metadata caps
  - `text-sm`: `0.875rem` (14px) - Line height: 1.5 - Subtitles, secondary buttons
  - `text-base`: `1rem` (16px) - Line height: 1.6 - Body copy, input fields
  - `text-lg`: `1.125rem` (18px) - Line height: 1.5 - Card titles, nav links
  - `text-xl`: `1.25rem` (20px) - Line height: 1.4 - Section headers
  - `text-2xl`: `1.5rem` (24px) - Line height: 1.3 - Sub-hero titles
  - `text-3xl`: `1.875rem` (30px) - Line height: 1.2 - Main section titles
  - `text-4xl`: `2.25rem` (36px) - Line height: 1.15 - Hero titles
  - `text-5xl`: `3rem` (48px) - Line height: 1.1 - Feature hero titles

### Spacing & Border Radius Scale

- **Spacing Scale (4px baseline system)**:
  - `space-1`: `4px`
  - `space-2`: `8px`
  - `space-3`: `12px`
  - `space-4`: `16px`
  - `space-6`: `24px`
  - `space-8`: `32px`
  - `space-12`: `48px`
  - `space-16`: `64px`
- **Border Radius**:
  - `radius-sm`: `3px` (Badges, tags, sharp buttons)
  - `radius-md`: `6px` (Anime posters, input boxes, dropdowns)
  - `radius-lg`: `10px` (Containers, dialog windows, hero banners)
  - `radius-full`: `9999px` (User avatars, circular status indicators only)

### Shadows & Depth System

- **`shadow-sm`**: `0 1px 3px rgba(0, 0, 0, 0.4)`
- **`shadow-md`**: `0 4px 12px rgba(0, 0, 0, 0.6)`
- **`shadow-lg`**: `0 12px 32px rgba(0, 0, 0, 0.8)`
- **`shadow-accent`**: `0 4px 20px rgba(255, 46, 77, 0.25)`

### Animation & Motion Scale

- **Easing Function**: `cubic-bezier(0.16, 1, 0.3, 1)` (Editorial fluid spring motion)
- **Durations**:
  - `duration-fast`: `150ms` (Hovers, button presses, focus states)
  - `duration-normal`: `250ms` (Dropdowns, tabs switching, badge state toggle)
  - `duration-slow`: `400ms` (Modal overlays, drawer slide-ins, hero transitions)

### Responsive Breakpoints

- `sm`: `640px` (Mobile landscape / small tablets)
- `md`: `768px` (Tablets / small laptops)
- `lg`: `1024px` (Desktop)
- `xl`: `1280px` (Wide Desktop)
- `2xl`: `1536px` (Ultra Wide)

---

## 3. Core Component Architecture Blueprint

All components must be strictly modular, typed, and located under `@/components` or `app/_components`.

1. **Navbar**: Top branding, main editorial links (Trending, Seasonal, Top Rated, Library), search launcher, user profile menu. Sticky with smooth background blur transition on scroll.
2. **Mobile Navigation**: Bottom fixed action bar or slide-out overlay designed specifically for thumbs-first mobile UX.
3. **Search**: Fast search input with instant preview results, tag filter chips, clear button, keyboard shortcut (`Ctrl+K`/`Cmd+K`).
4. **AnimeCard**: Cinematic poster ratio (`2:3`), status overlay, score indicator, title, subtle hover zoom/elevation, quick action.
5. **AnimeCarousel**: Touch-enabled horizontal slider for trending anime with prev/next navigational arrows and snapping points.
6. **Hero**: High-impact editorial header featuring anime key art, title overlay, genre tags, synopsis excerpt, "Watch/Track" CTA, and backdrop glow.
7. **SectionHeader**: Clean section title with optional subtitle, category badge, and "View All" link.
8. **Badge**: Categorical indicator (e.g. `Airing`, `Completed`, `Score`, `Studio`, `Genre`) using dark contrast borders and crisp typography.
9. **Button**: Variants: `primary` (KAGE Crimson), `secondary` (Surface Elevated), `outline` (Subtle border), `ghost` (Text only), `danger`. Sizes: `sm`, `md`, `lg`.
10. **Tabs**: Segmented control for switching views (e.g. `Overview`, `Episodes`, `Characters`, `Reviews`, `Stats`).
11. **Dialog**: Accessible backdrop overlay with focus trap, escape key handling, and slide-up modal animation.
12. **Dropdown**: Action popups for status selection (`Watching`, `Plan to Watch`, `Completed`, `Dropped`).
13. **Progress**: Episode progress tracking bar with dual-color fill and animated status transitions.
14. **Rating**: Star rating / score display (1-10 or 1-5 scale) with interactive hover input support.
15. **Skeleton**: Content placeholder loader matching exact layout dimensions of Cards and Hero elements to avoid layout shift.
16. **EmptyState**: Informative UI state when no search results or library entries exist, with action button.
17. **ErrorState**: Diagnostic error display with retry action button.
18. **StatisticsCard**: Numerical breakdown card (Total Anime, Episodes Watched, Mean Score, Days Watched) for user profiles.

---

## 4. UX & Interactive State Rules

Every major feature must explicitly account for all 8 core UI states:
1. **Default**: Clean baseline presentation.
2. **Hover**: Clear visual elevation or highlight (border tint, background shift, subtle scale).
3. **Focus**: Visible accessibility outline (`ring-2 ring-[var(--accent-primary)] outline-none`).
4. **Active**: Press effect (`scale-[0.98]` or active fill).
5. **Disabled**: Reduced opacity (`opacity-50 pointer-events-none`).
6. **Loading**: Non-blocking skeleton loader or inline spinner.
7. **Empty**: Contextual explanation and action when data is absent.
8. **Error**: Inline error messaging and recovery prompt.
9. **Mobile**: Layout adaptation tailored to touch interaction.

---

## 5. Accessibility & Motion Rules

- **Keyboard Navigation**: Full keyboard accessibility (`Tab`, `Enter`, `Space`, `Escape`, Arrow keys).
- **Focus Rings**: Never remove outline without providing a high-contrast custom ring focus indicator (`ring-2 ring-[#FF2E4D]`).
- **Contrast**: Text elements must meet WCAG AA contrast against dark surfaces (`#F8FAFC` on `#090A0F` / `#12141D`).
- **Semantic HTML**: Mandatory `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<button>`, `<h1>`-`<h6>`.
- **Accessible Labels**: Every input, interactive control, and icon button must have `aria-label` or explicit text content.
- **Motion Philosophy**: Motion must strictly improve navigation, feedback, hierarchy, transitions, or discovery. Avoid animation that exists purely for decoration.

---

## 6. Responsive Design Principles

- Design desktop and mobile intentionally. Do not simply shrink desktop layouts for mobile.
- Use responsive touch targets (minimum `44px` height/width for buttons and controls on touch devices).
- Hide secondary desktop metadata on mobile while maintaining access via drawers or modal popups.
- Mobile navigation uses bottom action bars or dedicated hamburger drawers.

---

## 7. Code Quality & Standards

- **TypeScript throughout**: Strict interfaces and types for every component prop and data model. No `any`.
- **Reusable components**: Avoid giant monolithic page components or code duplication.
- **Dependencies**: Do not install additional libraries without checking whether an existing dependency can solve the problem.
- **Next.js Conventions**: Maintain Next.js App Router conventions and file structure.
