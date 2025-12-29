"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function SectionDivider() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="relative w-full max-w-3xl h-px">
        {/* Gradient line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Glow orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-lg shadow-primary/50" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] blur-md animate-pulse" />
        </motion.div>
      </div>
    </div>
  )
}
