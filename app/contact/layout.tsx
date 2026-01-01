import type React from "react"
import type { Metadata } from "next"
import { profile, contact } from "@/content/siteData"
import { buildSiteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} for software engineering and data roles. Email: ${contact.email}.`,
  alternates: {
    canonical: buildSiteUrl("/contact"),
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}