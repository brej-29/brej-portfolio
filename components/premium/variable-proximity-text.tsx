"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface VariableProximityTextProps {
  text: string
  className?: string
  maxDistance?: number
}

export function VariableProximityText({ text, className, maxDistance = 150 }: VariableProximityTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isHovered])

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const letters = text.split("")

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("inline-flex", className)}
    >
      {letters.map((letter, index) => {
        if (letter === " ") return <span key={index}>&nbsp;</span>

        let scale = 1
        let color = "currentColor"

        if (isHovered && !prefersReducedMotion && containerRef.current) {
          const letterElement = containerRef.current.children[index] as HTMLElement
          if (letterElement) {
            const rect = letterElement.getBoundingClientRect()
            const containerRect = containerRef.current.getBoundingClientRect()
            const letterX = rect.left + rect.width / 2 - containerRect.left
            const letterY = rect.top + rect.height / 2 - containerRect.top

            const distance = Math.sqrt(Math.pow(mousePosition.x - letterX, 2) + Math.pow(mousePosition.y - letterY, 2))

            if (distance < maxDistance) {
              const proximity = 1 - distance / maxDistance
              scale = 1 + proximity * 0.5
              color = `hsl(${270 + proximity * 30}, 80%, ${50 + proximity * 20}%)`
            }
          }
        }

        return (
          <motion.span
            key={index}
            animate={prefersReducedMotion ? {} : { scale, color }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        )
      })}
    </div>
  )
}
