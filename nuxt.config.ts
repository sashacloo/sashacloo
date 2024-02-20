// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/fonts.css',
    '@/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/sanity',
    '@nuxtjs/tailwindcss',
    // '@pinia/nuxt'
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
    projectId: '1ql581l8'
  },
})
