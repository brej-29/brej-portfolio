import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  heading?: string
  subheading?: string
}

export function Section({ children, id, className, heading, subheading }: SectionProps) {
  return (
    <section id={id} className={cn("container mx-auto px-4 lg:px-8 py-12 lg:py-20", className)}>
      {heading && (
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">{heading}</h2>
          {subheading && <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{subheading}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
