# Lexena Launch — Overnight Autonomous Build

- **Date**: 2026-05-03
- **Author**: Claude Code (autonomous run, user asleep)
- **Status**: Decisions log + execution journal — review and adjust in the morning
- **Replaces in spirit**: gated tasks T8–T11 of `2026-04-30-voice-tool-web-overhaul-design.md` (now executed) plus a first pass of Phase B home/features/pricing/legal pages
- **Trigger**: User prompt 2026-05-03 — "Voici le logiciel que tu dois promouvoir: github.com/Nolyo/lexena. Pendant que je vais dormir, j'aimerais que tu fasses tout en autonomie." Plus an explicit call-out: avoid AI Slop.

## 1. Decisions taken without you

These are the calls I made while you slept. Each one is reversible if you disagree.

### 1.1 Brand rename — "Voice Tool" → "Lexena"

You confirmed the name in the prompt. I rebranded everywhere a user can see the name:

- Site config (`siteConfig.name`)
- All i18n copy (FR + EN)
- All metadata (titles, OG, descriptions)
- Logo lockup
- GitHub link target switched to `https://github.com/Nolyo/lexena`
- Releases URL switched to the lexena repo (`raw.githubusercontent.com/Nolyo/lexena/main/docs/releases.json`)

I deliberately did **not** rename the design-token CSS variable prefix (`--vt-*`, `.vt-app`). Renaming hundreds of CSS vars is busywork that buys nothing the user can see; the prefix is internal. If you want me to rename later, it's a search-and-replace.

### 1.2 Domain — still TBD

Per the existing memory (`project_domain_pending.md`), no domain is fixed. Everything reads `NEXT_PUBLIC_SITE_URL` at build time. Drop the real domain in `.env` and rebuild. No code changes needed.

### 1.3 Design system source

I unpacked the Claude Design tar archive from `https://api.anthropic.com/v1/design/h/_4dH1mZzlI8NZewTxUyXiA` and read every file end-to-end before writing a single line:

- `colors_and_type.css` — full `oklch` token set under `.vt-app` scope, dark-first
- `preview/{type,colors,spacing,components,brand}.html` — visual references
- `ui_kits/{dashboard,mini_window}/*.html` — interaction vocabulary
- `README.md` (project) + `SKILL.md` — content rules, hard rules, don'ts

These are non-negotiable. The site uses Inter (UI) + Geist (display) + JetBrains Mono (timers, costs, hotkeys), `oklch(0.7 0.17 264)` periwinkle accent, dark-first surfaces, sentence case, middle-dot separators, no emoji in UI, no decorative gradients except the visualizer glow and sticky day-fade.

Logo asset: `voice-tool-icon-256.png` from the design-system bundle, copied to `public/lexena-icon-256.png` plus `lexena-icon-512.png`. The icon is a periwinkle disk with a centered white "tap mark" and a yellow waveform underneath — pixel-art style.

### 1.4 Anti-AI-Slop strategy (your explicit ask)

The pre-existing site was textbook AI Slop: radial gradient hero, three identical icon cards in a row, vague "voice transcription in real-time" copy, fake stats card, generic CTA-on-gradient. I traded it for an editorial, restrained, fact-driven look:

- **Magazine-like layout**: asymmetric grids, eyebrow labels in `tracking-[0.1em]` UPPERCASE, content in measured columns rather than full-bleed.
- **No big radial gradients**. The only gradient on the site is the audio-visualizer glow (a brand element, not chrome) and the sticky day-fade in the live demo.
- **Concrete copy** with real units: `Ctrl+Alt+Space`, `~0.3s on a 4060`, `38 mots`, `$0.0021`, `2m 14s`. Mono numbers separated by middle-dots.
- **The hero is a working dictation simulation**, not a stock illustration: a hotkey chord, a live (CSS-animated) waveform, a caret typing the transcription into a fake target window. Pure CSS/JS, no embedded video.
- **Borders and inset highlights** carry the visual weight, not gradients.
- **Mockups built from the design system itself**, not embedded screenshots. Stays on-brand and won't decay when the soft moves on.
- **Sentence case everywhere**, `vous` in French, no Title Case On Buttons, no exclamation marks in CTAs.

### 1.5 Pages delivered tonight

In priority order:

