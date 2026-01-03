<div align="center">
  <h1>💼 Brej Portfolio</h1>
  <p><i>Premium dark-mode, Excel-driven Next.js portfolio for Brejesh Balakrishnan — neon glass UI, recruiter-ready pages, and static-export hosting on GitHub Pages.</i></p>
</div>

<br>

<div align="center">
  <a href="https://brej-29.github.io/brej-portfolio/">
    <img alt="Live Site" src="https://img.shields.io/badge/Live%20Site-GitHub%20Pages-000000?logo=github&logoColor=white">
  </a>
  <img alt="Language" src="https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Framework" src="https://img.shields.io/badge/Framework-Next.js-black?logo=next.js&logoColor=white">
  <img alt="Styling" src="https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white">
  <img alt="UI" src="https://img.shields.io/badge/UI-Radix%20UI%20%7C%20shadcn-161618?logo=radix-ui&logoColor=white">
  <img alt="Animations" src="https://img.shields.io/badge/Animations-Framer%20Motion-E04CFB?logo=framer&logoColor=white">
  <img alt="Content Pipeline" src="https://img.shields.io/badge/Content-Excel%20%E2%86%92%20JSON-0A3D62">
  <img alt="License" src="https://img.shields.io/badge/License-Check%20Repo-black">
</div>

<div align="center">
  <br>
  <b>Built with the tools and technologies:</b>
  <br><br>
  <code>Next.js 16 (export)</code> | <code>React 19</code> | <code>TypeScript</code> | <code>Tailwind CSS v4</code> | <code>Radix UI</code> | <code>shadcn/ui</code> | <code>Framer Motion</code> | <code>Zod</code> | <code>xlsx</code> | <code>Vercel Analytics</code>
</div>

---

## Live App
https://brej-29.github.io/brej-portfolio/

---

