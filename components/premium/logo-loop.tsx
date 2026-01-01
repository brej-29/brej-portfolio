"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoLoopProps {
  items: Array<{ name: string; icon?: React.ReactNode }>
  className?: string
  speed?: number
}

export function LogoLoop({ items, className, speed = 20 }: LogoLoopProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const scroller = scrollerRef.current
    if (!scroller) return

    const scrollContent = scroller.querySelector("[data-scroll-content]")
    if (!scrollContent) return

    // Clone items for seamless loop
    const children = Array.from(scrollContent.children)
    children.forEach((child) => {
      const clone = child.cloneNode(true)
      scrollContent.appendChild(clone)
    })
  }, [prefersReducedMotion])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true)
      } else {
        setIsPaused(false)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        ref={scrollerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex overflow-hidden"
      >
        <div
          data-scroll-content
          className={cn("flex gap-8", !prefersReducedMotion && "animate-scroll", isPaused && "pause-animation")}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card/40 backdrop-blur-sm border border-border/50 whitespace-nowrap"
            >
              {item.icon && <span className="text-[var(--neon-purple)]">{item.icon}</span>}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
