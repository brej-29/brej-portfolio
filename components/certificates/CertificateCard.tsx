"use client"

import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Award } from "lucide-react"
import type { Certificate } from "@/content/siteData"
import { motion } from "framer-motion"

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <SpotlightCard
        spotlightColor="rgba(34, 211, 238, 0.15)"
        className="group border-none bg-transparent shadow-none"
      >
        <GlassCard
          hover
          className="h-full p-6 flex flex-col border-2 border-border/60 hover:border-[var(--neon-cyan)]/35 transition-colors duration-300"
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-lg shadow-primary/30">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-1 leading-tight">{certificate.title}</h3>
                <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(certificate.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {certificate.skillsTags.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {certificate.credentialUrl && (
            <div className="mt-4 pt-4 border-t border-border/60">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-[var(--neon-cyan)]/40 hover:bg-[var(--neon-cyan)]/10 hover:border-[var(--neon-cyan)]/60"
                asChild
              >
                <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Credential
                </a>
              </Button>
            </div>
          )}
        </GlassCard>
      </SpotlightCard>
    </motion.div>
  )
}
