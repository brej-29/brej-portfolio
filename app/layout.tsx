import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/site/theme-provider"
import { BackgroundLayer } from "@/components/site/background-layer"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { profile, socialLinks, seo as generatedSeo, contentError } from "@/content"
import { buildSiteUrl } from "@/lib/site-url"
import { DevContentError } from "@/components/site/dev-content-error"
import { AnalyticsScripts } from "@/components/site/analytics-script"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

const siteTitle: string =
  typeof generatedSeo.siteTitle === "string" && generatedSeo.siteTitle.length > 0
    ? generatedSeo.siteTitle
    : `${profile.name} – ${profile.headline}`

const siteDescription: string =
  typeof generatedSeo.siteDescription === "string" && generatedSeo.siteDescription.length > 0
    ? generatedSeo.siteDescription
    : "Software engineer portfolio featuring full‑stack development, data science, and machine learning projects."

const keywords: string[] =
  Array.isArray(generatedSeo.keywords) && generatedSeo.keywords.length > 0
    ? generatedSeo.keywords
    : [
        "software engineer portfolio",
        "full stack developer",
        "data science projects",
        "machine learning",
        "Next.js portfolio",
        "React developer",
      ]

const twitterHandle: string | undefined =
  typeof generatedSeo.twitterHandle === "string" && generatedSeo.twitterHandle.length > 0
    ? generatedSeo.twitterHandle
    : undefined

const ogImagePath: string =
  typeof generatedSeo.ogImage === "string" && generatedSeo.ogImage.length > 0
    ? generatedSeo.ogImage
    : "/og.png"

const ogImageUrl =
  ogImagePath.startsWith("http://") || ogImagePath.startsWith("https://")
    ? ogImagePath
    : buildSiteUrl(ogImagePath)

const profileImagePath = profile.avatarUrl || "/images/profile.png"
const profileImageUrl =
  profileImagePath.startsWith("http://") || profileImagePath.startsWith("https://")
    ? profileImagePath
    : buildSiteUrl(profileImagePath)

const isDev = process.env.NODE_ENV !== "production"

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  url: buildSiteUrl("/"),
  image: profileImageUrl,
  sameAs: socialLinks.map((link) => link.url),
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(buildSiteUrl("/")),
  title: {
    default: siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  keywords,
  openGraph: {
    type: "website",
    url: buildSiteUrl("/"),
    title: siteTitle,
    description: siteDescription,
    siteName: `${profile.name} – Portfolio`,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: twitterHandle,
    images: [ogImageUrl],
  },
  alternates: {
    canonical: buildSiteUrl("/"),
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9JCZJRVN7W"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9JCZJRVN7W');`}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <BackgroundLayer />

          <Navbar />

          <div id="main-content" className="relative min-h-screen">
            {isDev && contentError ? <DevContentError message={contentError} /> : children}
          </div>

          <Footer />

          <Analytics />
          <AnalyticsScripts />
        </ThemeProvider>
      </body>
    </html>
  )
}
