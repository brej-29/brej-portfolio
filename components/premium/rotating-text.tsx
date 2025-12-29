"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface RotatingTextProps {
  words: string[]
  className?: string
  textClassName?: string
  wrapperClassName?: string
  interval?: number
}

export function RotatingText({
  words,
  className,
  textClassName,
  wrapperClassName,
  interval = 3000,
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || words.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words, interval])

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReducedMotion) {
    return (
      <span className={cn("inline-flex items-center rounded-md px-3 py-1", className, wrapperClassName)}>
        <span className={cn("font-semibold", textClassName)}>{words[0]}</span>
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-3 py-1 min-h-[2.4rem] min-w-[8ch] bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-[0_10px_35px_rgba(0,0,0,0.35)]",
        wrapperClassName,
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className={cn("inline-flex items-center font-semibold text-slate-900 dark:text-white", textClassName)}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
