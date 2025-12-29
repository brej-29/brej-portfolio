"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
}

interface GooeyNavProps {
  items: NavItem[]
  className?: string
}

export function GooeyNav({ items, className }: GooeyNavProps) {
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const index = items.findIndex((item) => item.href === pathname)
    setActiveIndex(index !== -1 ? index : 0)
  }, [pathname, items])

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <nav
      className={cn(
        "flex items-center gap-1 p-1 rounded-full bg-card/40 backdrop-blur-md border border-border/50",
        className,
      )}
    >
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={() => !prefersReducedMotion && setHoveredIndex(index)}
          onMouseLeave={() => !prefersReducedMotion && setHoveredIndex(null)}
          className={cn(
            "relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors",
            pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {(hoveredIndex === index || pathname === item.href) && (
            <motion.div
              layoutId="gooey-nav-indicator"
              className="absolute inset-0 bg-gradient-to-r from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 rounded-full border border-[var(--neon-purple)]/30"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
