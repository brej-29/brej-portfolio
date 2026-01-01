import fs from "fs"
import path from "path"

const outDir = path.join(process.cwd(), "out")

if (!fs.existsSync(outDir)) {
  process.exit(0)
}

const noJekyllPath = path.join(outDir, ".nojekyll")

try {
  fs.writeFileSync(noJekyllPath, "")
} catch {
  // Ignore errors creating .nojekyll; build output is still usable.
}