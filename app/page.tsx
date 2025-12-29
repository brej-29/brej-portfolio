import { HeroSection } from "@/components/hero-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { CTASection } from "@/components/cta-section"
import { SectionDivider } from "@/components/site/section-divider"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      <SectionDivider />

      {/* Tech Stack Section */}
      <TechStackSection />

      <SectionDivider />

      {/* Projects Section */}
      <ProjectsSection />

      <SectionDivider />

      {/* Experience Section */}
      <ExperienceSection />

      <SectionDivider />

      {/* CTA Section */}
      <CTASection />
    </main>
  )
}
