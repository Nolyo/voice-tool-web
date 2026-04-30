# Voice Tool Web — Overhaul for v3.0 Public Launch

- **Date**: 2026-04-30
- **Author**: Nolyo (with Claude Code)
- **Status**: Draft, pending implementation plan
- **Related**: voice-tool desktop app (`C:\Users\nolyo\www\voice-tool`) — first public release v3.0

---

## 1. Context

The website at `C:\Users\nolyo\www\voice-tool-web` is the marketing site for the Voice Tool desktop application. Its current state is a proof of concept: outdated copy (claims version 2.1 while the soft is at 2.10.1 and heading to 3.0), six generic feature cards that miss most of what the application actually does today, dead anchor links (`#docs`, `#privacy`, `#terms`, `Voir la démo` button), and a `<StatsSection>` containing fabricated metrics ("98% précision").

Voice Tool 3.0 will be the **first public release** of the software. The user plans an advertising campaign on social networks at launch; the website is the destination for that paid traffic and must convert it into downloads.

This document captures the design for a full overhaul. A separate implementation plan will follow.

## 2. Goals

- Convert paid social traffic into downloads at v3.0 launch.
- Honestly represent the v3.0 software's depth (transcription, post-process AI, notes/knowledge base, profiles, account/sync, multi-providers, local GPU).
- Position the freemium model clearly: free local + free cloud sync, paid Voice Tool first-party AI services.
- Establish a solid, opinionated technical foundation that lets future content additions (docs, blog, more pages) be cheap.
- Be ready before the user's first-party AI services and notes sync ship; launch publicly **at the same time** they do.

## 3. Non-goals

- Documentation site (`/docs`). Deferred — the software evolves too fast and rewriting docs is wasted effort right now.
- Account creation on the web. Registration happens in-app only; the marketing site never has a signup form.
- Web-based pricing/billing/checkout flows. Out of scope for the marketing site.
- Hero video at launch. Deferred to a v1.1 update once user feedback identifies a specific use case worth filming.
- Localizations beyond French and English. Add others when traffic justifies it.
- Mobile/tablet companion apps for Voice Tool itself.

## 4. Target audience

Mixed positioning. The site speaks to all three personas without picking one:

- **Mainstream French/English speakers** (writers, freelancers, consultants, students) who want hands-free dictation that "just works" → home page hero and "How it works" section.
- **Developers and power users** who value local GPU transcription, multi-provider choice, hotkeys, open source → features page deep dives, technical features pillar.
- **Knowledge workers** (researchers, journalists, devs taking notes) who see Voice Tool as a voice-driven second brain → notes / backlinks / profiles features pillars.

The home page leads broad and accessible; the features page goes wide and deep so each persona finds its page-of-truth.

## 5. Sitemap & scope

```
/                       Home — refonte complète
/features               Features détaillées avec captures et GIFs
/download               Téléchargement multi-plateforme (existant, polish)
/pricing                Free vs. Pro (grille tarifaire à finaliser)
/legal/privacy          RGPD-compliant
/legal/terms            Conditions d'utilisation
```

All routes localized FR + EN under `[locale]`. No `/changelog` page (footer link to GitHub releases is enough). No `/docs` page (deferred). No dedicated `/demo` page (demo content lives within `/` and `/features`).

## 6. High-level approach: structural refactor first

Three sequential phases. Each phase ends with a clear deliverable and the next does not start until the previous is validated.

### Phase A — Technical foundations (~1 to 1.5 weeks)

No public pages change during this phase. The goal is to build the tooling that makes Phase B fast.

1. **Design system integration** — receive tokens + reference HTML/CSS components + animation references from the user (delivered separately via "Claude Design"); plug tokens into Tailwind v4 `@theme` and CSS variables in `app/globals.css`; transpose reference components into React + Tailwind under `components/ui/` and `components/distinctive/`.
2. **Layout primitives** — `<Section>`, `<Container>`, `<FeatureGrid>`, `<MediaWithCaption>`, `<CTABand>`. These let Phase B compose pages without duplication.
3. **i18n discipline** — strict typing on translation keys, namespaces per page (`home.*`, `features.*`, `pricing.*`, `legal.*`, etc.), revue of `next-intl` setup.
4. **SEO infrastructure** — `lib/metadata.ts` helper for `generateMetadata`; dynamic `app/sitemap.ts`; `app/robots.ts`; per-route `app/opengraph-image.tsx` generation via `next/og` (verify Node-runtime compat).
5. **Analytics** — Plausible integration (privacy-friendly, no cookies, RGPD-compliant); thin wrapper in `lib/analytics.ts` for `track()` calls.
6. **`useReleases` polish** — fallback when GitHub fetch fails (link to GitHub releases page); expose SHA256 in UI with copy-to-clipboard; expose previous-versions list (collapsed by default).
7. **Dockerfile** for Dokploy deployment with Next.js `output: 'standalone'`.

