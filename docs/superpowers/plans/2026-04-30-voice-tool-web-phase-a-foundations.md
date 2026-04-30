# Voice Tool Web — Phase A: Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the technical foundations (Docker deployment, i18n discipline, SEO infrastructure, analytics, releases polish, design system integration) so Phase B (page composition) is fast.

**Architecture:** No new public pages in this phase. All work happens under `app/`, `components/`, `lib/`, `i18n/`. The phase has two halves: tasks that can start now (T1–T7) and tasks gated on the user's Claude Design deliverable (T8–T11). The two halves are sequential — T8 unlocks the rest.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS v4, next-intl 4, pnpm, Docker (for Dokploy), Plausible analytics, `next/og` for OpenGraph images.

**Spec reference:** `docs/superpowers/specs/2026-04-30-voice-tool-web-overhaul-design.md`

---

## File structure

Files created or modified during Phase A:

```
voice-tool-web/
├── Dockerfile                                  # T1, NEW
├── .dockerignore                               # T1, NEW
├── next.config.ts                              # T1, MODIFIED (add output: 'standalone')
├── .env.local.example                          # T6, NEW (replaces missing one)
├── app/
│   ├── globals.css                             # T8, MODIFIED (replace placeholder tokens with Claude Design tokens)
│   ├── opengraph-image.tsx                     # T5, NEW (default OG image)
│   ├── robots.ts                               # T4, NEW
│   ├── sitemap.ts                              # T4, NEW
│   └── [locale]/
│       ├── layout.tsx                          # T4, T6, MODIFIED (use metadata helper, mount Plausible)
│       └── page.tsx                            # T2, MODIFIED (remove StatsSection)
├── components/
│   ├── distinctive/                            # T10, NEW (waveform, mic pulse, animated caret)
│   ├── layout/                                 # T11, NEW (Section, Container, FeatureGrid, MediaWithCaption, CTABand)
│   ├── ui/                                     # T9, MODIFIED (port Claude Design components)
│   ├── header.tsx                              # T2, MODIFIED (kill dead links)
│   ├── footer.tsx                              # T2, MODIFIED (kill dead links)
│   └── stats-section.tsx                       # T2, DELETED
├── hooks/
│   └── use-releases.ts                         # T7, MODIFIED (fallback handling for UI consumption)
├── i18n/
│   └── routing.ts                              # unchanged unless we change defaultLocale (out of scope here)
├── lib/
│   ├── analytics.ts                            # T6, NEW
│   ├── metadata.ts                             # T4, NEW
│   └── site-config.ts                          # T4, NEW (centralized site URL/name)
├── messages/
│   ├── en.json                                 # T2, T4, MODIFIED (cleanup + add home metadata)
│   └── fr.json                                 # T2, T4, MODIFIED
├── playwright.config.ts                        # T12, NEW
├── tests/
│   └── smoke.spec.ts                           # T12, NEW
├── package.json                                # T12, MODIFIED (add test:e2e script)
├── .gitignore                                  # T12, MODIFIED (ignore Playwright artifacts)
└── types/
    └── messages.d.ts                           # T3, NEW (typed i18n keys)
```

---

## Conventions used in this plan

- **Package manager**: `pnpm` (never npm or yarn).
- **Commit style**: conventional commits per project `CLAUDE.md` (`<type>: <message>`, English, short).
- **No unit tests**: per spec section 8.7 — verification is manual or via `pnpm dev` / `pnpm build` / `pnpm lint`. A single Playwright smoke test is added at end of Phase A (T12).
- **Working dir**: all commands assume `cwd = C:\Users\nolyo\www\voice-tool-web`.
- **Existing modifications**: `pnpm-lock.yaml` and `tsconfig.json` are dirty in the working tree at plan-write time. Coordinate with the user before staging unrelated files.

---

## Task 1 — Dockerfile + Next.js standalone output for Dokploy

**Why:** Dokploy deploys via Docker. Next.js needs `output: 'standalone'` to produce a self-contained bundle; without it, the Dockerfile would have to copy `node_modules` (slow + heavy).

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`
- Modify: `next.config.ts`

- [ ] **Step 1.1 — Add `output: 'standalone'` to Next config**

Edit `next.config.ts`:

```ts
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  output: "standalone",
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 1.2 — Create `.dockerignore`**

Create `.dockerignore`:

```
node_modules
.next
.git
.env
.env.local
.env*.local
*.md
docs/
.vscode/
.idea/
.DS_Store
coverage/
README.md
.dockerignore
Dockerfile
```

