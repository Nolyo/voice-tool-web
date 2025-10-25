"use client"

import { useTranslations } from "next-intl"

export function StatsSection() {
  const t = useTranslations("stats")
  const items = t.raw("items") as Array<{ value: string; label: string; description: string }>

  return (
    <section className="border-y border-border bg-card/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold md:text-5xl">{stat.value}</div>
              <div className="mb-1 text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs font-mono text-muted-foreground/60">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
