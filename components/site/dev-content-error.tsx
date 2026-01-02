import { Section } from "@/components/site/section"
import { GlassCard } from "@/components/site/glass-card"
import { AlertTriangle } from "lucide-react"

interface DevContentErrorProps {
  message: string
}

export function DevContentError({ message }: DevContentErrorProps) {
  return (
    <Section className="flex items-center justify-center min-h-[60vh] pt-32 pb-24">
      <div className="max-w-3xl w-full">
        <GlassCard className="p-6 md:p-8 border-[var(--neon-purple)]/40 bg-card/80 backdrop-blur-xl" hover>
          <div className="flex items-start gap-4">
            <div className="mt-1 rounded-full bg-[var(--neon-purple)]/20 p-2 border border-[var(--neon-purple)]/60">
              <AlertTriangle className="h-5 w-5 text-[var(--neon-cyan)]" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono tracking-[0.25em] text-[var(--neon-cyan)] mb-2 uppercase">
                  Content configuration error
                </p>
                <h1 className="text-2xl md:text-3xl font-semibold">
                  content.xlsx needs attention before this portfolio can load.
                </h1>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                The generated file{" "}
                <code className="font-mono text-xs bg-muted/60 px-1.5 py-0.5 rounded">
                  content/generated/content.json
                </code>{" "}
                does not match the expected schema. This usually means{" "}
                <code className="font-mono text-xs bg-muted/60 px-1.5 py-0.5 rounded">
                  content/content.xlsx
                </code>{" "}
                is missing a sheet or column, or has an invalid cell value.
              </p>

              <div className="rounded-md bg-muted/70 p-3 text-xs text-muted-foreground max-h-48 overflow-auto">
                <pre className="whitespace-pre-wrap break-words">{message}</pre>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">How to fix it:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>
                    Open{" "}
                    <code className="font-mono bg-muted/60 px-1.5 py-0.5 rounded">
                      content/content.xlsx
                    </code>
                    .
                  </li>
                  <li>Check that all required sheets and columns exist (see README schema).</li>
                  <li>Fix the cells mentioned in the error message above.</li>
                  <li>
                    Run{" "}
                    <code className="font-mono bg-muted/60 px-1.5 py-0.5 rounded">
                      npm run content:check
                    </code>{" "}
                    to regenerate content.
                  </li>
                  <li>Restart the dev server with `npm run dev`.</li>
                </ol>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  )
}