- [ ] **Step 1.3 — Create multi-stage Dockerfile**

Create `Dockerfile`:

```dockerfile
# syntax=docker/dockerfile:1.7

# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# ---------- builder ----------
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---------- runner ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
```

- [ ] **Step 1.4 — Verify the build works locally**

Run: `pnpm build`
Expected: succeeds, output mentions "Creating an optimized production build", no errors. The build creates `.next/standalone/`.

- [ ] **Step 1.5 — Verify Docker build works**

Run: `docker build -t voice-tool-web:dev .`
Expected: image builds successfully. (Skip this step if Docker daemon not running locally; Dokploy will catch issues.)

- [ ] **Step 1.6 — Commit**

```bash
git add Dockerfile .dockerignore next.config.ts
git commit -m "chore: add Dockerfile and standalone output for Dokploy"
```

---

## Task 2 — Cleanup: remove StatsSection, dead links, outdated copy

**Why:** Phase A foundation work goes faster on a clean dev environment. The fabricated stats and dead anchors clutter mental space. The version "v2.1" in the badge is misleading even locally.

**Files:**
- Delete: `components/stats-section.tsx`
- Modify: `app/[locale]/page.tsx`
- Modify: `components/header.tsx`
- Modify: `components/footer.tsx`
- Modify: `messages/en.json`, `messages/fr.json`

- [ ] **Step 2.1 — Remove StatsSection import and usage from home**

Edit `app/[locale]/page.tsx`:

```tsx
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2.2 — Delete the StatsSection component file**

Run: `rm components/stats-section.tsx`

- [ ] **Step 2.3 — Remove `stats` block from `messages/en.json` and `messages/fr.json`**

In each file, delete the `"stats": { ... }` object including its trailing comma adjustments. Keep the rest.

- [ ] **Step 2.4 — Replace dead `#docs` link in header**

Edit `components/header.tsx`. Remove the `<Link href="#docs">` block entirely (between `Features` and `Download` links). The nav becomes: Features → Download → GitHub.

- [ ] **Step 2.5 — Remove `#docs` reference key from header i18n**

In `messages/en.json` and `messages/fr.json`, remove `"docs": "Documentation"` from `header.nav`.

- [ ] **Step 2.6 — Replace dead anchors in footer**

Edit `components/footer.tsx`. Apply these changes:

- `href="#features"` → `href="/features"` (will 404 until Phase B; that's fine for now since we're local)
- `href="#download"` → `href="/download"`
- `href="#docs"` → remove the `<li>` entirely
- `href="#privacy"` → `href="/legal/privacy"` (will 404 until Phase B)
- `href="#terms"` → `href="/legal/terms"` (will 404 until Phase B)

For `<Link>` component imports: replace `import Link from "next/link"` with `import { Link } from "@/i18n/routing"` so locale prefixes are preserved.

- [ ] **Step 2.7 — Remove the legacy "documentation" entry from `footer.resources` i18n**

In `messages/en.json` and `messages/fr.json`, remove the `documentation` key under `footer.resources`. Keep `github` and `support`.

- [ ] **Step 2.8 — Update outdated version copy**

In `messages/en.json` and `messages/fr.json`, change `hero.badge` from "Version 2.1 disponible/available" to "Bientôt disponible / Coming soon" (placeholder until launch). Keep the same key, just change the value.

- [ ] **Step 2.9 — Verify the dev server**

Run: `pnpm dev`
Expected: no console errors. Visit `http://localhost:3000` (and `/fr`) — home renders with hero + features + CTA + footer (no stats), header has 3 nav items (Features/Download/GitHub).
Stop the dev server (Ctrl+C).

- [ ] **Step 2.10 — Verify lint and types**

Run: `pnpm lint`
Expected: zero errors.

Run: `pnpm tsc --noEmit`
Expected: zero errors.

- [ ] **Step 2.11 — Commit**

```bash
git add app/[locale]/page.tsx components/header.tsx components/footer.tsx components/stats-section.tsx messages/en.json messages/fr.json
git commit -m "refactor: remove dead links, fake stats, outdated copy"
```

---

## Task 3 — i18n discipline: typed messages

**Why:** `messages/en.json` and `messages/fr.json` will keep growing across phases. Without typed keys, typos in `useTranslations("hero").t("ttile")` only fail at runtime. `next-intl` ships with a TypeScript hook that we just need to wire up.

