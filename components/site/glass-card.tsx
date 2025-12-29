import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  spotlight?: boolean
}

export function GlassCard({ children, className, hover = false, spotlight = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "bg-card/40 backdrop-blur-md",
        "border border-border/50",
        "transition-all duration-300",
        hover && "hover:bg-card/60 hover:border-border hover:shadow-lg hover:shadow-primary/10",
        spotlight && "group",
        className,
      )}
    >
      {spotlight && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
