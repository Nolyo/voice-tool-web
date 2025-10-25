export function StatsSection() {
  const stats = [
    {
      value: "50K+",
      label: "Développeurs actifs",
      company: "GitHub",
    },
    {
      value: "99.9%",
      label: "Temps de disponibilité",
      company: "AWS",
    },
    {
      value: "2M+",
      label: "Téléchargements",
      company: "npm",
    },
    {
      value: "150+",
      label: "Pays couverts",
      company: "Global",
    },
  ]

  return (
    <section className="border-y border-border bg-card/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold md:text-5xl">{stat.value}</div>
              <div className="mb-1 text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs font-mono text-muted-foreground/60">{stat.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
