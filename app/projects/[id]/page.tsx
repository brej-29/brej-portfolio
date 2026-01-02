import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Section } from "@/components/site/section"
import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, ArrowRight, Github, ExternalLink, CheckCircle2 } from "lucide-react"
import { projects, profile } from "@/content"
import { withBasePath } from "@/lib/basePath"
import { buildSiteUrl } from "@/lib/site-url"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

function getProjectWithSiblings(id: string) {
  const index = projects.findIndex((project) => project.id === id)
  if (index === -1) return null

  const project = projects[index]
  const prev = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null

  return { project, prev, next }
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const data = getProjectWithSiblings(id)
  if (!data) {
    return {
      title: "Project not found",
    }
  }

  const { project } = data
  const title = `${project.title} – Project`
  const description = project.oneLine || project.description.slice(0, 160)
  const canonicalPath = `/projects/${project.id}`
  const canonicalUrl = buildSiteUrl(canonicalPath)

  const ogImagePath =
    typeof project.projectImageUrl === "string" && project.projectImageUrl.length > 0
      ? project.projectImageUrl
      : "/og.png"

  const ogImageUrl =
    ogImagePath.startsWith("http://") || ogImagePath.startsWith("https://")
      ? ogImagePath
      : buildSiteUrl(ogImagePath)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: `${profile.name} – Portfolio`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params
  const data = getProjectWithSiblings(id)

  if (!data) {
    notFound()
  }

  const { project, prev, next } = data!

  const projectsHref = withBasePath("/projects")
  const projectImagePath = project.projectImageUrl
  const projectImageSrc =
    projectImagePath && projectImagePath.length > 0
      ? projectImagePath.startsWith("http://") || projectImagePath.startsWith("https://")
        ? projectImagePath
        : withBasePath(projectImagePath)
      : null

  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  const prevHref = prev ? withBasePath(`/projects/${prev.id}`) : null
  const nextHref = next ? withBasePath(`/projects/${next.id}`) : null

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <Section>
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="px-0 text-muted-foreground hover:text-foreground"
            >
              <a href={projectsHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </a>
            </Button>

            <div className="flex gap-2">
              {prev && prevHref && (
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <a href={prevHref} aria-label={`Previous project: ${prev.title}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </a>
                </Button>
              )}
              {next && nextHref && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-transparent border-[var(--neon-purple)]/40 hover:bg-[var(--neon-purple)]/10 hover:border-[var(--neon-purple)]/60"
                >
                  <a href={nextHref} aria-label={`Next project: ${next.title}`}>
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] items-start">
            <SpotlightCard className="p-6 group border-none bg-transparent shadow-none">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
                      {project.title}
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground">{project.oneLine}</p>
                </div>

                {projectImageSrc && (
                  <div className="overflow-hidden rounded-xl border border-border/60 bg-black/20">
                    <img
                      src={projectImageSrc}
                      alt={project.title}
                      className="w-full h-auto object-cover max-h-80"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-muted-foreground tracking-wide">
                    OVERVIEW
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground/90">
                    {project.description}
                  </p>
                </div>

                {project.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-muted-foreground tracking-wide">
                      HIGHLIGHTS
                    </h2>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--neon-cyan)] flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.tags.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-muted-foreground tracking-wide">
                      TAGS
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.stack.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-muted-foreground tracking-wide">
                      TECH STACK
                    </h2>
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
                )}
              </div>
            </SpotlightCard>

            <GlassCard className="p-6 lg:sticky lg:top-24 space-y-5" hover>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--neon-cyan)] tracking-[0.2em] uppercase">
                  Quick Facts
                </p>
                <h2 className="text-lg font-semibold">Project Snapshot</h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>

                {project.stack.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md bg-card/80 border border-border/60 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(project.links.github || project.links.demo) && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">Links</p>
                    <div className="flex flex-wrap gap-2">
                      {project.links.github && (
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button
                          size="sm"
                          asChild
                          className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90"
                        >
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {(prev || next) && (
            <div className="flex flex-wrap justify-between gap-4 pt-4 border-t border-border/40">
              {prev && prevHref && (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1">Previous</span>
                  <a
                    href={prevHref}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {prev.title}
                  </a>
                </div>
              )}
              {next && nextHref && (
                <div className="flex flex-col ml-auto text-right">
                  <span className="text-xs text-muted-foreground mb-1">Next</span>
                  <a
                    href={nextHref}
                    className="inline-flex items-center justify-end text-sm text-muted-foreground hover:text-foreground"
                  >
                    {next.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}