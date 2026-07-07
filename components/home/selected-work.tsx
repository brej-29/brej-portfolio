import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "@/content"
import { SectionHeading } from "@/components/site/section-heading"
import { WorkRow } from "@/components/projects/work-row"
import { Reveal } from "@/components/motion/reveal"

const selected = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).slice(0, 4)

export function SelectedWork() {
  return (
    <section className="container-page pt-24 md:pt-32">
      <SectionHeading
        index="01"
        label="Selected work"
        title="Projects built to ship, not to demo."
        description="End-to-end ML and data systems — trained, evaluated, deployed, and documented."
      />

      <Reveal delay={0.1} className="mt-12">
        <div>
          {selected.map((project, index) => (
            <WorkRow key={project.id} project={project} index={index} />
          ))}
          <div className="hairline-t" />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <Link
          href="/projects"
          className="group mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          All projects
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}
