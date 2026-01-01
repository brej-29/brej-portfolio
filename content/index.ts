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

const parsed = ContentSchema.parse(rawContent)

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