**Deliverable**: zero new pages, but the next phase composes 3× faster.

### Phase B — Pages (~2 to 3 weeks)

Compose the five pages using Phase A primitives.

- `/` — refonte complète with animated waveform hero
- `/features` — new, detailed, with GIFs
- `/download` — polish + SHA256 + previous versions
- `/pricing` — new (numbers TBD until user finalizes)
- `/legal/privacy` + `/legal/terms` — new (legal review required)

**Deliverable**: complete site available on a preview URL, ready for user review and external relectures (legal, copy).

### Phase C — Polish & launch (~1 week)

- Lighthouse CI: Performance, Accessibility, SEO each > 95 on every page.
- Cross-browser testing (Chrome, Firefox, Safari, Edge) and mobile (iOS Safari, Android Chrome).
- Dark/light mode verification on every page.
- Capture all final GIFs/screenshots from the latest soft build.
- Plausible event tracking validation.
- Pricing page final numbers filled in.
- Legal text final version after lawyer review.
- Public deployment **synchronized** with the v3.0 release of voice-tool (binaries + `releases.json` published) and with the readiness of Voice Tool's first-party transcription and post-process services + notes sync backend.

**Deliverable**: public site launched, ready for advertising traffic.

## 7. Page blueprints

### 7.1 Home (`/`)

Sections in scroll order:

1. **Hero** — badge ("Voice Tool v3.0 disponible"), 2-line title, single-sentence subtitle clarifying the multi-target promise, primary CTA `[Télécharger pour Windows]` + secondary `[Voir les fonctionnalités]`, distinctive animated waveform + animated caret typing an example sentence, three short reassurance tags ("Open source · Gratuit en local · Windows").
2. **How it works** — three steps: "Press your shortcut", "Speak", "Text appears in your active app". Highly visual, tiny GIF per step.
3. **Who it's for** — three persona cards (writing fast / devs & power users / second brain), each linking to the relevant features section.
4. **Flagship features** — 3-4 features that differentiate (local GPU transcription, post-process AI, interconnected notes, profiles). Title + one sentence + GIF/screenshot. Link to `/features`.
5. **Local or cloud** — two side-by-side columns presenting Free Local vs. Pro Cloud honestly (no marketing fluff). CTA to `/pricing`.
6. **Final CTA** — variation on download CTA with distinctive visual. GitHub link beside.
7. **Footer** — current footer with all dead links replaced by live ones.

The current `<StatsSection>` (98%, 100%, etc.) is **removed**. If real stats become useful later (download count, language count, contributors), they can be reintroduced with truthful values.

### 7.2 Features (`/features`)

Short header with sticky in-page navigation (anchors per section). Sections by category, each with deep-link anchor:

1. **Recording & transcription** — providers (OpenAI, Deepgram, Groq, Google), local Whisper Vulkan/CPU, silence detection, hotkeys (toggle/PTT/cancel), mini floating waveform window, supported languages, translation mode.
2. **Post-process AI** — modes (auto, email, formal, casual, list, summary, grammar, custom), provider choice, cost tracking display.
3. **Notes & second brain** — TipTap rich editor, @-mentions, backlinks, task lists, code blocks, images, pinned transcriptions.
4. **Profiles (Perso/Pro)** — separate settings/notes/history per profile, instant switching, per-profile hotkeys.
5. **Account & sync** — created in-app, 2FA, free notes sync, multi-device, account deletion.
6. **System & UX** — system tray, auto-start, deep links, signed updates, light/dark themes, FR/EN.

Each feature: name + 1-2 sentences + short annotated screenshot or GIF. Footer CTA to `/download`.

### 7.3 Download (`/download`)

Existing code is well-structured. Refresh + additions:

- Visual update to match the new design system.
- SHA256 displayed per installer, with copy-to-clipboard.
- Collapsible "Previous versions" section (last 5), with a link to GitHub releases for the full list.
- Explicit "System requirements" section (Windows 10+, x64, disk space, optional GPU for Whisper Vulkan).
- Three-step installation guide rewritten for v3.0 — step 3 is no longer "configure your OpenAI key" but "sign in (optional) or use the local mode".

### 7.4 Pricing (`/pricing`)

