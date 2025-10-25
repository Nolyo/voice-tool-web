import { Card, CardContent } from "@/components/ui/card"
import { Megaphone, BookOpen, Package, Zap, Shield, Globe } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Megaphone,
      title: "Promotion efficace",
      description:
        "Créez des landing pages attrayantes et des campagnes marketing pour promouvoir votre logiciel auprès de votre audience cible.",
    },
    {
      icon: BookOpen,
      title: "Documentation complète",
      description:
        "Générez automatiquement une documentation interactive et recherchable à partir de votre code source.",
    },
    {
      icon: Package,
      title: "Distribution simplifiée",
      description:
        "Distribuez vos releases sur toutes les plateformes majeures avec un seul clic. npm, Docker, GitHub, et plus encore.",
    },
    {
      icon: Zap,
      title: "Performance optimale",
      description:
        "CDN global et optimisations automatiques pour garantir des téléchargements ultra-rapides partout dans le monde.",
    },
    {
      icon: Shield,
      title: "Sécurité renforcée",
      description: "Signature de code, vérification d'intégrité et protection contre les vulnérabilités connues.",
    },
    {
      icon: Globe,
      title: "Portée mondiale",
      description:
        "Support multilingue et infrastructure distribuée pour atteindre des utilisateurs dans le monde entier.",
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Tout ce dont vous avez besoin</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Une plateforme complète pour gérer l'ensemble du cycle de vie de votre logiciel, de la promotion à la
            distribution.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border bg-card transition-colors hover:bg-card/80">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
