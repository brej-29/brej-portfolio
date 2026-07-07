import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-start justify-center">
      <p className="mono-label">
        <span className="text-accent">404</span> — Not found
      </p>
      <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        This page didn&apos;t survive the redesign.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be stale, or the page moved. Everything worth seeing is one hop from home.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back home
      </Link>
    </main>
  )
}
