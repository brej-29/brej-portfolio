"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { profile, socialLinks, navItems, contact } from "@/content"

const orderedSocials = [...socialLinks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
const orderedNav = navItems
  .filter((item) => item.visible)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

/** Live clock in the site owner's timezone — a small "someone lives here" detail. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date())

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(format())
    const timer = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="tabular" suppressHydrationWarning>
      {time ?? "--:--"} IST
    </span>
  )
}

export function Footer() {
  return (
    <footer className="hairline-t mt-28 overflow-hidden">
      {/* Giant outlined wordmark */}
      <div className="container-page pt-12" aria-hidden="true">
        <p className="wordmark-outline whitespace-nowrap text-[13vw] font-bold leading-none lg:text-[10rem]">
          {profile.name.split(" ")[0].toLowerCase()}
          <span
            className="wordmark-outline"
            style={{ WebkitTextStroke: "1px color-mix(in oklch, var(--accent) 45%, transparent)" }}
          >
            .
          </span>
        </p>
      </div>

      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-2xl font-semibold tracking-tight">{profile.name}</p>
            {profile.footerTagline && (
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {profile.footerTagline}
              </p>
            )}
            <p className="mono-label flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              {contact.availability}
            </p>
          </div>

          <nav aria-label="Footer" className="space-y-3">
            <p className="mono-label">Index</p>
            <ul className="space-y-2">
              {orderedNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <p className="mono-label">Elsewhere</p>
            <ul className="space-y-2">
              {orderedSocials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {social.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-14 flex flex-wrap items-center justify-between gap-3 pt-6">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-xs text-faint">
            Bengaluru, India · <LocalTime />
          </p>
        </div>
      </div>
    </footer>
  )
}
