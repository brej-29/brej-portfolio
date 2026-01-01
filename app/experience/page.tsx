import { Section } from "@/components/site/section"
import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Timeline } from "@/components/experience/Timeline"
import { VariableProximityText } from "@/components/premium/variable-proximity-text"
import { experience } from "@/content"
import { Sparkles } from "lucide-react"

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              <VariableProximityText
                text="Experience"
                className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey across enterprise software development, data science, and full-stack engineering.
            </p>
          </div>

          {/* Current Focus Callout */}
          <SpotlightCard className="group border-none bg-transparent shadow-none">
            <GlassCard hover className="p-6 border-[var(--neon-cyan)]/30">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-lg shadow-primary/30">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Current Focus</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Currently driving enterprise-scale solutions at Accenture while exploring cutting-edge technologies
                    in AI/ML and cloud architecture. Open to opportunities in senior engineering and technical leadership
                    roles.
                  </p>
                </div>
              </div>
            </GlassCard>
          </SpotlightCard>

          {/* Timeline */}
          <Timeline experiences={experience} />
        </div>
      </Section>
    </div>
  )
}
