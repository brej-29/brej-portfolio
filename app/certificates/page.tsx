import { Section } from "@/components/site/section"
import { CertificatesClient } from "@/components/certificates/CertificatesClient"
import { VariableProximityText } from "@/components/premium/variable-proximity-text"
import { certificates } from "@/content/siteData"

export default function CertificatesPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <Section>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header - Added VariableProximityText to heading */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              <VariableProximityText
                text="Certificates"
                className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and credentials showcasing my commitment to continuous learning and mastery of
              cutting-edge technologies.
            </p>
          </div>

          {/* Client Component with Filters and Grid */}
          <CertificatesClient certificates={certificates} />
        </div>
      </Section>
    </div>
  )
}
