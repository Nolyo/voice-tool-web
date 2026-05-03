import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroHome } from "@/components/sections/hero-home"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Personas } from "@/components/sections/personas"
import { FlagshipFeatures } from "@/components/sections/flagship-features"
import { LocalOrCloud } from "@/components/sections/local-or-cloud"
import { FinalCta } from "@/components/sections/final-cta"

export default function Home() {
  return (
    <>
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
