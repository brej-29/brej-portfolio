import { PageHeader } from "@/components/site/page-header"
import { ProjectsIndex } from "@/components/projects/projects-index"
import { projects } from "@/content"

export default function ProjectsPage() {
  return (
    <main className="pb-8">
      <PageHeader
        label={`Projects — ${projects.length} total`}
        title="Work that made it past the notebook."
        description="End-to-end ML and data projects: trained, evaluated, deployed, and documented. Filter by area or open one for the full write-up."
      />
      <ProjectsIndex />
    </main>
  )
}
