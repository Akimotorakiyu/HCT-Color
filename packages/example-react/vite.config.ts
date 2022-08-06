import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import nested from 'postcss-nested'

import WindiCSS from 'vite-plugin-windicss'

import { certKey, certCrt } from '../../cert'

export default defineConfig({
  plugins: [WindiCSS(), react()],
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
