import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-card to-card p-12 md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">
              Prêt à transformer votre distribution logicielle ?
            </h2>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
              Rejoignez des milliers de développeurs qui font confiance à notre plateforme pour promouvoir et distribuer
              leurs logiciels.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 text-base">
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                Planifier une démo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
