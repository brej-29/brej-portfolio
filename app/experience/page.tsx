import { PageHeader } from "@/components/site/page-header"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Counter } from "@/components/motion/counter"
import { experience, experienceStats } from "@/content"

const roles = [...experience].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
const stats = [...experienceStats].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export default function ExperiencePage() {
  return (
    <main className="pb-8">
      <PageHeader
        label="Experience"
        title="Engineering discipline, applied to ML."
        description="Production software first, machine learning second — in the order that makes ML systems actually hold up."
      />

      {/* Timeline */}
      <div className="container-page mt-16">
        <ol className="relative space-y-14 border-l border-[var(--hairline)] pl-8 md:pl-12">
          {roles.map((role, i) => (
            <Reveal key={`${role.company}-${role.dates}`} as="li" delay={i * 0.05} className="relative">
              {/* Timeline marker */}
              <span
                className="absolute -left-8 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent md:-left-12"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-faint">
                {role.dates} <span aria-hidden="true">·</span> {role.location}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{role.company}</h2>
              <p className="mt-1 text-muted-foreground">{role.role}</p>

              <ul className="mt-5 max-w-2xl space-y-2.5">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="mt-px select-none font-mono text-accent" aria-hidden="true">
                      +
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-mono text-xs text-faint">{role.techStack.join(" · ")}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Full impact grid */}
      <div className="container-page mt-24">
        <Reveal>
          <p className="mono-label">
            <span className="text-accent">Impact</span> — measured, not claimed
          </p>
        </Reveal>
        <Stagger className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" interval={0.05}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="hairline-t pt-5">
                <Counter
                  value={stat.value}
                  className="tabular block font-mono text-2xl font-medium tracking-tight text-accent"
                />
                <p className="mt-2 text-sm font-medium">{stat.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </main>
  )
}
