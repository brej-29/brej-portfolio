import { skills } from "@/content"
import { SectionHeading } from "@/components/site/section-heading"
import { Reveal } from "@/components/motion/reveal"
import type { Skill } from "@/content"

/** Group skills by category, preserving each category's first appearance order. */
function groupSkills() {
  const groups = new Map<string, Skill[]>()
  const ordered = [...skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  for (const skill of ordered) {
    const list = groups.get(skill.category) ?? []
    list.push(skill)
    groups.set(skill.category, list)
  }
  return Array.from(groups.entries())
}

const grouped = groupSkills()

export function Stack() {
  return (
    <section className="container-page pt-24 md:pt-32">
      <SectionHeading
        index="03"
        label="Stack"
        title="Tools chosen for the whole lifecycle."
        description="From exploration to training to serving — and the engineering around it."
      />

      <Reveal delay={0.1} className="mt-12">
        <dl>
          {grouped.map(([category, items]) => (
            <div
              key={category}
              className="hairline-t grid gap-3 py-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8"
            >
              <dt className="mono-label pt-1.5">{category}</dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[13px] text-muted-foreground transition-[border-color,color,transform] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:-translate-y-0.5 hover:border-accent/60 hover:text-foreground"
                  >
                    {skill.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={skill.icon}
                        alt=""
                        width={14}
                        height={14}
                        loading="lazy"
                        className="h-3.5 w-3.5 object-contain"
                      />
                    )}
                    {skill.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
          <div className="hairline-t" />
        </dl>
      </Reveal>
    </section>
  )
}
