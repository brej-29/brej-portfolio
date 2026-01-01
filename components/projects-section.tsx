"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Section } from "@/components/site/section"
import { featuredProjects } from "@/content/siteData"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { withBasePath } from "@/lib/basePath"

export function ProjectsSection() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const projectsHref = withBasePath("/projects")

  useEffect(() => {
    const mediaQuery = window.matchMedia("prefers-reduced-motion: reduce")
    setReducedMotion(mediaQuery.matches)
  }, [])

  return (
    <Section
      id="projects"
      heading="Featured Projects"
      subheading="A selection of my recent work showcasing full-stack development and data science expertise"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <SpotlightCard className="group border-none bg-transparent shadow-none">
              <GlassCard
                className="p-6 h-full flex flex-col hover:border-[var(--neon-purple)]/35 group border-2 border-border/60 transition-colors duration-300"
                hover
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] border border-[var(--neon-purple)]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--neon-cyan)] transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 flex-grow">{project.summary}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent border-[var(--neon-purple)]/40 hover:bg-[var(--neon-purple)]/10 hover:border-[var(--neon-purple)]/60"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </GlassCard>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-[var(--neon-purple)]/50 hover:bg-[var(--neon-purple)]/10 hover:border-[var(--neon-purple)]/70"
          asChild
        >
          <a href={projectsHref}>
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </Section>
  )
}
