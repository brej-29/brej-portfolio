"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface VariableProximityTextProps {
  text: string
  className?: string
  /**
   * Maximum visual influence distance (in pixels) from the pointer.
   * Characters farther than this distance will not scale.
   */
  maxDistance?: number
  /**
   * Maximum scale factor applied to characters closest to the pointer.
   * Clamped to avoid excessive zoom (defaults to 1.08).
   */
  maxScale?: number
}

/**
 * VariableProximityText
 *
 * Renders text where individual characters subtly scale based on how close
 * the pointer is to them. The text always remains mounted and uses simple
 * CSS transitions for smooth animations.
 *
 * Respects prefers-reduced-motion: when enabled, the text is static.
 */
export function VariableProximityText({
  text,
  className,
  maxDistance = 120,
  maxScale = 1.08,
}: VariableProximityTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLSpanElement | null>(null)
  const [pointerX, setPointerX] = useState<number | null>(null)

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (prefersReducedMotion) return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      setPointerX(x)
    },
    [prefersReducedMotion],
  )

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return
    setPointerX(null)
  }, [prefersReducedMotion])

  const characters = Array.from(text)

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
    >
      {characters.map((char, index) => {
        // For reduced motion, render static text with no per-letter transforms.
        if (prefersReducedMotion) {
          return (
            <span key={index} className="inline-block">
              {char}
            </span>
          )
        }

        let style: React.CSSProperties = {
          transform: "scale(1)",
          transition: "transform 0.18s ease-out, color 0.18s ease-out",
        }

        if (pointerX != null && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          const width = rect.width || 1
          const segmentWidth = width / characters.length
          const charCenterX = segmentWidth * index + segmentWidth / 2

          const distance = Math.abs(charCenterX - pointerX)
          const influence = Math.max(0, 1 - distance / maxDistance)

          const unclampedScale = 1 + influence * (maxScale - 1)
          const clampedScale = Math.min(Math.max(unclampedScale, 1), maxScale)

          style = {
            ...style,
            transform: `scale(${clampedScale})`,
          }
        }

        return (
          <span key={index} className="inline-block" style={style}>
            {char}
          </span>
        )
      })}
    </span>
  )
}