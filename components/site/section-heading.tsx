"use client"

import { motion } from "framer-motion"
import { Reveal } from "@/components/motion/reveal"

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  description?: string
}

/** Numbered mono label + display title + growing accent rule, shared by every section. */
export function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className="mono-label shrink-0">
            <span className="text-gradient font-semibold">{index}</span>
            <span aria-hidden="true"> — </span>
            {label}
          </p>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-full max-w-40 origin-left bg-gradient-to-r from-[var(--accent)] to-transparent"
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">{title}</h2>
        {description && (
          <p className="max-w-xl text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
    </Reveal>
  )
}
