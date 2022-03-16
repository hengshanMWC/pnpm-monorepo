import fs from 'fs-extra'
import { join, resolve } from 'path'
export const DIR_ROOT = resolve(__dirname, '..')
export const DIR_SRC = resolve(__dirname, '../packages')
// const DIR_TYPES = resolve(__dirname, '../types/packages')
export async function getPackagesDir() {
  const result = await fs.readdir(DIR_SRC)
  return result.map((dir) => join(DIR_SRC, dir))
}
export async function getPackagesJSON(dirs) {
  const result = []
  for (let i = 0; i < dirs.length; i++) {
    const packagePath = join(dirs[i], 'package.json')
    result.push(await fs.readJSON(packagePath))
  }
  return result
}
export async function updatePackageJSON() {
  const dirs = await getPackagesDir()
  const packagesJSON = await getPackagesJSON(dirs)
  const { version } = await fs.readJSON('package.json')
  for (let i = 0; i < packagesJSON.length; i++) {
    const packageJSON = packagesJSON[i]
    packageJSON.version = version
    await fs.writeJSON(dirs[i], packageJSON, { spaces: 2 })
  }
}
