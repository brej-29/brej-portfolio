"use client"

import { motion, useReducedMotion } from "framer-motion"
import type React from "react"

/** Route transition: fade + rise with a blur settle. Fast enough to never feel like waiting. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 14, filter: "blur(6px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
