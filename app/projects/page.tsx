"use client"

import { useState } from "react"
import { Section } from "@/components/site/section"
import { ProjectFilters } from "@/components/projects/ProjectFilters"
import { ProjectQuickView } from "@/components/projects/ProjectQuickView"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { ScrollVelocityText } from "@/components/premium/scroll-velocity-text"
import { projects } from "@/content/siteData"
import { filterProjects, getAllTags } from "@/lib/filtering"
import type { Project } from "@/content/siteData"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical">("recent")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const availableTags = getAllTags(projects)
  const filteredProjects = filterProjects(projects, searchQuery, selectedTags, sortBy)

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleQuickView = (project: Project) => {
    setSelectedProject(project)
    setQuickViewOpen(true)
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <Section>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="overflow-hidden -mx-4">
            <ScrollVelocityText className="text-muted-foreground/5">PROJECTS</ScrollVelocityText>
          </div>

          {/* Header */}
          <div className="space-y-4 text-center -mt-20">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work spanning full-stack development, machine learning, and enterprise solutions. Each
              project demonstrates my commitment to building scalable, impactful applications.
            </p>
          </div>

          {/* Filters */}
          <ProjectFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <SpotlightCard key={project.id} className="p-6 group">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.links.github && (
                        <Button size="sm" variant="outline" asChild className="bg-transparent">
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1 h-3 w-3" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button size="sm" variant="outline" asChild className="bg-transparent">
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Demo
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => handleQuickView(project)} className="ml-auto">
                        Quick View
                      </Button>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </Section>

      {/* Quick View Modal */}
      <ProjectQuickView project={selectedProject} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </div>
  )
}
