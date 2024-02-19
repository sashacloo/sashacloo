// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/css/fonts.css',
    '@/assets/css/main.css',
  ],
  modules: [
    // '@nuxtjs/sanity',
    '@nuxtjs/tailwindcss',
    // '@pinia/nuxt'
  ],
  postcss: {
    plugins: {
      "postcss-simple-vars": {},
    },
  },
  // sanity: {
  //   projectId: ''
  // },
})