**Files:**
- Create: `types/messages.d.ts`
- Modify: `tsconfig.json` (only if needed — see Step 3.2)

- [ ] **Step 3.1 — Create the types file**

Create `types/messages.d.ts`:

```ts
import type messages from "../messages/en.json"

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages
  }
}
```

This tells `next-intl` that all `useTranslations()` calls must use keys present in `messages/en.json`. Since `en.json` is the canonical source (defaultLocale is `en`), missing keys in `fr.json` will be flagged at runtime by `next-intl` but the type contract follows `en.json`.

- [ ] **Step 3.2 — Verify `tsconfig.json` includes the types**

The current `include` array already has `**/*.ts`, which covers `types/messages.d.ts`. No edit needed.

If for some reason the file isn't picked up, add it explicitly:
```json
"include": [..., "types/**/*.d.ts"]
```

- [ ] **Step 3.3 — Verify type checking catches a typo**

Temporarily, in `components/hero-section.tsx`, change a valid call like `t("title")` to `t("ttile")`. Run:

```
pnpm tsc --noEmit
```

Expected: TypeScript error mentioning `"ttile"` is not assignable to the message key type.

Revert the typo.

- [ ] **Step 3.4 — Verify clean tsc run**

Run: `pnpm tsc --noEmit`
Expected: zero errors.

- [ ] **Step 3.5 — Commit**

```bash
git add types/messages.d.ts
git commit -m "feat: add typed i18n message keys"
```

---

## Task 4 — SEO foundation: site config, metadata helper, sitemap, robots

**Why:** Every page in Phase B will need `generateMetadata`. Building the helper now means each page is a 5-line file. `sitemap.xml` and `robots.txt` must exist before public launch and are trivially built once site config is centralized.

**Files:**
- Create: `lib/site-config.ts`
- Create: `lib/metadata.ts`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `.env.local.example`
- Modify: `app/[locale]/layout.tsx` (use metadata helper)

- [ ] **Step 4.1 — Create central site config**

Create `lib/site-config.ts`:

```ts
export const siteConfig = {
  /**
   * Public site URL. Set NEXT_PUBLIC_SITE_URL in env.
   * Falls back to localhost in dev so previews work without env setup.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
  name: "Voice Tool",
  defaultLocale: "en",
  locales: ["en", "fr"] as const,
  githubRepo:
    process.env.NEXT_PUBLIC_GITHUB_REPO ??
    "https://github.com/Nolyo/voice-tool",
} as const

export type Locale = (typeof siteConfig.locales)[number]
```

- [ ] **Step 4.2 — Create `.env.local.example`**

Create `.env.local.example`:

```
# Public-facing canonical URL (no trailing slash). Used by metadata, sitemap, OG.
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Plausible analytics domain (set this to your final domain in production).
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

# Override the GitHub repo URL if needed.
NEXT_PUBLIC_GITHUB_REPO=https://github.com/Nolyo/voice-tool

# Override the releases.json source (defaults to the main branch of the repo).
NEXT_PUBLIC_RELEASES_URL=https://raw.githubusercontent.com/Nolyo/voice-tool/main/docs/releases.json
```

- [ ] **Step 4.3 — Create the metadata helper**

Create `lib/metadata.ts`:

```ts
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { siteConfig, type Locale } from "./site-config"

interface BuildMetadataOptions {
  /** i18n namespace containing `metaTitle` and `metaDescription` keys. */
  namespace: string
  /** Path under the locale (e.g. "/features"). Use "/" for the home. */
  path: string
  locale: Locale
}

export async function buildMetadata({
  namespace,
  path,
  locale,
}: BuildMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace })

  const title = t("metaTitle")
  const description = t("metaDescription")
  const localizedPath = locale === siteConfig.defaultLocale ? path : `/${locale}${path}`
  const canonical = `${siteConfig.url}${localizedPath}`

  const languages: Record<string, string> = {}
  for (const altLocale of siteConfig.locales) {
    const altPath =
      altLocale === siteConfig.defaultLocale ? path : `/${altLocale}${path}`
    languages[altLocale] = `${siteConfig.url}${altPath}`
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
```

- [ ] **Step 4.4 — Add `metaTitle` and `metaDescription` keys to home namespace**

In `messages/en.json`, add to the existing `hero` namespace OR create a top-level `home` namespace — pick a single convention. To keep change small, create a new `home` namespace at the top:

