const config = require('../configs/rollup.config.settings.js')
const entry = 'src/index.ts'
const _fn = function (moduleName) {
  return [
    {
      entry,
      // 当文件名包含 .min 时将会自动启用 terser 进行压缩
      dest: `dist/${moduleName}.esm.min.js`,
      format: 'es'
    },
    {
      entry,
      // 当文件名包含 .min 时将会自动启用 terser 进行压缩
      dest: `dist/${moduleName}.cjs.min.js`,
      format: 'cjs'
    },
    {
      entry,
      // 当文件名包含 .min 时将会自动启用 terser 进行压缩
      dest: `dist/${moduleName}.min.js`,
      format: 'iife'
    },
    {
      entry,
      // 当文件名包含 .min 时将会自动启用 terser 进行压缩
      dest: `dist/${moduleName}.esm.js`,
      format: 'es'
    },
    {
      entry,
      // 当文件名包含 .min 时将会自动启用 terser 进行压缩
      dest: `dist/${moduleName}.cjs.js`,
      format: 'cjs'
    },
    {
      entry,
      // 当文件名包含 .min 时将会自动启用 terser 进行压缩
      dest: `dist/${moduleName}.js`,
      format: 'iife'
    }
  ]
}
module.exports = function build (fn = _fn) {
  config(fn)
}