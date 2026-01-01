/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[1] : ""
const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const computedBasePath = explicitBasePath || (isGithubActions && repoName ? `/${repoName}` : "")

const nextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: computedBasePath || undefined,
  assetPrefix: computedBasePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: computedBasePath || "",
  },
}

export default nextConfig
