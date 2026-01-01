"use client"

import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Eye } from "lucide-react"
import type { Project } from "@/content"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: Project
  onQuickView: (project: Project) => void
}

export function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <SpotlightCard className="group border-none bg-transparent shadow-none">
        <GlassCard
          hover
          className="h-full p-6 flex flex-col border-2 border-border/60 hover:border-[var(--neon-purple)]/35 transition-colors duration-300"
        >
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">{project.oneLine}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-6 pt-4 border-t border-border/60">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent border-[var(--neon-purple)]/40 hover:bg-[var(--neon-purple)]/10 hover:border-[var(--neon-purple)]/60"
              onClick={() => onQuickView(project)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Quick View
            </Button>
            {project.links?.github && (
              <Button
                variant="outline"
                size="icon"
                className="border-border/60 hover:border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/10 bg-transparent"
                asChild
              >
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project code on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.links?.demo && (
              <Button
                variant="outline"
                size="icon"
                className="border-border/60 hover:border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/10 bg-transparent"
                asChild
              >
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live project demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </GlassCard>
      </SpotlightCard>
    </motion.div>
  )
}
