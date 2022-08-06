import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

import nested from 'postcss-nested'

import WindiCSS from 'vite-plugin-windicss'

import { certKey, certCrt } from '../../cert'

export default defineConfig({
  plugins: [WindiCSS(), vue(), jsx()],
  server: {
    https: {
      cert: certCrt,
      key: certKey,
    },
  },
  css: {
    postcss: {
      plugins: [nested as any],
    },
  },
})
