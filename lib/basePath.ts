export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? ""
}

export function withBasePath(path: string): string {
  const basePath = getBasePath()

  if (!basePath) return path
  if (!path.startsWith("/")) return path

  return `${basePath}${path}`
}