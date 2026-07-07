import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Stagger, StaggerItem } from "@/components/motion/reveal"
import { Spotlight } from "@/components/motion/spotlight"
import { certificates } from "@/content"

const ordered = [...certificates].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

function formatDate(date: string) {
  const parsed = new Date(`${date}-01`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export default function CertificatesPage() {
  return (
    <main className="pb-8">
      <PageHeader
        label={`Certificates — ${ordered.length} verified`}
        title="Credentials behind the claims."
        description="Formal coursework and certifications that back the day-to-day practice."
      />

      <div className="container-page mt-14">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" interval={0.06}>
          {ordered.map((certificate) => {
            const inner = (
              <Spotlight className="flex h-full flex-col rounded-lg border border-border p-6 transition-[border-color,transform] duration-300 [transition-timing-function:var(--ease-out-quart)] group-hover:-translate-y-1 group-hover:border-accent/60">
                <div className="flex items-start justify-between gap-3">
                  <p className="mono-label">{certificate.issuer}</p>
                  {certificate.credentialUrl && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  )}
                </div>
                <h2 className="mt-3 flex-1 text-lg font-medium leading-snug tracking-tight">
                  {certificate.title}
                </h2>
                <p className="mt-4 font-mono text-xs text-faint">
                  {formatDate(certificate.date)} <span aria-hidden="true">·</span>{" "}
                  {certificate.skillsTags.join(" / ")}
                </p>
              </Spotlight>
            )

            return (
              <StaggerItem key={certificate.title} className="h-full">
                {certificate.credentialUrl ? (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                    aria-label={`${certificate.title} — view credential`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group h-full">{inner}</div>
                )}
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </main>
  )
}
