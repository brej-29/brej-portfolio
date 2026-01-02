import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { profile, socialLinks } from "@/content"
import { withBasePath } from "@/lib/basePath"

const StreamlitIcon = ({ className }: { className?: string }) => {
  const lightSrc = withBasePath("/images/streamlit-mark-light-mode.png")
  const darkSrc = withBasePath("/images/streamlit-mark-dark-mode.png")

  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={lightSrc} alt="Streamlit" className="h-5 w-5 object-contain dark:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={darkSrc} alt="Streamlit" className="hidden h-5 w-5 object-contain dark:inline" />
    </span>
  )
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  external: StreamlitIcon,
}

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--neon-purple)]/20 bg-card/20 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/50 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent mb-2">
              {profile.name}
            </h3>
            <p className="text-sm text-muted-foreground">{profile.headline}</p>
            <p className="text-xs text-muted-foreground mt-1">📍 {profile.location}</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap]
              return (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-gradient-to-r hover:from-[var(--neon-purple)]/20 hover:to-[var(--neon-cyan)]/20 transition-all duration-300 hover:scale-110 border border-border/50 hover:border-[var(--neon-purple)]/50"
                  aria-label={link.name}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </Link>
              )
            })}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
