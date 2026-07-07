"use client"

import { useRef } from "react"
import { motion, useSpring, useReducedMotion } from "framer-motion"
import type React from "react"

interface MagneticProps {
  children: React.ReactNode
  className?: string
  /** Fraction of cursor offset the element follows. Keep gentle. */
  strength?: number
}

/** Element leans a few px toward the cursor, springs back on leave. Decorative only. */
export function Magnetic({ children, className, strength = 0.18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 })
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 })

  const handleMove = (event: React.PointerEvent) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const clamp = (v: number) => Math.max(-8, Math.min(8, v))
    x.set(clamp((event.clientX - rect.left - rect.width / 2) * strength))
    y.set(clamp((event.clientY - rect.top - rect.height / 2) * strength))
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
