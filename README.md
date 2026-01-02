This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy to GitHub Pages

This project is configured to build a fully static site and deploy it to GitHub Pages using GitHub Actions.

### How it works

- `next.config.mjs` is set up with:

  - `output: "export"` to generate a static site into the `out/` directory.
  - `trailingSlash: true` for `/path/` style URLs.
  - `images.unoptimized: true` for static export compatibility.
  - `basePath` and `assetPrefix` automatically derived when running in GitHub Actions:
    - If `GITHUB_ACTIONS === "true"` and `GITHUB_REPOSITORY` is `user/repo`, the base path becomes `/repo`.
  - `NEXT_PUBLIC_BASE_PATH` is injected so client code can build correct asset URLs.

- A helper `lib/basePath.ts` is used in UI components to prefix paths for:
  - Static assets (icons, images, resume PDF).
  - Direct `<a href="/...">` links that are not using `next/link`.

- A `.nojekyll` file is written into `out/` after every build via the `postbuild` script to prevent GitHub Pages from treating the output as a Jekyll site.

### GitHub Actions workflow

A workflow at `.github/workflows/deploy-pages.yml`:

- Runs on every push to the `main` branch (and can be triggered manually).
- Steps:
  - `actions/checkout@v4`
  - `actions/setup-node@v4` with Node 20
  - `npm ci`
  - `npm run build` (produces the static site in `out/`)
  - `actions/upload-pages-artifact@v3` with `path: ./out`
  - `actions/deploy-pages@v4`

With this workflow:

- Permissions are set appropriately:

  ```yaml
  permissions:
    contents: read
    pages: write
    id-token: write
  ```

- Concurrency is configured so only one Pages deployment runs at a time:

  ```yaml
  concurrency:
    group: pages
    cancel-in-progress: true
  ```

### One-time GitHub setup

1. Push the repository to GitHub with the workflow file in `.github/workflows/deploy-pages.yml`.
2. In the GitHub repository settings, under **Pages**, set the source to **GitHub Actions**.
3. Push to `main`. The `Deploy to GitHub Pages` workflow will:
   - Build the static site.
   - Upload the `out/` directory.
   - Deploy it to `https://<user>.github.io/<repo>/`.

### Local static build & preview

To verify the static export locally:

```bash
npm run build
# Static site is in ./out
```

You can serve `out/` with any static file server, for example:

```bash
npx serve out
```

Then open the printed URL in your browser to preview the exported site.

## Content and Excel workflow

This project keeps all portfolio content in an Excel file and generates JSON + SEO files from it.

- Source spreadsheet: `content/content.xlsx`
- Generated JSON: `content/generated/content.json`
- Generated SEO files:
  - `public/sitemap.xml`
  - `public/robots.txt`

### Profile images & OpenGraph image

Static images live under `/public/images` and a few root-level icons.

**Profile photo used in the hero & structured data**

By default the hero/profile card and JSON-LD person schema look for:

- `/public/images/profile.png` – main profile photo
- `/public/images/profile-mini.png` (optional) – small avatar used inside the card

You can either:

- Drop files with those exact names into `public/images/`, or
- Override them from Excel in the **Profile** sheet:
  - `avatarUrl` – path such as `/images/profile.png` or a full `https://...` URL
  - `miniAvatarUrl` – path or URL for the mini avatar

If `miniAvatarUrl` is empty, the UI falls back to `avatarUrl`. If the image fails to load, the profile card falls back to a local placeholder.

**OpenGraph / Twitter card image**

The default OpenGraph image is:

- `/public/og.png`

and the layout metadata uses the value from the **Seo** sheet:

- `ogImage` – path like `/og.png` or a full URL

Recommended:

1. Export a 1200x630 PNG (or similar) and save it as `public/og.png`.
2. Put `/og.png` in the `ogImage` column of the **Seo** sheet.

The same value is used for:

- `<meta property="og:image">`
- `<meta name="twitter:image">`

The sitemap and robots generator continue to use `NEXT_PUBLIC_SITE_URL` so all canonical and sitemap URLs are correct for GitHub Pages (for example `https://<user>.github.io/<repo>`).

