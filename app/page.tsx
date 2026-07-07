import { Hero } from "@/components/home/hero"
import { KeywordMarquee } from "@/components/home/keyword-marquee"
import { SelectedWork } from "@/components/home/selected-work"
import { ExperienceStrip } from "@/components/home/experience-strip"
import { Stack } from "@/components/home/stack"
import { ContactCta } from "@/components/home/contact-cta"

export default function Home() {
  return (
    <main>
      <Hero />
      <KeywordMarquee />
      <SelectedWork />
      <ExperienceStrip />
      <Stack />
      <ContactCta />
    </main>
  )
}
