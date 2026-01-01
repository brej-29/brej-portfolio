"use client"

import { motion, useReducedMotion } from "framer-motion"
import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Section } from "@/components/site/section"
import { VariableProximityText } from "@/components/premium/variable-proximity-text"
import { experienceStats } from "@/content"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { withBasePath } from "@/lib/basePath"

export function ExperienceSection() {
  const reducedMotion = useReducedMotion()
  const timelineHref = withBasePath("/experience")

  return (
    <Section id="experience" className="py-16 lg:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
          <VariableProximityText text="Experience & Impact" />
        </h2>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Delivering value through innovative solutions at scale
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {experienceStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.15)"
              className="group border-none bg-transparent shadow-none"
            >
              <GlassCard
                className="p-8 text-center h-full border-2 border-border/60 hover:border-[var(--neon-cyan)]/35 transition-colors duration-300"
                hover
              >
                <div className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </GlassCard>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-[var(--neon-purple)]/50 hover:bg-[var(--neon-purple)]/10 hover:border-[var(--neon-purple)]/70"
          asChild
        >
          <a href={timelineHref}>
            View Full Timeline
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </Section>
  )
}
