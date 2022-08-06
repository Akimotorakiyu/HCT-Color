if (process.env.NODE_ENV === 'development') {
  console.log('development mode, load ts', process.env.NODE_ENV)

  // Hook require() to transform to CJS
  require('@esbuild-kit/cjs-loader')

  // Hook import/import() to transform to ESM
  // Can be used in Node v12 to support dynamic `import()`
  require('@esbuild-kit/esm-loader')

  // load ts file
  const { main } = require('./src/index')
  exports.main = main
} else {
  console.log('production mode, load js', process.env.NODE_ENV)

  // load js file
  const { main } = require('./dist/index')
  exports.main = main
}
