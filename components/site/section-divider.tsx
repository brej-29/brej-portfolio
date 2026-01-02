"use client"

import { motion, useReducedMotion } from "framer-motion"

export function SectionDivider() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="relative w-full max-w-3xl h-2">
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
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-lg shadow-primary/50" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] blur-md animate-pulse" />
        </motion.div>
      </div>
    </div>
  )
}
