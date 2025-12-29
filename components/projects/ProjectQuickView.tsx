"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Calendar, CheckCircle2 } from "lucide-react"
import type { Project } from "@/content/siteData"

interface ProjectQuickViewProps {
  project: Project | null
  open: boolean
  onClose: () => void
}

export function ProjectQuickView({ project, open, onClose }: ProjectQuickViewProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base">{project.oneLine}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">DESCRIPTION</h4>
            <p className="text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">KEY HIGHLIGHTS</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[var(--neon-cyan)] mt-0.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">TECH STACK</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50 text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(project.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            {project.githubUrl && (
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