```json
{
  "home": {
    "metaTitle": "Voice Tool — Voice transcription, anywhere, instantly",
    "metaDescription": "Transform your voice into text instantly. Local GPU transcription, AI post-processing, connected notes. Free forever for local use."
  },
  "hero": { ... existing },
  ...
}
```

Same in `messages/fr.json` with French copy:

```json
{
  "home": {
    "metaTitle": "Voice Tool — La transcription vocale, partout, instantanément",
    "metaDescription": "Transformez votre voix en texte instantanément. Transcription locale GPU, post-process IA, notes connectées. Gratuit pour toujours en local."
  },
  ...
}
```

- [ ] **Step 4.5 — Wire `generateMetadata` into the home page layout**

Edit `app/[locale]/layout.tsx`. Replace the hardcoded `metadata` export with a `generateMetadata` function. Final file:

```tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { buildMetadata } from "@/lib/metadata"
import type { Locale } from "@/lib/site-config"
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    namespace: "home",
    path: "/",
    locale: locale as Locale,
  })
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

Note: this assigns the `home` metadata as the layout default. Page-level routes added in Phase B will export their own `generateMetadata` calling `buildMetadata` with their namespace.

- [ ] **Step 4.6 — Create the sitemap**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

const ROUTES = ["/", "/features", "/download", "/pricing", "/legal/privacy", "/legal/terms"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return ROUTES.flatMap((path) =>
    siteConfig.locales.map((locale) => {
      const url =
        locale === siteConfig.defaultLocale
          ? `${siteConfig.url}${path}`
          : `${siteConfig.url}/${locale}${path}`
      return {
        url,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: path === "/" ? 1.0 : 0.7,
      }
    })
  )
}
```

(The Phase B–only routes are listed already; until those pages exist they will 404 if a crawler follows the link. That's acceptable in pre-launch since the site is local. Remove or comment the unbuilt routes if you want a strictly clean sitemap.)

- [ ] **Step 4.7 — Create robots.txt**

Create `app/robots.ts`:

```ts
import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
```

- [ ] **Step 4.8 — Verify routes are reachable**

Run: `pnpm dev`

Visit:
- `http://localhost:3000/sitemap.xml` → should return XML listing all routes × locales.
- `http://localhost:3000/robots.txt` → should return text with `Allow: /` and a sitemap URL.
- `http://localhost:3000/` → home page; check the page source `<head>` contains `<title>Voice Tool — Voice transcription...</title>` and the OG meta tags.

Stop the dev server.

- [ ] **Step 4.9 — Verify lint and types**

Run: `pnpm lint && pnpm tsc --noEmit`
Expected: zero errors.

- [ ] **Step 4.10 — Commit**

```bash
git add lib/site-config.ts lib/metadata.ts app/sitemap.ts app/robots.ts app/[locale]/layout.tsx .env.local.example messages/en.json messages/fr.json
git commit -m "feat: add SEO infra (metadata helper, sitemap, robots)"
```

---

## Task 5 — Dynamic OpenGraph image generation

**Why:** Sharing a Voice Tool page on Twitter, LinkedIn, or Slack should show a branded image, not a generic preview. `next/og` generates these at request time without a designer in the loop.

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 5.1 — Create the default OG image route**

Create `app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Voice Tool — voice transcription, anywhere, instantly"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          color: "white",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            🎙️
          </div>
          <div style={{ fontSize: "48px", fontWeight: 600 }}>Voice Tool</div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Your voice becomes text, anywhere, instantly.
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: "32px",
          }}
        >
          Local · Cloud · Free · Open source
        </div>
      </div>
    ),
    { ...size }
  )
}
```

The `runtime = "nodejs"` line is important — it makes the route work in the Dokploy Node container (Edge runtime would not).

This image will replace the static OG image once Claude Design tokens land (T8). For now it's a functional placeholder that proves the pipeline works.

- [ ] **Step 5.2 — Verify the OG image renders**

Run: `pnpm dev`

Visit: `http://localhost:3000/opengraph-image`
Expected: a 1200×630 PNG renders in the browser.

Stop the dev server.

- [ ] **Step 5.3 — Verify lint and types**

Run: `pnpm lint && pnpm tsc --noEmit`
Expected: zero errors.

- [ ] **Step 5.4 — Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat: add dynamic OpenGraph image"
```

---

## Task 6 — Plausible analytics integration

**Why:** Pageview and conversion tracking are required to know if the launch ad campaign works. Plausible is cookieless (RGPD-friendly, no banner needed) and lightweight (~1 KB script).

**Files:**
- Create: `lib/analytics.ts`
- Modify: `app/[locale]/layout.tsx` (mount Plausible script when env var is set)

- [ ] **Step 6.1 — Create the analytics wrapper**

Create `lib/analytics.ts`:

```ts
"use client"

type EventProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void
  }
}

