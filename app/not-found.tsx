import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Section } from "@/components/site/section"
import { GlassCard } from "@/components/site/glass-card"

export default function NotFound() {
  return (
    <Section className="flex items-center justify-center min-h-[60vh]">
      <GlassCard className="max-w-xl mx-auto p-8 text-center border-2 border-border/60" hover>
        <p className="text-sm font-mono tracking-widest text-[var(--neon-cyan)] mb-2">
          404 • PAGE NOT FOUND
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
          Lost in the matrix
        </h1>
        <p className="text-muted-foreground mb-6">
          The page you were looking for doesn&apos;t exist or has moved. Use the navigation above or return
          to the homepage to keep exploring the portfolio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-[var(--neon-purple)]/60 px-4 py-2 text-sm font-medium bg-transparent hover:bg-[var(--neon-purple)]/10 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </GlassCard>
    </Section>
  )
}