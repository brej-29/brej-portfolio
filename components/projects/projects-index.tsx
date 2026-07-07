"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/content"
import { WorkRow } from "@/components/projects/work-row"
import { cn } from "@/lib/utils"

const ordered = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

// Only offer tags that actually narrow things down — shared by 2+ projects.
const tagCounts = new Map<string, number>()
for (const project of ordered) {
  for (const tag of project.tags) {
    tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
  }
}
const allTags = Array.from(tagCounts.entries())
  .filter(([, count]) => count >= 2)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([tag]) => tag)

export function ProjectsIndex() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const visible = useMemo(
    () => (activeTag ? ordered.filter((project) => project.tags.includes(activeTag)) : ordered),
    [activeTag],
  )

  return (
    <div className="container-page mt-12">
      {allTags.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors duration-200",
              activeTag === null
                ? "border-accent text-accent"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            All ({ordered.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              aria-pressed={activeTag === tag}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors duration-200",
                activeTag === tag
                  ? "border-accent text-accent"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <WorkRow project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="hairline-t" />
        {visible.length === 0 && (
          <p className="py-12 text-sm text-muted-foreground">No projects match this tag yet.</p>
        )}
      </div>
    </div>
  )
}