export function track(event: string, props?: EventProps): void {
  if (typeof window === "undefined") return
  window.plausible?.(event, props ? { props } : undefined)
}
```

The wrapper degrades silently when the script isn't loaded (dev or no `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set), so calling `track()` is safe everywhere.

- [ ] **Step 6.2 — Mount the Plausible script in the layout**

Edit `app/[locale]/layout.tsx`. Add the script tag inside `<body>` near the top of `NextIntlClientProvider`, gated on the env var. Final relevant snippet:

```tsx
import Script from "next/script"

// ... inside the return, replace the body content:
return (
  <html lang={locale}>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </body>
  </html>
)
```

(If the user self-hosts Plausible later, they'll change the `src` to their instance — out of scope for this plan.)

- [ ] **Step 6.3 — Verify the script appears only when env var is set**

Run: `pnpm dev` (with no `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in `.env.local`)
Visit `http://localhost:3000/`. View page source. Confirm there is NO `<script src="https://plausible.io/...">`.

Stop the dev server. Add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=test.local` to `.env.local`. Run `pnpm dev` again.
Visit `http://localhost:3000/`. View page source. Confirm `<script ... data-domain="test.local" src="https://plausible.io/js/script.js">` is present.

Stop the dev server. Remove the line from `.env.local`.

- [ ] **Step 6.4 — Verify lint and types**

Run: `pnpm lint && pnpm tsc --noEmit`
Expected: zero errors.

- [ ] **Step 6.5 — Commit**

```bash
git add lib/analytics.ts app/[locale]/layout.tsx
git commit -m "feat: integrate Plausible analytics"
```

---

## Task 7 — useReleases polish: SHA256 + previous versions + fallback

**Why:** The current hook works but the download page consumes only the latest version's installer URL and size. SHA256 is in `releases.json` already and is a strong signal of trust ("you can verify this binary"). Previous versions enable rollback and testing. Fallback handling matters because GitHub raw is occasionally down.

**Files:**
- Modify: `hooks/use-releases.ts` (no shape change — the data already exposes everything)
- The download page itself is **out of scope for Phase A** — it's polished in Phase B. T7 only ensures the hook returns data robustly. UI consumption of SHA256/previous-versions happens in Phase B.

- [ ] **Step 7.1 — Read the current hook**

Read `hooks/use-releases.ts` end-to-end. Note:
- It already exposes `data`, `latest`, `releases`, `isLoading`, `error`, `refetch`.
- 15-min localStorage cache.
- It already validates the data structure.

- [ ] **Step 7.2 — Add `RELEASES_URL` from env (with fallback)**

In `hooks/use-releases.ts`, replace the hardcoded constant:

```ts
const RELEASES_URL =
  "https://raw.githubusercontent.com/Nolyo/voice-tool/main/docs/releases.json"
```

with:

```ts
const RELEASES_URL =
  process.env.NEXT_PUBLIC_RELEASES_URL ??
  "https://raw.githubusercontent.com/Nolyo/voice-tool/main/docs/releases.json"
```

This lets the staging environment point at a different `releases.json` (e.g. a local file or fork) without code changes.

- [ ] **Step 7.3 — Verify the hook still functions**

Run: `pnpm dev`. Visit `/download`. Open browser devtools → Network. Expect a request to the GitHub raw URL (or the env override). Confirm `latest` populates.

Stop the dev server.

- [ ] **Step 7.4 — Verify lint and types**

Run: `pnpm lint && pnpm tsc --noEmit`
Expected: zero errors.

- [ ] **Step 7.5 — Commit**

```bash
git add hooks/use-releases.ts
git commit -m "refactor: support env-overridable releases URL"
```

> Note: the SHA256 display in the UI, the previous-versions section, and the `<DownloadFallback />` component all live in Phase B's `/download` page polish task. They're called out here only to confirm the hook already exposes the data needed (it does).

---

## Phase A — Gating point

Tasks T1–T7 are independent of any Claude Design deliverable. Stop here and check in with the user.

**At this gate**, the local site should:
- Build with Docker (`docker build` succeeds).
- Have a working sitemap and robots.txt.
- Have a working dynamic OG image (placeholder branding).
- Conditionally load Plausible based on env var.
- Render correctly with no dead anchors and no fake stats.
- Type-check cleanly with `pnpm tsc --noEmit`.

**Wait for user to deliver Claude Design output before T8.** The output should include:
1. Design tokens (colors, typography, spacing, radius, shadows) — usable as CSS variables or JSON.
2. Reference HTML/CSS components (buttons, cards, hero shells, sections, etc.).
3. Distinctive animations (waveform animée, mic pulse, animated caret) as HTML/CSS animated references.

---

## Task 8 — Integrate Claude Design tokens into Tailwind v4 @theme

**Status:** GATED on user delivery of Claude Design tokens.

**Why:** All subsequent components must consume the design system tokens, not hardcoded values. Tailwind v4's `@theme` directive lets us expose tokens as utility classes (`bg-brand-500`, `text-display`, etc.).

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 8.1 — Receive tokens from user**

Confirm with the user:
- File or files containing tokens (CSS, JSON, Tailwind config, or HTML reference)
- Naming conventions (do they use `--brand-*`, `--accent-*`, `--surface-*`, etc.?)
- Light/dark mode strategy (single `:root` with `.dark` override, or media query, or both)

- [ ] **Step 8.2 — Replace placeholder tokens in `app/globals.css`**

The current file has shadcn-style `--background`, `--foreground`, `--card`, `--accent`, etc., all in OKLCH. Replace these with the user's tokens. Maintain the `@theme inline` block so Tailwind utilities continue to work — only swap the underlying CSS variable values.

If the user's tokens use different names (e.g. `--brand-500`), add new entries in `@theme inline` exposing them as Tailwind colors:

```css
@theme inline {
  --color-brand-500: var(--brand-500);
  /* ... */
}
```

Concrete edit instructions depend on the user's deliverable; ask before assuming.

- [ ] **Step 8.3 — Visual smoke test**

Run: `pnpm dev`. Visit home and download page. Confirm:
- Backgrounds use the new colors.
- Typography matches the design intent (font weights, sizes).
- Buttons and cards adopt the new look (the current shadcn-style `<Button>` and `<Card>` consume `--primary`, `--card`, etc., so they pick up changes automatically).
- Light/dark mode toggle (if any wired) works.

Stop the dev server.

- [ ] **Step 8.4 — Verify lint and types and build**

Run: `pnpm lint && pnpm tsc --noEmit && pnpm build`
Expected: all pass.

- [ ] **Step 8.5 — Commit**

```bash
git add app/globals.css
git commit -m "feat: integrate Claude Design tokens into Tailwind theme"
```

---

## Task 9 — Port Claude Design reference components to React + Tailwind

**Status:** GATED on user delivery of Claude Design HTML/CSS reference components.

**Why:** The reference components from Claude Design are HTML+CSS. We need React+Tailwind versions to compose pages.

**Files:**
- Modify or create: `components/ui/*.tsx` (one component per file)
- Modify: existing `components/ui/button.tsx`, `components/ui/card.tsx` if reference replaces them

**Process (repeat per component):**

- [ ] **Step 9.1 — Identify components needed**

Take the reference HTML and list every distinct component or pattern (Button, BadgeDot, Card, Hero shell, FeatureCard, etc.). Confirm with the user which of these are needed for v1.0 pages (home + features + download + pricing + legal).

- [ ] **Step 9.2 — Port each component**

For each component, create or modify a file in `components/ui/`. Follow shadcn conventions (`forwardRef`, `cva` for variants, `cn()` from `lib/utils.ts`).

Example shape (for a hypothetical `<Pill>` component):

```tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(pillVariants({ variant, className }))} {...props} />
  )
)
Pill.displayName = "Pill"
```

- [ ] **Step 9.3 — Verify each component renders**

Spin up `pnpm dev` and create a temporary `app/_dev/components-gallery.tsx` (gitignored / deleted before commit) or use an existing page to render the new components and visually confirm they match the reference. Iterate until each looks right.

- [ ] **Step 9.4 — Verify build, lint, types**

Run: `pnpm lint && pnpm tsc --noEmit && pnpm build`
Expected: all pass.

- [ ] **Step 9.5 — Commit (per component or batched)**

```bash
git add components/ui/
git commit -m "feat: port Claude Design components to React"
```

(Batch commits make sense if many small components ship together. Per-component commits are fine when the changes are larger.)

---

## Task 10 — Build distinctive animated components

**Status:** GATED on user delivery of Claude Design animation references.

**Why:** The waveform animée, mic pulse, and animated caret are the visual identity signals. They're separate from generic UI primitives and live in `components/distinctive/` for clarity.

**Files:**
- Create: `components/distinctive/waveform-animated.tsx`
- Create: `components/distinctive/mic-pulse.tsx`
- Create: `components/distinctive/animated-caret.tsx`

- [ ] **Step 10.1 — Receive animation references**

Confirm with the user:
- Format (HTML/CSS keyframes, SVG SMIL, Lottie JSON, etc.)
- Whether reduced-motion fallback is provided

- [ ] **Step 10.2 — Port `<WaveformAnimated />`**

Translate the reference to a React component. Respect `prefers-reduced-motion`:

```tsx
"use client"

export function WaveformAnimated({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 200 60"
      // ... reference markup with CSS vars or inline animations
    >
      {/* bars or path with @keyframes */}
    </svg>
  )
}
```

In `app/globals.css`, add a `@media (prefers-reduced-motion: reduce)` block that pauses the animations.

- [ ] **Step 10.3 — Port `<MicPulse />`**

Similar approach. Likely a circular icon with pulsing concentric rings.

- [ ] **Step 10.4 — Port `<AnimatedCaret />`**

A typewriter-style caret that types out a sample sentence. Keep the sentence text as a prop so the home page can pass it from i18n.

```tsx
"use client"

interface AnimatedCaretProps {
  text: string
  className?: string
}

export function AnimatedCaret({ text, className }: AnimatedCaretProps) {
  // CSS-driven typewriter (steps + width animation) or JS-driven character append
}
```

- [ ] **Step 10.5 — Visual + reduced-motion test**

Run `pnpm dev`. Render the three components on a temp dev page. Verify each animation matches the reference. In Chrome devtools → Rendering → emulate `prefers-reduced-motion: reduce`. Verify animations stop or simplify.

- [ ] **Step 10.6 — Verify build, lint, types**

Run: `pnpm lint && pnpm tsc --noEmit && pnpm build`
Expected: all pass.

- [ ] **Step 10.7 — Commit**

```bash
git add components/distinctive/ app/globals.css
git commit -m "feat: add distinctive animated components"
```

---

## Task 11 — Build layout primitives

**Status:** GATED on Task 8 (needs the design tokens to look right).

**Why:** Phase B composes pages from these primitives. Without them, Phase B duplicates section/container markup across every page.

**Files:**
- Create: `components/layout/section.tsx`
- Create: `components/layout/container.tsx`
- Create: `components/layout/feature-grid.tsx`
- Create: `components/layout/media-with-caption.tsx`
- Create: `components/layout/cta-band.tsx`
- Create: `components/layout/index.ts` (barrel export)

- [ ] **Step 11.1 — Create `<Container>`**

`components/layout/container.tsx`:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide"
}

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4",
        {
          "max-w-3xl": size === "narrow",
          "max-w-6xl": size === "default",
          "max-w-7xl": size === "wide",
        },
        className
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 11.2 — Create `<Section>`**

`components/layout/section.tsx`:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical spacing scale. Defaults to "lg". */
  spacing?: "sm" | "md" | "lg" | "xl"
}

