"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/site/glass-card"
import { Section } from "@/components/site/section"
import { experienceStats } from "@/content/siteData"
import { useState, useEffect } from "react"

export function ExperienceSection() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)
  }, [])

  return (
    <Section
      id="experience"
      heading="Experience & Impact"
      subheading="Delivering value through innovative solutions at scale"
      className="py-16 lg:py-24"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {experienceStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <GlassCard className="p-8 text-center" hover spotlight>
              <div className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
