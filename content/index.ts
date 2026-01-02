import { z } from "zod"
import rawContent from "./generated/content.json"

const ProfileSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  location: z.string().min(1),
  summaryBullets: z.array(z.string().min(1)).min(1),
  heroTaglines: z.array(z.string().min(1)).min(1),
  heroPrimaryCtaLabel: z.string().min(1),
  heroPrimaryCtaHref: z.string().min(1),
  heroSecondaryCtaLabel: z.string().min(1),
  heroSecondaryCtaHref: z.string().min(1),
  resumeLabel: z.string().min(1),
  resumeUrl: z.string().min(1),
  footerTagline: z.string().optional(),
  handle: z.string().optional(),
  statusText: z.string().optional(),
  avatarUrl: z.string().optional(),
  miniAvatarUrl: z.string().optional(),
})

const SocialLinkSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().optional(),
})

const SkillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  icon: z.string().optional(),
  order: z.number().optional(),
})

const FeaturedProjectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  stack: z.array(z.string().min(1)).min(1),
  githubUrl: z.string().min(1).optional(),
  liveUrl: z.string().min(1).optional(),
  order: z.number().optional(),
})

const ProjectLinksSchema = z.object({
  github: z.string().min(1).optional(),
  demo: z.string().min(1).optional(),
})

const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  oneLine: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  stack: z.array(z.string().min(1)).min(1),
  links: ProjectLinksSchema,
  highlights: z.array(z.string().min(1)).min(1),
  date: z.string().min(1),
  order: z.number().optional(),
  projectImageUrl: z.string().min(1).optional(),
})

const ExperienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  dates: z.string().min(1),
  location: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(1),
  techStack: z.array(z.string().min(1)).min(1),
  order: z.number().optional(),
})

const CertificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().min(1),
  credentialUrl: z.string().min(1).optional(),
  skillsTags: z.array(z.string().min(1)).min(1),
  order: z.number().optional(),
})

const ContactSchema = z.object({
  email: z.string().min(1),
  location: z.string().min(1),
  availability: z.string().min(1),
  socials: z.array(SocialLinkSchema),
})

const ExperienceStatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional(),
})

const NavItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  visible: z.boolean().default(true),
  order: z.number().optional(),
})

const SeoSchema = z.object({
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(1),
  twitterHandle: z.string().optional(),
  ogImage: z.string().min(1),
})

export const ContentSchema = z.object({
  profile: ProfileSchema,
  socialLinks: z.array(SocialLinkSchema),
  skills: z.array(SkillSchema),
  techStack: z.array(z.string().min(1)),
  featuredProjects: z.array(FeaturedProjectSchema),
  projects: z.array(ProjectSchema),
  experience: z.array(ExperienceSchema),
  certificates: z.array(CertificateSchema),
  contact: ContactSchema,
  experienceStats: z.array(ExperienceStatSchema),
  navItems: z.array(NavItemSchema),
  seo: SeoSchema,
})

export type Content = z.infer<typeof ContentSchema>

const ROOT_TO_SHEET_MAP: Record<string, string> = {
  profile: "Profile",
  socialLinks: "SocialLinks",
  skills: "Skills",
  techStack: "TechStack",
  featuredProjects: "FeaturedProjects",
  projects: "Projects",
  experience: "Experience",
  certificates: "Certificates",
  contact: "Contact",
  experienceStats: "ExperienceStats",
  navItems: "NavItems",
  seo: "Seo",
}

function formatZodError(error: z.ZodError): string {
  if (!error || !error.errors) return error?.message || String(error)
  return error.errors
    .map((issue) => {
      const path = issue.path || []
      const root = typeof path[0] === "string" ? path[0] : ""
      const sheet = (root && ROOT_TO_SHEET_MAP[root]) || root || "Unknown sheet"
      const fieldPath = path.join(".")
      const arrayIndex = path.find((p) => typeof p === "number")
      const rowInfo = typeof arrayIndex === "number" ? ` (row ${arrayIndex + 2} in sheet "${sheet}")` : ""
      return `[${sheet}] ${fieldPath}${rowInfo}: ${issue.message}`
    })
    .join("\n")
}

