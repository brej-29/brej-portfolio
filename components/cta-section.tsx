"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Mail, Download } from "lucide-react"
import { ClipPathLinks } from "@/components/ui/clip-path-links"
import { withBasePath } from "@/lib/basePath"

export function CTASection() {
  const contactHref = withBasePath("/contact")
  const resumeHref = withBasePath("/resume.pdf")

  return (
    <section id="contact" className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <SpotlightCard className="group border-none bg-transparent shadow-none">
        <GlassCard className="p-8 lg:p-12 text-center border-2 border-transparent hover:border-[var(--neon-purple)]/30 transition-colors duration-300">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
            {"Let's Build Something Amazing Together"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
          </p>

          <div className="max-w-3xl mx-auto mb-8">
            <ClipPathLinks />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90 transition-opacity"
              asChild
            >
              <a href={contactHref}>
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/10 bg-transparent"
              asChild
            >
              <a href={resumeHref} download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </GlassCard>
      </SpotlightCard>
    </section>
  )
}
