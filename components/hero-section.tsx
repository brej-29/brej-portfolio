"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RotatingText } from "@/components/premium/rotating-text"
import { VariableProximityText } from "@/components/premium/variable-proximity-text"
import ProfileCard from "@/components/premium/profile-card"
import { profile } from "@/content"
import { ArrowRight, Mail } from "lucide-react"
import { withBasePath } from "@/lib/basePath"

const rotatingWords = ["Full-Stack Developer","Data Scientist / ML Engineer","Python • SQL • Statistics","AWS SageMaker • Lambda","Open to ML/DS Roles"]

export function HeroSection() {
  const reducedMotion = useReducedMotion()

  const projectsHref = withBasePath("/projects")
  const contactHref = withBasePath("/contact")
  const [firstName, ...restOfName] = profile.name.split(" ")
  const lastName = restOfName.join(" ")

  const avatarPath = profile.avatarUrl || "/images/profile.png"
  const miniAvatarPath = profile.miniAvatarUrl || profile.avatarUrl || "/images/profile-mini.png"

  return (
    <section id="home" className="relative container mx-auto px-4 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              {"Hi, I'm "}
              <span className="mt-1 block leading-tight">
                <VariableProximityText
                  text={firstName || profile.name}
                  className="whitespace-nowrap bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent"
                  maxDistance={120}
                />
                {lastName && (
                  <VariableProximityText
                    text={lastName}
                    className="whitespace-nowrap bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent"
                    maxDistance={120}
                  />
                )}
              </span>
            </h1>
            <div className="flex flex-col gap-2 text-2xl md:text-3xl lg:text-4xl font-semibold">
              <RotatingText
                words={rotatingWords}
                wrapperClassName="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] border border-white/10"
                textClassName="text-slate-900 dark:text-white"
                className="inline-flex"
                interval={2200}
              />
            </div>
          </div>

          <ul className="space-y-3">
            {profile.summaryBullets.map((bullet, idx) => (
              <motion.li
                key={idx}
                initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                className="flex items-start gap-3 text-lg text-muted-foreground"
              >
                <span className="text-[var(--neon-cyan)] mt-1">✦</span>
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90 transition-opacity"
              asChild
            >
              <a href={projectsHref}>
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--neon-purple)]/50 hover:bg-[var(--neon-purple)]/10 bg-transparent"
              asChild
            >
              <a href={contactHref}>
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Profile Card */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex justify-center lg:mt-0"
        >
          <ProfileCard
            avatarUrl={avatarPath}
            miniAvatarUrl={miniAvatarPath}
            name={profile.name}
            title={profile.headline}
            handle={profile.handle || "portfolio"}
            status={profile.statusText || "Available for work"}
            contactText="Contact"
            showUserInfo={true}
            showDetails={false}
            enableTilt={!reducedMotion}
            enableMobileTilt={!reducedMotion}
            behindGlowEnabled={!reducedMotion}
            behindGlowColor="rgba(168, 85, 247, 0.67)"
            behindGlowSize="50%"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            onContactClick={() => {
              window.location.href = contactHref
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
