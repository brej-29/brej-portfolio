"use client"

import Script from "next/script"

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

export function AnalyticsScripts() {
  if (!plausibleDomain) return null

  return (
    <Script
      strategy="afterInteractive"
      data-domain={plausibleDomain}
      src="https://plausible.io/js/script.js"
    />
  )
}