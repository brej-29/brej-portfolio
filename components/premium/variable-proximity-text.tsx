"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface VariableProximityTextProps {
  text: string
  className?: string
  maxDistance?: number
}

export function VariableProximityText({ text, className, maxDistance = 150 }: VariableProximityTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || reducedMotion) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCursorPos({ x, y })
  }

  const handlePointerLeave = () => {
    if (!containerRef.current) return
    // Reset all letters to normal state but keep them visible
    Array.from(containerRef.current.children).forEach((child) => {
      const letterElement = child as HTMLElement
      letterElement.style.transform = "scale(1)"
      letterElement.style.removeProperty("color")
      letterElement.style.opacity = "1"
    })
    // Clear cursor position to stop proximity calculations
    setCursorPos(null)
  }

  useEffect(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    Array.from(containerRef.current.children).forEach((child) => {
      const letterElement = child as HTMLElement
      const letterRect = letterElement.getBoundingClientRect()
      const letterX = letterRect.left + letterRect.width / 2 - rect.left
      const letterY = letterRect.top + letterRect.height / 2 - rect.top

      letterElement.style.opacity = "1"

      if (cursorPos) {
        const distance = Math.sqrt(Math.pow(cursorPos.x - letterX, 2) + Math.pow(cursorPos.y - letterY, 2))

        if (distance < maxDistance) {
          const proximity = 1 - distance / maxDistance
          const scale = 1 + proximity * 0.06
          letterElement.style.transform = `scale(${scale})`
        } else {
          letterElement.style.transform = "scale(1)"
          letterElement.style.removeProperty("color")
        }
      } else {
        letterElement.style.transform = "scale(1)"
        letterElement.style.removeProperty("color")
      }
    })
  }, [cursorPos, maxDistance])

  const letters = text.split("")

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("inline-flex", className)}
      style={{ opacity: 1, backgroundSize: "100% 100%" }}
    >
      {letters.map((letter, index) =>
        letter === " " ? (
          <span key={index} style={{ opacity: 1 }}>
            &nbsp;
          </span>
        ) : (
          <span
            key={index}
            className="inline-block transition-all duration-200 ease-out"
            style={{
              transformOrigin: "center",
              opacity: 1,
              backgroundImage: "inherit",
              backgroundSize: "inherit",
              backgroundPosition: "inherit",
              backgroundRepeat: "inherit",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            {letter}
          </span>
        ),
      )}
    </div>
  )
}
