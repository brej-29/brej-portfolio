"use client"

import type React from "react"
import { cn } from "@/lib/utils"

/** Tracks the pointer and feeds --mx/--my to the .spotlight CSS highlight. */
export function trackSpotlight(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`)
  el.style.setProperty("--my", `${event.clientY - rect.top}px`)
}

export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("spotlight", className)} onPointerMove={trackSpotlight}>
      {children}
    </div>
  )
}