## Table of Contents
* [Overview](#overview)
* [Features](#features)
* [Getting Started](#getting-started)
    * [Project Structure](#project-structure)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Configuration](#configuration)
    * [Usage](#usage)
* [How It Works](#how-it-works)
* [Deployment](#deployment)
* [Troubleshooting](#troubleshooting)
* [License](#license)
* [Contact](#contact)

---

## Overview

Brej Portfolio is a statically exported Next.js 16 site showcasing Brejesh Balakrishnan (Data Scientist / ML Engineer / Full-Stack Developer). It ships with a premium dark, glassmorphism-inspired UI (gooey nav, spotlight cards, animated hero text) that respects reduced-motion preferences and stays fully static for GitHub Pages. Content lives in `content/content.xlsx` and is transformed into typed JSON, sitemap, and robots files at build time. Bootstrapped with `create-next-app`, it uses `next/font` to load the Geist family, provides structured data (Person JSON-LD), and includes Google Analytics + Vercel Analytics out of the box.

---

## Features

- Premium presentation: neon accents, glass cards, animated hero/profile card, rotating taglines, logo marquee, scroll-aware text, and responsive layouts for home, experience, projects, certificates, and contact pages.
- Static-export ready: `output: "export"`, trailing slashes, unoptimized images, `.nojekyll`, and basePath/assetPrefix injection for GitHub Pages; `withBasePath` helper prevents broken asset/resume links.
- Excel-driven content: a generator reads `content/content.xlsx`, validates sheets/columns with Zod, splits semicolon lists, enforces booleans/orders, and emits `content/generated/content.json`, `public/sitemap.xml`, and `public/robots.txt`.
- Recruiter-friendly SEO: OpenGraph/Twitter tags, configurable `ogImage`, sitemap + robots, canonical URLs built from `NEXT_PUBLIC_SITE_URL`, and Person JSON-LD derived from profile/social links.
- Static-friendly contact flow: client validation + honeypot, mailto fallback by default, optional Formspree POST via `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, copy-email CTA, and status messaging.
- Accessibility and performance: reduced-motion support across animations, keyboard/focus states, semantic structure, GPU-friendly transforms, limited blur usage, and lazy-loaded assets.

---

## Getting Started

### Project Structure

```
app/
  layout.tsx           # Global layout with nav, footer, analytics, metadata
  page.tsx             # Home (hero, tech stack, projects, experience, CTA)
  experience/page.tsx
  projects/page.tsx
  certificates/page.tsx
  contact/page.tsx
components/
  hero-section.tsx, .../premium/* (gooey nav, spotlight cards, rotating text, profile card)
  site/* (navbar, footer, background layer, theme provider, section helpers)
content/
  content.xlsx         # Single source of truth
  generated/content.json
lib/
  basePath.ts          # Prefix assets for GitHub Pages
  site-url.ts          # Uses NEXT_PUBLIC_SITE_URL for canonical URLs
public/
  images/, og.png, resume.pdf, icons
scripts/
  generate-content.mjs # Excel -> JSON + sitemap + robots
  add-nojekyll.mjs     # Writes .nojekyll after export
```

### Prerequisites

- Node 20 LTS (matches CI) and npm (or pnpm/yarn/bun if you prefer).
- Excel editor for `content/content.xlsx`.
- Optional: Formspree endpoint if you want network-based contact submissions.

### Installation

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Edit `app/page.tsx` (or any page/component) and the app hot-updates. Fonts are provided via `next/font` (Geist sans/mono).

### Configuration

- Base path / asset prefix: computed automatically in `next.config.mjs` based on `GITHUB_ACTIONS`, `GITHUB_REPOSITORY`, or `NEXT_PUBLIC_BASE_PATH`. Client code reads `NEXT_PUBLIC_BASE_PATH`.
- Site URL: set `NEXT_PUBLIC_SITE_URL` to the production origin (e.g., `https://<user>.github.io/<repo>`) for correct sitemap/canonical tags.
- Contact: set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` only if you want API POST submissions; otherwise mailto fallback is used.
- Assets:
  - Profile: `public/images/profile.png` and optional `public/images/profile-mini.png`, or override via `avatarUrl`/`miniAvatarUrl` in the **Profile** sheet.
  - OpenGraph: recommended 1200x630 PNG at `public/og.png`, referenced in the **Seo** sheet `ogImage` column.
  - Resume: place `public/resume.pdf` (label/href controlled in **Profile**).

### Usage

- Content regeneration: runs automatically via `predev`/`prebuild` hooks. Run manually after Excel edits:

  ```bash
  npm run generate:content
  ```

- Local static preview:

  ```bash
  npm run build   # outputs to ./out
  npx serve out   # preview the exported site
  ```

- Learn more: [Next.js docs](https://nextjs.org/docs), [Next.js tutorial](https://nextjs.org/learn), and the [Next.js repo](https://github.com/vercel/next.js).

---

## How It Works

### Static export + base path

- `next.config.mjs`: `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`, basePath/assetPrefix derived from GitHub Actions repo name or `NEXT_PUBLIC_BASE_PATH`, and `env.NEXT_PUBLIC_BASE_PATH` for client helpers.
- `scripts/add-nojekyll.mjs`: writes `.nojekyll` into `out/` post-build so GitHub Pages serves assets without Jekyll interference.
- `lib/basePath.ts`: `withBasePath` prefixes asset and resume paths; used anywhere static links might break behind a base path.

### Content pipeline

- Source: `content/content.xlsx`.
- Generator (`scripts/generate-content.mjs`):
  - Validates required sheets: Profile, SocialLinks, Skills, TechStack, FeaturedProjects, Projects, Experience, Certificates, Contact, ExperienceStats, NavItems, Seo.
  - Ensures required columns exist per sheet and parses semicolon-separated arrays (`tags`, `stack`, `summaryBullets`, `keywords`, etc.).
  - Accepts booleans (`TRUE`, `FALSE`, `1`, `0`, `yes`, `no`) and numeric `order` fields; sorts lists by `order`.
  - Writes `content/generated/content.json`, `public/sitemap.xml`, and `public/robots.txt` via Zod schemas.
  - Produces readable error messages with sheet/field/row context.
- Sheets map 1:1 to the content schema (profile, social links, skills/tech stack, featured projects, projects, experience, certificates, contact, experience stats, nav items, SEO).
- Optional fields (links, images, booleans) can be left blank; the UI falls back gracefully.

### Safely updating `content.xlsx`

1. Edit `content/content.xlsx`.
2. Run `npm run generate:content` and fix any reported sheet/field/row errors.
3. Commit: `content/content.xlsx`, `content/generated/content.json`, `public/sitemap.xml`, and `public/robots.txt` (if changed).
4. Optionally run `npm run content:check`, then `npm run verify`.

### Assets and metadata

- Profile images: defaults to `/images/profile.png` and optional `/images/profile-mini.png`; override in Excel via `avatarUrl` and `miniAvatarUrl`. Fallbacks exist if an image fails to load.
- OpenGraph/Twitter: defaults to `/og.png`; set **Seo** `ogImage` to a path or full URL (used for `<meta property="og:image">` and `<meta name="twitter:image">`).
- Project screenshots: place under `public/images/projects/` and set `projectImageUrl` in the **Projects** sheet to the `/images/...` path; used on `/projects/<id>/` and for per-project OG cards.

### Adding a new project

1. Add a row to the **Projects** sheet.
2. Choose a slug-safe `id` (lowercase letters/numbers/hyphens, no spaces/slashes) — becomes `/projects/<id>/`.
3. Populate `title`, `oneLine`, `description`, semicolon-separated `tags`/`stack`/`highlights`, `date` as `YYYY-MM`, optional `github`, `demo`, `projectImageUrl`.
4. (Optional) Add to **FeaturedProjects** to surface on the home page.
5. Run `npm run content:check`, fix errors, commit generated files, then `npm run verify`.

### Contact form (static-friendly)

- Default (no env var): client-side validation (required name/email/message, valid email, min 20 chars), honeypot bot trap, opens the user’s email client via `mailto:` with prefilled subject/body, and shows inline status.
- Optional Formspree: set `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id`, rebuild, and submissions POST JSON to that endpoint; success/failure messages are shown, and failures fall back to prompting direct email.
- Copy-email CTA and existing email link remain available in both modes.

### Static hosting limitations

- No Next.js API routes or server actions.
- All pages must be statically renderable; dynamic behavior stays on the client.
- Backend-like features should rely on third-party handlers (e.g., Formspree) or public browser APIs.

---

## Deployment

This repo is configured for GitHub Pages.

- Workflow: `.github/workflows/deploy-pages.yml` runs on `main` pushes or manual dispatch:
  - `actions/checkout@v4`
  - `actions/setup-node@v4` (Node 20)
  - `npm ci`
  - `npm run build` (static export to `out/`)
  - `actions/upload-pages-artifact@v3` with `path: ./out`
  - `actions/deploy-pages@v4`
- Permissions:

  ```yaml
  permissions:
    contents: read
    pages: write
    id-token: write
  ```

- Concurrency:

  ```yaml
  concurrency:
    group: pages
    cancel-in-progress: true
  ```

- One-time setup: push the repo with the workflow, set GitHub Pages source to GitHub Actions, then push to `main` to deploy to `https://<user>.github.io/<repo>/`.
- Local static preview: `npm run build` and `npx serve out` to inspect the exported site before deploying.

---

## Troubleshooting

- `npm ci can only install packages when your package.json and package-lock.json are in sync`:
  1) Use Node 20; 2) run `npm install`; 3) commit the updated `package-lock.json`; 4) optionally `npm ci` and `npm run verify`; 5) push and rerun CI. Ensure lockfile changes accompany `package.json` changes.
- Content errors: run `npm run generate:content` for detailed sheet/field/row messages; ensure required sheets/columns exist and semicolon-separated lists/booleans/orders are valid.
- Pre-merge verification (same as CI): `npm run generate:content`, optionally `npm ci`, then `npm run verify` (lint + content check + build), and confirm `npm run build` succeeds.
- Contact form: if Formspree is unset, mailto flow is expected; set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` for network submissions.

---

## License

License information is provided in the repository (see LICENSE if present).

---

## Contact

- Email: brejesh.bala@gmail.com
- LinkedIn: https://www.linkedin.com/in/brejesh-balakrishnan-7855051b9/
- GitHub: https://github.com/brej-29
- Live Site: https://brej-29.github.io/brej-portfolio/
