import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    boot: [],
    css: ['app.scss'],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: 'baseline-widely-available',
        node: 'node22'
      },
      vueRouterMode: 'history'
    },

    devServer: {
      open: true,

      // ✅ PROXY LIMPO (SEM /v1 API)
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    framework: {
      plugins: []
    }
  }
})