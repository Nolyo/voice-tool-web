import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroHome } from "@/components/sections/hero-home"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Personas } from "@/components/sections/personas"
import { FlagshipFeatures } from "@/components/sections/flagship-features"
import { LocalOrCloud } from "@/components/sections/local-or-cloud"
import { FinalCta } from "@/components/sections/final-cta"
import { SoftwareApplicationJsonLd } from "@/components/seo/software-application-jsonld"
import type { Locale } from "@/lib/site-config"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <>
      <SoftwareApplicationJsonLd locale={locale as Locale} />
      <Header />
      <main id="main">
        <HeroHome />
        <HowItWorks />
        <Personas />
        <FlagshipFeatures />
        <LocalOrCloud />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
