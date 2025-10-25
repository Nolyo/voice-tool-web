"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mic, Activity, Keyboard, ClipboardPaste, History, Layout } from "lucide-react"
import { useTranslations } from "next-intl"

const iconMap = [Mic, Activity, Keyboard, ClipboardPaste, History, Layout]

export function FeaturesSection() {
  const t = useTranslations("features")
  const items = t.raw("items") as Array<{ title: string; description: string }>

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("subheading")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature, index) => {
            const Icon = iconMap[index]
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
