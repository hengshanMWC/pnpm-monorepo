const { execSync } = require('child_process')
// const { readJSONSync } = require('fs-extra')

// const { version: oldVersion } = readJSONSync('package.json')

execSync('npx bumpp', { stdio: 'inherit' })

// const { version } = readJSONSync('package.json')

// if (oldVersion === version) {
//   console.log('canceled')
//   process.exit()
// }

execSync('npm run build:types', { stdio: 'inherit' })
execSync('npm run update', { stdio: 'inherit' })
execSync('git add .', { stdio: 'inherit' })

execSync(`git commit -m "chore: release `, { stdio: 'inherit' })
execSync(`git tag -a  -m `, { stdio: 'inherit' })
