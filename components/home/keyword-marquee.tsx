import { techStack } from "@/content"

/** Slow keyword strip between hero and work — pauses on hover. */
export function KeywordMarquee() {
  const keywords = techStack.length > 0 ? techStack : ["Machine Learning", "GenAI", "MLOps"]
  // Duplicate for the seamless -50% loop
  const loop = [...keywords, ...keywords]

  return (
    <div className="hairline-t hairline-b overflow-hidden py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-8">
        {loop.map((keyword, i) => (
          <span
            key={`${keyword}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-faint"
          >
            {keyword}
            <span className="text-accent/60">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
