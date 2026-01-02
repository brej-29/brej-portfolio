import type { Project, Certificate } from "@/content"

export function filterProjects(
  projects: Project[],
  searchQuery: string,
  selectedTags: string[],
  sortBy: "recent" | "alphabetical",
): Project[] {
  let filtered = [...projects]

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.oneLine.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  // Filter by tags
  if (selectedTags.length > 0) {
    filtered = filtered.filter((project) => selectedTags.some((tag) => project.tags.includes(tag)))
  }

  // Sort
  if (sortBy === "alphabetical") {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  } else {
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return filtered
}

export function filterCertificates(certificates: Certificate[], searchQuery: string, selectedIssuers: string[]) {
  let filtered = [...certificates]

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (cert) =>
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.skillsTags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  // Filter by issuer
  if (selectedIssuers.length > 0) {
    filtered = filtered.filter((cert) => selectedIssuers.includes(cert.issuer))
  }

  return filtered
}

export function getAllTags(projects: Project[]): string[] {
  const tagSet = new Set<string>()
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function getAllIssuers(certificates: Certificate[]): string[] {
  const issuerSet = new Set<string>()
  certificates.forEach((cert) => issuerSet.add(cert.issuer))
  return Array.from(issuerSet).sort()
}
