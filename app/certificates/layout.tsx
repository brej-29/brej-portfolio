import type React from "react"
import type { Metadata } from "next"
import { profile } from "@/content"
import { buildSiteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "Certificates",
  description: `Professional certifications and credentials showcasing ${profile.name}'s skills in cloud, ML, and engineering.`,
  alternates: {
    canonical: buildSiteUrl("/certificates"),
  },
}

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return children
}