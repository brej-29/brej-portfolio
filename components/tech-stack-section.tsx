"use client"

import { GlassCard } from "@/components/site/glass-card"
import { Section } from "@/components/site/section"
import { LogoLoop } from "@/components/premium/logo-loop"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { techStack, skills } from "@/content"
import { Code2 } from "lucide-react"

export function TechStackSection() {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill.name)
      return acc
    },
    {} as Record<string, string[]>,
  )

  const techStackItems = techStack.map((tech) => ({
    name: tech,
    icon: <Code2 className="h-4 w-4" />,
  }))

  return (
    <Section
      id="skills"
      heading="Tech Stack & Skills"
      subheading="Technologies I work with to build modern, scalable applications"
      className="py-16 lg:py-24"
    >
      <div className="mb-16">
        <LogoLoop items={techStackItems} speed={30} />
      </div>

      {/* Skills Grid by Category */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(groupedSkills).map(([category, skillList]) => (
          <SpotlightCard key={category} className="group border-none bg-transparent shadow-none">
            <GlassCard className="p-6" hover>
              <h3 className="text-lg font-semibold mb-4 text-[var(--neon-purple)]">{category}</h3>
              <ul className="space-y-2">
                {skillList.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)]" />
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  )
}
