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

The script `scripts/generate-content.mjs`:

- Reads `content/content.xlsx`
- Validates sheets and columns using Zod
- Writes `content/generated/content.json`
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

4. Run `npm run verify` before pushing (see below).

## Local verification before merging

Use the `verify` script to run the same checks CI runs before deployment:

```bash
npm run verify
```

This runs:

- `npm run lint`
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
