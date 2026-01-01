import type React from "react"
import type { Metadata } from "next"
import { profile, projects } from "@/content/siteData"
import { buildSiteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected software engineering, full-stack, and data projects delivered by ${profile.name}.`,
  alternates: {
    canonical: buildSiteUrl("/projects"),
  },
}

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects",
  url: buildSiteUrl("/projects"),
  description: `A curated collection of software engineering, full-stack, and data projects by ${profile.name}.`,
  hasPart: projects.slice(0, 20).map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    description: project.oneLine,
    url: buildSiteUrl(`/projects/${project.id}`),
    datePublished: project.date,
  })),
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }} />
      {children}
    </>
  )
}