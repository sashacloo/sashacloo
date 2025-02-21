const SANITY_PROJECT_ID = '1ql581l8'

export default defineNuxtConfig({
  vite: {
    server: {
      watch: {
        ignored: [
          '**/.git/**',
          '**/node_modules/**',
          '**/dist/**',
          '**/studio/**',
          '**/.yarn/**', 
        ],
        usePolling: true, 
        interval: 2000,
        binaryInterval: 2000,
      },
    },
  },
  devtools: {
    enabled: true,
    vscode: {},
    inspector: false, // Disable inspector
  },

  css: [
    '@/assets/css/fonts.css',
    '@/assets/css/main.css',
  ],

  modules: [
    '@nuxtjs/sanity',
    '@nuxtjs/tailwindcss',
  ],

  // plugins: [
  //   { src: '@/plugins/vue-observe-visibility.ts' }
  // ],
  postcss: {
    plugins: {
      "postcss-simple-vars": {},
    },
  },

  sanity: {
    projectId: SANITY_PROJECT_ID
  },

  app: {
    head: {
      script: [
        {
          src: 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js',
          type: 'module',
          defer: true
        }
      ]
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'model-viewer'
    }
  },

  compatibilityDate: '2025-02-20',
})