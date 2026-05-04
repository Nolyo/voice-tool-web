import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Check, Download, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { buildMetadata } from "@/lib/metadata"
import type { Locale } from "@/lib/site-config"
import { siteConfig } from "@/lib/site-config"
import type { Metadata } from "next"

interface CompareRow {
  label: string
  free: boolean
  pro: boolean
}

interface FaqItem {
  q: string
  a: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    namespace: "pricing",
    path: "/pricing",
    locale: locale as Locale,
  })
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-24 pb-16">
        <PricingHero />
        <PricingPlans />
        <CompareTable />
        <PricingFaq />
      </main>
      <Footer />
    </>
  )
}

function PricingHero() {
  const t = useTranslations("pricing.hero")
  return (
    <Section spacing="md">
      <Container size="lg">
        <div className="max-w-2xl space-y-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="vt-display text-[40px] sm:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--vt-fg)]">
            {t("title")}
          </h1>
          <p className="text-[16px] leading-[1.6] text-[var(--vt-fg-2)]">
            {t("subhead")}
          </p>
        </div>
      </Container>
    </Section>
  )
}

function PricingPlans() {
  const t = useTranslations("pricing.plans")
  const freeItems = t.raw("free.items") as string[]
  const proItems = t.raw("pro.items") as string[]
  return (
    <Section spacing="md">
      <Container size="lg">
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
          {/* Free plan */}
          <article
            className="rounded-[16px] border border-[var(--vt-border)] p-7 sm:p-9 flex flex-col gap-6"
            style={{
              background: "var(--vt-panel-2)",
              boxShadow: "var(--vt-shadow-elevated)",
            }}
          >
            <div className="flex items-center justify-between">
              <Eyebrow tone="ok" withDot>
                {t("free.tag")}
              </Eyebrow>
            </div>
            <h2 className="vt-display text-[24px] font-semibold tracking-[-0.01em] text-[var(--vt-fg)]">
              {t("free.name")}
            </h2>
            <div>
              <div className="vt-mono text-[44px] font-semibold tabular-nums text-[var(--vt-fg)]">
                {t("free.price")}
              </div>
              <div className="vt-mono mt-1 text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
                {t("free.priceMeta")}
              </div>
            </div>
            <p className="text-[14px] leading-[1.6] text-[var(--vt-fg-2)]">
              {t("free.summary")}
            </p>
            <ul className="space-y-3 flex-1">
              {freeItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--vt-fg-2)]"
                >
                  <Check
                    className="h-3.5 w-3.5 mt-1 shrink-0"
                    style={{ color: "var(--vt-ok)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="h-11 rounded-[10px] px-5 text-[14px] font-medium gap-2 mt-2"
              style={{
                background: "var(--vt-accent-strong)",
                color: "white",
                boxShadow: "var(--vt-shadow-primary-glow)",
                borderColor: "oklch(from var(--vt-accent) l c h / 0.55)",
              }}
            >
              <Link href="/download">
                <Download className="h-4 w-4" />
                {t("free.cta")}
              </Link>
            </Button>
          </article>

          {/* Pro plan */}
          <article
            className="relative rounded-[16px] border p-7 sm:p-9 flex flex-col gap-6"
            style={{
              background: "var(--vt-panel-2)",
              borderColor: "oklch(from var(--vt-violet) l c h / 0.5)",
              boxShadow:
                "var(--vt-shadow-elevated), 0 0 0 1px oklch(from var(--vt-violet) l c h / 0.2)",
            }}
          >
            <div className="flex items-center justify-between">
              <Eyebrow tone="violet" withDot>
                {t("pro.tag")}
              </Eyebrow>
              <span className="vt-mono text-[10px] uppercase tracking-[0.1em] text-[var(--vt-fg-4)]">
                v3.0 launch
              </span>
            </div>
            <h2 className="vt-display text-[24px] font-semibold tracking-[-0.01em] text-[var(--vt-fg)]">
              {t("pro.name")}
            </h2>
            <div>
              <div
                className="vt-mono text-[44px] font-semibold tabular-nums"
                style={{ color: "var(--vt-violet)" }}
              >
                {t("pro.price")}
              </div>
              <div className="vt-mono mt-1 text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
                {t("pro.priceMeta")}
              </div>
            </div>
            <p className="text-[14px] leading-[1.6] text-[var(--vt-fg-2)]">
              {t("pro.summary")}
            </p>
            <ul className="space-y-3 flex-1">
              {proItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--vt-fg-2)]"
                >
                  <Check
                    className="h-3.5 w-3.5 mt-1 shrink-0"
                    style={{ color: "var(--vt-violet)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="h-11 rounded-[10px] px-5 text-[14px] font-medium gap-2 mt-2"
              style={{
                background: "var(--vt-violet-soft)",
                color: "var(--vt-violet)",
                border: "1px solid oklch(from var(--vt-violet) l c h / 0.4)",
              }}
            >
              <a
                href={`${siteConfig.githubRepo}/subscription`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                {t("pro.cta")}
              </a>
            </Button>
            <p className="vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
              {t("pro.ctaNote")}
            </p>
          </article>
        </div>
      </Container>
    </Section>
  )
}

function CompareTable() {
  const t = useTranslations("pricing")
  const rows = t.raw("rows") as CompareRow[]
  return (
    <Section spacing="md" className="border-t border-[var(--vt-border)]">
      <Container size="md">
        <div className="mb-8 flex items-baseline justify-between border-b border-[var(--vt-border)] pb-5">
          <h2 className="vt-display text-[24px] font-semibold tracking-[-0.005em] text-[var(--vt-fg)]">
            {t("compareTitle")}
          </h2>
          <Eyebrow>{t("compareNote")}</Eyebrow>
        </div>
        <div className="rounded-[14px] border border-[var(--vt-border)] overflow-hidden">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr
                className="text-left vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]"
                style={{ background: "var(--vt-panel)" }}
              >
                <th className="px-5 py-3 font-semibold">Feature</th>
                <th className="px-5 py-3 text-center font-semibold">
                  Local
                </th>
                <th
                  className="px-5 py-3 text-center font-semibold"
                  style={{ color: "var(--vt-violet)" }}
                >
                  Cloud
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-[var(--vt-border)]"
                  style={{
                    background:
                      i % 2 === 0 ? "var(--vt-panel-2)" : "var(--vt-panel)",
                  }}
                >
                  <td className="px-5 py-3 text-[var(--vt-fg-2)]">
                    {row.label}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <CellMark on={row.free} tone="ok" />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <CellMark on={row.pro} tone="violet" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  )
}

function CellMark({ on, tone }: { on: boolean; tone: "ok" | "violet" }) {
  if (!on) {
    return (
      <span className="vt-mono inline-flex h-5 w-5 items-center justify-center rounded text-[var(--vt-fg-4)]">
        —
      </span>
    )
  }
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full"
      style={{
        background:
          tone === "ok" ? "var(--vt-ok-soft)" : "var(--vt-violet-soft)",
        color: tone === "ok" ? "var(--vt-ok)" : "var(--vt-violet)",
      }}
    >
      <Check className="h-3 w-3" strokeWidth={2.5} />
    </span>
  )
}

function PricingFaq() {
  const t = useTranslations("pricing.faq")
  const items = t.raw("items") as FaqItem[]
  return (
    <Section spacing="lg" className="border-t border-[var(--vt-border)]">
      <Container size="md">
        <h2 className="vt-display mb-8 text-[28px] font-semibold tracking-[-0.01em] text-[var(--vt-fg)]">
          {t("title")}
        </h2>
        <div className="rounded-[14px] border border-[var(--vt-border)] overflow-hidden divide-y divide-[var(--vt-border)]">
          {items.map((item, i) => (
            <details
              key={i}
              className="group"
              style={{ background: "var(--vt-panel-2)" }}
            >
              <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-4 hover:bg-[var(--vt-surface)] transition-colors">
                <span className="text-[14px] font-medium text-[var(--vt-fg)]">
                  {item.q}
                </span>
                <span
                  className="vt-mono text-[10px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)] group-open:hidden"
                >
                  + ouvrir
                </span>
                <span
                  className="vt-mono text-[10px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)] hidden group-open:inline"
                >
                  − fermer
                </span>
              </summary>
              <div
                className="px-6 pb-5 text-[13.5px] leading-[1.65] text-[var(--vt-fg-2)] vt-anim-fade-up"
                style={{ background: "var(--vt-panel)" }}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
