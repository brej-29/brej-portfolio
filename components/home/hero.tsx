"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useSpring } from "framer-motion"
import { ArrowRight, ArrowDownToLine } from "lucide-react"
import { profile } from "@/content"
import { withBasePath } from "@/lib/basePath"
import { Magnetic } from "@/components/motion/magnetic"
import { Ticker } from "@/components/motion/ticker"

const EASE = [0.16, 1, 0.3, 1] as const

/** The role, without the pipe-separated noise the headline field carries. */
const role = profile.headline.split(/[→|]/)[0].trim()
const nameWords = profile.name.split(" ")

export function Hero() {
  const reducedMotion = useReducedMotion()
  const resumeHref = withBasePath(profile.resumeUrl)
  const avatarSrc = withBasePath(profile.avatarUrl || "/images/avatar.png")

  // Mouse-parallax tilt for the portrait card
  const tiltRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 180, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 20 })

  const handleTilt = (event: React.PointerEvent) => {
    if (reducedMotion || !tiltRef.current) return
    const rect = tiltRef.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 10)
    rotateX.set(-py * 8)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const entrance = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-14 pt-32 pb-20 md:pt-40 md:pb-28 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20">
        <div>
          <motion.p {...entrance(0)} className="mono-label">
            {role} <span aria-hidden="true">—</span> {profile.location.split("(")[0].trim()}
          </motion.p>

          {/* Masked word-by-word reveal */}
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {nameWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reducedMotion ? { opacity: 0 } : { y: "108%" }}
                  animate={reducedMotion ? { opacity: 1 } : { y: 0 }}
                  transition={{ duration: 0.9, delay: 0.08 + i * 0.09, ease: EASE }}
                >
                  <span className="text-gradient">{word}</span>
                  {i < nameWords.length - 1 ? " " : <span className="text-accent">.</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          {profile.footerTagline && (
            <motion.p
              {...entrance(0.22)}
              className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
            >
              {profile.footerTagline}
            </motion.p>
          )}

          {profile.heroTaglines.length > 0 && (
            <motion.p {...entrance(0.3)} className="mt-5 font-mono text-sm text-muted-foreground">
              <span className="text-accent" aria-hidden="true">
                {"->"}
              </span>{" "}
              <Ticker items={profile.heroTaglines} />
            </motion.p>
          )}

          <motion.ul {...entrance(0.38)} className="mt-9 max-w-2xl space-y-2.5">
            {profile.summaryBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                <span className="mt-px select-none font-mono text-accent" aria-hidden="true">
                  +
                </span>
                {bullet}
              </li>
            ))}
          </motion.ul>

          <motion.div {...entrance(0.46)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                href="/projects"
                className="btn-gradient group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium shadow-[0_0_28px_-6px_var(--accent)] transition-shadow duration-300 hover:shadow-[0_0_44px_-4px_var(--accent-2)]"
              >
                View projects
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={resumeHref}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {profile.heroSecondaryCtaLabel}
                <ArrowDownToLine className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Portrait card */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="relative mx-auto w-full max-w-[300px] lg:max-w-none"
        >
          {/* Dual-tone glow behind the portrait */}
          <div
            className="absolute -inset-10 rounded-full blur-3xl"
            style={{
              background:
                "linear-gradient(140deg, color-mix(in oklch, var(--accent) 16%, transparent), color-mix(in oklch, var(--accent-2) 12%, transparent))",
            }}
            aria-hidden="true"
          />

          <motion.div
            ref={tiltRef}
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            className={reducedMotion ? "relative" : "portrait-float relative"}
          >
            <div className="group relative overflow-hidden rounded-xl border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt={`Portrait of ${profile.name}`}
                width={512}
                height={512}
                className="aspect-[4/5] w-full object-cover grayscale-[20%] transition-[filter,transform] duration-500 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:grayscale-0"
              />
              {/* Corner ticks */}
              <span className="corner-tick left-2.5 top-2.5 border-l-2 border-t-2" aria-hidden="true" />
              <span className="corner-tick right-2.5 top-2.5 border-r-2 border-t-2" aria-hidden="true" />
              <span className="corner-tick bottom-2.5 left-2.5 border-b-2 border-l-2" aria-hidden="true" />
              <span className="corner-tick bottom-2.5 right-2.5 border-b-2 border-r-2" aria-hidden="true" />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-xs text-faint">
              <span>{profile.handle || "@brej-29"}</span>
              <span>12.9716° N, 77.5946° E</span>
            </div>

            {profile.statusText && (
              <p className="mt-3 flex items-start gap-2.5 rounded-md border border-border bg-surface/60 px-3.5 py-2.5 font-mono text-xs leading-relaxed text-muted-foreground backdrop-blur-sm">
                <span className="status-dot mt-1 shrink-0" aria-hidden="true" />
                {profile.statusText}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
