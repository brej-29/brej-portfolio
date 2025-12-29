"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/site/glass-card"
import { cn } from "@/lib/utils"

interface PremiumProfileCardProps {
  name: string
  role: string
  location: string
  imageUrl: string
  className?: string
}

export function PremiumProfileCard({ name, role, location, imageUrl, className }: PremiumProfileCardProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <GlassCard hover className={cn("p-8", className)}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
          animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-full animate-pulse" />
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={160}
              height={160}
              className="relative rounded-full border-4 border-background object-cover"
            />
          </div>
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
            {name}
          </h2>
          <p className="text-lg text-muted-foreground">{role}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </GlassCard>
  )
}
