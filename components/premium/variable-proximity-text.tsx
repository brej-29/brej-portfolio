"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface VariableProximityTextProps {
  text: string
  className?: string
  /**
   * Maximum visual influence distance in character units.
   * Characters farther than this distance from the active character
   * will not scale.
   */
  maxDistance?: number
  /**
   * Maximum scale factor applied to characters closest to the active index.
   * Clamped to avoid excessive zoom (defaults to 1.08).
   */
  maxScale?: number
}

/**
 * VariableProximityText
 *
 * Renders text where individual characters subtly scale based on how close
 * they are (by index) to the character under the pointer.
 * The text always remains mounted and uses simple CSS transitions.
 *
 * Respects prefers-reduced-motion: when enabled, the text is static.
 */
export function VariableProximityText({
  text,
  className,
  maxDistance = 3,
  maxScale = 1.08,
}: VariableProximityTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const characters = Array.from(text)
  const charCount = characters.length
  const falloff = Math.max(maxDistance, 1)

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (prefersReducedMotion || charCount === 0) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (rect.width === 0) return

      const relativeX = (event.clientX - rect.left) / rect.width
      const index = Math.floor(relativeX * charCount)
      const boundedIndex = Math.min(Math.max(index, 0), charCount - 1)
      setActiveIndex(boundedIndex)
    },
    [prefersReducedMotion, charCount],
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return
    setActiveIndex(null)
  }, [prefersReducedMotion])

  return (
    <span
      className={cn("inline-flex", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
    >
      {characters.map((char, index) => {
        // For reduced motion, render static text with no per-letter transforms.
        if (prefersReducedMotion) {
          return (
            <span key={index} className={cn("inline-block", className)}>
              {char}
            </span>
          )
        }

        let style: React.CSSProperties = {
          transform: "scale(1)",
          transition: "transform 0.18s ease-out, color 0.18s ease-out",
        }

        if (activeIndex !== null) {
          const distanceByIndex = Math.abs(index - activeIndex)
          if (distanceByIndex <= falloff) {
            const influence = 1 - distanceByIndex / (falloff + 1)
            const unclampedScale = 1 + influence * (maxScale - 1)
            const clampedScale = Math.min(Math.max(unclampedScale, 1), maxScale)
            style = {
              ...style,
              transform: `scale(${clampedScale})`,
            }
          }
        }

        return (
          <span key={index} className={cn("inline-block", className)} style={style}>
            {char}
          </span>
        )
      })}
    </span>
  )
}