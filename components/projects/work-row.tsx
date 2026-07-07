"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/content"
import { trackSpotlight } from "@/components/motion/spotlight"

function formatDate(date: string) {
  const parsed = new Date(`${date}-01`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

/**
 * A full-width project row — list, not card grid.
 * Hover: cursor-tracking spotlight, title shifts, arrow appears.
 */
export function WorkRow({ project, index }: { project: Project; index?: number }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      onPointerMove={trackSpotlight}
      className="spotlight hairline-t group block rounded-sm px-2 py-7 transition-colors duration-200 md:px-4 md:py-8"
    >
      <div className="grid items-baseline gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0 space-y-2">
          <div className="flex items-baseline gap-4">
            {typeof index === "number" && (
              <span className="hidden select-none font-mono text-xs text-faint md:inline" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <h3 className="text-xl font-medium tracking-tight transition-transform duration-300 [transition-timing-function:var(--ease-out-quart)] group-hover:translate-x-1.5 md:text-2xl">
              {project.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 self-center text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:pl-9">
            {project.oneLine}
          </p>
          <p className="truncate pt-1 font-mono text-xs text-faint md:pl-9">
            {project.stack.join(" · ")}
          </p>
        </div>
        <p className="font-mono text-xs text-faint md:text-right">{formatDate(project.date)}</p>
      </div>
    </Link>
  )
}
