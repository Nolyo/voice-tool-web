import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { ArrowRight, Check } from "lucide-react"

export function LocalOrCloud() {
  const t = useTranslations("home.localCloud")
  const localItems = t.raw("local.items") as string[]
  const cloudItems = t.raw("cloud.items") as string[]

  return (
    <Section
      spacing="lg"
      className="border-t border-[var(--vt-border)]"
    >
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start">
          <div className="space-y-4">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="vt-display text-[32px] sm:text-[40px] font-semibold tracking-[-0.015em] leading-[1.1] text-[var(--vt-fg)]">
              {t("heading")}
            </h2>
            <p className="text-[15px] leading-[1.6] text-[var(--vt-fg-2)] max-w-md">
              {t("subhead")}
            </p>
            <Link
              href="/pricing"
              className="vt-mono inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em] text-[var(--vt-accent-2)] hover:text-[var(--vt-fg)] transition-colors pt-3"
            >
              {t("ctaLabel")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--vt-border)] sm:grid-cols-2 bg-[var(--vt-border)]">
            <PlanCard
              tag={t("local.tag")}
              tagTone="ok"
              title={t("local.title")}
              items={localItems}
              price={t("local.price")}
              priceMeta=""
            />
            <PlanCard
              tag={t("cloud.tag")}
              tagTone="violet"
              title={t("cloud.title")}
              items={cloudItems}
              price={t("cloud.price")}
              priceMeta={t("cloud.priceMeta")}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

function PlanCard({
  tag,
  tagTone,
  title,
  items,
  price,
  priceMeta,
}: {
  tag: string
  tagTone: "ok" | "violet"
  title: string
  items: string[]
  price: string
  priceMeta: string
}) {
  return (
    <article
      className="flex flex-col gap-5 p-7 sm:p-8"
      style={{ background: "var(--vt-panel-2)" }}
    >
      <Eyebrow tone={tagTone} withDot>
        {tag}
      </Eyebrow>
      <h3 className="vt-display text-[22px] font-semibold tracking-[-0.005em] text-[var(--vt-fg)]">
        {title}
      </h3>
      <ul className="space-y-2.5 pt-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--vt-fg-2)]"
          >
            <Check
              className="h-3.5 w-3.5 mt-1 shrink-0"
              style={{
                color:
                  tagTone === "ok"
                    ? "var(--vt-ok)"
                    : "var(--vt-violet)",
              }}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5 border-t border-[var(--vt-border)]">
        <div className="vt-mono text-[20px] font-semibold tabular-nums text-[var(--vt-fg)]">
          {price}
        </div>
        {priceMeta ? (
          <div className="vt-mono mt-1 text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
            {priceMeta}
          </div>
        ) : null}
      </div>
    </article>
  )
}
