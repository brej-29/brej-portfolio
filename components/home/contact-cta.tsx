import { ArrowUpRight } from "lucide-react"
import { contact, socialLinks } from "@/content"
import { SectionHeading } from "@/components/site/section-heading"
import { Reveal } from "@/components/motion/reveal"

const orderedSocials = [...socialLinks]
  .filter((social) => !social.url.startsWith("mailto:"))
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export function ContactCta() {
  return (
    <section className="container-page pt-24 md:pt-32">
      <SectionHeading index="04" label="Contact" title="Let's build something reliable." />

      <Reveal delay={0.1}>
        <div className="mt-10 space-y-8">
          <a
            href={`mailto:${contact.email}`}
            className="link-underline inline-block break-all text-2xl font-medium tracking-tight text-foreground md:text-4xl"
          >
            {contact.email}
          </a>

          <p className="mono-label flex items-center gap-2.5">
            <span className="status-dot" aria-hidden="true" />
            {contact.availability}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {orderedSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {social.name}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
