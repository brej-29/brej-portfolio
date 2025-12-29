import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { socialLinks } from "@/content/siteData"

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--neon-purple)]/20 bg-card/20 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/50 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent mb-2">
              Your Name
            </h3>
            <p className="text-sm text-muted-foreground">Full Stack → Data Science</p>
            <p className="text-xs text-muted-foreground mt-1">📍 India</p>
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
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
