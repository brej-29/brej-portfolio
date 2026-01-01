"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityTextProps {
  children: string
  className?: string
  baseVelocity?: number
}

export function ScrollVelocityText({ children, className, baseVelocity = 2 }: ScrollVelocityTextProps) {
  const baseX = useRef(0)
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const scrollVelocity = useSpring(scrollY, {
    damping: 50,
    stiffness: 400,
  })

  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(velocityFactor, (latest) => {
    baseX.current += latest * baseVelocity * 0.1
    return baseX.current
  })

  if (prefersReducedMotion) {
    return <div className={cn("text-6xl font-bold opacity-10", className)}>{children}</div>
  }

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className={cn("inline-block text-6xl font-bold opacity-10", className)}>
        {children} {children} {children}
      </motion.div>
    </div>
  )
}
