import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Download } from "lucide-react"
import { useTranslations } from "next-intl"
import { buildMetadata } from "@/lib/metadata"
import type { Locale } from "@/lib/site-config"
import type { Metadata } from "next"

interface FeatureItem {
  title: string
  body: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    namespace: "features",
    path: "/features",
    locale: locale as Locale,
  })
}

const sections = [
  { id: "recording", ns: "features.recording", tone: "accent" as const },
  { id: "ai", ns: "features.ai", tone: "violet" as const },
  { id: "notes", ns: "features.notes", tone: "accent" as const },
  { id: "profiles", ns: "features.profiles", tone: "warn" as const },
  { id: "sync", ns: "features.sync", tone: "ok" as const },
  { id: "system", ns: "features.system", tone: "default" as const },
]

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-24 pb-16">
        <FeaturesHero />
        <FeaturesNav />
        <FeatureSections />
        <FeaturesCta />
      </main>
      <Footer />
    </>
  )
}

function FeaturesHero() {
  const t = useTranslations("features.hero")
  return (
    <Section spacing="md">
      <Container size="lg">
        <div className="max-w-2xl space-y-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="vt-display text-[40px] sm:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--vt-fg)]">
            {t("title")}
          </h1>
          <p className="text-[16px] leading-[1.6] text-[var(--vt-fg-2)] max-w-xl">
            {t("subhead")}
          </p>
        </div>
      </Container>
    </Section>
  )
}

function FeaturesNav() {
  const t = useTranslations("features.nav")
  const labels: Record<string, string> = {
    recording: t("recording"),
    ai: t("ai"),
    notes: t("notes"),
    profiles: t("profiles"),
    sync: t("sync"),
    system: t("system"),
  }
  return (
    <Container size="lg" className="-mt-2">
      <nav
        className="sticky top-[64px] z-20 -mx-2 mb-12 flex gap-1 overflow-x-auto rounded-[12px] border border-[var(--vt-border)] p-1.5"
        style={{
          background: "color-mix(in oklch, var(--vt-bg), transparent 30%)",
          backdropFilter: "saturate(140%) blur(10px)",
          WebkitBackdropFilter: "saturate(140%) blur(10px)",
        }}
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="vt-mono shrink-0 rounded-[8px] px-3 py-1.5 text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-3)] hover:bg-[var(--vt-hover)] hover:text-[var(--vt-fg)] transition-colors"
          >
            {labels[s.id]}
          </a>
        ))}
      </nav>
    </Container>
  )
}

function FeatureSections() {
  return (
    <Container size="lg" className="space-y-20 sm:space-y-28">
      <FeatureCategory
        id="recording"
        ns="features.recording"
        tone="accent"
      />
      <FeatureCategory id="ai" ns="features.ai" tone="violet" />
      <FeatureCategory id="notes" ns="features.notes" tone="accent" />
      <FeatureCategory id="profiles" ns="features.profiles" tone="warn" />
      <FeatureCategory id="sync" ns="features.sync" tone="ok" />
      <FeatureCategory id="system" ns="features.system" tone="default" />
    </Container>
  )
}

function FeatureCategory({
  id,
  ns,
  tone,
}: {
  id: string
  ns:
    | "features.recording"
    | "features.ai"
    | "features.notes"
    | "features.profiles"
    | "features.sync"
    | "features.system"
  tone: "accent" | "violet" | "warn" | "ok" | "default"
}) {
  const t = useTranslations(ns)
  const items = t.raw("items") as FeatureItem[]
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-[var(--vt-border)] pb-5">
        <h2 className="vt-display text-[26px] sm:text-[32px] font-semibold tracking-[-0.015em] leading-[1.1] text-[var(--vt-fg)]">
          {t("title")}
        </h2>
        <Eyebrow tone={tone === "default" ? "default" : tone} withDot>
          {String(items.length).padStart(2, "0")} fonctionnalités
        </Eyebrow>
      </div>
      <div className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--vt-border)] sm:grid-cols-2 lg:grid-cols-3 bg-[var(--vt-border)]">
        {items.map((item, i) => (
          <article
            key={i}
            className="flex flex-col gap-2 p-6 transition-colors hover:bg-[var(--vt-surface)]"
            style={{ background: "var(--vt-panel-2)" }}
          >
            <h3 className="text-[14.5px] font-semibold text-[var(--vt-fg)]">
              {item.title}
            </h3>
            <p className="text-[13px] leading-[1.6] text-[var(--vt-fg-3)]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function FeaturesCta() {
  const t = useTranslations("features")
  return (
    <Section spacing="lg">
      <Container size="lg">
        <div
          className="rounded-[16px] border border-[var(--vt-border)] p-8 sm:p-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          style={{
            background: "var(--vt-panel-2)",
            boxShadow: "var(--vt-shadow-elevated)",
          }}
        >
          <div className="space-y-2 max-w-xl">
            <h2 className="vt-display text-[24px] sm:text-[28px] font-semibold tracking-[-0.01em] text-[var(--vt-fg)]">
              {t("ctaTitle")}
            </h2>
            <p className="text-[14px] leading-[1.6] text-[var(--vt-fg-2)]">
              {t("ctaBody")}
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-11 rounded-[10px] px-5 text-[14px] font-medium gap-2"
            style={{
              background: "var(--vt-accent)",
              color: "white",
              borderColor: "oklch(from var(--vt-accent) l c h / 0.55)",
              boxShadow: "var(--vt-shadow-primary-glow)",
            }}
          >
            <Link href="/download">
              <Download className="h-4 w-4" />
              {t("ctaButton")}
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
