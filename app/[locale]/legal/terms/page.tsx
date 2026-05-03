import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { useTranslations } from "next-intl"
import { buildMetadata } from "@/lib/metadata"
import type { Locale } from "@/lib/site-config"
import type { Metadata } from "next"

interface LegalSection {
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
    namespace: "legal.terms",
    path: "/legal/terms",
    locale: locale as Locale,
  })
}

export default function TermsPage() {
  const t = useTranslations("legal.terms")
  const sections = t.raw("sections") as LegalSection[]
  return (
    <>
      <Header />
      <main id="main" className="pt-24 pb-16">
        <Section spacing="md">
          <Container size="md">
            <div className="space-y-4 max-w-2xl">
              <Eyebrow tone="warn">{t("draftWarning")}</Eyebrow>
              <h1 className="vt-display text-[36px] sm:text-[44px] font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--vt-fg)]">
                {t("title")}
              </h1>
              <p className="vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
                {t("lastUpdated")}
              </p>
            </div>
            <div className="mt-12 space-y-10 max-w-3xl">
              {sections.map((s, i) => (
                <section key={i} className="space-y-3">
                  <h2 className="vt-display text-[19px] font-semibold tracking-[-0.005em] text-[var(--vt-fg)]">
                    {s.title}
                  </h2>
                  <p className="text-[14px] leading-[1.7] text-[var(--vt-fg-2)]">
                    {s.body}
                  </p>
                </section>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
