import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { experience, experienceStats } from "@/content"
import { SectionHeading } from "@/components/site/section-heading"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Counter } from "@/components/motion/counter"

const roles = [...experience].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
const keyStats = [...experienceStats].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).slice(0, 3)

export function ExperienceStrip() {
  return (
    <section className="container-page pt-24 md:pt-32">
      <SectionHeading
        index="02"
        label="Experience"
        title="Production engineering first."
        description="The reliability habits — testing, profiling, code review — come from shipping enterprise software, and they carry into every ML system I build."
      />

      <div className="mt-12 grid gap-14 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <div>
            {roles.map((role) => (
              <div key={`${role.company}-${role.dates}`} className="hairline-t py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium">{role.company}</h3>
                  <p className="font-mono text-xs text-faint">{role.dates}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{role.role}</p>
              </div>
            ))}
            <div className="hairline-t" />
            <Link
              href="/experience"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Full timeline
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid content-start gap-8" interval={0.08} delay={0.15}>
          {keyStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="hairline-t pt-5">
                <Counter
                  value={stat.value}
                  className="tabular block font-mono text-3xl font-medium tracking-tight text-accent md:text-4xl"
                />
                <p className="mt-2 text-sm font-medium">{stat.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
