"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion, animate } from "framer-motion"

/**
 * Renders a stat value, counting up the first number it contains when scrolled
 * into view ("150+" counts 0→150, "80% → <20%" counts the 80). Non-numeric
 * values render as-is.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*?)(\d+)([^]*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reducedMotion = useReducedMotion()
  const target = match ? parseInt(match[2], 10) : 0
  const [display, setDisplay] = useState(reducedMotion ? target : 0)

  useEffect(() => {
    if (!inView || !match) return
    if (reducedMotion) {
      setDisplay(target)
      return
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reducedMotion, target])

  if (!match) {
    return <span className={className}>{value}</span>
  }

  return (
    <span ref={ref} className={className}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  )
}