| Page | Status | Notes |
|------|--------|-------|
| `/` (home) | Refonte complète | Editorial hero, How it works, Who it's for, Flagship features, Local vs Cloud, Final CTA |
| `/features` | New | Sticky in-page nav. Six categories with concrete feature inventory |
| `/pricing` | New | Two-card Free vs Pro, comparison table, FAQ. Numbers honestly marked **TBD** until you set them |
| `/download` | Refresh | Rebranded, design-system-aligned, step 3 fixed (no more "configure your OpenAI key") |
| `/legal/privacy` | Skeleton | Placeholder with explicit "lawyer review required" markers — kills the footer 404 |
| `/legal/terms` | Skeleton | Same |

Pages **not** built: `/changelog` (footer link goes to GitHub releases per design spec), `/docs` (deferred per existing memory), `/blog` (out of scope), `/demo` (demo lives inside `/`).

### 1.6 Pricing — numbers stay TBD

Per memory, you haven't decided subscription / credits / metered. The pricing page renders **honest "TBD" placeholders** styled as muted mono labels (`— · à finaliser`). The page structure is final; only the numbers are missing. When you decide, edit `messages/{en,fr}.json` keys `pricing.plans.pro.priceValue` and `pricing.plans.pro.priceMeta`.

### 1.7 Account / signup

No web signup. Confirmed by memory. The pricing CTA points to `/download`, with a sentence saying account creation happens in-app.

### 1.8 What I did **not** touch

- `next.config.ts`, `Dockerfile`, `playwright.config.ts` — Phase A foundations are good, no need to disturb them.
- `hooks/use-releases.ts` — kept as-is. Promoting `RELEASES_URL` into `siteConfig.releasesUrl` is a Phase A reviewer follow-up, not blocking launch.
- The smoke test got new routes added; not a structural change.
- Plausible config — kept, but `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` still needs to be set in your Dokploy env when you launch.

### 1.9 Brainstorming-skill HARD-GATE override

The `superpowers:brainstorming` skill requires presenting a design and waiting for user approval before implementing. Your explicit instruction — *"Tu peux être totalement indépendant"* and *"Pendant que je vais dormir"* — overrode that. Per the skill's own priority rule: **"User's explicit instructions — highest priority."** This document is the design I would have presented; the implementation is what I built against it.

## 2. Architecture (what shipped)

### 2.1 File structure (new + changed)

```
app/
  globals.css                                      # CHANGED — full vt-* token set + Tailwind v4 @theme
  opengraph-image.tsx                              # CHANGED — Lexena editorial OG
  [locale]/
    page.tsx                                       # CHANGED — composed from new sections
    download/page.tsx                              # CHANGED — design refresh + step 3 fix
    features/page.tsx                              # NEW
    pricing/page.tsx                               # NEW
    legal/
      privacy/page.tsx                             # NEW (skeleton)
      terms/page.tsx                               # NEW (skeleton)

components/
  layout/
    section.tsx                                    # NEW
    container.tsx                                  # NEW
    eyebrow.tsx                                    # NEW
    feature-grid.tsx                               # NEW
    media-with-caption.tsx                         # NEW
    cta-band.tsx                                   # NEW
  distinctive/
    waveform-live.tsx                              # NEW — CSS-driven bars
    hotkey-chord.tsx                               # NEW
    animated-caret.tsx                             # NEW — typing simulation
    mic-pulse.tsx                                  # NEW
    mini-window-mock.tsx                           # NEW
    app-frame-mock.tsx                             # NEW (notes + history mock from design)
  sections/
    hero-home.tsx                                  # NEW
    how-it-works.tsx                               # NEW
    personas.tsx                                   # NEW
    flagship-features.tsx                          # NEW
    local-or-cloud.tsx                             # NEW
    final-cta.tsx                                  # NEW
  header.tsx                                       # CHANGED — Lexena lockup, locale switch
  footer.tsx                                       # CHANGED — live links

lib/
  site-config.ts                                   # CHANGED — name → Lexena, repo → lexena
  features-data.ts                                 # NEW — typed structure for /features

messages/
  en.json                                          # REWRITTEN
  fr.json                                          # REWRITTEN

public/
  lexena-icon-256.png                              # NEW
  lexena-icon-512.png                              # NEW

types/
  messages.d.ts                                    # CHANGED — augmented for new keys

tests/
  smoke.spec.ts                                    # CHANGED — added /features, /pricing, /legal/*
```

### 2.2 Token integration

`app/globals.css` now imports Inter / Geist / JetBrains Mono from Google Fonts and declares the `:root` (light) + `.vt-app` / `.vt-scope` (dark) scope from the design system verbatim. The `@theme inline` block exposes the tokens to Tailwind v4 utilities (`bg-[var(--vt-panel)]` works, plus a few semantic shortcuts). `<body>` carries `class="vt-app"` to default the whole site to dark scope, matching the soft.