- Short hero: "Free local forever. Pro to go further."
- Two plan cards side-by-side: Free (full local capabilities, free notes sync, profiles), Pro (cloud transcription + post-process, paid). Numbers and structure TBD by user.
- Detailed feature-by-feature comparison table below the cards.
- FAQ: cost per transcribed hour, cancellation, data location, plan switching, BYO API key transition for existing users.
- CTA `[Télécharger Voice Tool →]` (reminder: signup happens in-app).

### 7.5 Legal (`/legal/privacy` and `/legal/terms`)

Plain readable, no fancy design. Content lives in `content/legal/{privacy,terms}.{fr,en}.mdx` for easy edits without touching components.

- **Privacy**: data collected (Supabase account, audio/transcriptions processed by third parties, synced notes, device fingerprint), legal bases, retention period, user rights, DPO contact, cookies (Plausible = cookieless, helps), non-EU transfers if applicable.
- **Terms**: acceptable use, ownership (user owns notes and transcriptions), liability limitations, termination, jurisdiction.

These are starting drafts; user must have them reviewed by a lawyer (e.g., Captain Contrat) before public launch. Sections requiring legal validation are flagged inline in the MDX.

## 8. Technical architecture

### 8.1 File organization

```
app/
  [locale]/
    page.tsx
    features/page.tsx
    download/page.tsx          # exists, refonte
    pricing/page.tsx
    legal/
      privacy/page.tsx
      terms/page.tsx
    layout.tsx
  globals.css                  # design tokens + Tailwind v4 @theme
  opengraph-image.tsx          # dynamic OG per route
  robots.ts
  sitemap.ts

components/
  ui/                          # shadcn-style primitives
  layout/                      # Section, Container, FeatureGrid, MediaWithCaption, CTABand, Header, Footer
  distinctive/                 # WaveformAnimated, MicPulse, AnimatedCaret (from Claude Design)
  sections/                    # Composed page sections (HeroHome, FeaturePillars, PricingPlans, …)

content/
  legal/
    privacy.fr.mdx
    privacy.en.mdx
    terms.fr.mdx
    terms.en.mdx

messages/
  en.json                      # i18n by namespace
  fr.json

hooks/
  use-releases.ts              # exists, polish

lib/
  metadata.ts                  # generateMetadata helper
  analytics.ts                 # Plausible wrapper
  features-data.ts             # typed structure for /features content
  releases-types.ts

types/
  releases.ts                  # exists
```

### 8.2 Content layer

- **`messages/{en,fr}.json`** — all short structured copy (titles, labels, CTAs, feature lists). Edit copy without touching TSX.
- **`content/legal/*.mdx`** — long-form prose (legal). Markdown with optional component support. Future docs/blog can live alongside.
- **`lib/features-data.ts`** — typed structured data for the `/features` page (categories, items, icons, GIF paths) with localized strings pulled from `messages/*.json`. MDX is wrong for this case because the structure is tightly coupled to the design.

### 8.3 Dynamic data: `releases.json`

Source: `https://raw.githubusercontent.com/Nolyo/voice-tool/main/docs/releases.json`. The `useReleases` hook fetches client-side, caches 15 minutes in `localStorage`. Three changes:

1. Graceful fallback — when fetch fails, render `<DownloadFallback />` pointing to GitHub releases.
2. SHA256 display with copy-to-clipboard (data already in JSON).
3. Previous versions list (collapsed) from existing `releases[]` array.

No Server Actions (forbidden by project `CLAUDE.md`). The hook stays client-side.

### 8.4 SEO

- `lib/metadata.ts` exposes `buildMetadata({ namespace, route, locale })` returning a `Metadata` object with title, description, OG tags, canonical URL. Each page's `generateMetadata` calls it.
- `app/sitemap.ts` generates a sitemap covering all routes × locales, with `lastmod` reflecting build time.
- `app/robots.ts` returns `Allow: /` and references the sitemap.
- `app/opengraph-image.tsx` (and per-route variants) generate OG images at runtime via `next/og`. Verify Node-runtime compatibility in Phase A.
- `SoftwareApplication` JSON-LD schema is injected into `<head>` on the home page.

### 8.5 Analytics

- Plausible. Self-hosted-friendly, cookieless, RGPD-OK out of the box.
- `lib/analytics.ts` is a thin wrapper exposing `track(event, props?)`.
- Tracked events: pageviews (auto), `download_click` with `{ platform, version }`, `github_click`, `pricing_view` (when section enters viewport on home), `cta_features_click`. Pageview-only is enough for v1.0; events are nice-to-have.
- No form tracking (no forms on the site).