function createFallbackContent(errorMessage?: string): Content {
  const fallbackMessage =
    errorMessage ||
    "content/generated/content.json could not be parsed. Fix content/content.xlsx and re-run the generator."

  return {
    profile: {
      name: "Content error",
      headline: "Fix content.xlsx to load real portfolio content.",
      location: "Unknown",
      summaryBullets: [fallbackMessage],
      heroTaglines: ["Content configuration error"],
      heroPrimaryCtaLabel: "View Projects",
      heroPrimaryCtaHref: "/projects",
      heroSecondaryCtaLabel: "Contact",
      heroSecondaryCtaHref: "/contact",
      resumeLabel: "Resume",
      resumeUrl: "/resume.pdf",
      footerTagline: "Update content.xlsx to replace this placeholder content.",
      handle: undefined,
      statusText: "Content error – see README and terminal output.",
      avatarUrl: "/images/profile.png",
      miniAvatarUrl: "/images/profile-mini.png",
    },
    socialLinks: [],
    skills: [],
    techStack: [],
    featuredProjects: [],
    projects: [],
    experience: [],
    certificates: [],
    contact: {
      email: "your.email@example.com",
      location: "Unknown",
      availability: "Update content.xlsx to customize this message.",
      socials: [],
    },
    experienceStats: [],
    navItems: [
      {
        label: "Home",
        href: "/",
        visible: true,
        order: 1,
      },
    ],
    seo: {
      siteTitle: "Portfolio content error",
      siteDescription:
        "The portfolio content failed to load because content.xlsx or content/generated/content.json is invalid.",
      keywords: ["portfolio", "content error"],
      twitterHandle: undefined,
      ogImage: "/og.png",
    },
  }
}

let parsed: Content
let contentErrorInternal: string | null = null

const result = ContentSchema.safeParse(rawContent)

if (!result.success) {
  const formatted = formatZodError(result.error)
  contentErrorInternal = formatted
  const message =
    "[content] Failed to parse content/generated/content.json from Excel.\n\n" +
    formatted +
    "\n\nFix content/content.xlsx (sheets, columns, or cell values) and run `npm run generate:content` or `npm run content:check`."
  if (process.env.NODE_ENV === "production") {
    throw new Error(message)
  }

  // In development, log the error and fall back to placeholder content
  // so the app can render a themed error page instead of crashing.
  console.error("\n" + message + "\n")
  parsed = createFallbackContent(formatted)
} else {
  parsed = result.data
}

export const contentError = contentErrorInternal

const profileWithDefaults: Content["profile"] = {
  ...parsed.profile,
  avatarUrl: parsed.profile.avatarUrl || "/images/profile.png",
  miniAvatarUrl:
    parsed.profile.miniAvatarUrl || parsed.profile.avatarUrl || "/images/profile-mini.png",
}

export const content: Content = {
  ...parsed,
  profile: profileWithDefaults,
}

export type Profile = Content["profile"]
export type SocialLink = Content["socialLinks"][number]
export type Skill = Content["skills"][number]
export type FeaturedProject = Content["featuredProjects"][number]
export type Project = Content["projects"][number]
export type Experience = Content["experience"][number]
export type Certificate = Content["certificates"][number]
export type Contact = Content["contact"]
export type ExperienceStat = Content["experienceStats"][number]
export type NavItem = Content["navItems"][number]
export type Seo = Content["seo"]

export const profile = content.profile
export const socialLinks = content.socialLinks
export const skills = content.skills
export const techStack = content.techStack
export const featuredProjects = content.featuredProjects
export const projects = content.projects
export const experience = content.experience
export const certificates = content.certificates
export const contact = content.contact
export const experienceStats = content.experienceStats
export const navItems = content.navItems
export const seo = content.seo