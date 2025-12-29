import type React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export function GlassCard({ children, className, hover = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md",
        "shadow-lg shadow-black/10",
        hover &&
          "transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-primary/10",
        className,
      )}
      {...props}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      {children}
    </div>
  )
}