### 2.3 Layout primitives

Six small components (`Section`, `Container`, `Eyebrow`, `FeatureGrid`, `MediaWithCaption`, `CTABand`) carry the editorial rhythm. Pages compose them; no page contains raw layout class strings.

### 2.4 Distinctive components

- `WaveformLive` — 12 vertical bars animated with staggered CSS keyframes. Respects `prefers-reduced-motion` (renders a static silhouette).
- `AnimatedCaret` — types a phrase character by character at ~80ms/char with a blinking caret. Pauses, then loops with a different phrase. Fully CSS for the caret; one small `useEffect` for the typing index. Reduced motion = static text.
- `MicPulse` — the radial mic from the brand reference. Pure CSS.
- `HotkeyChord` — the `Ctrl + Alt + Space` chord rendering, with `vt-kbd-token` styling.
- `MiniWindowMock` — small floating HUD card recreated from the brand reference. Used in the hero and How it works.
- `AppFrameMock` — sidebar + header + list silhouette from the spacing reference. Used in the Notes flagship feature.

All six honor `prefers-reduced-motion: reduce`.

### 2.5 i18n

Both locale files were rewritten end-to-end. New namespaces: `home.hero`, `home.steps`, `home.personas`, `home.flagship`, `home.localCloud`, `home.cta`, `features.*`, `pricing.*`, `download.*`, `legal.privacy.*`, `legal.terms.*`. The English copy is a faithful translation of the French (FR primary). Both stay under sentence-case + `vous` rules. `messages.d.ts` was regenerated against `en.json`.

### 2.6 Metadata + OG

`opengraph-image.tsx` was rewritten to match the design system: dark `oklch(0.14 0.015 264)` background, periwinkle accent, Geist display font, no emoji, the brand mark inline as an SVG mic, sentence-case headline. `nodejs` runtime kept (Dokploy can't do edge).

## 3. Open questions for the morning

These are not blocking. Skim them and tell me which to act on.

1. **Tagline**. I shipped *"La dictée vocale qui sait écouter votre flux."* / *"Voice dictation that gets out of your way."* Tell me if you want a different angle. The hero copy lives in `messages/{en,fr}.json` under `home.hero.*` — one diff away.
2. **Hero animation**. The animated-caret loop types two phrases (work / personal). I picked them by hand to feel concrete. Replace via `messages.home.hero.demo.phrases`.
3. **Pricing numbers**. I need them. Until then the page reads `Pro · à finaliser` with a "subscribe to be notified" mailto-style placeholder pointing to GitHub watch.
4. **Real screenshots**. The design system wants mockups built from tokens, not screenshots, and I followed that. If you'd rather show real product screenshots on the home page, I'll add a screenshot gallery section. Real screenshots live at `https://raw.githubusercontent.com/Nolyo/lexena/main/docs/screenshots/{statistics,notes,historic}.png` — easy to wire if you say go.
5. **Macro / Linux / mac downloads**. The download page renders only platforms present in `releases.json`. If the JSON contains only Windows for now, the other cards stay hidden. No code change needed when you publish DMG / DEB / RPM.
6. **Legal text**. The two skeleton pages have flagged sections marked `// LAWYER` — they exist to kill the footer 404 and make the site look complete. They are **not** publishable without legal review.
7. **Accent direction**. Periwinkle is locked in via the design system. If you want a different brand color, change `--vt-accent` in `app/globals.css` once.

## 4. Things I could not do without you

- Lighthouse target ≥ 95. I did not run a Lighthouse pass — needs a real domain and the production build behind a real reverse proxy. That's a Phase C task, kept honest.
- Real OG screenshots. The OG image is currently a typographic editorial card — fine as a starting point but worth a polish pass once you've signed off on the headline.
- Plausible env wiring. `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is consumed but not set — set it in Dokploy when the domain is final.
- Domain selection itself. Untouched.

## 5. Verification

- `pnpm lint` — clean
- `pnpm build` — clean (standalone output present)
- `pnpm test:e2e` — Playwright smoke covering 6 routes (× 2 locales) where it makes sense — see `tests/smoke.spec.ts`

The verification command output is captured in the matching task on the task list. Look at the morning summary in the chat.

## 6. Rollback

Everything went on a feature branch `feat/lexena-overnight`. If you hate it:

```
git checkout main
git branch -D feat/lexena-overnight
```

You're back to the clean Phase A state. If you like 80% of it and want to tweak, branch off the feature branch — the diff is the diff.
