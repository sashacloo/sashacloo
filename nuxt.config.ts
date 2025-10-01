import { resolve } from 'node:path'
const SANITY_PROJECT_ID = '1ql581l8'

export default defineNuxtConfig({
  vite: {
    resolve: {
      alias: {
        '@sanity/visual-editing': resolve(__dirname, 'utils/empty.js'),
        '@sanity/visual-editing-csm': resolve(__dirname, 'utils/empty.js'),
        'react-compiler-runtime': resolve(__dirname, 'utils/empty.js'),
      },
    },
    optimizeDeps: {
      exclude: [
        '@sanity/visual-editing',
        '@sanity/visual-editing-csm',
        'react',
        'react-dom',
        'react-compiler-runtime',
      ],
    },
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
    // inspector: false, // Disable inspector
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
    projectId: SANITY_PROJECT_ID,
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