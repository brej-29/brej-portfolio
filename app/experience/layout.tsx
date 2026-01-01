import type React from "react"
import type { Metadata } from "next"
import { profile } from "@/content/siteData"
import { buildSiteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional software engineering and data experience for ${profile.name}.`,
  alternates: {
    canonical: buildSiteUrl("/experience"),
  },
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children
}