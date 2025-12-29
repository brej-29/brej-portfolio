"use client"

import { GlassCard } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Eye } from "lucide-react"
import type { Project } from "@/content/siteData"
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
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <GlassCard hover spotlight className="h-full p-6 flex flex-col">
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

        <div className="flex gap-2 mt-6 pt-4 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onQuickView(project)}>
            <Eye className="mr-2 h-4 w-4" />
            Quick View
          </Button>
          {project.githubUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </GlassCard>
    </motion.div>
  )
}
