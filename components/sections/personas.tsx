import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"

interface Persona {
  tag: string
  title: string
  body: string
  footnote: string
}

const tones = ["accent", "violet", "warn"] as const

export function Personas() {
  const t = useTranslations("home.personas")
  const items = t.raw("items") as Persona[]

  return (
    <Section spacing="lg" className="border-t border-[var(--vt-border)]">
      <Container size="lg">
        <div className="mb-10 max-w-2xl space-y-3">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="vt-display text-[32px] sm:text-[40px] font-semibold tracking-[-0.015em] leading-[1.1] text-[var(--vt-fg)]">
            {t("heading")}
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--vt-border)] md:grid-cols-3 bg-[var(--vt-border)]">
          {items.map((persona, i) => {
            const tone = tones[i % tones.length]
            return (
              <article
                key={i}
                className="flex flex-col gap-5 p-7 transition-colors hover:bg-[var(--vt-surface)]"
                style={{ background: "var(--vt-panel-2)" }}
              >
                <Eyebrow tone={tone} withDot>
                  {persona.tag}
                </Eyebrow>
                <h3 className="vt-display text-[20px] font-semibold leading-[1.25] tracking-[-0.005em] text-[var(--vt-fg)]">
                  {persona.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-[var(--vt-fg-2)] flex-1">
                  {persona.body}
                </p>
                <p className="vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)] pt-3 border-t border-[var(--vt-border)]">
                  {persona.footnote}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