### Project images

For project detail pages you can optionally add a screenshot:

- Put image files under `public/images/projects/` (for example `public/images/projects/essay-writer.png`).
- In the **Projects** sheet, set `projectImageUrl` to the path starting with `/images/...`, e.g. `/images/projects/essay-writer.png`.

If `projectImageUrl` is set, the project detail page will:

- Show the image on `/projects/<id>/`.
- Prefer that image for OpenGraph/Twitter previews for that project.

The script `scripts/generate-content.mjs`:

- Reads `content/content.xlsx`
- Validates sheet presence using the internal `ROOT_TO_SHEET_MAP` (every required sheet must exist)
- Validates required columns per sheet with clear messages
- Parses arrays from semicolon‑separated cells (e.g. `tag one; tag two`) with trimming and empty‑value removal
- Validates booleans (e.g. `TRUE` / `FALSE` / `1` / `0`) and numeric `order` values
- Writes `content/generated/content.json` via a Zod schema
- Regenerates `public/sitemap.xml` and `public/robots.txt`

It runs automatically via:

- `npm run dev` → `predev` → `npm run generate:content`
- `npm run build` → `prebuild` → `npm run generate:content`

### Safely updating `content.xlsx`

1. Open and edit `content/content.xlsx`.
2. Run the generator locally:

   ```bash
   npm run generate:content
   ```

   - If there are validation errors, the script will print detailed messages pointing to the sheet, field, and row.
3. When it succeeds, commit:

   - `content/content.xlsx`
   - `content/generated/content.json`
   - `public/sitemap.xml`
   - `public/robots.txt` (if changed)

4. Optionally run a full content check before pushing (same as CI uses):

   ```bash
   npm run content:check
   ```

5. Run `npm run verify` before pushing (see below).

### Excel sheets, separators, and optional fields

The Excel sheets are mapped 1:1 to the JSON structure:

- **Profile** → basic profile / hero configuration
- **SocialLinks** → footer and contact social icons
- **Skills** / **TechStack** → skills and tech chips
- **FeaturedProjects** / **Projects** → home page projects and full projects collection
- **Experience**, **Certificates**, **ExperienceStats** → timeline + stats
- **Contact** → contact page copy
- **NavItems** → top navigation links
- **Seo** → site title, description, keywords, and og image

Multi-value fields are stored as semicolon-separated lists in a single cell. For example:

- `summaryBullets`, `heroTaglines`
- `tags`, `stack`, `highlights`
- `techStack`, `skillsTags`
- `keywords`

The generator will:

- Split on `;`
- Trim each value
- Drop empty entries

Booleans and numeric fields:

- `visible` in **NavItems** accepts `TRUE`, `FALSE`, `1`, `0`, `yes`, `no` (case-insensitive).
- `order` columns are parsed as numbers and used to sort rows; non-numeric values cause a clear error.

Most link/image fields are optional:

- Project links: `github`, `demo`
- Certificate link: `credentialUrl`
- Profile images: `avatarUrl`, `miniAvatarUrl`
- Project screenshot: `projectImageUrl`

If you leave an optional field empty, it is simply omitted from the generated JSON and the UI falls back to a sensible default.

### Adding a new project

To add a new project that gets its own `/projects/<id>/` page:

1. In the **Projects** sheet, add a new row.
2. Set a stable `id` value:
   - Lowercase letters, numbers, and hyphens only (e.g. `proj-essay-writer`).
   - No spaces or slashes.
   - This becomes the URL slug for the detail page: `/projects/<id>/`.
3. Fill in:
   - `title`, `oneLine`, `description`
   - `tags` and `stack` as semicolon-separated lists
   - `highlights` as a semicolon-separated list of bullets
   - `date` as `YYYY-MM` (e.g. `2024-11`)
   - Optional `github`, `demo`, and `projectImageUrl`
