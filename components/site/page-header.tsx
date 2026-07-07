"use client"

import { motion, useReducedMotion } from "framer-motion"
import type React from "react"

const EASE = [0.16, 1, 0.3, 1] as const

interface PageHeaderProps {
  label: string
  title: string
  description?: string
  children?: React.ReactNode
}

/** Entrance header shared by all inner pages. */
export function PageHeader({ label, title, description, children }: PageHeaderProps) {
  const reducedMotion = useReducedMotion()

  const entrance = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <div className="container-page pt-32 md:pt-40">
      <motion.p {...entrance(0)} className="mono-label">
        {label}
      </motion.p>
      <motion.h1
        {...entrance(0.07)}
        className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          {...entrance(0.14)}
          className="mt-5 max-w-2xl leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
      {children && <motion.div {...entrance(0.2)}>{children}</motion.div>}
    </div>
  )
}