export function Section({ spacing = "lg", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        {
          "py-12": spacing === "sm",
          "py-16": spacing === "md",
          "py-24": spacing === "lg",
          "py-32": spacing === "xl",
        },
        className
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 11.3 — Create `<FeatureGrid>`**

`components/layout/feature-grid.tsx`:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
}

export function FeatureGrid({
  columns = 3,
  className,
  ...props
}: FeatureGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        {
          "md:grid-cols-2": columns === 2,
          "md:grid-cols-2 lg:grid-cols-3": columns === 3,
          "md:grid-cols-2 lg:grid-cols-4": columns === 4,
        },
        className
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 11.4 — Create `<MediaWithCaption>`**

`components/layout/media-with-caption.tsx`:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface MediaWithCaptionProps extends React.HTMLAttributes<HTMLDivElement> {
  media: React.ReactNode
  /** Caption appears below the media on mobile, beside on desktop. */
  reversed?: boolean
}

export function MediaWithCaption({
  media,
  reversed = false,
  className,
  children,
  ...props
}: MediaWithCaptionProps) {
  return (
    <div
      className={cn(
        "grid gap-8 md:grid-cols-2 md:items-center",
        reversed && "md:[&>:first-child]:order-2",
        className
      )}
      {...props}
    >
      <div>{media}</div>
      <div>{children}</div>
    </div>
  )
}
```

- [ ] **Step 11.5 — Create `<CTABand>`**

`components/layout/cta-band.tsx`:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface CTABandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders inside a card-style band with accent background. */
}

export function CTABand({ className, children, ...props }: CTABandProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-card to-card p-12 md:p-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

(This is a generic shape; the Claude Design reference may push toward different gradients/shapes. If so, swap the inner classes to match.)

- [ ] **Step 11.6 — Create barrel export**

`components/layout/index.ts`:

```ts
export { Container } from "./container"
export { Section } from "./section"
export { FeatureGrid } from "./feature-grid"
export { MediaWithCaption } from "./media-with-caption"
export { CTABand } from "./cta-band"
```

- [ ] **Step 11.7 — Verify build, lint, types**

Run: `pnpm lint && pnpm tsc --noEmit && pnpm build`
Expected: all pass.

- [ ] **Step 11.8 — Commit**

```bash
git add components/layout/
git commit -m "feat: add layout primitives"
```

---

## Task 12 — Smoke test (Playwright)

**Why:** A single end-to-end test that visits every route in both locales catches catastrophic regressions (runtime errors, missing translations, 500 responses) without the maintenance burden of full e2e coverage. Per spec section 8.7, this is the only e2e test we maintain.

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/smoke.spec.ts`
- Modify: `package.json` (add `test:e2e` script)

- [ ] **Step 12.1 — Install Playwright**

Run: `pnpm add -D @playwright/test && pnpm exec playwright install --with-deps chromium`

- [ ] **Step 12.2 — Create the config**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
})
```

- [ ] **Step 12.3 — Create the smoke test**

Create `tests/smoke.spec.ts`:

```ts
import { expect, test } from "@playwright/test"

