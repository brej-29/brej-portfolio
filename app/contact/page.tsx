import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/site/page-header"
import { Reveal } from "@/components/motion/reveal"
import { ContactForm } from "@/components/contact/contact-form"
import { contact } from "@/content"

const orderedSocials = [...contact.socials]
  .filter((social) => !social.url.startsWith("mailto:"))
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export default function ContactPage() {
  return (
    <main className="pb-8">
      <PageHeader
        label="Contact"
        title="The inbox is open."
        description="Hiring for a Data Science or ML Engineering role, or want to talk through a project? Email is fastest — I reply within a day."
      />

      <div className="container-page mt-14 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Reveal delay={0.05}>
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="mono-label">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="link-underline inline-block break-all text-xl font-medium tracking-tight md:text-2xl"
              >
                {contact.email}
              </a>
            </div>

            <div className="space-y-3">
              <p className="mono-label">Availability</p>
              <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="status-dot shrink-0" aria-hidden="true" />
                {contact.availability}
              </p>
            </div>

            <div className="space-y-3">
              <p className="mono-label">Location</p>
              <p className="text-sm text-muted-foreground">{contact.location}</p>
            </div>

            <div className="space-y-3">
              <p className="mono-label">Elsewhere</p>
              <ul className="space-y-2">
                {orderedSocials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {social.name}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </main>
  )
}
