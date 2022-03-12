const { rollup } = require('rollup')
const validateNpmPackageName = require('validate-npm-package-name')
const camelcase = require('camelcase')
const json = require('@rollup/plugin-json')
const { minify } = require('terser')
const zlib = require('zlib')
const { nodeResolve } = require('@rollup/plugin-node-resolve') // 解析 node_modules 中的模块
const commonjs = require('@rollup/plugin-commonjs') // 转换 CJS -> ESM, 通常配合@rollup/plugin-node-resolve插件使用
const { babel } = require('@rollup/plugin-babel')
const ts = require('rollup-plugin-typescript2')
const fs = require('fs')
const path = require('path')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

let moduleName = pkg.name
// 检查是否是合法的 npm 包名
if (!validateNpmPackageName(moduleName)) {
  throw new Error(`${moduleName} 不是一个合法的 npm 包名`)
}

// 对于 npm 私有包，取 @scope 后面的部分作为包名
if (/^@.+\//g.test(moduleName)) {
  moduleName = moduleName.split('/')[1]
}

// 将其他形式的命名规则转换为驼峰命名
moduleName = camelcase(moduleName)
// 头信息
const banner = '// * Released under the MIT License.\n'

const genConfig  = (builds, key) => {
  const {entry, dest, format, plugins = [], external = [], name} = builds[key]
  const config = {
    input: entry,
    output: {
      file: dest,
      format,
      banner,
      name: name || moduleName,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: '../../node_modules/**',
        configFile: '../../babel.config.js',
      }),
      json(),
      ts()
    ].concat(plugins),
    external: [].concat(external),
    // 监听
    watch: {
      include: 'src/**',
    }
  }
  // useTsconfigDeclarationDir = false
  return config
}


// 以下代码取自 vue 官方仓库
// 通过 rollup api 打包所有 builds 中的配置

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }
  next()
}


function buildEntry (config) {
  const output = config.output
  const { file, banner } = output
  const isProd = /(min|prod)\.js$/.test(file)
  return rollup(config)
    .then(bundle => bundle.generate(output))
    .then((code) => {
      if (isProd) {
        return minify(code.output[0].code, {
          toplevel: true,
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).then(({ code }) => {
          return write(file, (banner ? banner + '\n' : '') + code, true)
        })
      } else {
        return write(file, code.output[0].code)
      }
    })
}
function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}
function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
module.exports = function (fn) {
  const builds = fn(moduleName)
  const getAllBuilds = Object.keys(builds).map(function (key) {
    return genConfig(builds, key)
  })
  build(getAllBuilds)
}