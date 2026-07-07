import { AlertTriangle } from "lucide-react"

interface DevContentErrorProps {
  message: string
}

/** Dev-only screen shown when content.xlsx fails schema validation. */
export function DevContentError({ message }: DevContentErrorProps) {
  return (
    <div className="container-page flex min-h-[70vh] items-center pt-32 pb-24">
      <div className="w-full max-w-3xl rounded-lg border border-destructive/40 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-destructive" />
          <div className="space-y-4">
            <div>
              <p className="mono-label mb-2 text-destructive">Content configuration error</p>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                content.xlsx needs attention before this portfolio can load.
              </h1>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              The generated file <code className="font-mono text-xs">content/generated/content.json</code>{" "}
              does not match the expected schema — usually a missing sheet or column, or an invalid
              cell value in <code className="font-mono text-xs">content/content.xlsx</code>.
            </p>

            <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-border p-3 font-mono text-xs text-muted-foreground">
              {message}
            </pre>

            <ol className="list-inside list-decimal space-y-1 text-xs text-muted-foreground">
              <li>Open content/content.xlsx and fix the cells mentioned above.</li>
              <li>Run `npm run content:check` to regenerate content.</li>
              <li>Restart the dev server with `npm run dev`.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
