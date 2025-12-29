"use client"

import { useEffect, useState } from "react"
import { FallingPattern } from "@/components/premium/falling-pattern"

export function BackgroundLayer() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient background with theme support */}
      <div className="absolute inset-0 bg-gradient-radial from-background via-background to-muted/20" />

      <div className="absolute inset-0 opacity-[0.42] dark:opacity-[0.52]">
        <FallingPattern />
      </div>

      {/* Animated gradient orbs - reduced brightness to not wash out pattern */}
      {!reducedMotion && (
        <>
          <div
            className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl animate-float-slow"
            style={{
              background: "radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)",
              opacity: "0.10",
              animationDuration: "20s",
            }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full blur-3xl animate-float-slow"
            style={{
              background: "radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)",
              opacity: "0.10",
              animationDuration: "25s",
              animationDelay: "-10s",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-float-slow"
            style={{
              background: "radial-gradient(circle, var(--neon-purple) 0%, var(--neon-cyan) 50%, transparent 70%)",
              opacity: "0.06",
              animationDuration: "30s",
              animationDelay: "-5s",
            }}
          />
        </>
      )}
    </div>
  )
}