4. (Optional) Add a matching entry in the **FeaturedProjects** sheet if you want the project to appear in the home page “Featured Projects” section.
5. Run:

   ```bash
   npm run content:check
   ```

   Fix any reported errors, commit the updated `content.xlsx` and generated files, then run `npm run verify`.

## Local verification before merging

Use the `verify` script to run the same checks CI runs before deployment:

```bash
npm run verify
```

This runs:

- `npm run lint`
- `npm run content:check`
- `npm run build`

If this passes locally, the GitHub Actions CI workflow should also pass on your PR.

## Troubleshooting `npm ci` failures in GitHub Actions

If a GitHub Actions job fails at the `npm ci` step with an error like:

> npm ci can only install packages when your package.json and package-lock.json are in sync

do the following **on your local machine**:

1. Ensure you are on Node 20 LTS (same as CI). Using a different major version can produce a different lockfile.
2. From the project root, run:

   ```bash
   npm install
   ```

   This regenerates `package-lock.json` to match `package.json`.

3. Commit the updated lockfile:

   ```bash
   git add package-lock.json
   git commit -m "Regenerate package-lock.json"
   ```

4. (Optional but recommended) Verify it locally:

   ```bash
   npm ci
   npm run verify
   ```

5. Push your changes and re-run the GitHub Actions workflows.

If the error persists, double-check that:

- You only changed `package.json` using `npm install` / `npm uninstall` (not by hand), and
- `package-lock.json` is committed in the same PR/branch.

## Contact form (static-friendly)

This portfolio is deployed as a fully static site (Next.js `output: "export"`), so the contact flow is implemented without any backend routes.

### Default behavior – mailto

Out of the box, the contact form:

- Validates **name**, **email**, and **message** on the client:
  - All fields required
  - Email must be a valid address
  - Message must be at least 20 characters
- Uses a **honeypot** field to silently drop simple bot submissions.
- When the form is valid and no network endpoint is configured:
  - Opens the user’s email client using a `mailto:` link.
  - Prefills the subject and body with the form data.
  - Shows an inline status message (“Opening your email client…”).

This keeps the form production-usable on any static host (including GitHub Pages) with **no server code**.

### Optional Formspree integration

If you want network-based form submissions, you can plug in Formspree (or a similar service) via a public environment variable:

1. Create a Formspree form and copy its endpoint URL, e.g.:

   ```text
   https://formspree.io/f/your-id
   ```

2. In your local `.env.local` file (and CI environment), set:

   ```bash
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
   ```

3. Rebuild the site:

   ```bash
   npm run build
   ```

When `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is present:

- The contact form POSTs JSON to that endpoint on submit.
- On success, it shows a friendly success message.
- On failure, it falls back to telling the user to email you directly.

When the env var is **not** set:

- No network POST is attempted.
- The submit button switches to a mailto-style flow (“Open Email App”).
- The existing email link and “Copy email” CTA on the Contact page remain available.

## Static hosting limitations

Because this project uses `next export` and is deployed to GitHub Pages:

- There are **no** Next.js API routes (`/api/*`) or server actions.
- All pages must be **statically renderable**.
- Any dynamic behavior (forms, animations, theme switching) happens purely on the client.
- Integrations that require a backend must use:
  - Third-party form handlers (e.g., Formspree)
  - Public APIs called directly from the browser
  - Static files (e.g., Excel → JSON via the build-time script)

Keep this in mind when adding new features: everything must remain compatible with a static export.

## Pre-merge test checklist

Before merging or pushing changes, especially to `main`, run these commands locally:

```bash
# 1. Regenerate content + SEO files from Excel
npm run generate:content

# 2. Install dependencies in a clean state (optional but recommended)
npm ci

# 3. Run lint + content checks + build (same as CI)
npm run verify

# 4. Ensure a static export succeeds
npm run build
```

Also manually verify:

- `npm run dev` – navigate all pages, toggle themes, and test the Contact form (mailto + optional Formspree).
- `content/generated/content.json`, `public/sitemap.xml`, and `public/robots.txt` are updated when you change `content/content.xlsx`.
- Metadata looks correct when you **View Source** (titles, OpenGraph, Twitter tags, canonical URLs).
