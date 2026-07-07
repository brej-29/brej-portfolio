"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type React from "react"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

interface RevealProps {
  children: React.ReactNode
  /** Seconds to wait before starting (used for stagger between siblings). */
  delay?: number
  /** Vertical travel in px. Keep small — motion should whisper. */
  y?: number
  className?: string
  as?: "div" | "section" | "li" | "span"
}

/**
 * Scroll-triggered entrance: small rise + fade, fires once.
 * Falls back to opacity-only under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, y = 16, className, as = "div" }: RevealProps) {
  const reducedMotion = useReducedMotion()
  const Component = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
    },
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  )
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  /** Seconds between each child's entrance. */
  interval?: number
  delay?: number
}

/** Parent that staggers <StaggerItem> children as they scroll into view. */
export function Stagger({ children, className, interval = 0.07, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: interval, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  y = 14,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  const reducedMotion = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
  }

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