const ROUTES = [
  "/",
  "/download",
  "/fr",
  "/fr/download",
]

for (const path of ROUTES) {
  test(`renders ${path} without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (e) => errors.push(e.message))
    const response = await page.goto(path)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator("body")).toBeVisible()
    expect(errors).toEqual([])
  })
}
```

(Phase B will extend this list with `/features`, `/pricing`, `/legal/*`. Don't add them yet — they'd 404.)

- [ ] **Step 12.4 — Add the test script to `package.json`**

In `package.json`, under `scripts`, add:

```json
"test:e2e": "playwright test"
```

- [ ] **Step 12.5 — Run the smoke test**

Run: `pnpm test:e2e`
Expected: 4 passed (2 routes × 2 locales).

- [ ] **Step 12.6 — Update `.gitignore`**

In `.gitignore`, append:

```
# playwright
/test-results/
/playwright-report/
/playwright/.cache/
```

- [ ] **Step 12.7 — Commit**

```bash
git add playwright.config.ts tests/smoke.spec.ts package.json pnpm-lock.yaml .gitignore
git commit -m "test: add Playwright smoke test"
```

(Note: `pnpm-lock.yaml` is dirty before this task started. Coordinate with the user on whether to include the unrelated lockfile changes in this commit or stage them separately.)

---

## Phase A — Done criteria

- [ ] Site builds with Docker (`docker build` succeeds locally or on Dokploy).
- [ ] `/sitemap.xml` and `/robots.txt` reachable.
- [ ] OG image renders at `/opengraph-image`.
- [ ] Plausible script loads only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set.
- [ ] Home page renders without `StatsSection` and without dead anchor links.
- [ ] `pnpm tsc --noEmit` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm test:e2e` passes (4 routes).
- [ ] Claude Design tokens integrated; site visually adopts the new palette.
- [ ] Reference components ported to `components/ui/`.
- [ ] Distinctive components built in `components/distinctive/` and respect `prefers-reduced-motion`.
- [ ] Layout primitives exist in `components/layout/`.

---

## What's next

Phase B (page composition) and Phase C (polish & launch) each get their own plan, written when the prior phase completes. Sketches:

- **Phase B plan** will deliver the 5 pages (`/`, `/features`, `/download` polish, `/pricing`, `/legal/*`) using the Phase A primitives. Estimated 2–3 weeks.
- **Phase C plan** will deliver Lighthouse CI, cross-browser checklist, final GIFs, pricing finalization, legal review integration, and the synchronized public deploy. Estimated 1 week.

Do not start Phase B planning before Phase A's gate checklist is fully checked.
