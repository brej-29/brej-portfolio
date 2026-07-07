"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { Moon, Sun, ArrowDownToLine, Menu, X } from "lucide-react"
import { navItems, profile } from "@/content"
import { withBasePath } from "@/lib/basePath"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

const links = navItems
  .filter((item) => item.visible)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  )
}

export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const resumeHref = withBasePath(profile.resumeUrl)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 34 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // Close the overlay when navigating
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled && !menuOpen
          ? "border-b border-[var(--hairline)] bg-[var(--background)]/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      {/* Reading progress along the header's bottom edge */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
      />

      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-medium tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          <span className="font-mono text-sm text-accent" aria-hidden="true">
            {"//"}
          </span>
          <span className="text-[15px]">{profile.name}</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm transition-colors duration-200",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href={resumeHref}
            download
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Resume
            <ArrowDownToLine className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu with staggered links */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between bg-[var(--background)] px-6 pt-10 pb-10 md:hidden"
          >
            <ul className="space-y-2">
              {links.map((link, i) => {
                const active = isActive(pathname, link.href)
                return (
                  <motion.li
                    key={link.href}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-baseline gap-4 py-2 text-4xl font-semibold tracking-tight",
                        active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="space-y-4"
            >
              <a
                href={resumeHref}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:border-accent hover:text-accent"
              >
                Download resume
                <ArrowDownToLine className="h-4 w-4" />
              </a>
              <p className="mono-label">{profile.location}</p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