### 8.6 Error handling

- Releases fetch fails → `<DownloadFallback />` with link to GitHub releases.
- A platform has no installers → its card is hidden (already handled).
- Locale not in `routing.locales` → `notFound()` (already handled in `[locale]/layout.tsx`).
- MDX file missing → Next.js default 404.
- No global error toaster — this is a marketing site, not an app.

### 8.7 Testing

- **No unit tests** on components (overkill for a 5-page marketing site).
- **Lighthouse CI** in GitHub Action: blocks merge if Performance/Accessibility/SEO drop below 95.
- **Smoke e2e test** with Playwright (one test): visits each route in FR + EN, asserts 200 + key element present. No behavior tests.
- **Manual launch checklist** at `docs/launch-checklist.md` for Phase C: cross-browser, mobile, dark/light, FR/EN, OG previews on Twitter/LinkedIn/Slack debug tools.

## 9. Deployment

### 9.1 Hosting

**Dokploy on the user's personal server** (already in place). Next.js builds with `output: 'standalone'`; a multi-stage Dockerfile produces a small runner image; Dokploy detects the Dockerfile and serves through Traefik (TLS auto).

### 9.2 Domain

`TBD` — the user is doing a separate brand/identity brainstorm before fixing the domain. All references in the codebase go through `NEXT_PUBLIC_SITE_URL` so the swap is one env var. SEO helpers, sitemap, OG images, and analytics all consume this var.

### 9.3 Environment variables

```
NEXT_PUBLIC_SITE_URL=<https://final-domain>
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=<final-domain>
NEXT_PUBLIC_RELEASES_URL=https://raw.githubusercontent.com/Nolyo/voice-tool/main/docs/releases.json
NEXT_PUBLIC_GITHUB_REPO=https://github.com/Nolyo/voice-tool
```

No server-side secrets — site is fully static / client-side.

### 9.4 Branch strategy

- `main` → production (or pre-launch preview, depending on phase).
- Feature branches → PR → manual local review.
- Tag `v1.0.0` at public launch.
- Preview URL strategy (e.g., `preview.<domain>` from a separate branch) is not critical for v1.0; can be added later if iteration speed demands it.

## 10. Pre-launch checklist (Phase C)

A versioned `docs/launch-checklist.md` to walk through together before going public. Sample contents:

**Content**
- [ ] All FR + EN copy proofread, no typos.
- [ ] Legal pages reviewed by lawyer or Captain Contrat.
- [ ] `/pricing` final pricing structure filled in.
- [ ] All GIFs/screenshots regenerated against the latest soft build.
- [ ] `releases.json` in voice-tool repo aligned with the v3.0 release.

**Technical**
- [ ] Lighthouse Performance > 95 on every page.
- [ ] Lighthouse Accessibility > 95 on every page.
- [ ] Lighthouse SEO > 95 on every page.
- [ ] Mobile testing: iOS Safari + Android Chrome.
- [ ] Desktop testing: Chrome + Firefox + Safari + Edge.
- [ ] Dark + light mode OK on every page.
- [ ] Linkchecker passes (no 404s).
- [ ] OG images verified via Twitter / LinkedIn / Slack debug previews.
- [ ] `sitemap.xml` reachable and valid.
- [ ] `robots.txt` correct.
- [ ] Plausible records events end-to-end.

**Backend & sync (gating items)**
- [ ] Voice Tool first-party transcription + post-process services live.
- [ ] Notes sync end-to-end works.
- [ ] In-app account creation flow tested.

**Communication**
- [ ] Social media posts written and scheduled.
- [ ] voice-tool README aligned.
- [ ] Beta-tester / community email or post drafted.

## 11. Out of scope (parked for later)

- `/docs` page — deferred until soft stabilizes.
- Hero video — recorded after first-month feedback identifies a winning use case.
- Blog / SEO articles — useful but not launch-critical.
- Dedicated `/changelog` page — GitHub releases link is enough.
- Localizations beyond FR + EN.
- Web account creation, in-browser pricing checkout — by design.

## 12. Open questions

These do not block the implementation plan; they are noted for follow-up:

- **Pricing structure** (subscription vs. credits vs. metered) — user to decide before Phase C.
- **Final domain** — user to decide via separate brand brainstorm.
- **Feedback channel after launch** — Issue GitHub, Discord, email, in-app form? Not urgent.
- **Preview deployment workflow** — only matters once iteration speed becomes a bottleneck.

---

## Next step

Implementation plan, produced via the writing-plans skill, broken down by phase A → B → C with concrete tasks, file paths, and ordering.
