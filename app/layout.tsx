import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/site/theme-provider"
import { BackgroundLayer } from "@/components/site/background-layer"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { profile, socialLinks } from "@/content/siteData"
import generatedContent from "@/content/generated/content.json"
import { buildSiteUrl } from "@/lib/site-url"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

interface GeneratedSeo {
  siteTitle?: string
  siteDescription?: string
  keywords?: string[]
  twitterHandle?: string
  ogImage?: string
}

interface GeneratedContent {
  seo?: GeneratedSeo
}

const seo: GeneratedSeo = (generatedContent as GeneratedContent).seo ?? {}

const siteTitle: string =
  typeof seo.siteTitle === "string" && seo.siteTitle.length > 0
    ? seo.siteTitle
    : `${profile.name} – ${profile.headline}`

const siteDescription: string =
  typeof seo.siteDescription === "string" && seo.siteDescription.length > 0
    ? seo.siteDescription
    : "Software engineer portfolio featuring full‑stack development, data science, and machine learning projects."

const keywords: string[] =
  Array.isArray(seo.keywords) && seo.keywords.length > 0
    ? seo.keywords
    : [
        "software engineer portfolio",
        "full stack developer",
        "data science projects",
        "machine learning",
        "Next.js portfolio",
        "React developer",
      ]

const twitterHandle: string | undefined =
  typeof seo.twitterHandle === "string" && seo.twitterHandle.length > 0 ? seo.twitterHandle : undefined

const ogImagePath: string = typeof seo.ogImage === "string" && seo.ogImage.length > 0 ? seo.ogImage : "/professional-portrait.png"
const ogImageUrl = buildSiteUrl(ogImagePath)

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  url: buildSiteUrl("/"),
  image: buildSiteUrl("/images/image.png"),
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
            {children}
          </div>

          <Footer />

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
