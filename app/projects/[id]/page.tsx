import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react"
import { projects, profile } from "@/content"
import { withBasePath } from "@/lib/basePath"
import { buildSiteUrl } from "@/lib/site-url"
import { Reveal } from "@/components/motion/reveal"

export const dynamicParams = false

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

const ordered = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

function getProjectWithSiblings(id: string) {
  const index = ordered.findIndex((project) => project.id === id)
  if (index === -1) return null
  return {
    project: ordered[index],
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const data = getProjectWithSiblings(id)
  if (!data) return { title: "Project not found" }

  const { project } = data
  const title = `${project.title} – Project`
  const description = project.oneLine || project.description.slice(0, 160)
  const canonicalUrl = buildSiteUrl(`/projects/${project.id}`)

  const ogImagePath = project.projectImageUrl || "/og.png"
  const ogImageUrl = ogImagePath.startsWith("http") ? ogImagePath : buildSiteUrl(ogImagePath)

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: `${profile.name} – Portfolio`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImageUrl] },
  }
}

function formatDate(date: string) {
  const parsed = new Date(`${date}-01`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long" })
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params
  const data = getProjectWithSiblings(id)
  if (!data) notFound()

  const { project, prev, next } = data!
  const imageSrc = project.projectImageUrl
    ? project.projectImageUrl.startsWith("http")
      ? project.projectImageUrl
      : withBasePath(project.projectImageUrl)
    : null

  return (
    <main className="container-page pt-32 pb-8 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal y={12}>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All projects
          </Link>
        </Reveal>

        <Reveal delay={0.05} y={16}>
          <div className="mt-10 space-y-4">
            <p className="mono-label">
              {formatDate(project.date)} <span aria-hidden="true">·</span> {project.tags.join(" / ")}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {project.title}
              <span className="text-accent">.</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.oneLine}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                Live demo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <Github className="h-4 w-4" />
                Source
              </a>
            )}
          </div>
        </Reveal>

        {imageSrc && (
          <Reveal delay={0.12}>
            <div className="mt-12 overflow-hidden rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc} alt={project.title} className="w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.14}>
          <div className="hairline-t mt-12 grid gap-3 pt-8 md:grid-cols-[200px_minmax(0,1fr)]">
            <h2 className="mono-label">Overview</h2>
            <p className="leading-relaxed text-muted-foreground">{project.description}</p>
          </div>
        </Reveal>

        {project.highlights.length > 0 && (
          <Reveal>
            <div className="hairline-t mt-8 grid gap-3 pt-8 md:grid-cols-[200px_minmax(0,1fr)]">
              <h2 className="mono-label">Highlights</h2>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="mt-px select-none font-mono text-accent" aria-hidden="true">
                      +
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="hairline-t mt-8 grid gap-3 pt-8 md:grid-cols-[200px_minmax(0,1fr)]">
            <h2 className="mono-label">Stack</h2>
            <p className="font-mono text-sm leading-7 text-muted-foreground">
              {project.stack.join(" · ")}
            </p>
          </div>
        </Reveal>

        {(prev || next) && (
          <nav className="hairline-t mt-16 grid gap-6 pt-8 sm:grid-cols-2" aria-label="Adjacent projects">
            {prev ? (
              <Link href={`/projects/${prev.id}`} className="group space-y-1">
                <p className="mono-label flex items-center gap-2">
                  <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-1" />
                  Previous
                </p>
                <p className="font-medium transition-colors duration-200 group-hover:text-accent">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/projects/${next.id}`} className="group space-y-1 sm:text-right">
                <p className="mono-label flex items-center gap-2 sm:justify-end">
                  Next
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                </p>
                <p className="font-medium transition-colors duration-200 group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  )
}
