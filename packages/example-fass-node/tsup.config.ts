import { defineConfig } from 'tsup'
export default defineConfig({
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs'],
  target: 'node12',
})
