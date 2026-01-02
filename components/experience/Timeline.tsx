"use client"

import { useState } from "react"
import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react"
import type { Experience } from "@/content"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineProps {
  experiences: Experience[]
}

export function Timeline({ experiences }: TimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-purple)] hidden md:block" />

      <div className="space-y-8">
        {experiences.map((exp, index) => {
          const isExpanded = expandedIndex === index

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-lg shadow-primary/50 hidden md:flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-background" />
              </div>

              <div className="md:ml-16">
                <SpotlightCard className="group border-none bg-transparent shadow-none">
                  <GlassCard
                    hover
                    className="overflow-hidden border-2 border-border/60 hover:border-[var(--neon-purple)]/35 transition-colors duration-300"
                  >
                    <button onClick={() => toggleExpanded(index)} className="w-full p-6 text-left transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold mb-1 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
                            {exp.role}
                          </h3>
                          <p className="text-lg text-foreground/90 mb-2">{exp.company}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exp.dates}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 space-y-4 border-t border-border/60 pt-4">
                            {/* Responsibilities */}
                            <ul className="space-y-2">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <span className="text-[var(--neon-cyan)] mt-1.5">•</span>
                                  <span className="flex-1">{bullet}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Tech Stack */}
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-2">TECH STACK</p>
                              <div className="flex flex-wrap gap-2">
                                {exp.techStack.map((tech) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </SpotlightCard>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
